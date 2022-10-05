import { Operand, Parameter, Format, OperatorMetadata, ActionObserver } from '../model'

export interface IExpressions {
	get enums (): any
	get formats (): any
	get constants (): any
	get functions (): OperatorMetadata[]
	get operators (): OperatorMetadata[]
	addFunction (source:any, sing:string, deterministic?:boolean):void
	addEnum (key:string, source:any):void
	addFormat (key:string, pattern:string):void
	addConstant (key:string, value:any):void
	addAlias (alias:string, reference:string):void
	isEnum (name:string): boolean
	getEnumValue (name:string, option:string):any
	getEnum (name:string):any
	isConstant (name:string): boolean
	getConstantValue (name:string):any
	getFormat (name:string): Format | undefined
	getOperator (operator:string, operands?:number): OperatorMetadata
	getFunction (name: string): OperatorMetadata
	clone (operand: Operand):Operand
	parse (expression: string): Operand
	parameters (expression: string): Parameter[]
	getType (expression: string): string
	eval (expression: string, data?: any): any
	subscribe (observer:ActionObserver):void
	unsubscribe (observer:ActionObserver): void
}
