import { H3lp, Autowired } from 'h3lp'
import { IExpressionHelper } from './expression'
import { IOperandHelper } from './operand'

export class Helper extends H3lp {
	@Autowired('helper.expression')
	public expression!:IExpressionHelper

	@Autowired('helper.operand')
	public operand!:IOperandHelper
}
