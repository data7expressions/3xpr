import { Context } from '../../../shared/domain'
import { OperandBuild } from '../../application'
import { ExpressionEvaluator } from '../../domain'

export class ExpressionEvaluatorImpl implements ExpressionEvaluator {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly operandBuild:OperandBuild) {}

	public eval (expression: string, context:Context): any {
		const operand = this.operandBuild.build(expression, 'sync')
		return operand.eval(context)
	}

	public async evalAsync (expression: string, context:Context): Promise<any> {
		const operand = this.operandBuild.build(expression, 'async')
		return operand.eval(context)
	}
}
