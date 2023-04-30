
import { Operand, IEvaluator } from '../../../../../../shared/domain'
import { EvaluatorBuilder, IEvaluatorFactory } from '../../../../../domain'
import { Factory } from 'h3lp'

export class ProcessEvaluatorFactory implements IEvaluatorFactory {
	private _evaluators: any
	private get evaluators ():any {
		if (this._evaluators === undefined) {
			this._evaluators = Factory.get('exp.operand.process.evaluator.builder')
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
