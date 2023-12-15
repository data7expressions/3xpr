import { h3lp } from 'h3lp'
import { Evaluator, EvaluatorBuilder, EvaluatorFactory } from '../../domain'
import { Operand, OperandType, Context, Step, IEvaluator } from '../../../shared/domain'
import { ConstEvaluator, VarEvaluator, EnvEvaluator, TemplateEvaluator, NotImplementedEvaluator } from './expression'
import { ModelService } from '../../../model/domain'
import { EvaluatorFactoryImpl } from '../../application'
class ConstTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ConstEvaluator(operand)
	}
}

class VarTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new VarEvaluator(operand)
	}
}

class EnvTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new EnvEvaluator(operand)
	}
}

class TemplateTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new TemplateEvaluator(operand)
	}
}

class BreakTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class ContinueTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class ReturnTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class PropertyTaskEvaluator extends Evaluator {
	public eval (context: Context): any {
		const value = this.operand.children[0].eval(context)
		if (value === undefined || value === null) return null
		return h3lp.obj.getValue(value, this.operand.name)
	}

	public async evalAsync (context: Context): Promise<any> {
		return Promise.resolve(this.eval(context))
	}
}

class PropertyTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new PropertyTaskEvaluator(operand)
	}
}

abstract class TaskEvaluator implements IEvaluator {
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

	public async evalAsync (context: Context): Promise<any> {
		return Promise.resolve(this.eval(context))
	}
}
class StackEvaluator extends Evaluator {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly operand: Operand, private readonly child:TaskEvaluator) {
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

	public async evalAsync (context: Context): Promise<any> {
		return Promise.resolve(this.eval(context))
	}
}

class ListTaskEvaluator extends TaskEvaluator {
	public eval (context: Context, step?:Step): any {
		return this.solveChildren(context, step)
	}
}

class ListTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ListTaskEvaluator(operand)
	}
}
class ObjTaskEvaluator extends TaskEvaluator {
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

class ObjTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ObjTaskEvaluator(operand)
	}
}

class CallFuncTaskEvaluator extends TaskEvaluator {
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

class OperatorTaskEvaluatorBuilder implements EvaluatorBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService) {}

	build (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getOperator(operand.name, operand.children.length)
		if (operatorMetadata.custom) {
			// En el caso custom no sera posible acceder a la pila
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new StackEvaluator(operand, new CallFuncTaskEvaluator(operand, operatorMetadata.function))
		} else {
			throw new Error(`Function ${name} not implemented`)
		}
	}
}

class FunctionTaskEvaluatorBuilder implements EvaluatorBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService) {}

	build (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getFunction(operand.name)
		if (operatorMetadata.custom) {
			// En el caso custom no sera posible acceder a la pila
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new StackEvaluator(operand, new CallFuncTaskEvaluator(operand, operatorMetadata.function))
		} else {
			throw new Error(`Function ${name} not implemented`)
		}
	}
}

class ChildFuncTaskEvaluatorBuilder extends FunctionTaskEvaluatorBuilder {}
class ArrowTaskEvaluatorBuilder extends FunctionTaskEvaluatorBuilder {}

class BlockTaskEvaluator extends TaskEvaluator {
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

class BlockTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new BlockTaskEvaluator(operand)
	}
}

class IfTaskEvaluator extends TaskEvaluator {
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

class IfTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new IfTaskEvaluator(operand)
	}
}

class WhileTaskEvaluator extends TaskEvaluator {
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

class WhileTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new WhileTaskEvaluator(operand)
	}
}
class ForTaskEvaluator extends TaskEvaluator {
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

class ForTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ForTaskEvaluator(operand)
	}
}

class ForInTaskEvaluator extends TaskEvaluator {
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

class ForInTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ForInTaskEvaluator(operand)
	}
}

class SwitchTaskEvaluator extends TaskEvaluator {
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

class SwitchTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new SwitchTaskEvaluator(operand)
	}
}

class FuncTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class TryTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class CatchTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class ThrowTaskEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

export class TaskEvaluatorFactoryBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService) {}

	public build (): EvaluatorFactory {
		return new EvaluatorFactoryImpl()
			.add(OperandType.Const, new ConstTaskEvaluatorBuilder())
			.add(OperandType.Var, new VarTaskEvaluatorBuilder())
			.add(OperandType.Operator, new OperatorTaskEvaluatorBuilder(this.model))
			.add(OperandType.CallFunc, new FunctionTaskEvaluatorBuilder(this.model))
			.add(OperandType.ChildFunc, new ChildFuncTaskEvaluatorBuilder(this.model))
			.add(OperandType.Arrow, new ArrowTaskEvaluatorBuilder(this.model))
			.add(OperandType.Env, new EnvTaskEvaluatorBuilder())
			.add(OperandType.Template, new TemplateTaskEvaluatorBuilder())
			.add(OperandType.Property, new PropertyTaskEvaluatorBuilder())
			.add(OperandType.List, new ListTaskEvaluatorBuilder())
			.add(OperandType.Obj, new ObjTaskEvaluatorBuilder())
			// .add(OperandType.KeyVal, new KeyValEvaluatorBuilder())
			.add(OperandType.Block, new BlockTaskEvaluatorBuilder())
			.add(OperandType.If, new IfTaskEvaluatorBuilder())
			// .add(OperandType.Else, new ElseEvaluatorBuilder())
			// .add(OperandType.ElseIf, new ElseIfEvaluatorBuilder())
			.add(OperandType.Switch, new SwitchTaskEvaluatorBuilder())
			.add(OperandType.While, new WhileTaskEvaluatorBuilder())
			.add(OperandType.For, new ForTaskEvaluatorBuilder())
			.add(OperandType.ForIn, new ForInTaskEvaluatorBuilder())
			.add(OperandType.Break, new BreakTaskEvaluatorBuilder())
			.add(OperandType.Continue, new ContinueTaskEvaluatorBuilder())
			.add(OperandType.Func, new FuncTaskEvaluatorBuilder())
			.add(OperandType.Return, new ReturnTaskEvaluatorBuilder())
			.add(OperandType.Try, new TryTaskEvaluatorBuilder())
			.add(OperandType.Catch, new CatchTaskEvaluatorBuilder())
			.add(OperandType.Throw, new ThrowTaskEvaluatorBuilder())
			// .add(OperandType.Default, new DefaultEvaluatorBuilder())
			// .add(OperandType.Case, new CaseTaskEvaluatorBuilder())
	}
}
