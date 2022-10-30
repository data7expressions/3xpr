/* eslint-disable no-case-declarations */
import { Context, Operand, OperandType, IOperandBuilder, IModelManager, IEvaluatorFactory } from '../contract'
import { Parser } from './parser'
import { ConstBuilder } from './factory'

export class OperandBuilder implements IOperandBuilder {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly model: IModelManager, private readonly factory: IEvaluatorFactory) {}

	public build (expression: string): Operand {
		const operand = new Parser(this.model, expression).parse()
		this.complete(operand)
		const reduced = this.reduce(operand)
		return reduced
	}

	public clone (source: Operand): Operand {
		const children: Operand[] = []
		for (const child of source.children) {
			children.push(this.clone(child))
		}
		const target = new Operand(source.pos, source.name, source.type, children, source.returnType)
		target.id = source.id
		target.evaluator = this.factory.create(target)
		return target
	}

	private reduce (operand: Operand): Operand {
		if (operand.type === OperandType.Operator) {
			return this.reduceOperand(operand)
		} else if (operand.type === OperandType.CallFunc) {
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
		for (const child of operand.children) {
			if (!(child.type === OperandType.Const)) {
				allConstants = false
				break
			}
		}
		if (allConstants) {
			const value = operand.eval(new Context())
			const constant = new ConstBuilder().build(operand.pos, value)
			constant.id = operand.id
			return constant
		} else {
			for (let i = 0; i < operand.children.length; i++) {
				const child = operand.children[i]
				operand.children[i] = this.reduce(child)
			}
		}
		return operand
	}

	private complete (operand: Operand, index = 0, parentId?:string): void {
		const id = parentId ? parentId + '.' + index : index.toString()
		if (operand.children) {
			for (let i = 0; i < operand.children.length; i++) {
				const child = operand.children[i]
				this.complete(child, i, id)
			}
		}
		operand.id = id
		operand.evaluator = this.factory.create(operand)
	}
}
