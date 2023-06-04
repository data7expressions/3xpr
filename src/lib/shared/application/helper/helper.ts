import { H3lp } from 'h3lp'
import { IExpressionHelper } from './expression'
import { IOperandHelper } from './operand'

export class Helper extends H3lp {
	constructor (public readonly expression:IExpressionHelper, public readonly operand:IOperandHelper, h3lp: H3lp) {
		super(h3lp.utils, h3lp.val, h3lp.fs, h3lp.http, h3lp.obj, h3lp.str, h3lp.test, h3lp.array)
	}
}
