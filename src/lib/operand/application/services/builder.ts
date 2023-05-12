/* eslint-disable no-case-declarations */
import { Operand } from '../../../shared/domain'
import { ExpressionParse } from './parser'
import { ExpressionNormalizer } from './normalizer'
import { ConstBuilder, EvaluatorFactory, OperandBuilder, TypeService } from '../../domain'
import { OperandComplete, OperandNormalize, OperandReduce, TypeServiceImpl } from '..'
import { ModelService } from '../../../model/domain'

export class OperandBuilderImpl implements OperandBuilder {
	private parse:ExpressionParse
	private normalize:ExpressionNormalizer
	private operandNormalize:OperandNormalize
	private operandComplete:OperandComplete
	private operandReduce:OperandReduce
	private typeService:TypeService
	constructor (public readonly evaluatorFactory:EvaluatorFactory,
		private readonly model: ModelService,
		private readonly constBuilder: ConstBuilder
	) {
		this.parse = new ExpressionParse(this.model)
		this.normalize = new ExpressionNormalizer()
		this.operandNormalize = new OperandNormalize(this.model)
		this.operandComplete = new OperandComplete(this.evaluatorFactory)
		this.operandReduce = new OperandReduce(this.model, this.constBuilder)
		this.typeService = new TypeServiceImpl(this.model)
	}

	public build (expression: string): Operand {
		const expressionNormalized = this.normalize.normalize(expression)
		const operand = this.parse.parse(expressionNormalized)
		const normalized = this.operandNormalize.normalize(operand)
		const completed = this.operandComplete.complete(normalized)
		const reduced = this.operandReduce.reduce(completed)
		reduced.returnType = this.typeService.getType(reduced)
		return reduced
	}
}
