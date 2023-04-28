import { OperandBuilder } from './operandBuilder'
import { ProcessEvaluatorFactory } from './factory/process/factory'
import { Service } from 'h3lp'
import { IEvaluatorFactory } from 'lib/operand/domain'
@Service('exp.operand.builder.process')
export class ProcessOperandBuilder extends OperandBuilder {
	protected get evaluatorFactory (): IEvaluatorFactory {
		return new ProcessEvaluatorFactory()
	}
}
