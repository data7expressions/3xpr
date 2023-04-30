import { OperandBuilder } from '../../application/services/builder'
import { EvaluatorFactory } from '../../application/services/factory'

export class BasicOperandBuilder extends OperandBuilder {
	constructor () {
		super(new EvaluatorFactory('exp.operand.basic.evaluator.builder'))
	}
}
