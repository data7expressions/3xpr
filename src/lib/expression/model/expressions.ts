import { Operand, Format, Parameter, OperatorAdditionalInfo, FunctionAdditionalInfo, OperatorMetadata, ActionObserver } from '../model'

export interface IExpressions {
	get enums(): [string, [string, any][]][]
	get formats(): [string, Format][]
	get constants(): [string, any][]
	get operators(): [string, OperatorMetadata][]
	get functions(): [string, OperatorMetadata][]
	addOperator (source:any, sing:string, additionalInfo: OperatorAdditionalInfo):void
	addFunction (source:any, sing:string, additionalInfo?: FunctionAdditionalInfo):void
	addOperatorAlias (alias:string, reference:string):void
	addFunctionAlias (alias:string, reference:string):void
	addEnum (key:string, values:[string, any][] | any):void
	addFormat (key:string, pattern:string):void
	addConstant (key:string, value:any):void
	isEnum (name:string): boolean
	getEnumValue (name:string, option:string):any
	getEnum (name:string):any
	isConstant (name:string): boolean
	getConstantValue (name:string):any
	getFormat (name:string): Format | undefined
	getOperator (operator:string, operands?:number): OperatorMetadata
	getFunction (name: string): OperatorMetadata
	clone (operand: Operand):Operand
	build (expression: string): Operand
	parameters (expression: string): Parameter[]
	getType (expression: string): string
	eval (expression: string, data?: any): any
	subscribe (observer:ActionObserver):void
	unsubscribe (observer:ActionObserver): void
}
