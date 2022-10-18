
import { Operand, OperandType, IOperandFactory, IModelManager } from '../contract'
import { typeHelper } from '.'
import {
	ConstEvaluator, VarEvaluator, EnvEvaluator, TemplateEvaluator, PropertyEvaluator,
	ListEvaluator, ObjEvaluator, OperatorEvaluator, CallFuncEvaluator, BlockEvaluator, IfEvaluator, WhileEvaluator,
	ForEvaluator, ForInEvaluator, SwitchEvaluator, BreakEvaluator, ContinueEvaluator, FuncEvaluator, ReturnEvaluator,
	TryEvaluator, CatchEvaluator, ThrowEvaluator
} from './evaluators'
import {
	PropertyProcessEvaluator, ListProcessEvaluator, ObjProcessEvaluator, OperatorProcessEvaluator,
	CallFuncProcessEvaluator, BlockProcessEvaluator, IfProcessEvaluator, WhileProcessEvaluator, ForProcessEvaluator,
	ForInProcessEvaluator, SwitchProcessEvaluator, FuncProcessEvaluator,
	TryProcessEvaluator, CatchProcessEvaluator, ThrowProcessEvaluator, StackEvaluator
} from './processEvaluators'

export class ConstBuilder {
	public build (id:string, value:any): Operand {
		const operand = new Operand(OperandType.Const, id, value, [], typeHelper.getType(value))
		operand.evaluator = new ConstEvaluator(operand)
		return operand
	}
}

export class OperandFactory implements IOperandFactory {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly model: IModelManager) { }
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
			operand = new Operand(type, id, name, [], 'string')
			operand.evaluator = new EnvEvaluator(operand)
			break
		case OperandType.Template:
			operand = new Operand(type, id, name, [], 'string')
			operand.evaluator = new TemplateEvaluator(operand)
			break
		case OperandType.Property:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new PropertyEvaluator(operand)
			break
		case OperandType.KeyVal:
			operand = new Operand(type, id, name, children)
			// // TODO: Evaluar si es necesario
			// operand.property = name
			// operand.evaluator = new KeyValEvaluator(operand)
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
			operand = new Operand(type, id, name, children)
			operand.evaluator = new OperatorEvaluator(operand, this.model)
			break
		case OperandType.CallFunc:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new CallFuncEvaluator(operand, this.model)
			break
		case OperandType.Arrow:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new CallFuncEvaluator(operand, this.model)
			break
		case OperandType.ChildFunc:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new CallFuncEvaluator(operand, this.model)
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

export class ProcessOperandFactory implements IOperandFactory {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly model: IModelManager) { }
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
			operand = new Operand(type, id, name, [], 'string')
			operand.evaluator = new EnvEvaluator(operand)
			break
		case OperandType.Template:
			operand = new Operand(type, id, name, [], 'string')
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
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new OperatorProcessEvaluator(operand, this.model))
			break
		case OperandType.CallFunc:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new CallFuncProcessEvaluator(operand, this.model))
			break
		case OperandType.Arrow:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new CallFuncProcessEvaluator(operand, this.model))
			break
		case OperandType.ChildFunc:
			operand = new Operand(type, id, name, children)
			operand.evaluator = new StackEvaluator(operand, new CallFuncProcessEvaluator(operand, this.model))
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
