/* eslint-disable no-case-declarations */
import { Operand } from '../../../shared/domain'
import { ExpressionParse } from './parser'
import { ExpressionNormalizer } from './normalizer'
import { IOperandBuilder } from '../../../operand/domain'
import { OperandComplete, OperandNormalize, OperandReduce, TypeService } from '../../../operand/application'

export class OperandBuilder implements IOperandBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly type:string) {}
	private parse = new ExpressionParse()
	private normalize = new ExpressionNormalizer()
	private operandNormalize = new OperandNormalize()
	private operandComplete = new OperandComplete()
	private operandReduce = new OperandReduce()
	private typeService = new TypeService()

	public build (expression: string): Operand {
		const expressionNormalized = this.normalize.normalize(expression)
		const operand = this.parse.parse(expressionNormalized)
		const normalized = this.operandNormalize.normalize(operand)
		const completed = this.operandComplete.complete(normalized, this.type)
		const reduced = this.operandReduce.reduce(completed)
		reduced.returnType = this.typeService.getType(reduced)
		return reduced
	}
}
