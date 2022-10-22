import { h3lp } from 'h3lp'
import { Kind, Evaluator, Context, Operand, OperandType } from '../contract'

export class ConstEvaluator extends Evaluator {
	public eval (): any {
		if (this.operand.returnType === undefined) {
			return this.operand.name
		}
		switch (this.operand.returnType.kind) {
		case Kind.string:
			return this.operand.name
		case Kind.boolean:
			return Boolean(this.operand.name)
		case Kind.integer:
		case Kind.decimal:
			return parseFloat(this.operand.name)
		default:
			return this.operand.name
		}
	}
}
export class VarEvaluator extends Evaluator {
	public eval (context: Context): any {
		return context.data.get(this.operand.name)
	}
}
export class EnvEvaluator extends Evaluator {
	public eval (): any {
		return process.env[this.operand.name]
	}
}
export class TemplateEvaluator extends Evaluator {
	public eval (context: Context): any {
		// info https://www.tutorialstonight.com/javascript-string-format.php
		const name = this.operand.name.toString() as string
		const result = name.replace(/\${([a-zA-Z0-9_.]+)}/g, (match, field) => {
			let value = process.env[field]
			if (value === undefined && context.data) {
				value = context.data.get(field)
			}
			return value === undefined ? match : value
		})
		return result.replace(/\$([a-zA-Z0-9_.]+)/g, (match, field) => {
			let value = process.env[field]
			if (value === undefined && context.data) {
				value = context.data.get(field)
			}
			return value === undefined ? match : value
		})
	}
}
export class PropertyEvaluator extends Evaluator {
	public eval (context: Context): any {
		const value = this.operand.children[0].eval(context)
		if (value === undefined || value === null) return null
		return h3lp.obj.getValue(value, this.operand.name)
	}
}
export class ListEvaluator extends Evaluator {
	public eval (context: Context): any {
		const values = []
		for (let i = 0; i < this.operand.children.length; i++) {
			values.push(this.operand.children[i].eval(context))
		}
		return values
	}
}
export class ObjEvaluator extends Evaluator {
	public eval (context: Context): any {
		const obj: { [k: string]: any } = {}
		for (const child of this.operand.children) {
			obj[child.name] = child.children[0].eval(context)
		}
		return obj
	}
}
export class CallFuncEvaluator extends Evaluator {
	// eslint-disable-next-line no-useless-constructor, @typescript-eslint/ban-types
	public constructor (protected readonly operand: Operand, private readonly _function: Function) {
		super(operand)
	}

	public eval (context: Context): any {
		const args = []
		for (const child of this.operand.children) {
			args.push(child.eval(context))
		}
		return this._function(...args)
	}
}
export class BlockEvaluator extends Evaluator {
	public eval (context: Context): any {
		let lastValue:any = null
		for (let i = 0; i < this.operand.children.length; i++) {
			lastValue = this.operand.children[i].eval(context)
		}
		return lastValue
	}
}
export class IfEvaluator extends Evaluator {
	public eval (context: Context): any {
		const condition = this.operand.children[0].eval(context)
		if (condition) {
			const ifBlock = this.operand.children[1]
			return ifBlock.eval(context)
		} else if (this.operand.children.length > 2) {
			for (let i = 2; i < this.operand.children.length; i++) {
				if (this.operand.children[i].type === OperandType.ElseIf) {
					const elseIfCondition = this.operand.children[i].children[0].eval(context)
					if (elseIfCondition) {
						const elseIfBlock = this.operand.children[i].children[1]
						return elseIfBlock.eval(context)
					}
				} else {
					const elseBlock = this.operand.children[i]
					return elseBlock.eval(context)
				}
			}
		}
	}
}
export class WhileEvaluator extends Evaluator {
	public eval (context: Context): any {
		let lastValue:any = null
		const condition = this.operand.children[0]
		const block = this.operand.children[1]
		while (condition.eval(context)) {
			lastValue = block.eval(context)
		}
		return lastValue
	}
}
export class ForEvaluator extends Evaluator {
	public eval (context: Context): any {
		let lastValue:any = null
		const initialize = this.operand.children[0]
		const condition = this.operand.children[1]
		const increment = this.operand.children[2]
		const block = this.operand.children[3]
		for (initialize.eval(context); condition.eval(context); increment.eval(context)) {
			lastValue = block.eval(context)
		}
		return lastValue
	}
}
export class ForInEvaluator extends Evaluator {
	public eval (context: Context): any {
		let lastValue:any = null
		const item = this.operand.children[0]
		const list = this.operand.children[1].eval(context)
		const block = this.operand.children[2]
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
export class SwitchEvaluator extends Evaluator {
	public eval (context: Context): any {
		const value = this.operand.children[0].eval(context)
		for (let i = 1; i < this.operand.children.length; i++) {
			const option = this.operand.children[i]
			if (option.type === OperandType.Case) {
				if (option.name === value) {
					return option.children[0].eval(context)
				}
			} else if (option.type === OperandType.Default) {
				return option.children[0].eval(context)
			}
		}
	}
}
export class BreakEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class ContinueEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class FuncEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class ReturnEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class TryEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class CatchEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class ThrowEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
