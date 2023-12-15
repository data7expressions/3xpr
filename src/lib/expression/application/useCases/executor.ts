import { Context } from '../../../shared/domain'
import { Executor } from '../../domain'
import { OperandFacade } from '../../../operand/domain'

export class ExecutorImpl implements Executor {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly operand:OperandFacade) {}

	public eval (expression: string, context:Context): any {
		const operand = this.operand.build(expression, 'expression')
		return operand.eval(context)
	}

	public async evalAsync (expression: string, context:Context): Promise<any> {
		const operand = this.operand.build(expression, 'expression')
		return operand.evalAsync(context)
	}

	public async execute (expression: string, context:Context): Promise<any> {
		const operand = this.operand.build(expression, 'task')
		return operand.evalAsync(context)
	}
}
