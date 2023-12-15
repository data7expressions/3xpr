import { ConstBuilder, OperandBuilder, OperandFacade, ParameterService } from '../domain'
import { OperandBuild } from '../application/useCases/build'
import { OperandClone } from '../application/useCases/clone'
import { Operand, Parameter } from '../../shared/domain'
import { Type } from 'typ3s'

export class OperandFacadeImpl implements OperandFacade {
	// eslint-disable-next-line no-useless-constructor
	constructor (public readonly constBuilder: ConstBuilder,
	private readonly parameterService:ParameterService,
	private readonly operandBuild:OperandBuild,
	private readonly operandClone:OperandClone) {}

	public getBuilder (key:string):OperandBuilder {
		return this.operandBuild.get(key)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): Parameter[] {
		const operand = this.operandBuild.build(expression, 'expression')
		return this.parameterService.parameters(operand)
	}

	/**
	 * Get type of expression
	 * @param expression  expression
	 * @returns Type of expression
	 */
	public type (expression: string): string {
		const operand = this.operandBuild.build(expression, 'expression')
		return Type.stringify(operand.returnType)
	}

	public build (expression: string, key = 'expression'): Operand {
		return this.operandBuild.build(expression, key)
	}

	public clone (source:Operand, key = 'expression'):Operand {
		return this.operandClone.clone(source, key)
	}
}
