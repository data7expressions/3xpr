/* eslint-disable no-case-declarations */
import { Operand } from '../../../shared/domain'
import { ExpressionNormalize, ExpressionParse } from '../../../expression/application'
import { IOperandBuilder } from '../../../operand/domain'
import { OperandComplete, OperandNormalize, OperandReduce, TypeService } from '../../../operand/application'

export class OperandBuilder implements IOperandBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly type:string) {}
	private parse = new ExpressionParse()
	private normalize = new ExpressionNormalize()
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
		this.typeService.solve(reduced)
		return reduced
	}
}
