import { Parameter, IEvaluator, Operand } from '../../commons/domain'
import { Type } from 'typ3s'

export interface IOperandBuilder {
	build (expression: string): Operand
	clone (source: Operand): Operand
}

export interface ITypeService {
	getType (operand: Operand):Type
}

export interface IParameterService {
	parameters (operand: Operand): Parameter[]
}

// Abstract Factory
export interface IEvaluatorFactory {
	create(operand:Operand): IEvaluator|undefined
}

export interface IOperandService {
	build (expression: string, type:string, useCache:boolean): Operand
	typed (expression: string, type:string): Operand
	clone (operand: Operand, type:string): Operand
}
