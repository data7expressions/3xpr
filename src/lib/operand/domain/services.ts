import { IEvaluator, Operand, Parameter } from '../../shared/domain'
import { Type } from 'typ3s'
import { EvaluatorBuilder } from './entities'

export interface EvaluatorFactory {
	add (key:string, evaluator:EvaluatorBuilder):EvaluatorFactory
	get (key:string):EvaluatorBuilder|undefined
	create (operand:Operand): IEvaluator|undefined
}
export interface OperandBuilder {
	evaluatorFactory:EvaluatorFactory
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
