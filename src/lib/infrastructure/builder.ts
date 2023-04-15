import { IExpressions, IBuilder } from '../domain'
import {
	ModelService, TypeService, ParameterService, CoreLibrary, EvaluatorFactory, OperandReducer,
	OperandNormalizer, OperandBuilder, ProcessOperandFactory, Expressions
} from '../application'

// eslint-disable-next-line no-use-before-define
export class ExpressionsBuilder implements IBuilder<IExpressions> {
	public build ():IExpressions {
		const model = new ModelService()
		const typeManager = new TypeService(model)
		const parameterManager = new ParameterService()
		const normalizer = new OperandNormalizer(model)
		const reducer = new OperandReducer(model)
		const basic = new OperandBuilder(model, normalizer, reducer, new EvaluatorFactory(model))
		const process = new OperandBuilder(model, normalizer, reducer, new ProcessOperandFactory(model))
		new CoreLibrary(model, basic).load()
		return new Expressions(model, basic, process, typeManager, parameterManager)
	}
}
