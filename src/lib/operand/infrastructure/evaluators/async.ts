import { Autowired, Service, h3lp } from 'h3lp'
import { Evaluator, EvaluatorBuilder } from '../../domain'
import { Operand, OperandType, Context, Step, IEvaluator } from '../../../shared/domain'
import { ConstEvaluator, VarEvaluator, EnvEvaluator, TemplateEvaluator, NotImplementedEvaluator } from './sync'
import { IModelService } from '../../../model/domain'
@Service(`exp.operand.eval.async.${OperandType.Const}`)
export class ConstAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ConstEvaluator(operand)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Var}`)
export class VarAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new VarEvaluator(operand)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Env}`)
export class EnvAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new EnvEvaluator(operand)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Template}`)
export class TemplateAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new TemplateEvaluator(operand)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Break}`)
export class BreakAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Continue}`)
export class ContinueAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Return}`)
export class ReturnAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

export class PropertyAsyncEvaluator extends Evaluator {
	public eval (context: Context): any {
		const value = this.operand.children[0].eval(context)
		if (value === undefined || value === null) return null
		return h3lp.obj.getValue(value, this.operand.name)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Property}`)
export class PropertyAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new PropertyAsyncEvaluator(operand)
	}
}

export abstract class AsyncEvaluator implements IEvaluator {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly operand: Operand) {}

	public abstract eval(context: Context, step?:Step): any
	protected solveChildren (context: Context, step?:Step): any {
		if (step === undefined) {
			throw new Error('step undefined')
		}
		for (let i = step.values.length - 1; i < this.operand.children.length; i++) {
			const value = this.operand.children[i].eval(context)
			if (context.token.isBreak) {
				return value
			}
			step.values.push(value)
		}
		return step.values
	}
}
export class StackEvaluator extends Evaluator {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly operand: Operand, private readonly child:AsyncEvaluator) {
		super(operand)
	}

	public eval (context: Context) {
		if (this.operand.id === undefined) {
			throw new Error(`Operand ${this.operand.name} id undefined`)
		}
		let step:Step = context.token.stack[this.operand.id] as Step
		if (step === undefined) {
			step = new Step(this.operand.name, this.operand.id)
			context.token.stack[this.operand.id] = step
		}
		const result = this.child.eval(context, step)
		if (!context.token.isBreak) {
			// remove stack
			delete context.token.stack[this.operand.id]
		}
		return result
	}
}

export class ListAsyncEvaluator extends AsyncEvaluator {
	public eval (context: Context, step?:Step): any {
		return this.solveChildren(context, step)
	}
}

@Service(`exp.operand.eval.async.${OperandType.List}`)
export class ListAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ListAsyncEvaluator(operand)
	}
}
export class ObjAsyncEvaluator extends AsyncEvaluator {
	public eval (context: Context, step?:Step): any {
		const result = this.solveChildren(context, step)
		if (context.token.isBreak) {
			return result
		}
		const obj: { [k: string]: any } = {}
		for (let i = 0; i < result.length; i++) {
			obj[this.operand.children[i].name] = result
		}
		return obj
	}
}
@Service(`exp.operand.eval.async.${OperandType.Obj}`)
export class ObjAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ObjAsyncEvaluator(operand)
	}
}

export class CallFuncAsyncEvaluator extends AsyncEvaluator {
	// eslint-disable-next-line no-useless-constructor, @typescript-eslint/ban-types
	public constructor (protected readonly operand: Operand, private readonly _function: Function) {
		super(operand)
	}

	public eval (context: Context, step:Step): any {
		const result = this.solveChildren(context, step)
		if (context.token.isBreak) {
			return result
		}
		return this._function(...result)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Operator}`)
export class OperatorAsyncEvaluatorBuilder implements EvaluatorBuilder {
	@Autowired('exp.model.service')
	private model!: IModelService

	build (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getOperator(operand.name, operand.children.length)
		if (operatorMetadata.custom) {
			// En el caso custom no sera posible acceder a la pila
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new StackEvaluator(operand, new CallFuncAsyncEvaluator(operand, operatorMetadata.function))
		} else {
			throw new Error(`Function ${name} not implemented`)
		}
	}
}

@Service(`exp.operand.eval.async.${OperandType.CallFunc}`)
export class FunctionAsyncEvaluatorBuilder implements EvaluatorBuilder {
	@Autowired('exp.model.service')
	private model!: IModelService

	build (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getFunction(operand.name)
		if (operatorMetadata.custom) {
			// En el caso custom no sera posible acceder a la pila
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new StackEvaluator(operand, new CallFuncAsyncEvaluator(operand, operatorMetadata.function))
		} else {
			throw new Error(`Function ${name} not implemented`)
		}
	}
}

@Service(`exp.operand.eval.async.${OperandType.ChildFunc}`)
export class ChildFuncAsyncEvaluatorBuilder extends FunctionAsyncEvaluatorBuilder {}

@Service(`exp.operand.eval.async.${OperandType.Arrow}`)
export class ArrowAsyncEvaluatorBuilder extends FunctionAsyncEvaluatorBuilder {}

export class BlockAsyncEvaluator extends AsyncEvaluator {
	public eval (context: Context, step?:Step): any {
		const result = this.solveChildren(context, step)
		if (context.token.isBreak) {
			return result
		}
		if (result.length > 0) {
			return result[result.length - 1]
		}
		return null
	}
}

@Service(`exp.operand.eval.async.${OperandType.Block}`)
export class BlockAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new BlockAsyncEvaluator(operand)
	}
}

