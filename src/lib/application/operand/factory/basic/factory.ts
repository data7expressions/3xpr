
import { Operand, OperandType, IEvaluator, IEvaluatorFactory, IModelService, Position } from '../../../../domain'
import { Type } from 'json-light'
import {
	ConstEvaluator, VarEvaluator, EnvEvaluator, TemplateEvaluator, PropertyEvaluator,
	ListEvaluator, ObjEvaluator, BlockEvaluator, IfEvaluator, WhileEvaluator,
	ForEvaluator, ForInEvaluator, SwitchEvaluator, BreakEvaluator, ContinueEvaluator, FuncEvaluator, ReturnEvaluator,
	TryEvaluator, CatchEvaluator, ThrowEvaluator, CallFuncEvaluator
} from './evaluators'

export class ConstBuilder {
	public build (pos:Position, value:any): Operand {
		const operand = new Operand(pos, value, OperandType.Const, [], Type.get(value))
		operand.evaluator = new ConstEvaluator(operand)
		return operand
	}
}

export class EvaluatorFactory implements IEvaluatorFactory {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly model: IModelService) { }

	protected createOperator (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getOperator(operand.name, operand.children.length)
		if (operatorMetadata.custom) {
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new CallFuncEvaluator(operand, operatorMetadata.function)
		} else {
			throw new Error(`Operator ${operand.name} not implemented`)
		}
	}

	protected createFunction (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getFunction(operand.name)
		if (operatorMetadata.custom) {
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new CallFuncEvaluator(operand, operatorMetadata.function)
		} else {
			throw new Error(`Function ${operand.name} not implemented`)
		}
	}

	public create (operand:Operand): IEvaluator|undefined {
		let evaluator:IEvaluator|undefined
		switch (operand.type) {
		case OperandType.Const:
			evaluator = new ConstEvaluator(operand)
			break
		case OperandType.Var:
			evaluator = new VarEvaluator(operand)
			break
		case OperandType.Env:
			evaluator = new EnvEvaluator(operand)
			break
		case OperandType.Template:
			evaluator = new TemplateEvaluator(operand)
			break
		case OperandType.Property:
			evaluator = new PropertyEvaluator(operand)
			break
		case OperandType.List:
			evaluator = new ListEvaluator(operand)
			break
		case OperandType.Obj:
			evaluator = new ObjEvaluator(operand)
			break
		case OperandType.Operator:
			evaluator = this.createOperator(operand)
			break
		case OperandType.CallFunc:
		case OperandType.Arrow:
		case OperandType.ChildFunc:
			evaluator = this.createFunction(operand)
			break
		case OperandType.Block:
			evaluator = new BlockEvaluator(operand)
			break
		case OperandType.If:
			evaluator = new IfEvaluator(operand)
			break
		case OperandType.While:
			evaluator = new WhileEvaluator(operand)
			break
		case OperandType.For:
			evaluator = new ForEvaluator(operand)
			break
		case OperandType.ForIn:
			evaluator = new ForInEvaluator(operand)
			break
		case OperandType.Switch:
			evaluator = new SwitchEvaluator(operand)
			break
		case OperandType.Break:
			evaluator = new BreakEvaluator(operand)
			break
		case OperandType.Continue:
			evaluator = new ContinueEvaluator(operand)
			break
		case OperandType.Func:
			evaluator = new FuncEvaluator(operand)
			break
		case OperandType.Return:
			evaluator = new ReturnEvaluator(operand)
			break
		case OperandType.Try:
			evaluator = new TryEvaluator(operand)
			break
		case OperandType.Catch:
			evaluator = new CatchEvaluator(operand)
			break
		case OperandType.Throw:
			evaluator = new ThrowEvaluator(operand)
			break
		case OperandType.Default:
		case OperandType.Case:
		case OperandType.KeyVal:
		case OperandType.ElseIf:
		case OperandType.Else:
			break
		default:
			throw new Error(`Evaluator for ${operand.type} ${operand.name} not found`)
		}
		return evaluator
	}
}
