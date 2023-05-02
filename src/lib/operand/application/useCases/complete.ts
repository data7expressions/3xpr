/* eslint-disable no-case-declarations */
import { Operand } from '../../../shared/domain'
import { EvaluatorFactory } from '..'
import { Autowired } from 'h3lp'

export class OperandComplete {
	@Autowired('exp.operand.eval.factory')
	private factories!:any

	private getFactory (key:string):EvaluatorFactory {
		return this.factories[key] as EvaluatorFactory
	}

	public complete (operand:Operand, type:string): Operand {
		const factory = this.getFactory(type)
		this._complete(operand, factory)
		return operand
	}

	private _complete (operand: Operand, factory:EvaluatorFactory, index = 0, parentId?:string): void {
		const id = parentId ? parentId + '.' + index : index.toString()
		if (operand.children) {
			for (let i = 0; i < operand.children.length; i++) {
				const child = operand.children[i]
				this._complete(child, factory, i, id)
			}
		}
		operand.id = id
		operand.evaluator = factory.create(operand)
	}
}
