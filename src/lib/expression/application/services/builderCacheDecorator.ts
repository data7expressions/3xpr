/* eslint-disable no-case-declarations */
import { Operand } from '../../../shared/domain'
import { OperandBuilder, OperandSerializer } from '../../../operand/domain'
import { Autowired, ICache, IUtils } from 'h3lp'
import { EvaluatorFactory, OperandComplete } from '../../../operand/application'

export class OperandBuilderCacheDecorator implements OperandBuilder {
	private operandComplete:OperandComplete
	constructor (private readonly builder:OperandBuilder,
		private readonly cache: ICache<string, string>,
		private readonly serializer:OperandSerializer,
		private readonly evaluatorFactory:EvaluatorFactory) {
		this.operandComplete = new OperandComplete(this.evaluatorFactory)
	}

	@Autowired('h3lp.utils')
	private utils!: IUtils

	public build (expression: string): Operand {
		const key = this.utils.hashCode(expression).toString()
		const value = this.cache.get(key)
		if (value) {
			const operand = this.serializer.deserialize(value)
			return this.operandComplete.complete(operand)
		}
		const operand = this.builder.build(expression)
		this.cache.set(key, this.serializer.serialize(operand))
		return operand
	}
}
