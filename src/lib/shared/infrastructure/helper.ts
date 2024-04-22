import { ExpressionHelper } from '../../expression/infrastructure'
import { ConstBuilderImpl, OperandHelper } from '../../operand/infrastructure'
import { TypeH3lp } from 'typ3s'

export class ExprH3lp extends TypeH3lp {
	public expression:ExpressionHelper
	public operand:OperandHelper
	constructor (typeH3lp: TypeH3lp) {
		super(typeH3lp)
		const constBuilder = new ConstBuilderImpl()
		this.operand = new OperandHelper(constBuilder)
		this.expression = new ExpressionHelper(typeH3lp.str)
	}
}
