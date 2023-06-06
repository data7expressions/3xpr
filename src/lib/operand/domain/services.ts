import { IEvaluator, Operand, Parameter } from '../../shared/domain'
import { Type } from 'typ3s'
import { EvaluatorBuilder } from './entities'
import { ConstBuilder } from './constBuilder'

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

export interface OperandCloner {
	clone (source:Operand, key?:string):Operand
}

export interface OperandFacade extends OperandCloner {
	constBuilder: ConstBuilder
	getBuilder (key:string):OperandBuilder
	parameters (expression: string): Parameter[]
	type (expression: string): string
	build (expression: string, key?:string):Operand
}
