import { Parameter, IEvaluator, Operand } from '../../shared/domain'
// import { Type } from 'typ3s'

export interface IOperandBuilder {
	build (expression: string): Operand
	clone (source: Operand): Operand
}

// export interface ITypeService {
// getType (operand: Operand):Type
// }

export interface IParameterService {
	parameters (operand: Operand): Parameter[]
}

// Abstract Factory
export interface IEvaluatorFactory {
	create(operand:Operand): IEvaluator|undefined
}

export interface OperandBuildOptions {
	type:string
	cache?:boolean
}

export interface IOperandService {
	build (expression: string, options:OperandBuildOptions): Operand
	normalize (operan: Operand): Operand
	reduce (operan: Operand): Operand
	clone (operand: Operand, type:string): Operand
}
