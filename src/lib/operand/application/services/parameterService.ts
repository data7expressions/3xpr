// import { Const, Var, Template, Operator, CallFunc, Arrow, List, Obj, Property } from './operands'
import { Operand, Parameter, OperandType } from '../../../shared/domain'
import { ParameterService } from '../../domain'
import { Type } from 'typ3s'

export class ParameterServiceImpl implements ParameterService {
	public parameters (operand: Operand): Parameter[] {
		const parameters: Parameter[] = []
		if (operand.type === OperandType.Var) {
			parameters.push({ name: operand.name, type: Type.stringify(operand.returnType) })
		}
		for (const child of operand.children) {
			const childParameters = this.parameters(child)
			const newParameters = childParameters.filter((p:Parameter) => !parameters.map((p:Parameter) => p.name).includes(p.name))
			if (newParameters.length > 0) {
				parameters.push(...newParameters)
			}
		}
		return parameters
	}
}
