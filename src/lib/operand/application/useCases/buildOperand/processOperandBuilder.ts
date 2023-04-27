import { OperandBuilder} from './operandBuilder'
import {ProcessEvaluatorFactory} from './factory/process/factory'
import { IModelService} from '../../../../model/domain'

export class ProcessOperandBuilder  extends OperandBuilder {

	public constructor (model:IModelService) {
		super(new ProcessEvaluatorFactory(model),model)
	}

	public get key(): string {
		return 'process'
	}
}
