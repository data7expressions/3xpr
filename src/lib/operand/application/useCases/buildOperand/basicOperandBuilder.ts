import { IModelService } from '../../../../model/domain'
import { OperandBuilder } from './operandBuilder'
import { EvaluatorFactory } from './factory/basic/factory'

export class BasicOperandBuilder extends OperandBuilder {
	public constructor (model:IModelService) {
		super(new EvaluatorFactory(model), model)
	}

	public get key (): string {
		return 'basic'
	}
}
