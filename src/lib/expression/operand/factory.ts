
import { Operand, OperandType, IOperandFactory, IModelManager, Type } from '../contract'
import {
	ConstEvaluator, VarEvaluator, EnvEvaluator, TemplateEvaluator, PropertyEvaluator,
	ListEvaluator, ObjEvaluator, BlockEvaluator, IfEvaluator, WhileEvaluator,
	ForEvaluator, ForInEvaluator, SwitchEvaluator, BreakEvaluator, ContinueEvaluator, FuncEvaluator, ReturnEvaluator,
	TryEvaluator, CatchEvaluator, ThrowEvaluator, CallFuncEvaluator
} from './evaluators'

export class ConstBuilder {
	public build (id:string, value:any): Operand {
		const operand = new Operand(OperandType.Const, id, value, [], Type.get(value))
		operand.evaluator = new ConstEvaluator(operand)
		return operand
	}
}

export class OperandFactory implements IOperandFactory {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly model: IModelManager) { }

	protected createOperand (type:OperandType, id:string, name: string, children: Operand[] = []): Operand {
		const operand = new Operand(type, id, name, children)
		const operatorMetadata = this.model.getOperator(name, children.length)
		if (operatorMetadata.custom) {
			operand.evaluator = operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			operand.evaluator = new CallFuncEvaluator(operand, operatorMetadata.function)
		} else {
			throw new Error(`Function ${name} not implemented`)
		}
		return operand
	}

	protected createFunction (type:OperandType, id:string, name: string, children: Operand[] = []): Operand {
		const operand = new Operand(type, id, name, children)
		const operatorMetadata = this.model.getFunction(name)
		if (operatorMetadata.custom) {
			operand.evaluator = operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			operand.evaluator = new CallFuncEvaluator(operand, operatorMetadata.function)
		} else {
			throw new Error(`Function ${name} not implemented`)
		}
		return operand
	}

	public create (type:OperandType, id:string, name: string, children: Operand[] = []): Operand {
		let operand:Operand | undefined
		switch (type) {
		case OperandType.Const:
			operand = new ConstBuilder().build(id, name)
			break
		case OperandType.Var:
			operand = new Operand(type, id, name)
			operand.evaluator = new VarEvaluator(operand)
			break
		case OperandType.Env:
			operand = new Operand(type, id, name, [], Type.string)
			operand.evaluator = new EnvEvaluator(operand)
			break
		case OperandType.Template:
			operand = new Operand(type, id, name, [], Type.string)
			operand.evaluator = new TemplateEvaluator(operand)
			break
		case OperandType.Property:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new PropertyEvaluator(operand)
			break
		case OperandType.KeyVal:
			operand = new Operand(type, id, name, children)
			break
		case OperandType.List:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new ListEvaluator(operand)
			break
		case OperandType.Obj:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new ObjEvaluator(operand)
			break
		case OperandType.Operator:
			operand = this.createOperand(type, id, name, children)
			break
		case OperandType.CallFunc:
		case OperandType.Arrow:
		case OperandType.ChildFunc:
			operand = this.createFunction(type, id, name, children)
			break
		case OperandType.Block:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new BlockEvaluator(operand)
			break
		case OperandType.If:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new IfEvaluator(operand)
			break
		case OperandType.ElseIf:
			operand = new Operand(type, id, name, children)
			break
		case OperandType.Else:
			operand = new Operand(type, id, name, children)
			break
		case OperandType.While:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new WhileEvaluator(operand)
			break
		case OperandType.For:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new ForEvaluator(operand)
			break
		case OperandType.ForIn:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new ForInEvaluator(operand)
			break
		case OperandType.Switch:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new SwitchEvaluator(operand)
			break
		case OperandType.Case:
			operand = new Operand(type, id, name, children)
			break
		case OperandType.Default:
			operand = new Operand(type, id, name, children)
			break
		case OperandType.Break:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new BreakEvaluator(operand)
			break
		case OperandType.Continue:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new ContinueEvaluator(operand)
			break
		case OperandType.Func:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new FuncEvaluator(operand)
			break
		case OperandType.Return:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new ReturnEvaluator(operand)
			break
		case OperandType.Try:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new TryEvaluator(operand)
			break
		case OperandType.Catch:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new CatchEvaluator(operand)
			break
		case OperandType.Throw:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new ThrowEvaluator(operand)
			break
		default:
			throw new Error('node name: ' + name + ' type: ' + type + ' not supported')
		}
		return operand
	}
}
