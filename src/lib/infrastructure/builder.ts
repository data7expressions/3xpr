import { IExpressions, IBuilder, Operand } from '../domain'
import { MemoryCache } from 'h3lp'
import {
	ModelService, TypeService, ParameterService, OperandReducer,
	OperandNormalizer, Expressions, ExpressionParse, ExpressionNormalize
} from '../application'

// eslint-disable-next-line no-use-before-define
export class ExpressionsBuilder implements IBuilder<IExpressions> {
	public build ():IExpressions {
		const model = new ModelService()
		const typeManager = new TypeService(model)
		const parameterManager = new ParameterService()
		const normalizer = new OperandNormalizer(model)
		const reducer = new OperandReducer(model)
		const expressionNormalize = new ExpressionNormalize()
		const expressionParse = new ExpressionParse(model)
		const cache = new MemoryCache<string, Operand>()
		return new Expressions(model, typeManager, parameterManager, expressionNormalize, expressionParse, normalizer, reducer, cache)
	}
}
