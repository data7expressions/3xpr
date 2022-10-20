import { H3lp } from 'h3lp'
import { NodeHelper, nodeHelper } from './parser'
import { OperandHelper, operandHelper } from './operand'

export class ExpHelper extends H3lp {
	public node:NodeHelper
	public operand:OperandHelper

	constructor () {
		super()
		this.node = nodeHelper
		this.operand = operandHelper
	}
}

export const helper = new ExpHelper()
