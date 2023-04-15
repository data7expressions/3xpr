import { IEvaluator, Operand } from '../model'

export interface IOperandBuilder {
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
