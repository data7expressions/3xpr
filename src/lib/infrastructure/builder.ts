import { IBuilder, Operand } from '../domain'
import { MemoryCache } from 'h3lp'
import { ModelService, TypeService, ParameterService, IExpressions } from '../application'
import { ExpressionsAdapter } from './adapters/expressionsAdapter'

// eslint-disable-next-line no-use-before-define
export class ExpressionsBuilder implements IBuilder<IExpressions> {
	public build ():IExpressions {
		const model = new ModelService()
		const typeManager = new TypeService(model)
		const parameterManager = new ParameterService()
		const cache = new MemoryCache<string, Operand>()
		return new ExpressionsAdapter(model, typeManager, parameterManager, cache)
	}
}
