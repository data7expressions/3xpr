/* eslint-disable no-case-declarations */
import { Operand } from '../../../shared/domain'
import { OperandBuilder, OperandSerializer } from '../../domain'
import { ICache, IUtils } from 'h3lp'
import { OperandComplete } from '..'

export class OperandBuilderCacheDecorator implements OperandBuilder {
	private operandComplete:OperandComplete
	constructor (private readonly builder:OperandBuilder,
		private readonly cache: ICache<string, string>,
		private readonly serializer:OperandSerializer,
		private readonly utils: IUtils) {
		this.operandComplete = new OperandComplete(builder.evaluatorFactory)
	}

	public get evaluatorFactory () {
		return this.builder.evaluatorFactory
	}

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
