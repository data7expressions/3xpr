import { Type } from './type'
// import { Node } from './node'
import { Parameter, Format, OperatorAdditionalInfo, FunctionAdditionalInfo, IEvaluator, Context } from '.'
import { Operand, OperatorMetadata } from './operand'

export interface ActionObserverArgs{
	expression:string
	context: Context
	result?:any
	error?:any
}
export abstract class ActionObserver {
	// eslint-disable-next-line no-useless-constructor
	public constructor (public readonly condition?:string) {}
	public abstract before (args:ActionObserverArgs):void
	public abstract after (args:ActionObserverArgs):void
	public abstract error (args:ActionObserverArgs):void
}

export interface ITypeManager {
	type (operand: Operand):Type
	parameters (operand: Operand): Parameter[]
}

export interface IModelManager {
	get operatorAlias():[string, any][]
	get functionAlias():[string, any][]
	get enums(): [string, [string, any][]][]
	get formats(): [string, Format][]
	get constants(): [string, any][]
	get operators(): [string, OperatorMetadata][]
	get functions(): [string, OperatorMetadata][]
	addEnum (name:string, values:[string, any][] | any):void
	addConstant (key:string, value:any):void
	addFormat (key:string, pattern:string):void
	addOperator (sing:string, source:any, additionalInfo: OperatorAdditionalInfo):void
	addFunction (sing:string, source:any, additionalInfo?: FunctionAdditionalInfo):void
	addOperatorAlias (alias:string, reference:string):void
	addFunctionAlias (alias:string, reference:string):void
	getConstantValue (name:string): any | undefined
	getEnumValue (name:string, option:string):any
	getEnum (name:string):any
	getFormat (name:string): Format | undefined
	getOperator (operator:string, operands?:number): OperatorMetadata
	getFunction (name: string): OperatorMetadata
	priority (name: string, cardinality?:number): number
	isEnum (name:string):boolean
	isConstant (name:string):boolean
	isOperator (name:string, operands?:number):boolean
	isFunction (name:string):boolean
}

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

export interface IExpressions {
	get enums(): [string, [string, any][]][]
	get formats(): [string, Format][]
	get constants(): [string, any][]
	get operators(): [string, OperatorMetadata][]
	get functions(): [string, OperatorMetadata][]
	addOperator (sing:string, source:any, additionalInfo: OperatorAdditionalInfo):void
	addFunction (sing:string, source:any, additionalInfo?: FunctionAdditionalInfo):void
	addOperatorAlias (alias:string, reference:string):void
	addFunctionAlias (alias:string, reference:string):void
	addEnum (key:string, values:[string, any][] | any):void
	addFormat (key:string, pattern:string):void
	addConstant (key:string, value:any):void
	clone (operand: Operand):Operand
	build (expression: string): Operand
	parameters (expression: string): Parameter[]
	type (expression: string): string
	eval (expression: string, data?: any): any
	run (expression: string, data?: any): any
	subscribe (observer:ActionObserver):void
	unsubscribe (observer:ActionObserver): void
}
