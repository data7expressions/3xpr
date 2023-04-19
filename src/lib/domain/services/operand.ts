import { IEvaluator, Operand } from '../entities'

export interface IOperandBuilder {
	get key():string
	build (expression: string): Operand
	clone (source: Operand): Operand
}

export interface IOperandNormalizer {
	normalize (operand: Operand): Operand
}

export interface IOperandReducer {
	reduce (operand: Operand): Operand
}

// Abstract Factory
export interface IEvaluatorFactory {
	create(operand:Operand): IEvaluator|undefined
}

export interface IOperandService {
	addBuilder (builder:IOperandBuilder):void
	build (expression: string, type:string, useCache:boolean): Operand
	typed (expression: string, type:string): Operand
	clone (operand: Operand, type:string): Operand
}
