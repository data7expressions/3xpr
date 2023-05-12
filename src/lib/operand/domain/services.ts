import { Operand, Parameter } from '../../shared/domain'
import { Type } from 'typ3s'

export interface OperandBuilder {
	build (expression: string): Operand
}
export interface OperandBuildOptions {
	type:string
	cache?:boolean
}

export interface TypeService {
	getType (operand: Operand):Type
}

export interface ParameterService {
	parameters (operand: Operand): Parameter[]
}

export interface OperandSerializer {
	clone (sentence: Operand): Operand
	serialize (sentence: Operand): string
	deserialize (value: string): Operand
}
