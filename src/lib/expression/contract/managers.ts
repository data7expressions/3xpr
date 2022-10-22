import { Type } from './type'
// import { Node } from './node'
import { Parameter, Format, OperatorAdditionalInfo, FunctionAdditionalInfo, OperandType, Context } from '.'
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
	isEnum (name:string):boolean
	getEnumValue (name:string, option:string):any
	getEnum (name:string):any
	getFormat (name:string): Format | undefined
	getOperator (operator:string, operands?:number): OperatorMetadata
	getFunction (name: string): OperatorMetadata
	priority (name: string, cardinality?:number): number
	isConstant (name:string):boolean
	getConstantValue (name:string): any | undefined
}

export interface IOperandBuilder {
	build (expression: string): Operand
}

// Abstract Factory
export interface IOperandFactory {
	create(type:OperandType, id:string, name: string, children?: Operand[]): Operand
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
	// clone (operand: Operand):Operand
	parameters (expression: string): Parameter[]
	type (expression: string): string
	eval (expression: string, data?: any): any
	run (expression: string, data?: any): any
	subscribe (observer:ActionObserver):void
	unsubscribe (observer:ActionObserver): void
}
