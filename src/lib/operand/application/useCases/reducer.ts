/* eslint-disable no-case-declarations */
import { ConstBuilder } from './buildOperand/factory/basic/factory'
import { IModelService } from '../../../model/domain'
import { Operand, OperandType, Context } from '../../../commons/domain'
import { Autowired, Service } from 'h3lp'

@Service('exp.operand.reduce')
export class OperandReduce {
	@Autowired('exp.model.service')
	private model!: IModelService

	public reduce (operand: Operand): Operand {
		if (operand.type === OperandType.Operator) {
			return this.reduceOperand(operand)
		} else if (operand.type === OperandType.CallFunc) {
			// Example: .[0].states.filter() where function name is states.filter
			const names = operand.name.split('.')
			const funcName = names[names.length - 1]
			const funcMetadata = this.model.getFunction(funcName)
			if (funcMetadata && funcMetadata.deterministic) {
				return this.reduceOperand(operand)
			}
		}
		return operand
	}

	protected reduceOperand (operand: Operand): Operand {
		let allConstants = true
		for (const child of operand.children) {
			if (!(child.type === OperandType.Const)) {
				allConstants = false
				break
			}
		}
		if (allConstants) {
			const value = operand.eval(new Context())
			const constant = new ConstBuilder().build(operand.pos, value)
			constant.id = operand.id
			return constant
		} else {
			for (let i = 0; i < operand.children.length; i++) {
				const child = operand.children[i]
				operand.children[i] = this.reduce(child)
			}
		}
		return operand
	}
}
