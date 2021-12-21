
import { Data } from '../model'
import { OperandMetadata } from './operandMetadata'
import { Helper } from '../manager/helper'

export abstract class Operand {
	public name: string
	public type: string
	public id?: string
	public parent?: Operand
	public index?: number
	public level?: number
	public children: Operand[]
	constructor (name: string, children: Operand[] = [], type = 'any') {
		this.name = name
		this.children = children
		this.type = type
		this.id = undefined
		this.parent = undefined
		this.index = 0
		this.level = 0
	}

	public clone () {
		throw new Error('NotImplemented')
		// // const obj = this
		// const children = []
		// if (this.children) {
		// for (const k in this.children) {
		// const p = this.children[k]
		// const child = p && typeof p === 'object' ? JSON.parse(JSON.stringify(p)) : p
		// children.push(child)
		// }
		// }
		// return new this.constructor(this.name, children)
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public set (value: any) { throw new Error('NotImplemented') }
	public abstract eval(): any
}
export class Constant extends Operand {
	constructor (name: string) {
		super(name, [], Helper.getType(name))
	}

	public eval (): any {
		switch (this.type) {
		case 'string':
			return this.name
		case 'boolean':
			return Boolean(this.name)
		case 'number':
			return parseFloat(this.name)
		default:
			return this.name
		}
	}
}
export class Variable extends Operand {
	public data?: Data
	public number?: number
	constructor (name: string, type = 'any') {
		super(name, [], type)
		this.data = undefined
		this.number = undefined
	}

	public set (value: any) {
		if (this.data) { this.data.set(this.name, value) }
	}

	public eval (): any {
		return this.data ? this.data.get(this.name) : null
	}
}
export class KeyValue extends Operand {
	public property?: string
	public eval (): any {
		return this.children[0].eval()
	}
}
export class List extends Operand {
	constructor (name: string, children: Operand[] = []) {
		super(name, children, 'array')
	}

	public eval (): any {
		const values = []
		for (let i = 0; i < this.children.length; i++) {
			values.push(this.children[i].eval())
		}
		return values
	}
}
export class Obj extends Operand {
	constructor (name: string, children: Operand[] = []) {
		super(name, children, 'object')
	}

	public eval (): any {
		const obj: { [k: string]: any } = {}
		for (let i = 0; i < this.children.length; i++) {
			const value = this.children[i].eval()
			obj[this.children[i].name] = value
		}
		return obj
	}
}
export class Operator extends Operand {
	public metadata?: OperandMetadata
	public eval (): any {
		if (this.metadata) {
			const operMetadata = this.metadata.getOperatorMetadata(this.name, this.children.length)
			if (operMetadata.custom) { return operMetadata.custom(this.name, this.children, operMetadata.customFunction).eval() } else {
				const args = []
				for (let i = 0; i < this.children.length; i++) {
					args.push(this.children[i].eval())
				}
				return operMetadata.function(...args)
			}
		} else {
			throw new Error(`Function ${this.name} not implemented`)
		}
	}
}
export class FunctionRef extends Operand {
	public metadata?: OperandMetadata
	public eval (): any {
		if (this.metadata) {
			const funcMetadata = this.metadata.getFunctionMetadata(this.name)
			// eslint-disable-next-line new-cap
			if (funcMetadata.custom) { return new funcMetadata.custom(this.name, this.children).eval() } else {
				const args = []
				for (let i = 0; i < this.children.length; i++) {
					args.push(this.children[i].eval())
				}
				return funcMetadata.function(...args)
			}
		} else {
			throw new Error(`Function ${this.name} not implemented`)
		}
	}
}
export class ChildFunction extends FunctionRef {
	public data?: Data
}
export class ArrowFunction extends FunctionRef {
	public data?: Data
}
export class Block extends Operand {
	public eval (): any {
		for (let i = 0; i < this.children.length; i++) {
			this.children[i].eval()
		}
	}
}
