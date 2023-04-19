import { IOperandNormalizer, IOperandReducer,IExpressionNormalize, IExpressionParse, IModelService
} from '../../../../domain'
import { OperandBuilder} from './operandBuilder'
import {ProcessEvaluatorFactory} from './factory/process/factory'


export class ProcessOperandBuilder  extends OperandBuilder {

	public constructor (
		expressionNormalize: IExpressionNormalize,
		expressionParse: IExpressionParse,
		normalizer:IOperandNormalizer,
		reducer:IOperandReducer,
		model:IModelService		
	) {
		super(expressionNormalize,expressionParse,normalizer,reducer,new ProcessEvaluatorFactory(model))
	}

	public get key(): string {
		return 'process'
	}
}
