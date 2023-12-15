import { ModelService } from '../../model/domain'
import { OperandFacade } from '../domain'
import { OperandBuilderImpl } from '../application/services/builder'
import { OperandBuilderCacheDecorator } from '../application/services/builderCacheDecorator'
import { ParameterServiceImpl } from '../application/services/parameterService'
import { OperandSerializerImpl } from '../application/services/serializer'
import { OperandBuild } from '../application/useCases/build'
import { OperandClone } from '../application/useCases/clone'
import { ConstBuilderImpl } from './constBuilder'
import { ExpressionEvaluatorFactoryBuilder } from './executors/expression'
import { H3lp, MemoryCache } from 'h3lp'
import { OperandFacadeImpl } from '../application'
import { TaskEvaluatorFactoryBuilder } from './executors/task'

export class OperandFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService, private readonly h3lp:H3lp) {}

	public build ():OperandFacade {
		const constBuilder = new ConstBuilderImpl()
		const expressionEvaluatorFactory = new ExpressionEvaluatorFactoryBuilder(this.model).build()
		const taskEvaluatorFactory = new TaskEvaluatorFactoryBuilder(this.model).build()
		const operandClone = new OperandClone([['expression', expressionEvaluatorFactory], ['task', taskEvaluatorFactory]])
		const parameterService = new ParameterServiceImpl()
		const operandSerializer = new OperandSerializerImpl()
		const operandBuild = new OperandBuild()
			.add('expression',
				new OperandBuilderCacheDecorator(
					new OperandBuilderImpl(expressionEvaluatorFactory, this.model, constBuilder),
					new MemoryCache<string, string>(),
					operandSerializer, this.h3lp.utils))
			.add('task', new OperandBuilderCacheDecorator(
				new OperandBuilderImpl(taskEvaluatorFactory, this.model, constBuilder),
				new MemoryCache<string, string>(),
				operandSerializer, this.h3lp.utils))

		return new OperandFacadeImpl(constBuilder, parameterService, operandBuild, operandClone)
	}
}
