import { h3lp, Validator } from 'h3lp'
import { Node } from '../contract'

export class NodeHelper {
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
		case 'CallFunc':
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

	public normalize (expression: string): string[] {
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

export const nodeHelper = new NodeHelper(h3lp.validator)
