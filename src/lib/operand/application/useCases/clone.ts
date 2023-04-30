import { IOperandBuilder } from '../../domain'
import { Operand } from '../../../shared/domain'
import { Autowired } from 'h3lp'

export class OperandClone {
	@Autowired('exp.operand.builder')
	private builders!:any

	private getBuilder (key:string):IOperandBuilder {
		return this.builders[key] as IOperandBuilder
	}

	public clone (operand: Operand, type:string): Operand {
		return this.getBuilder(type).clone(operand)
	}
}