export class IfAsyncEvaluator extends AsyncEvaluator {
	public eval (context: Context, step?:Step): any {
		if (step === undefined) {
			throw new Error('step undefined')
		}
		if (step.values.length === 0) {
			const condition = this.operand.children[0].eval(context)
			if (context.token.isBreak) {
				return condition
			}
			step.values.push(condition)
		}
		if (step.values[0]) {
			// if condition is true evaluate block if
			const value = this.operand.children[1].eval(context)
			if (!context.token.isBreak) {
				step.values.push(value)
			}
			return value
		} else if (this.operand.children.length > 2) {
			// if had else if or else , evaluate them
			let value
			for (let i = step.values.length - 1; i < this.operand.children.length; i++) {
				if (this.operand.children[i].type === OperandType.ElseIf) {
					const elseIfCondition = this.operand.children[i].children[0].eval(context)
					if (elseIfCondition) {
						value = this.operand.children[i].children[1].eval(context)
					}
				} else {
					// else block
					value = this.operand.children[i].eval(context)
				}
				if (context.token.isBreak) {
					return value
				}
				step.values.push(value)
			}
			return value
		}
	}
}

@Service(`exp.operand.eval.async.${OperandType.If}`)
export class IfAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new IfAsyncEvaluator(operand)
	}
}

export class WhileAsyncEvaluator extends AsyncEvaluator {
	public eval (context: Context, step?:Step): any {
		if (step === undefined) {
			throw new Error('step undefined')
		}
		const condition = this.operand.children[0]
		const block = this.operand.children[1]
		let blockResult:any = null
		// evaluate condition
		if (step.values.length === 0) {
			const conditionResult = condition.eval(context)
			if (context.token.isBreak) {
				return conditionResult
			}
			step.values.push(conditionResult)
		}
		while (step.values[0]) {
			// evaluate condition
			if (step.values.length === 1) {
				blockResult = block.eval(context)
				if (context.token.isBreak) {
					return blockResult
				}
				step.values.push(blockResult)
			}
			// clear values for next evaluations
			step.values = []
			// evaluate condition
			const conditionResult = condition.eval(context)
			if (context.token.isBreak) {
				return conditionResult
			}
			step.values.push(conditionResult)
		}
		return blockResult
	}
}

@Service(`exp.operand.eval.async.${OperandType.While}`)
export class WhileAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new WhileAsyncEvaluator(operand)
	}
}
export class ForAsyncEvaluator extends AsyncEvaluator {
	public eval (context: Context, step?:Step): any {
		if (step === undefined) {
			throw new Error('step undefined')
		}

		let lastValue:any = null
		const initialize = this.operand.children[0]
		const condition = this.operand.children[1]
		const increment = this.operand.children[2]
		const block = this.operand.children[3]

		// evaluate initialize
		if (step.values.length === 0) {
			const initializeResult = initialize.eval(context)
			if (context.token.isBreak) {
				return initializeResult
			}
			step.values.push(initializeResult)
		}
		// evaluate condition
		if (step.values.length === 1) {
			const conditionResult = condition.eval(context)
			if (context.token.isBreak) {
				return conditionResult
			}
			step.values.push(conditionResult)
		}

		while (step.values[1]) {
			// evaluate block
			if (step.values.length === 2) {
				lastValue = block.eval(context)
				if (context.token.isBreak) {
					return lastValue
				}
				step.values.push(lastValue)
			}
			// evaluate increment
			if (step.values.length === 3) {
				const incrementResult = increment.eval(context)
				if (context.token.isBreak) {
					return incrementResult
				}
				step.values.push(incrementResult)
			}
			// clear values for next evaluations
			step.values = [step.values[0]]
			// evaluate condition
			const conditionResult = condition.eval(context)
			if (context.token.isBreak) {
				return conditionResult
			}
			step.values.push(conditionResult)
		}
		return lastValue
	}
}

@Service(`exp.operand.eval.async.${OperandType.For}`)
export class ForAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ForAsyncEvaluator(operand)
	}
}

export class ForInAsyncEvaluator extends AsyncEvaluator {
	public eval (context: Context, step?:Step): any {
		if (step === undefined) {
			throw new Error('step undefined')
		}

		let lastValue:any = null
		const item = this.operand.children[0]
		const list = this.operand.children[1]
		const block = this.operand.children[2]
		let listResult:any[] = []
		// evaluate list
		if (step.values.length === 0) {
			listResult = list.eval(context)
			if (context.token.isBreak) {
				return listResult
			}
			step.values.push(listResult)
		}
		for (let i = step.values.length - 1; i < listResult.length; i++) {
			const value = listResult[i]
			if (context) {
				context.data.set(item.name, value)
			}
			lastValue = block.eval(context)
			if (context.token.isBreak) {
				return lastValue
			}
			step.values.push(lastValue)
		}
		return lastValue
	}
}

@Service(`exp.operand.eval.async.${OperandType.ForIn}`)
export class ForInAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ForInAsyncEvaluator(operand)
	}
}

export class SwitchAsyncEvaluator extends AsyncEvaluator {
	public eval (context: Context, step?:Step): any {
		if (step === undefined) {
			throw new Error('step undefined')
		}
		// evaluate
		let value
		if (step.values.length === 0) {
			value = this.operand.children[0].eval(context)
			if (context.token.isBreak) {
				return value
			}
			step.values.push(value)
		} else {
			value = step.values[0]
		}
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

@Service(`exp.operand.eval.async.${OperandType.Switch}`)
export class SwitchAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new SwitchAsyncEvaluator(operand)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Func}`)
export class FuncAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Try}`)
export class TryAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Catch}`)
export class CatchAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.async.${OperandType.Throw}`)
export class ThrowAsyncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}
