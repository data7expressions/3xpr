import { Service } from 'h3lp'
import { OperandType, Operand, Position } from '../../shared/domain'
import { Type } from 'typ3s'
import { ConstEvaluator } from './basic/evaluators'

@Service('exp.operand.builder.ConstBuilder')
export class ConstBuilder {
	public build (pos:Position, value:any): Operand {
		const operand = new Operand(pos, value, OperandType.Const, [], Type.get(value))
		operand.evaluator = new ConstEvaluator(operand)
		return operand
	}
}
