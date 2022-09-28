
import { Data } from '../model'
import { ExpressionConfig } from '../parser'
import { Helper } from '../manager'

export abstract class Operand {
	public name: string
	public type: string
	public id?: string
	// public parent?: Operand
	public index?: number
	public level?: number
	public children: Operand[]
	constructor (name: string, children: Operand[] = [], type = 'any') {
		this.name = name
		this.children = children
		this.type = type
		this.id = undefined
		// this.parent = undefined
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
	// public set (value: any) { throw new Error('NotImplemented') }
	public abstract eval(data: Data): any
}

// export interface IOperandData{
// data?: Data
// }

export class Constant extends Operand {
	constructor (name: string) {
		super(name, [], Helper.utils.getType(name))
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

// export class Variable extends Operand implements IOperandData
export class Variable extends Operand {
	// public data?: Data
	public number?: number
	constructor (name: string, type = 'any') {
		super(name, [], type)
	}

	// public set (data: Data, value: any) {
	// if (data) {
	// data.set(this.name, value)
	// }
	// }

	public eval (data: Data): any {
		return data ? data.get(this.name) : null
	}
}
export class EnvironmentVariable extends Operand {
	public eval (): any {
		return process.env[this.name]
	}
}

// export class Template extends Operand implements IOperandData {
export class Template extends Operand {
	constructor (name: string, type = 'any') {
		super(name, [], type)
	}

	public eval (data: Data): any {
		// info https://www.tutorialstonight.com/javascript-string-format.php
		const result = this.name.replace(/\$([a-zA-Z0-9_]+)/g, (match, field) => {
			const value = process.env[field]
			return typeof value === 'undefined' ? match : value
		})
		return result.replace(/\${([a-zA-Z0-9_.]+)}/g, (match, field) => {
			if (data) {
				const value = data.get(field)
				return typeof value === 'undefined' ? match : value
			}
		})
	}
}

export class Property extends Operand {
	public eval (data: Data): any {
		const value = this.children[0].eval(data)
		if (value === undefined || value === null) return null
		const names = Helper.obj.getNames(this.name)
		return Helper.obj.getValue(names, value)
	}
}

export class KeyValue extends Operand {
	public property?: string
	public eval (data: Data): any {
		return this.children[0].eval(data)
	}
}
export class List extends Operand {
	constructor (name: string, children: Operand[] = []) {
		super(name, children, 'any[]')
	}

	public eval (data: Data): any {
		const values = []
		for (let i = 0; i < this.children.length; i++) {
			values.push(this.children[i].eval(data))
		}
		return values
	}
}
export class Obj extends Operand {
	constructor (name: string, children: Operand[] = []) {
		super(name, children, 'object')
	}

	public eval (data: Data): any {
		const obj: { [k: string]: any } = {}
		for (let i = 0; i < this.children.length; i++) {
			const value = this.children[i].eval(data)
			obj[this.children[i].name] = value
		}
		return obj
	}
}
export class Operator extends Operand {
	public metadata?: ExpressionConfig
	public eval (data: Data): any {
		if (this.metadata) {
			const operatorMetadata = this.metadata.getOperator(this.name, this.children.length)
			if (operatorMetadata.custom) {
				// eslint-disable-next-line new-cap
				return new operatorMetadata.custom(this.name, this.children).eval(data)
			} else {
				const args = []
				for (const child of this.children) {
					args.push(child.eval(data))
				}
				return operatorMetadata.function(...args)
			}
		} else {
			throw new Error(`Function ${this.name} not implemented`)
		}
	}
}
export class FunctionRef extends Operand {
	public metadata?: ExpressionConfig

	public eval (data: Data): any {
		if (this.metadata) {
			const funcMetadata = this.metadata.getFunction(this.name)
			if (funcMetadata.custom) {
				// eslint-disable-next-line new-cap
				return new funcMetadata.custom(this.name, this.children).eval(data)
			} else if (funcMetadata.function) {
				const args = []
				for (let i = 0; i < this.children.length; i++) {
					args.push(this.children[i].eval(data))
				}
				return funcMetadata.function(...args)
			}
		} else {
			throw new Error(`Function ${this.name} not implemented`)
		}
	}
}

// export class ChildFunction extends FunctionRef implements IOperandData
export class ChildFunction extends FunctionRef {
	// public data?: Data
}
// export class ArrowFunction extends FunctionRef implements IOperandData
export class ArrowFunction extends FunctionRef {
	// public data?: Data
}
export class Block extends Operand {
	public eval (data: Data): any {
		let lastValue:any = null
		for (let i = 0; i < this.children.length; i++) {
			lastValue = this.children[i].eval(data)
		}
		return lastValue
	}
}
export class If extends Operand {
	public eval (data: Data): any {
		const condition = this.children[0].eval(data)
		if (condition) {
			const ifBlock = this.children[1]
			return ifBlock.eval(data)
		} else if (this.children.length > 2) {
			for (let i = 2; i < this.children.length; i++) {
				if (this.children[i] instanceof ElseIf) {
					const elseIfCondition = this.children[i].children[0].eval(data)
					if (elseIfCondition) {
						const elseIfBlock = this.children[i].children[1]
						return elseIfBlock.eval(data)
					}
				} else {
					const elseBlock = this.children[i]
					return elseBlock.eval(data)
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
	public eval (data: Data): any {
		let lastValue:any = null
		const condition = this.children[0]
		const block = this.children[1]
		while (condition.eval(data)) {
			lastValue = block.eval(data)
		}
		return lastValue
	}
}
export class For extends Operand {
	public eval (data: Data): any {
		let lastValue:any = null
		const initialize = this.children[0]
		const condition = this.children[1]
		const increment = this.children[2]
		const block = this.children[3]
		for (initialize.eval(data); condition.eval(data); increment.eval(data)) {
			lastValue = block.eval(data)
		}
		return lastValue
	}
}
export class ForIn extends Operand {
	public eval (data: Data): any {
		let lastValue:any = null
		const item = this.children[0]
		const list = this.children[1].eval(data)
		const block = this.children[2]
		for (let i = 0; i < list.length; i++) {
			const value = list[i]
			if (data) {
				data.set(item.name, value)
			}
			// item.set(value)
			lastValue = block.eval(data)
		}
		return lastValue
	}
}
export class Switch extends Operand {
	public eval (data: Data): any {
		const value = this.children[0].eval(data)
		for (let i = 1; i < this.children.length; i++) {
			const option = this.children[i]
			if (option instanceof Case) {
				if (option.name === value) {
					const caseBlock = option.children[0]
					return caseBlock.eval(data)
				}
			} else if (option instanceof Default) {
				const defaultBlock = option.children[0]
				return defaultBlock.eval(data)
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
