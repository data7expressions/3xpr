import { h3lp } from 'h3lp'
import { Evaluator, Context, Operand, OperatorType, IModelManager, OperandFactory } from '../contract'
import {
	Const, Var, KeyVal, List, Obj, Operator, CallFunc, Block, Arrow, ChildFunc,
	If, ElseIf, Else, While, For, ForIn, Switch, Case, Default,
	Template, Property, Env, Break, Continue, Func, Return, Try, Catch, Throw
} from './operands'

class ConstEvaluator extends Evaluator {
	public eval (): any {
		switch (this.operand.type) {
		case 'string':
			return this.operand.name
		case 'boolean':
			return Boolean(this.operand.name)
		case 'number':
			return parseFloat(this.operand.name)
		default:
			return this.operand.name
		}
	}
}
class VarEvaluator extends Evaluator {
	public eval (context: Context): any {
		return context.data.get(this.operand.name)
	}
}
class EnvEvaluator extends Evaluator {
	public eval (): any {
		return process.env[this.operand.name]
	}
}
class TemplateEvaluator extends Evaluator {
	public eval (context: Context): any {
		// info https://www.tutorialstonight.com/javascript-string-format.php
		const result = this.operand.name.replace(/\$([a-zA-Z0-9_]+)/g, (match, field) => {
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
class PropertyEvaluator extends Evaluator {
	public eval (context: Context): any {
		const value = this.operand.children[0].eval(context)
		if (value === undefined || value === null) return null
		return h3lp.obj.getValue(value, this.operand.name)
	}
}
class KeyValEvaluator extends Evaluator {
	public eval (context: Context): any {
		return this.operand.children[0].eval(context)
	}
}
class ListEvaluator extends Evaluator {
	public eval (context: Context): any {
		const values = []
		for (let i = 0; i < this.operand.children.length; i++) {
			values.push(this.operand.children[i].eval(context))
		}
		return values
	}
}
class ObjEvaluator extends Evaluator {
	public eval (context: Context): any {
		const obj: { [k: string]: any } = {}
		for (const child of this.operand.children) {
			obj[child.name] = child.eval(context)
		}
		return obj
	}
}
class OperatorEvaluator extends Evaluator {
	private model: IModelManager
	constructor (operand: Operand, model: IModelManager) {
		super(operand)
		this.model = model
	}

	public eval (context: Context): any {
		if (this.model) {
			const operatorMetadata = this.model.getOperator(this.operand.name, this.operand.children.length)
			if (operatorMetadata.custom) {
				// eslint-disable-next-line new-cap
				return new operatorMetadata.custom(this.operand).eval(context)
			} else {
				const args = []
				for (const child of this.operand.children) {
					args.push(child.eval(context))
				}
				return operatorMetadata.function(...args)
			}
		} else {
			throw new Error(`Function ${this.operand.name} not implemented`)
		}
	}
}
class CallFuncEvaluator extends Evaluator {
	private model: IModelManager
	constructor (operand: Operand, model: IModelManager) {
		super(operand)
		this.model = model
	}

	public eval (context: Context): any {
		if (this.model) {
			const funcMetadata = this.model.getFunction(this.operand.name)
			if (funcMetadata.custom) {
				// eslint-disable-next-line new-cap
				return new funcMetadata.custom(this.operand).eval(context)
			} else if (funcMetadata.function) {
				const args = []
				for (let i = 0; i < this.operand.children.length; i++) {
					args.push(this.operand.children[i].eval(context))
				}
				return funcMetadata.function(...args)
			}
		} else {
			throw new Error(`Function ${this.operand.name} not implemented`)
		}
	}
}
class BlockEvaluator extends Evaluator {
	public eval (context: Context): any {
		let lastValue:any = null
		for (let i = 0; i < this.operand.children.length; i++) {
			lastValue = this.operand.children[i].eval(context)
		}
		return lastValue
	}
}
class IfEvaluator extends Evaluator {
	public eval (context: Context): any {
		const condition = this.operand.children[0].eval(context)
		if (condition) {
			const ifBlock = this.operand.children[1]
			return ifBlock.eval(context)
		} else if (this.operand.children.length > 2) {
			for (let i = 2; i < this.operand.children.length; i++) {
				if (this.operand.children[i] instanceof ElseIf) {
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
class WhileEvaluator extends Evaluator {
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
class ForEvaluator extends Evaluator {
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
class ForInEvaluator extends Evaluator {
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
class SwitchEvaluator extends Evaluator {
	public eval (context: Context): any {
		const value = this.operand.children[0].eval(context)
		for (let i = 1; i < this.operand.children.length; i++) {
			const option = this.operand.children[i]
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
class BreakEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
class ContinueEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
class FuncEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
class ReturnEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
class TryEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
class CatchEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
class ThrowEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class BasicOperandFactory extends OperandFactory {
	public create (id:string, name: string, type:string, children: Operand[] = []): Operand {
		let operand:Operand | undefined
		switch (type) {
		case OperatorType.Const:
			operand = new Const(id, name)
			operand.evaluator = new ConstEvaluator(operand)
			break
		case OperatorType.Var:
			operand = new Var(id, name)
			operand.evaluator = new VarEvaluator(operand)
			break
		case OperatorType.Env:
			operand = new Env(id, name)
			operand.evaluator = new EnvEvaluator(operand)
			break
		case OperatorType.Property:
			operand = new Property(id, name, children)
			operand.evaluator = new PropertyEvaluator(operand)
			break
		case OperatorType.Template:
			operand = new Template(id, name)
			operand.evaluator = new TemplateEvaluator(operand)
			break
		case OperatorType.KeyVal:
			operand = new KeyVal(id, name, children, name)
			operand.evaluator = new KeyValEvaluator(operand)
			break
		case OperatorType.List:
			operand = new List(id, name, children)
			operand.evaluator = new ListEvaluator(operand)
			break
		case OperatorType.Obj:
			operand = new Obj(id, name, children)
			operand.evaluator = new ObjEvaluator(operand)
			break
		case OperatorType.Operator:
			operand = new Operator(id, name, children)
			operand.evaluator = new OperatorEvaluator(operand, this.model)
			break
		case OperatorType.CallFunc:
			operand = new CallFunc(id, name, children)
			operand.evaluator = new CallFuncEvaluator(operand, this.model)
			break
		case OperatorType.Arrow:
			operand = new Arrow(id, name, children)
			operand.evaluator = new CallFuncEvaluator(operand, this.model)
			break
		case OperatorType.ChildFunc:
			operand = new ChildFunc(id, name, children)
			operand.evaluator = new CallFuncEvaluator(operand, this.model)
			break
		case OperatorType.Block:
			operand = new Block(id, name, children)
			operand.evaluator = new BlockEvaluator(operand)
			break
		case OperatorType.If:
			operand = new If(id, name, children)
			operand.evaluator = new IfEvaluator(operand)
			break
		case OperatorType.ElseIf:
			operand = new ElseIf(id, name, children)
			break
		case OperatorType.Else:
			operand = new Else(id, name, children)
			break
		case OperatorType.While:
			operand = new While(id, name, children)
			operand.evaluator = new WhileEvaluator(operand)
			break
		case OperatorType.For:
			operand = new For(id, name, children)
			operand.evaluator = new ForEvaluator(operand)
			break
		case OperatorType.ForIn:
			operand = new ForIn(id, name, children)
			operand.evaluator = new ForInEvaluator(operand)
			break
		case OperatorType.Switch:
			operand = new Switch(id, name, children)
			operand.evaluator = new SwitchEvaluator(operand)
			break
		case OperatorType.Case:
			operand = new Case(id, name, children)
			break
		case OperatorType.Default:
			operand = new Default(id, name, children)
			break
		case OperatorType.Break:
			operand = new Break(id, name, children)
			operand.evaluator = new BreakEvaluator(operand)
			break
		case OperatorType.Continue:
			operand = new Continue(id, name, children)
			operand.evaluator = new ContinueEvaluator(operand)
			break
		case OperatorType.Func:
			operand = new Func(id, name, children)
			operand.evaluator = new FuncEvaluator(operand)
			break
		case OperatorType.Return:
			operand = new Return(id, name, children)
			operand.evaluator = new ReturnEvaluator(operand)
			break
		case OperatorType.Try:
			operand = new Try(id, name, children)
			operand.evaluator = new TryEvaluator(operand)
			break
		case OperatorType.Catch:
			operand = new Catch(id, name, children)
			operand.evaluator = new CatchEvaluator(operand)
			break
		case OperatorType.Throw:
			operand = new Throw(id, name, children)
			operand.evaluator = new ThrowEvaluator(operand)
			break
		default:
			throw new Error('node name: ' + name + ' type: ' + type + ' not supported')
		}
		return operand
	}
}
