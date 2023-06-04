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
import { H3lp, MemoryCache } from 'h3lp'
import { OperandFacadeImpl } from '../application'

export class OperandFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService, private readonly h3lp:H3lp) {}

	public build ():OperandFacade {
		const constBuilder = new ConstBuilderImpl()
		const syncEvaluatorFactory = new SyncEvaluatorFactoryBuilder(this.model).build()
		const asyncEvaluatorFactory = new SyncEvaluatorFactoryBuilder(this.model).build()
		const operandClone = new OperandClone()
		const parameterService = new ParameterServiceImpl()
		const operandSerializer = new OperandSerializerImpl()
		const operandBuild = new OperandBuild()
			.add('sync',
				new OperandBuilderCacheDecorator(
					new OperandBuilderImpl(syncEvaluatorFactory, this.model, constBuilder),
					new MemoryCache<string, string>(),
					operandSerializer, this.h3lp.utils))
			.add('async', new OperandBuilderCacheDecorator(
				new OperandBuilderImpl(asyncEvaluatorFactory, this.model, constBuilder),
				new MemoryCache<string, string>(),
				operandSerializer, this.h3lp.utils))

		return new OperandFacadeImpl(constBuilder, parameterService, operandBuild, operandClone)
	}
}
