
import { IEvaluatorFactory, EvaluatorBuilder } from '../../../../../domain'
import { Operand, IEvaluator } from '../../../../../../shared/domain'
import { Factory } from 'h3lp'

export class EvaluatorFactory implements IEvaluatorFactory {
	private _evaluators: any
	private get evaluators ():any {
		if (this._evaluators === undefined) {
			this._evaluators = Factory.get('exp.operand.basic.evaluator.builder')
		}
		return this._evaluators
	}

	public create (operand:Operand): IEvaluator|undefined {
		const evaluatorBuilder = this.evaluators[operand.type] as EvaluatorBuilder
		if (evaluatorBuilder === undefined) {
			throw new Error(`Evaluator for ${operand.type} ${operand.name} not found`)
		}
		return evaluatorBuilder.build(operand)
	}
}
