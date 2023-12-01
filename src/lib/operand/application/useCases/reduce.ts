/* eslint-disable no-case-declarations */
import { ModelService } from '../../../model/domain'
import { Operand, OperandType, Context } from '../../../shared/domain'
import { ConstBuilder } from '../../domain/constBuilder'

export class OperandReduce {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService,
		private readonly constBuilder: ConstBuilder) {}

	public reduce (operand: Operand): Operand {
		if (operand.type === OperandType.Operator) {
			return this.reduceOperand(operand)
		} else if (operand.type === OperandType.CallFunc) {
			let funcMetadata:any = null
			if (this.model.isFunction(operand.name)) {
				// Example: orm.execute(expression, data, options)
				funcMetadata = this.model.getFunction(operand.name)
			} else {
				// Example: .[0].states.filter() where function name is states.filter
				const names = operand.name.split('.')
				const funcName = names[names.length - 1]
				funcMetadata = this.model.getFunction(funcName)
			}
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
			const constant = this.constBuilder.build(operand.pos, value)
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
