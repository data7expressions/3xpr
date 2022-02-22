
import { Data } from '../model'
import { ExpressionConfig } from '../parser'
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
export class Template extends Operand {
	public data?: Data
	constructor (name: string, type = 'any') {
		super(name, [], type)
		this.data = undefined
	}

	public eval (): any {
		// info https://www.tutorialstonight.com/javascript-string-format.php
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const me = this
		return this.name.replace(/\${([a-zA-Z0-9_.]+)}/g, function (match, field) {
			if (me.data) {
				const value = me.data.get(field)
				return typeof value === 'undefined' ? match : value
			}
		})
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
	public metadata?: ExpressionConfig
	public eval (): any {
		if (this.metadata) {
			const operMetadata = this.metadata.getOperator(this.name, this.children.length)
			if (operMetadata.custom) {
				// eslint-disable-next-line new-cap
				return new operMetadata.custom(this.name, this.children).eval()
			} else {
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
	public metadata?: ExpressionConfig
	public eval (): any {
		if (this.metadata) {
			const funcMetadata = this.metadata.getFunction(this.name)
			if (funcMetadata.custom) {
				// eslint-disable-next-line new-cap
				return new funcMetadata.custom(this.name, this.children).eval()
			} else {
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
		let lastValue:any = null
		for (let i = 0; i < this.children.length; i++) {
			lastValue = this.children[i].eval()
		}
		return lastValue
	}
}
export class If extends Operand {
	public eval (): any {
		const condition = this.children[0].eval()
		if (condition) {
			const ifBlock = this.children[1]
			return ifBlock.eval()
		} else if (this.children.length > 2) {
			for (let i = 2; i < this.children.length; i++) {
				if (this.children[i] instanceof ElseIf) {
					const elseIfCondition = this.children[i].children[0].eval()
					if (elseIfCondition) {
						const elseIfBlock = this.children[i].children[1]
						return elseIfBlock.eval()
					}
				} else {
					const elseBlock = this.children[i]
					return elseBlock.eval()
				}
			}
		}
	}
}
export class ElseIf extends Operand {
	public eval (): any {
		throw new Error('NotUsed')
	}
}
export class Else extends Operand {
	public eval (): any {
		throw new Error('NotUsed')
	}
}
export class While extends Operand {
	public eval (): any {
		let lastValue:any = null
		const condition = this.children[0]
		const block = this.children[1]
		while (condition.eval()) {
			lastValue = block.eval()
		}
		return lastValue
	}
}
export class For extends Operand {
	public eval (): any {
		let lastValue:any = null
		const initialize = this.children[0]
		const condition = this.children[1]
		const increment = this.children[2]
		const block = this.children[3]
		for (initialize.eval(); condition.eval(); increment.eval()) {
			lastValue = block.eval()
		}
		return lastValue
	}
}
export class ForIn extends Operand {
	public eval (): any {
		let lastValue:any = null
		const item = this.children[0]
		const list = this.children[1].eval()
		const block = this.children[2]
		for (let i = 0; i < list.length; i++) {
			const value = list[i]
			item.set(value)
			lastValue = block.eval()
		}
		return lastValue
	}
}
export class Switch extends Operand {
	public eval (): any {
		const value = this.children[0].eval()
		for (let i = 1; i < this.children.length; i++) {
			const option = this.children[i]
			if (option instanceof Case) {
				if (option.name === value) {
					const caseBlock = option.children[0]
					return caseBlock.eval()
				}
			} else if (option instanceof Default) {
				const defaultBlock = option.children[0]
				return defaultBlock.eval()
			}
		}
	}
}
export class Case extends Operand {
	public eval (): any {
		throw new Error('NotUsed')
	}
}
export class Default extends Operand {
	public eval (): any {
		throw new Error('NotUsed')
	}
}

export class Break extends Operand {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class Continue extends Operand {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class Function extends Operand {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class Return extends Operand {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class Try extends Operand {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class Catch extends Operand {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class Throw extends Operand {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
