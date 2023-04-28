
import { Operand, OperandType, IEvaluator } from '../../../../../../commons/domain'
import { IModelService } from '../../../../../../model/domain'
import { IEvaluatorFactory } from '../../../../../domain'
import { ConstEvaluator, VarEvaluator, EnvEvaluator, TemplateEvaluator, BreakEvaluator, ContinueEvaluator, ReturnEvaluator } from '../basic/evaluators'
import {
	PropertyProcessEvaluator, ListProcessEvaluator, ObjProcessEvaluator,
	CallFuncProcessEvaluator, BlockProcessEvaluator, IfProcessEvaluator, WhileProcessEvaluator, ForProcessEvaluator,
	ForInProcessEvaluator, SwitchProcessEvaluator, FuncProcessEvaluator,
	TryProcessEvaluator, CatchProcessEvaluator, ThrowProcessEvaluator, StackEvaluator
} from './evaluators'
import { Autowired } from 'h3lp'

export class ProcessEvaluatorFactory implements IEvaluatorFactory {
	@Autowired('exp.model.service')
	private model!: IModelService

	protected createOperator (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getOperator(operand.name, operand.children.length)
		if (operatorMetadata.custom) {
			// En el caso custom no sera posible acceder a la pila
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new StackEvaluator(operand, new CallFuncProcessEvaluator(operand, operatorMetadata.function))
		} else {
			throw new Error(`Function ${name} not implemented`)
		}
	}

	protected createFunction (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getFunction(operand.name)
		if (operatorMetadata.custom) {
			// En el caso custom no sera posible acceder a la pila
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new StackEvaluator(operand, new CallFuncProcessEvaluator(operand, operatorMetadata.function))
		} else {
			throw new Error(`Function ${name} not implemented`)
		}
	}

	public create (operand:Operand): IEvaluator|undefined {
		let evaluator:IEvaluator | undefined
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
			evaluator = new PropertyProcessEvaluator(operand)
			break
		case OperandType.List:
			evaluator = new StackEvaluator(operand, new ListProcessEvaluator(operand))
			break
		case OperandType.Obj:
			evaluator = new StackEvaluator(operand, new ObjProcessEvaluator(operand))
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
			evaluator = new StackEvaluator(operand, new BlockProcessEvaluator(operand))
			break
		case OperandType.If:
			evaluator = new StackEvaluator(operand, new IfProcessEvaluator(operand))
			break
		case OperandType.While:
			evaluator = new StackEvaluator(operand, new WhileProcessEvaluator(operand))
			break
		case OperandType.For:
			evaluator = new StackEvaluator(operand, new ForProcessEvaluator(operand))
			break
		case OperandType.ForIn:
			evaluator = new StackEvaluator(operand, new ForInProcessEvaluator(operand))
			break
		case OperandType.Switch:
			evaluator = new StackEvaluator(operand, new SwitchProcessEvaluator(operand))
			break
		case OperandType.Break:
			evaluator = new BreakEvaluator(operand)
			break
		case OperandType.Continue:
			evaluator = new ContinueEvaluator(operand)
			break
		case OperandType.Func:
			evaluator = new FuncProcessEvaluator(operand)
			break
		case OperandType.Return:
			evaluator = new ReturnEvaluator(operand)
			break
		case OperandType.Try:
			evaluator = new TryProcessEvaluator(operand)
			break
		case OperandType.Catch:
			evaluator = new CatchProcessEvaluator(operand)
			break
		case OperandType.Throw:
			evaluator = new ThrowProcessEvaluator(operand)
			break
		case OperandType.Default:
		case OperandType.Case:
		case OperandType.KeyVal:
		case OperandType.ElseIf:
		case OperandType.Else:
			break
		default:
			throw new Error(`Process evaluator for ${operand.type} ${operand.name} not found`)
		}
		return evaluator
	}
}
