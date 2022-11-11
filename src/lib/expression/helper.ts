import { H3lp } from 'h3lp'
import { OperandHelper, operandHelper } from './operand'

export class ExpHelper extends H3lp {
	public operand:OperandHelper

	constructor () {
		super()
		this.operand = operandHelper
	}
}

export const helper = new ExpHelper()
