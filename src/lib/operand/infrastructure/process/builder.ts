import { OperandBuilder } from '../../application/useCases/build'
import { EvaluatorFactory } from '../../application/services/factory'

export class ProcessOperandBuilder extends OperandBuilder {
	constructor () {
		super(new EvaluatorFactory('exp.operand.process.evaluator.builder'))
	}
}
