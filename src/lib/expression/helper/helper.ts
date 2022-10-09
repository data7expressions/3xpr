import { H3lp, Validator } from 'h3lp'
import { Operand, Type, ArrayType, ObjectType, PropertyType } from '../model'
import { Context } from '../core'
import { Node } from '../parser'
import { Const, Var, KeyVal, FuncRef, Arrow } from '../operand'

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

class NodeHelper {
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
		case 'Const':
		case 'Var':
			list.push(node.name)
			break
		case 'List':
			list.push('[')
			for (let i = 0; i < node.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push(']')
			break
		case 'KeyVal':
			list.push(node.name + ':')
			list.push(this.toExpression(node.children[0]))
			break
		case 'Obj':
			list.push('{')
			for (let i = 0; i < node.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push('}')
			break
		case 'Operator':
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
		case 'FuncRef':
			list.push(node.name)
			list.push('(')
			for (let i = 0; i < node.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push(')')
			break
		case 'ChildFunc':
			list.push(this.toExpression(node.children[0]))
			list.push('.' + node.name)
			list.push('(')
			for (let i = 1; i < node.children.length; i++) {
				if (i > 1) list.push(',')
				list.push(this.toExpression(node.children[i]))
			}
			list.push(')')
			break
		case 'Arrow':
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

	public clear (node: Node) {
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
			throw new Error('crear: ' + node.name + ' error: ' + error.toString())
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
			// } else if (p === '\n' && result.length > 0 && result[result.length - 1] === '}') {
			// result.push(';')
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

	public clone (value: Node): Node {
		return this.deserialize(this.serialize(value))
	}

	public serialize (node: Node): any {
		const children = []
		for (const child of node.children) {
			children.push(this.serialize(child))
		}
		if (children.length === 0) {
			return { n: node.name, t: node.type }
		}
		return { n: node.name, t: node.type, c: children }
	}

	public deserialize (serialized: any): Node {
		const children = []
		if (serialized.c) {
			for (const p of serialized.c) {
				children.push(this.deserialize(p))
			}
		}
		return new Node(serialized.n, serialized.t, children)
	}
}

class OperandHelper {
	public objectKey (obj:any) : any {
		const keys = Object.keys(obj).sort()
		const list:string[] = []
		for (const key of keys) {
			list.push(key)
			list.push(obj[key].toString())
		}
		return list.join('|')
	}

	public setParent (operand: Operand, index = 0, parent?: Operand) {
		try {
			if (parent) {
				operand.id = parent.id + '.' + index
				operand.index = index
				operand.level = parent.level ? parent.level + 1 : 0
			} else {
				operand.id = '0'
				// operand.parent = undefined
				operand.index = 0
				operand.level = 0
			}
			for (let i = 0; i < operand.children.length; i++) {
				const p = operand.children[i]
				this.setParent(p, i, operand)
			}
			return operand
		} catch (error: any) {
			throw new Error('set parent: ' + operand.name + ' error: ' + error.toString())
		}
	}

	private classTypeToType (classType:string): string | undefined {
		const irregular:[string, string][] = [
			['Arrow', 'Arrow'],
			['ChildFunc', 'ChildFunc'],
			['FuncRef', 'FuncRef'],
			['List', 'List']
		]
		const found = irregular.find(p => p[0] === classType)
		return found ? found[1] : classType.toLowerCase()
	}

	public getKeys (variable:Var, fields: KeyVal[], list: any[], context: Context): any[] {
		const keys:any[] = []
		// loop through the list and group by the grouper fields
		for (const item of list) {
			let key = ''
			const values = []
			for (const keyValue of fields) {
				context.data.set(Var.name, item)
				// variable.set(item)
				const value = keyValue.children[0].eval(context)
				if (typeof value === 'object') {
					throw new Error(`Property value ${keyValue.name} is an object, so it cannot be grouped`)
				}
				key = key === '' ? value : `${key}-${value}`
				values.push({ name: keyValue.name, value: value })
			}
			// find if the key already exists in the list of keys
			const keyItem = keys.find((p:any) => p.key === key)
			if (keyItem) {
				// if the key exists add the item
				keyItem.items.push(item)
			} else {
				// if the key does not exist add the key, the values and the item
				keys.push({ key: key, values: values, items: [item], summarizers: [] })
			}
		}
		return keys
	}

	public haveAggregates (operand: Operand): boolean {
		if (!(operand instanceof Arrow) && operand instanceof FuncRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			return true
		} else if (operand.children && operand.children.length > 0) {
			for (const child of operand.children) {
				if (this.haveAggregates(child)) {
					return true
				}
			}
		}
		return false
	}

	public findAggregates (operand: Operand): FuncRef[] {
		if (!(operand instanceof Arrow) && operand instanceof FuncRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			return [operand]
		} else if (operand.children && operand.children.length > 0) {
			let aggregates:FuncRef[] = []
			for (const child of operand.children) {
				const childAggregates = this.findAggregates(child)
				if (childAggregates.length > 0) {
					aggregates = aggregates.concat(childAggregates)
				}
			}
			return aggregates
		}
		return []
	}

	public solveAggregates (list: any[], variable: Var, operand: Operand, context: Context): Operand {
		if (!(operand instanceof Arrow) && operand instanceof FuncRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			let value:any
			switch (operand.name) {
			case 'avg':
				value = this.avg(list, variable, operand.children[0], context)
				break
			case 'count':
				value = this.count(list, variable, operand.children[0], context)
				break
			case 'first':
				value = this.first(list, variable, operand.children[0], context)
				break
			case 'last':
				value = this.last(list, variable, operand.children[0], context)
				break
			case 'max':
				value = this.max(list, variable, operand.children[0], context)
				break
			case 'min':
				value = this.min(list, variable, operand.children[0], context)
				break
			case 'sum':
				value = this.sum(list, variable, operand.children[0], context)
				break
			}
			return new Const(value)
		} else if (operand.children && operand.children.length > 0) {
			for (let i = 0; i < operand.children.length; i++) {
				operand.children[i] = this.solveAggregates(list, variable, operand.children[i], context)
			}
		}
		return operand
	}

	public count (list: any[], variable: Var, aggregate: Operand, context: Context): number {
		let count = 0
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			if (aggregate.eval(context)) {
				count++
			}
		}
		return count
	}

	public first (list: any[], variable: Var, aggregate: Operand, context: Context): any {
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			if (aggregate.eval(context)) {
				return item
			}
		}
		return null
	}

	public last (list: any[], variable: Var, aggregate: Operand, context: Context): any {
		for (let i = list.length - 1; i >= 0; i--) {
			const item = list[i]
			// variable.set(item)
			context.data.set(variable.name, item)
			if (aggregate.eval(context)) {
				return item
			}
		}
		return null
	}

	public max (list: any[], variable: Var, aggregate: Operand, context: Context): any {
		let max:any
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (max === undefined || (value !== null && value > max)) {
				max = value
			}
		}
		return max
	}

	public min (list: any[], variable: Var, aggregate: Operand, context: Context): any {
		let min:any
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (min === undefined || (value !== null && value < min)) {
				min = value
			}
		}
		return min
	}

	public avg (list: any[], variable: Var, aggregate: Operand, context: Context): number {
		let sum = 0
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (value !== null) {
				sum = sum + value
			}
		}
		return list.length > 0 ? sum / list.length : 0
	}

	public sum (list: any[], variable: Var, aggregate: Operand, context: Context): number {
		let sum = 0
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (value !== null) {
				sum = sum + value
			}
		}
		return sum
	}
}

export class ExpHelper extends H3lp {
	public type:TypeHelper
	public node:NodeHelper
	public operand:OperandHelper
	constructor () {
		super()
		this.type = new TypeHelper(this.validator)
		this.node = new NodeHelper(this.validator)
		this.operand = new OperandHelper()
	}
}
