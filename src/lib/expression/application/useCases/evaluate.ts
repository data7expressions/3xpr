import { Context } from '../../../shared/domain'
import { ExpressionEvaluate } from '../../domain'
import { OperandFacade } from '../../../operand/domain'

export class ExpressionEvaluateImpl implements ExpressionEvaluate {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly operand:OperandFacade) {}

	public eval (expression: string, context:Context): any {
		const operand = this.operand.build(expression, 'sync')
		return operand.eval(context)
	}

	public async evalAsync (expression: string, context:Context): Promise<any> {
		const operand = this.operand.build(expression, 'async')
		return operand.eval(context)
	}
}
