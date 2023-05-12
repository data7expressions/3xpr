import { ModelService } from '../../model/domain'
import { ConstBuilder, OperandBuilder, OperandFacade, ParameterService } from '../domain'
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
import { Operand, Parameter } from '../../shared/domain'
import { Type } from 'typ3s'

export class OperandFacadeImpl implements OperandFacade {
	public constBuilder: ConstBuilder
	private parameterService:ParameterService
	private operandBuild:OperandBuild
	private operandClone:OperandClone
	constructor (private readonly model: ModelService) {
		this.constBuilder = new ConstBuilderImpl()
		this.operandClone = new OperandClone()
		this.parameterService = new ParameterServiceImpl()
		const operandSerializer = new OperandSerializerImpl()
		this.operandBuild = new OperandBuild()
			.add('sync',
				new OperandBuilderCacheDecorator(
					new OperandBuilderImpl(new SyncEvaluatorFactoryBuilder(this.model).build(), this.model, this.constBuilder),
					new MemoryCache<string, string>(),
					operandSerializer))
			.add('async', new OperandBuilderCacheDecorator(
				new OperandBuilderImpl(new AsyncEvaluatorFactoryBuilder(this.model).build(), this.model, this.constBuilder),
				new MemoryCache<string, string>(),
				operandSerializer))
	}

	public getBuilder (key:string):OperandBuilder {
		return this.operandBuild.get(key)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): Parameter[] {
		const operand = this.operandBuild.build(expression, 'sync')
		return this.parameterService.parameters(operand)
	}

	/**
	 * Get type of expression
	 * @param expression  expression
	 * @returns Type of expression
	 */
	public type (expression: string): string {
		const operand = this.operandBuild.build(expression, 'sync')
		return Type.stringify(operand.returnType)
	}

	public build (expression: string, key:string): Operand {
		return this.operandBuild.build(expression, key)
	}

	public clone (source:Operand):Operand {
		return this.operandClone.clone(source, 'sync')
	}
}
