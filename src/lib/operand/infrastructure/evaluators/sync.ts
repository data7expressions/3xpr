import { Autowired, h3lp, IReplacer, Service } from 'h3lp'
import { Context, OperandType, Operand, IEvaluator } from '../../../shared/domain'
import { Evaluator, EvaluatorBuilder } from '../../domain'
import { IModelService } from '../../../model/domain'
import { Primitive } from 'typ3s'

export class ConstEvaluator extends Evaluator {
	public eval (): any {
		if (this.operand.returnType === undefined) {
			return this.operand.name
		}
		switch (this.operand.returnType.primitive) {
		case Primitive.string:
			return this.operand.name
		case Primitive.boolean:
			return Boolean(this.operand.name)
		case Primitive.integer:
		case Primitive.decimal:
			return parseFloat(this.operand.name)
		default:
			return this.operand.name
		}
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Const}`)
export class ConstEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ConstEvaluator(operand)
	}
}

export class VarEvaluator extends Evaluator {
	public eval (context: Context): any {
		return context.data.get(this.operand.name)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Var}`)
export class VarEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new VarEvaluator(operand)
	}
}

class CallFuncEvaluator extends Evaluator {
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

@Service(`exp.operand.eval.sync.${OperandType.Operator}`)
export class OperatorEvaluatorBuilder implements EvaluatorBuilder {
	@Autowired('exp.model.service')
	private model!: IModelService

	build (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getOperator(operand.name, operand.children.length)
		if (operatorMetadata.custom) {
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new CallFuncEvaluator(operand, operatorMetadata.function)
		} else {
			throw new Error(`Operator ${operand.name} not implemented`)
		}
	}
}

@Service(`exp.operand.eval.sync.${OperandType.CallFunc}`)
export class FunctionEvaluatorBuilder implements EvaluatorBuilder {
	@Autowired('exp.model.service')
	private model!: IModelService

	build (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getFunction(operand.name)
		if (operatorMetadata.custom) {
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new CallFuncEvaluator(operand, operatorMetadata.function)
		} else {
			throw new Error(`Function ${operand.name} not implemented`)
		}
	}
}

@Service(`exp.operand.eval.sync.${OperandType.ChildFunc}`)
export class ChildFuncEvaluatorBuilder extends FunctionEvaluatorBuilder {}

@Service(`exp.operand.eval.sync.${OperandType.Arrow}`)
export class ArrowEvaluatorBuilder extends FunctionEvaluatorBuilder {}

export class EnvEvaluator extends Evaluator {
	public eval (): any {
		return process.env[this.operand.name]
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Env}`)
export class EnvEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new EnvEvaluator(operand)
	}
}

export class TemplateReplacer implements IReplacer {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly context: Context) { }

	replace (match: string): string | undefined {
		let value = process.env[match]
		if (value === undefined && this.context.data) {
			value = this.context.data.get(match)
		}
		return value === undefined ? match : value
	}
}

export class TemplateEvaluator extends Evaluator {
	public eval (context: Context): any {
		return h3lp.utils.template(this.operand.name.toString(), new TemplateReplacer(context))
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Template}`)
export class TemplateEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new TemplateEvaluator(operand)
	}
}

class PropertyEvaluator extends Evaluator {
	public eval (context: Context): any {
		const value = this.operand.children[0].eval(context)
		if (value === undefined || value === null) return null
		return h3lp.obj.getValue(value, this.operand.name)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Property}`)
export class PropertyEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new PropertyEvaluator(operand)
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

@Service(`exp.operand.eval.sync.${OperandType.List}`)
export class ListEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ListEvaluator(operand)
	}
}

class ObjEvaluator extends Evaluator {
	public eval (context: Context): any {
		const obj: { [k: string]: any } = {}
		for (const child of this.operand.children) {
			obj[child.name] = child.children[0].eval(context)
		}
		return obj
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Obj}`)
export class ObjEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ObjEvaluator(operand)
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
@Service(`exp.operand.eval.sync.${OperandType.Block}`)
export class BlockEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new BlockEvaluator(operand)
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

@Service(`exp.operand.eval.sync.${OperandType.If}`)
export class IfEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new IfEvaluator(operand)
	}
}

class SwitchEvaluator extends Evaluator {
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

@Service(`exp.operand.eval.sync.${OperandType.Switch}`)
export class SwitchEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new SwitchEvaluator(operand)
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

@Service(`exp.operand.eval.sync.${OperandType.While}`)
export class WhileEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new WhileEvaluator(operand)
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

@Service(`exp.operand.eval.sync.${OperandType.For}`)
export class ForEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ForEvaluator(operand)
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
			lastValue = block.eval(context)
		}
		return lastValue
	}
}

@Service(`exp.operand.eval.sync.${OperandType.ForIn}`)
export class ForInEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ForInEvaluator(operand)
	}
}

export class NotImplementedEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Break}`)
export class BreakEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Continue}`)
export class ContinueEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Func}`)
export class FuncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Return}`)
export class ReturnEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Try}`)
export class TryEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Catch}`)
export class CatchEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Throw}`)
export class ThrowEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Default}`)
export class DefaultEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Case}`)
export class CaseEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.KeyVal}`)
export class KeyValEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.Else}`)
export class ElseEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

@Service(`exp.operand.eval.sync.${OperandType.ElseIf}`)
export class ElseIfEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}
