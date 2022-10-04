import { H3lp, Validator } from 'h3lp'
import { Type, ArrayType, ObjectType, PropertyType } from './../model'
import { Node } from './../parser'

class TypeHelper {
	private validator:Validator
	constructor (validator:Validator) {
		this.validator = validator
	}

	public getType (value: any): Type {
		if (value === null || value === undefined) {
			return 'any'
		} else if (Array.isArray(value)) {
			if (value.length > 0) {
				return { items: this.getType(value[0]) }
			}
			return { items: 'any' }
		} else if (typeof value === 'object') {
			const properties: PropertyType[] = []
			for (const entry of Object.entries(value)) {
				properties.push({ name: entry[0], type: this.getType(entry[1]) })
			}
			return { properties: properties }
		} else if (typeof value === 'string') {
			// TODO determinar si es fecha.
			return 'string'
		} else if (typeof value === 'number') {
			if (this.validator.isInteger(value)) {
				return 'integer'
			}
			return 'decimal'
		} else if (typeof value === 'boolean') {
			return 'boolean'
		}
		return 'any'
	}

	public isPrimitive (type:Type | string): boolean {
		let value:string
		if (typeof type === 'string') {
			value = type
		} else {
			value = type.toString()
		}
		return ['string', 'integer', 'decimal', 'number', 'boolean', 'date', 'datetime', 'time'].includes(value)
	}

	public isArrayType (type:Type| string) : boolean {
		if (typeof type === 'string') {
			return type.startsWith('[') && type.endsWith(']')
		}
		return (type as ArrayType).items !== undefined
	}

	public isObjectType (type:Type|string) : boolean {
		if (typeof type === 'string') {
			return type.startsWith('{') && type.endsWith('}')
		}
		return (type as ObjectType).properties !== undefined
	}

	public toString (type?: Type): string {
		if (type === undefined) {
			return 'any'
		}
		if (this.isPrimitive(type)) {
			return type.toString()
		}
		if (this.isObjectType(type)) {
			const properties:string[] = []
			const objectType = type as ObjectType
			for (const propertyType of objectType.properties) {
				properties.push(`${propertyType.name}:${this.toString(propertyType.type)}`)
			}
			return `{${properties.join(',')}}`
		}
		if (this.isArrayType(type)) {
			const arrayType = type as ArrayType
			return `[${this.toString(arrayType.items)}]`
		}
		return 'any'
	}

	public serialize (type?: Type):string| undefined {
		if (type === undefined || type === null) {
			return undefined
		}
		return JSON.stringify(type)
	}

	public deserialize (type?: string):Type | undefined {
		if (type === undefined || type === null) {
			return undefined
		}
		if (this.isPrimitive(type)) {
			return type as Type
		}
		return JSON.parse(type) as Type
	}
}

class ExpressionHelper {
	private validator:Validator
	constructor (validator:Validator) {
		this.validator = validator
	}

	public toExpression (node: Node): string {
		const list: string[] = []
		// if (!node || !node.type) {
		// console.log(node)
		// }
		switch (node.type) {
		case 'const':
		case 'var':
			list.push(node.name)
			break
		case 'array':
			list.push('[')
			for (let i = 0; i < node.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push(']')
			break
		case 'keyVal':
			list.push(node.name + ':')
			list.push(this.toExpression(node.children[0]))
			break
		case 'obj':
			list.push('{')
			for (let i = 0; i < node.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push('}')
			break
		case 'operator':
			if (node.children.length === 1) {
				list.push(node.name)
				list.push(this.toExpression(node.children[0]))
			} else if (node.children.length === 2) {
				list.push('(')
				list.push(this.toExpression(node.children[0]))
				list.push(node.name)
				list.push(this.toExpression(node.children[1]))
				list.push(')')
			}
			break
		case 'funcRef':
			list.push(node.name)
			list.push('(')
			for (let i = 0; i < node.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push(')')
			break
		case 'childFunc':
			list.push(this.toExpression(node.children[0]))
			list.push('.' + node.name)
			list.push('(')
			for (let i = 1; i < node.children.length; i++) {
				if (i > 1) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push(')')
			break
		case 'arrow':
			list.push(this.toExpression(node.children[0]))
			list.push('.' + node.name)
			list.push('(')
			list.push(node.children[1].name)
			list.push('=>')
			list.push(this.toExpression(node.children[2]))
			list.push(')')
			break
		default:
			throw new Error('node: ' + node.type + ' not supported')
		}
		return list.join('')
	}

	public clearChildEmpty (node: Node) {
		try {
			if (node.children.length > 0) {
				const toRemove: number[] = []
				for (let i = 0; i < node.children.length; i++) {
					if (node.children[i] === null) {
						toRemove.push(i)
					}
				}
				for (let i = 0; i < toRemove.length; i++) {
					delete node.children[toRemove[i]]
				}
			}
		} catch (error: any) {
			throw new Error('set parent: ' + node.name + ' error: ' + error.toString())
		}
		return node
	}

	public minify (expression: string): string[] {
		let isString = false
		let quotes = ''
		const buffer = expression.split('')
		const length = buffer.length
		const result = []
		let i = 0
		while (i < length) {
			const p = buffer[i]
			if (isString && p === quotes) {
				isString = false
			} else if (!isString && (p === '\'' || p === '"' || p === '`')) {
				isString = true
				quotes = p
			}
			if (isString) {
				result.push(p)
			} else if (p === ' ') {
				// Only leave spaces when it's between alphanumeric characters.
				// for example in the case of "} if" there should not be a space
				if (i + 1 < length && i - 1 >= 0 && this.validator.isAlphanumeric(buffer[i - 1]) && this.validator.isAlphanumeric(buffer[i + 1])) {
					result.push(p)
				}
			// when there is a block that ends with "}" and then there is an enter , replace the enter with ";"
			// TODO: si estamos dentro de un objecto NO debería agregar ; luego de } sino rompe el obj
			} else if (p === '\n' && result.length > 0 && result[result.length - 1] === '}') {
				result.push(';')
			} else if (p !== '\n' && p !== '\r' && p !== '\t') {
				result.push(p)
			}
			i += 1
		}
		if (result[result.length - 1] === ';') {
			result.splice(-1)
			return result
		}
		return result
	}
}

export class ExpHelper extends H3lp {
	public type:TypeHelper
	public exp:ExpressionHelper
	constructor () {
		super()
		this.type = new TypeHelper(this.validator)
		this.exp = new ExpressionHelper(this.validator)
	}
}
