
import { Operand, Type, IModelManager } from '../model'
import { Context } from '../core'
import { helper } from '..'
export class Const extends Operand {
	constructor (name: string) {
		super(name, [], helper.type.getType(name))
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
export class Var extends Operand {
	public number?: number
	constructor (name: string, type?:Type) {
		super(name, [], type)
	}

	public eval (context: Context): any {
		return context.data.get(this.name)
	}
}
export class Env extends Operand {
	constructor (name: string) {
		super(name, [], 'string')
	}

	public eval (): any {
		return process.env[this.name]
	}
}

export class Template extends Operand {
	constructor (name: string) {
		super(name, [], 'string')
	}

	public eval (context: Context): any {
		// info https://www.tutorialstonight.com/javascript-string-format.php
		const result = this.name.replace(/\$([a-zA-Z0-9_]+)/g, (match, field) => {
			const value = process.env[field]
			return typeof value === 'undefined' ? match : value
		})
		return result.replace(/\${([a-zA-Z0-9_.]+)}/g, (match, field) => {
			if (context.data) {
				const value = context.data.get(field)
				return typeof value === 'undefined' ? match : value
			}
		})
	}
}

export class Property extends Operand {
	public eval (context: Context): any {
		const value = this.children[0].eval(context)
		if (value === undefined || value === null) return null
		// const names = Helper.obj.names(this.name)
		return helper.obj.getValue(this.name, value)
	}
}

export class KeyVal extends Operand {
	public property?: string
	constructor (name: string, children: Operand[] = [], property: string, type?: Type) {
		super(name, children, type)
		this.property = property
	}

	public eval (context: Context): any {
		return this.children[0].eval(context)
	}
}
export class List extends Operand {
	constructor (name: string, children: Operand[] = []) {
		super(name, children)
	}

	public eval (context: Context): any {
		const values = []
		for (let i = 0; i < this.children.length; i++) {
			values.push(this.children[i].eval(context))
		}
		return values
	}
}
export class Obj extends Operand {
	constructor (name: string, children: Operand[] = []) {
		super(name, children)
	}

	public eval (context: Context): any {
		const obj: { [k: string]: any } = {}
		for (const child of this.children) {
			obj[child.name] = child.eval(context)
		}
		return obj
	}
}
export class Operator extends Operand {
	private model: IModelManager
	constructor (name: string, children: Operand[] = [], model: IModelManager) {
		super(name, children)
		this.model = model
	}

	public eval (context: Context): any {
		if (this.model) {
			const operatorMetadata = this.model.getOperator(this.name, this.children.length)
			if (operatorMetadata.custom) {
				// eslint-disable-next-line new-cap
				return new operatorMetadata.custom(this.name, this.children).eval(context)
			} else {
				const args = []
				for (const child of this.children) {
					args.push(child.eval(context))
				}
				return operatorMetadata.function(...args)
			}
		} else {
			throw new Error(`Function ${this.name} not implemented`)
		}
	}
}
export class CallFunc extends Operand {
	private model: IModelManager
	constructor (name: string, children: Operand[] = [], model: IModelManager) {
		super(name, children)
		this.model = model
	}

	public eval (context: Context): any {
		if (this.model) {
			const funcMetadata = this.model.getFunction(this.name)
			if (funcMetadata.custom) {
				// eslint-disable-next-line new-cap
				return new funcMetadata.custom(this.name, this.children).eval(context)
			} else if (funcMetadata.function) {
				const args = []
				for (let i = 0; i < this.children.length; i++) {
					args.push(this.children[i].eval(context))
				}
				return funcMetadata.function(...args)
			}
		} else {
			throw new Error(`Function ${this.name} not implemented`)
		}
	}
}

export class ChildFunc extends CallFunc {
}
export class Arrow extends CallFunc {
}
export class Block extends Operand {
	public eval (context: Context): any {
		let lastValue:any = null
		for (let i = 0; i < this.children.length; i++) {
			lastValue = this.children[i].eval(context)
		}
		return lastValue
	}
}
export class If extends Operand {
	public eval (context: Context): any {
		const condition = this.children[0].eval(context)
		if (condition) {
			const ifBlock = this.children[1]
			return ifBlock.eval(context)
		} else if (this.children.length > 2) {
			for (let i = 2; i < this.children.length; i++) {
				if (this.children[i] instanceof ElseIf) {
					const elseIfCondition = this.children[i].children[0].eval(context)
					if (elseIfCondition) {
						const elseIfBlock = this.children[i].children[1]
						return elseIfBlock.eval(context)
					}
				} else {
					const elseBlock = this.children[i]
					return elseBlock.eval(context)
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
	public eval (context: Context): any {
		let lastValue:any = null
		const condition = this.children[0]
		const block = this.children[1]
		while (condition.eval(context)) {
			lastValue = block.eval(context)
		}
		return lastValue
	}
}
export class For extends Operand {
	public eval (context: Context): any {
		let lastValue:any = null
		const initialize = this.children[0]
		const condition = this.children[1]
		const increment = this.children[2]
		const block = this.children[3]
		for (initialize.eval(context); condition.eval(context); increment.eval(context)) {
			lastValue = block.eval(context)
		}
		return lastValue
	}
}
export class ForIn extends Operand {
	public eval (context: Context): any {
		let lastValue:any = null
		const item = this.children[0]
		const list = this.children[1].eval(context)
		const block = this.children[2]
		for (let i = 0; i < list.length; i++) {
			const value = list[i]
			if (context) {
				context.data.set(item.name, value)
			}
			// item.set(value)
			lastValue = block.eval(context)
		}
		return lastValue
	}
}
export class Switch extends Operand {
	public eval (context: Context): any {
		const value = this.children[0].eval(context)
		for (let i = 1; i < this.children.length; i++) {
			const option = this.children[i]
			if (option instanceof Case) {
				if (option.name === value) {
					const caseBlock = option.children[0]
					return caseBlock.eval(context)
				}
			} else if (option instanceof Default) {
				const defaultBlock = option.children[0]
				return defaultBlock.eval(context)
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
export class Func extends Operand {
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
