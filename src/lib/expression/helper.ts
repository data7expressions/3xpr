import { H3lp } from 'h3lp'
import { NodeHelper, nodeHelper } from './parser'
import { TypeHelper, OperandHelper, typeHelper, operandHelper } from './operand'

export class ExpHelper extends H3lp {
	public node:NodeHelper
	public type:TypeHelper
	public operand:OperandHelper

	constructor () {
		super()
		this.node = nodeHelper
		this.type = typeHelper
		this.operand = operandHelper
	}
}

export const helper = new ExpHelper()
