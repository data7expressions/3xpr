import { H3lp } from 'h3lp'
import { ExpressionHelper } from '../../expression/infrastructure'
import { ConstBuilderImpl, OperandHelper } from '../../operand/infrastructure'

export class ExprH3lp extends H3lp {
	public expression:ExpressionHelper
	public operand:OperandHelper
	constructor (h3lp: H3lp) {
		super(h3lp.utils, h3lp.val, h3lp.fs, h3lp.http, h3lp.obj, h3lp.str, h3lp.test, h3lp.array)
		const constBuilder = new ConstBuilderImpl()
		this.operand = new OperandHelper(constBuilder)
		this.expression = new ExpressionHelper(h3lp.str)
	}
}
