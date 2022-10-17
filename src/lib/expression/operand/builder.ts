/* eslint-disable no-case-declarations */
import { Parser, nodeHelper } from '../parser'
import { Context, Operand, Node, OperatorType, IOperandBuilder, IModelManager, OperandFactory, ISerializer } from '../contract'
import { Const, Operator, CallFunc } from './operands'
import { OperandSerializer } from '.'
// import { operandHelper } from './helper'

export class OperandBuilder implements IOperandBuilder {
	private model: IModelManager
	private factory: OperandFactory
	private serializer: ISerializer<Operand>
	constructor (model: IModelManager, factory: OperandFactory) {
		this.model = model
		this.factory = factory
		this.serializer = new OperandSerializer(this.factory)
	}

	public build (expression: string[]): Operand {
		const parser = new Parser(this.model, expression)
		const node = parser.parse()
		nodeHelper.clear(node)
		const operand = this.nodeToOperand(node, 1)
		const reduced = this.reduce(operand)
		// operandHelper.setStackAble(reduced)
		return reduced
	}

	public clone (operand: Operand): Operand {
		return this.serializer.clone(operand)
	}

	public serialize (operand: Operand): string {
		return this.serializer.serialize(operand)
	}

	public deserialize (value: string): Operand {
		return this.serializer.deserialize(value)
	}

	private reduce (operand: Operand): Operand {
		if (operand instanceof Operator) {
			return this.reduceOperand(operand)
		} else if (operand instanceof CallFunc) {
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
			const constant = this.factory.create(operand.id, value, OperatorType.Const)
			return constant
		} else {
			for (let i = 0; i < operand.children.length; i++) {
				const p = operand.children[i]
				operand.children[i] = this.reduce(p)
			}
		}
		return operand
	}

	private nodeToOperand (node: Node, index:number, parentId?:string): Operand {
		const id = parentId ? parentId + '.' + index : index.toString()
		const children: Operand[] = []
		if (node.children) {
			for (let i = 0; i < node.children.length; i++) {
				const childNode = node.children[i]
				const child = this.nodeToOperand(childNode, i + 1, id)
				children.push(child)
			}
		}
		const operand = this.factory.create(id, node.name, node.type, children)
		return operand
	}
}
