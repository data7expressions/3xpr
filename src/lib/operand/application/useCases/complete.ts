/* eslint-disable no-case-declarations */
import { EvaluatorFactory } from '../../domain'
import { Operand } from '../../../shared/domain'

export class OperandComplete {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly evaluatorFactory:EvaluatorFactory) {}

	public complete (operand:Operand): Operand {
		this._complete(operand)
		return operand
	}

	private _complete (operand: Operand, index = 0, parentId?:string): void {
		const id = parentId ? parentId + '.' + index : index.toString()
		if (operand.children) {
			for (let i = 0; i < operand.children.length; i++) {
				const child = operand.children[i]
				this._complete(child, i, id)
			}
		}
		operand.id = id
		operand.evaluator = this.evaluatorFactory.create(operand)
	}
}
