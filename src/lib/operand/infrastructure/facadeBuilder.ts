import { ModelService } from '../../model/domain'
import { OperandFacade } from '../domain'
import { OperandBuilderImpl } from '../application/services/builder'
import { OperandBuilderCacheDecorator } from '../application/services/builderCacheDecorator'
import { ParameterServiceImpl } from '../application/services/parameterService'
import { OperandSerializerImpl } from '../application/services/serializer'
import { OperandBuild } from '../application/useCases/build'
import { OperandClone } from '../application/useCases/clone'
import { ConstBuilderImpl } from './constBuilder'
import { SyncEvaluatorFactoryBuilder } from './evaluators/sync'
import { AsyncEvaluatorFactoryBuilder } from './evaluators/async'
import { MemoryCache } from 'h3lp'
import { OperandFacadeImpl } from '../application'

export class OperandFacadeBuilder {
	public build (model: ModelService):OperandFacade {
		const constBuilder = new ConstBuilderImpl()
		const operandClone = new OperandClone()
		const parameterService = new ParameterServiceImpl()
		const operandSerializer = new OperandSerializerImpl()
		const operandBuild = new OperandBuild()
			.add('sync',
				new OperandBuilderCacheDecorator(
					new OperandBuilderImpl(new SyncEvaluatorFactoryBuilder(model).build(), model, constBuilder),
					new MemoryCache<string, string>(),
					operandSerializer))
			.add('async', new OperandBuilderCacheDecorator(
				new OperandBuilderImpl(new AsyncEvaluatorFactoryBuilder(model).build(), model, constBuilder),
				new MemoryCache<string, string>(),
				operandSerializer))

		return new OperandFacadeImpl(constBuilder, parameterService, operandBuild, operandClone)
	}
}
