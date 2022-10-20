
import { Operand, Type, OperandType, IOperandFactory, IModelManager } from '../contract'
import { VarEvaluator, EnvEvaluator, TemplateEvaluator, BreakEvaluator, ContinueEvaluator, ReturnEvaluator, ConstBuilder } from '../operand'
import {
	PropertyProcessEvaluator, ListProcessEvaluator, ObjProcessEvaluator,
	CallFuncProcessEvaluator, BlockProcessEvaluator, IfProcessEvaluator, WhileProcessEvaluator, ForProcessEvaluator,
	ForInProcessEvaluator, SwitchProcessEvaluator, FuncProcessEvaluator,
	TryProcessEvaluator, CatchProcessEvaluator, ThrowProcessEvaluator, StackEvaluator
} from './evaluators'

export class ProcessOperandFactory implements IOperandFactory {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly model: IModelManager) { }

	protected createOperator (type:OperandType, id:string, name: string, children: Operand[] = []): Operand {
		const operand = new Operand(type, id, name, children)
		const operatorMetadata = this.model.getOperator(name, children.length)
		if (operatorMetadata.custom) {
			// En el caso custom no sera posible acceder a la pila
			operand.evaluator = operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			operand.evaluator = new StackEvaluator(operand, new CallFuncProcessEvaluator(operand, operatorMetadata.function))
		} else {
			throw new Error(`Function ${name} not implemented`)
		}
		return operand
	}

	protected createFunction (type:OperandType, id:string, name: string, children: Operand[] = []): Operand {
		const operand = new Operand(type, id, name, children)
		const operatorMetadata = this.model.getFunction(name)
		if (operatorMetadata.custom) {
			// En el caso custom no sera posible acceder a la pila
			operand.evaluator = operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			operand.evaluator = new StackEvaluator(operand, new CallFuncProcessEvaluator(operand, operatorMetadata.function))
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
		case OperandType.KeyVal:
			operand = new Operand(type, id, name, children)
			// // TODO: Evaluar si es necesario
			// operand.property = name
			// operand.evaluator = new KeyValEvaluator(operand)
			break
		case OperandType.Property:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new PropertyProcessEvaluator(operand)
			break
		case OperandType.List:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new ListProcessEvaluator(operand))
			break
		case OperandType.Obj:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new ObjProcessEvaluator(operand))
			break
		case OperandType.Operator:
			operand = this.createOperator(type, id, name, children)
			break
		case OperandType.CallFunc:
		case OperandType.Arrow:
		case OperandType.ChildFunc:
			operand = this.createFunction(type, id, name, children)
			break
		case OperandType.Block:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new BlockProcessEvaluator(operand))
			break
		case OperandType.If:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new IfProcessEvaluator(operand))
			break
		case OperandType.ElseIf:
			operand = new Operand(type, id, name, children)
			break
		case OperandType.Else:
			operand = new Operand(type, id, name, children)
			break
		case OperandType.While:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new WhileProcessEvaluator(operand))
			break
		case OperandType.For:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new ForProcessEvaluator(operand))
			break
		case OperandType.ForIn:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new ForInProcessEvaluator(operand))
			break
		case OperandType.Switch:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new SwitchProcessEvaluator(operand))
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
			operand.evaluator = new FuncProcessEvaluator(operand)
			break
		case OperandType.Return:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new ReturnEvaluator(operand)
			break
		case OperandType.Try:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new TryProcessEvaluator(operand)
			break
		case OperandType.Catch:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new CatchProcessEvaluator(operand)
			break
		case OperandType.Throw:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new ThrowProcessEvaluator(operand)
			break
		default:
			throw new Error('node name: ' + name + ' type: ' + type + ' not supported')
		}
		return operand
	}
}
