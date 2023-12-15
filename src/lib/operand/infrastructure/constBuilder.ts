import { OperandType, Operand, Position } from '../../shared/domain'
import { Type } from 'typ3s'
import { ConstEvaluator } from './executors/expression'
import { ConstBuilder } from '../domain'

export class ConstBuilderImpl implements ConstBuilder {
	public build (pos:Position, value:any): Operand {
		const operand = new Operand(pos, value, OperandType.Const, [], Type.get(value))
		operand.evaluator = new ConstEvaluator(operand)
		return operand
	}
}
