
import { Node } from '../parser/index'
import { Context, Operand, IOperandBuilder, IModelManager } from '../model'
import {
	Constant, Variable, KeyValue, List, Obj, Operator, FunctionRef, Block, ArrowFunction, ChildFunction,
	If, ElseIf, Else, While, For, ForIn, Switch, Break, Continue, Function, Return, Try, Catch, Throw, Case, Default,
	Template, Property, EnvironmentVariable
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
		} else if (operand instanceof FunctionRef) {
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
			if (!(p instanceof Constant)) {
				allConstants = false
				break
			}
		}
		if (allConstants) {
			const value = operand.eval(new Context())
			const constant = new Constant(value)
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

	// private setParent (operand: Operand, index = 0, parent?: Operand) {
	// try {
	// if (parent) {
	// operand.id = parent.id + '.' + index
	// operand.index = index
	// operand.level = parent.level ? parent.level + 1 : 0
	// } else {
	// operand.id = '0'
	// // operand.parent = undefined
	// operand.index = 0
	// operand.level = 0
	// }
	// for (let i = 0; i < operand.children.length; i++) {
	// const p = operand.children[i]
	// this.setParent(p, i, operand)
	// }
	// return operand
	// } catch (error: any) {
	// throw new Error('set parent: ' + operand.name + ' error: ' + error.toString())
	// }
	// }

	private nodeToOperand (node: Node): Operand {
		const children: Operand[] = []
		if (node.children) {
			for (const i in node.children) {
				const p = node.children[i]
				const child = this.nodeToOperand(p)
				children.push(child)
			}
		}
		const operand = this.createOperand(node, children)
		for (let i = 0; i < children.length; i++) {
			const child = children[i]
			// child.parent = operand
			child.index = i
		}
		return operand
	}

	private createOperand (node: Node, children: Operand[]): Operand {
		switch (node.type) {
		case 'const':
			return new Constant(node.name)
		case 'var':
			return new Variable(node.name)
		case 'env':
			return new EnvironmentVariable(node.name)
		case 'property':
			return new Property(node.name, children)
		case 'template':
			return new Template(node.name)
		case 'keyVal':
			return new KeyValue(node.name, children, node.name)
		case 'array':
			return new List(node.name, children)
		case 'obj':
			return new Obj(node.name, children)
		case 'operator':
			return new Operator(node.name, children, this.model)
		case 'funcRef':
			return new FunctionRef(node.name, children, this.model)
		case 'arrow':
			return new ArrowFunction(node.name, children, this.model)
		case 'childFunc':
			return new ChildFunction(node.name, children, this.model)
		case 'block':
			return new Block(node.name, children)
		case 'if':
			return new If(node.name, children)
		case 'elseIf':
			return new ElseIf(node.name, children)
		case 'else':
			return new Else(node.name, children)
		case 'while':
			return new While(node.name, children)
		case 'for':
			return new For(node.name, children)
		case 'forIn':
			return new ForIn(node.name, children)
		case 'switch':
			return new Switch(node.name, children)
		case 'case':
			return new Case(node.name, children)
		case 'default':
			return new Default(node.name, children)
		case 'break':
			return new Break(node.name, children)
		case 'continue':
			return new Continue(node.name, children)
		case 'function':
			return new Function(node.name, children)
		case 'return':
			return new Return(node.name, children)
		case 'try':
			return new Try(node.name, children)
		case 'catch':
			return new Catch(node.name, children)
		case 'throw':
			return new Throw(node.name, children)
		default:
			throw new Error('node name: ' + node.name + ' type: ' + node.type + ' not supported')
		}
	}
}
