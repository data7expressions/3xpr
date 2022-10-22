/* eslint-disable no-case-declarations */
import { Parser } from '../parser'
import { Context, Operand, OperandType, IOperandBuilder, IModelManager, IEvaluatorFactory } from '../contract'
import { ConstBuilder } from './factory'
// import { OperandSerializer } from '.'

export class OperandBuilder implements IOperandBuilder {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly model: IModelManager, private readonly factory: IEvaluatorFactory) {}

	public build (expression: string): Operand {
		const operand = new Parser(this.model, expression).parse()
		this.complete(operand, 1)
		const reduced = this.reduce(operand)
		return reduced
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
		for (const k in operand.children) {
			const p = operand.children[k]
			if (!(p.type === OperandType.Const)) {
				allConstants = false
				break
			}
		}
		if (allConstants) {
			const value = operand.eval(new Context())
			const constant = new ConstBuilder().build(value)
			constant.id = operand.id
			return constant
		} else {
			for (let i = 0; i < operand.children.length; i++) {
				const p = operand.children[i]
				operand.children[i] = this.reduce(p)
			}
		}
		return operand
	}

	private complete (operand: Operand, index:number, parentId?:string): void {
		const id = parentId ? parentId + '.' + index : index.toString()
		if (operand.children) {
			for (let i = 0; i < operand.children.length; i++) {
				const childNode = operand.children[i]
				this.complete(childNode, i + 1, id)
			}
		}
		operand.id = id
		operand.evaluator = this.factory.create(operand)
	}
}
