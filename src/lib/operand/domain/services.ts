import { Operand, Parameter } from '../../shared/domain'
import { Type } from 'typ3s'

export interface IOperandBuilder {
	build (expression: string): Operand
}
export interface OperandBuildOptions {
	type:string
	cache?:boolean
}

export interface ITypeService {
getType (operand: Operand):Type
}

export interface IParameterService {
parameters (operand: Operand): Parameter[]
}
