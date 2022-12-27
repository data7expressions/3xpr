// import { Const, Var, Template, Operator, CallFunc, Arrow, List, Obj, Property } from './operands'
import { Operand, Type, Parameter, IParameterManager, OperandType } from '../contract'

export class ParameterManager implements IParameterManager {
	public parameters (operand: Operand): Parameter[] {
		const parameters: Parameter[] = []
		if (operand.type === OperandType.Var) {
			parameters.push({ name: operand.name, type: Type.toString(operand.returnType) })
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
