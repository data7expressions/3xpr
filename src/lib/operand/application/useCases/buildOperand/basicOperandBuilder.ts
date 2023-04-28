import { OperandBuilder } from './operandBuilder'
import { EvaluatorFactory } from './factory/basic/factory'
import { Service } from 'h3lp'
import { IEvaluatorFactory } from 'lib/operand/domain'

@Service('exp.operand.builder.basic')
export class BasicOperandBuilder extends OperandBuilder {
	protected get evaluatorFactory (): IEvaluatorFactory {
		return new EvaluatorFactory()
	}
}
