/* eslint-disable no-case-declarations */
import { ModelService } from '../../../model/domain'
import { Operand, OperandType } from '../../../shared/domain'

export class OperandNormalize {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService) {}

	public normalize (operand: Operand): Operand {
		if (operand.type === OperandType.Var && operand.children.length === 0) {
			// Example: Products => Products.map(p=>p)
			const arrowVariable = new Operand(operand.pos, 'p', OperandType.Var)
			const allFields = new Operand(operand.pos, 'p', OperandType.Var)
			const map = new Operand(operand.pos, 'map', OperandType.Arrow, [operand, arrowVariable, allFields])
			this.normalizeOperand(map)
			return map
		} else {
			this.normalizeOperand(operand)
			return operand
		}
	}

	protected normalizeOperand (operand: Operand): void {
		if (operand.type === OperandType.Arrow || operand.type === OperandType.ChildFunc || operand.type === OperandType.CallFunc) {
			const alias = this.model.functionAlias.find(p => p[0] === operand.name)
			if (alias) {
				operand.name = alias[1]
			}
		} else if (operand.type === OperandType.Operator) {
			const alias = this.model.operatorAlias.find(p => p[0] === operand.name)
			if (alias) {
				operand.name = alias[1]
			}
		}
		for (const child of operand.children) {
			this.normalizeOperand(child)
		}
	}
}
