import { EvaluatorBuilder, EvaluatorFactory } from '../../domain'
import { Operand, IEvaluator } from '../../../shared/domain'

export class EvaluatorFactoryImpl implements EvaluatorFactory {
	private evaluators: any
	constructor () {
		this.evaluators = {}
	}

	public add (key:string, evaluator:EvaluatorBuilder):EvaluatorFactory {
		this.evaluators[key] = evaluator
		return this
	}

	public get (key:string):EvaluatorBuilder|undefined {
		return this.evaluators[key] as EvaluatorBuilder
	}

	public create (operand:Operand): IEvaluator|undefined {
		const evaluatorBuilder = this.get(operand.type)
		if (evaluatorBuilder === undefined) {
			throw new Error(`Evaluator for ${operand.type} ${operand.name} not found`)
		}
		return evaluatorBuilder.build(operand)
	}
}
