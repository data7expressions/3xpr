// import { OperandBuilder } from '../../application/services/builder'
import { EvaluatorFactory } from '../../application/services/factory'

// export class ProcessOperandBuilder extends OperandBuilder {
// constructor () {
// super(new EvaluatorFactory('exp.operand.process.evaluator.builder'))
// }
// }

export class ProcessEvaluatorFactory extends EvaluatorFactory {
	constructor () {
		super('exp.operand.process.evaluator.builder')
	}
}
