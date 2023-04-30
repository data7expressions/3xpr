import { H3lp, Autowired } from 'h3lp'
import { IExpressionHelper } from './expression'
import { IOperandHelper } from './operand'

export class Helper extends H3lp {
	@Autowired('exp.helper.expression')
	public expression!:IExpressionHelper

	@Autowired('exp.helper.operand')
	public operand!:IOperandHelper
}
