
import { Node } from '../parser/index'
import { OperatorType, Context, Operand, IOperandBuilder, IModelManager } from '../model'
import {
	Const, Var, KeyVal, List, Obj, Operator, FuncRef, Block, Arrow, ChildFunc,
	If, ElseIf, Else, While, For, ForIn, Switch, Break, Continue, Func, Return, Try, Catch, Throw, Case, Default,
	Template, Property, Env
} from './operands'

export class OperandBuilder implements IOperandBuilder {
	private model: IModelManager
	constructor (model: IModelManager) {
		this.model = model
	}

	public build (node: Node): Operand {
		const operand = this.nodeToOperand(node)
		const reduced = this.reduce(operand)
		return reduced
		// return this.setParent(reduced)
	}

	private reduce (operand: Operand): Operand {
		if (operand instanceof Operator) {
			return this.reduceOperand(operand)
		} else if (operand instanceof FuncRef) {
			// Example: .[0].states.filter() where function name is states.filter
			const names = operand.name.split('.')
			const funcName = names[names.length - 1]
			const funcMetadata = this.model.getFunction(funcName)
			if (funcMetadata && funcMetadata.deterministic) {
				return this.reduceOperand(operand)
			}
		}
		return operand
	}

	private reduceOperand (operand: Operand): Operand {
		let allConstants = true
		for (const k in operand.children) {
			const p = operand.children[k]
			if (!(p instanceof Const)) {
				allConstants = false
				break
			}
		}
		if (allConstants) {
			const value = operand.eval(new Context())
			const constant = new Const(value)
			constant.index = operand.index
			return constant
		} else {
			for (let i = 0; i < operand.children.length; i++) {
				const p = operand.children[i]
				operand.children[i] = this.reduce(p)
			}
		}
		return operand
	}

	private nodeToOperand (node: Node): Operand {
		const children: Operand[] = []
		if (node.children) {
			for (const p of node.children) {
				const child = this.nodeToOperand(p)
				children.push(child)
			}
		}
		const operand = this.createOperand(node.name, node.type, children)
		for (let i = 0; i < children.length; i++) {
			const child = children[i]
			// child.parent = operand
			child.index = i
		}
		return operand
	}

	public createOperand (name: string, type:string, children: Operand[]): Operand {
		switch (type) {
		case OperatorType.Const:
			return new Const(name)
		case OperatorType.Var:
			return new Var(name)
		case OperatorType.Env:
			return new Env(name)
		case OperatorType.Property:
			return new Property(name, children)
		case OperatorType.Template:
			return new Template(name)
		case OperatorType.KeyVal:
			return new KeyVal(name, children, name)
		case OperatorType.List:
			return new List(name, children)
		case OperatorType.Obj:
			return new Obj(name, children)
		case OperatorType.Operator:
			return new Operator(name, children, this.model)
		case OperatorType.FuncRef:
			return new FuncRef(name, children, this.model)
		case OperatorType.Arrow:
			return new Arrow(name, children, this.model)
		case OperatorType.ChildFunc:
			return new ChildFunc(name, children, this.model)
		case OperatorType.Block:
			return new Block(name, children)
		case OperatorType.If:
			return new If(name, children)
		case OperatorType.ElseIf:
			return new ElseIf(name, children)
		case OperatorType.Else:
			return new Else(name, children)
		case OperatorType.While:
			return new While(name, children)
		case OperatorType.For:
			return new For(name, children)
		case OperatorType.ForIn:
			return new ForIn(name, children)
		case OperatorType.Switch:
			return new Switch(name, children)
		case OperatorType.Case:
			return new Case(name, children)
		case OperatorType.Default:
			return new Default(name, children)
		case OperatorType.Break:
			return new Break(name, children)
		case OperatorType.Continue:
			return new Continue(name, children)
		case OperatorType.Func:
			return new Func(name, children)
		case OperatorType.Return:
			return new Return(name, children)
		case OperatorType.Try:
			return new Try(name, children)
		case OperatorType.Catch:
			return new Catch(name, children)
		case OperatorType.Throw:
			return new Throw(name, children)
		default:
			throw new Error('node name: ' + name + ' type: ' + type + ' not supported')
		}
	}
}
