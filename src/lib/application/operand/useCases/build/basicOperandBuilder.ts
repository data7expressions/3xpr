import { IOperandNormalizer, IOperandReducer,IExpressionNormalize, IExpressionParse, IModelService
} from '../../../../domain'
import { OperandBuilder} from './operandBuilder'
import {EvaluatorFactory } from './factory/basic/factory'


export class BasicOperandBuilder  extends OperandBuilder {
	
	public constructor (
		expressionNormalize: IExpressionNormalize,
		expressionParse: IExpressionParse,
		normalizer:IOperandNormalizer,
		reducer:IOperandReducer,
		model:IModelService		
	) {
		super(expressionNormalize,expressionParse,normalizer,reducer,new EvaluatorFactory(model))
	}

	public get key(): string {
		return 'basic'
	}

	
}
