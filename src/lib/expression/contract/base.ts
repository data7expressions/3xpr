
export interface ISerializer<T> {
	serialize (value: T): any
	deserialize (value: any): T
	clone (value: T): T
}

export interface IBuilder<T> {
	build (): T
}

export interface Parameter {
	name: string
	type?: string
	default?: any
	value?:any,
	multiple?:boolean
}

export enum OperandType
{ Const = 'Const'
, Var = 'Var'
, Env = 'Env'
, Property = 'Property'
, Template = 'Template'
, KeyVal = 'KeyVal'
, List = 'List'
, Obj = 'Obj'
, Operator = 'Operator'
, CallFunc = 'CallFunc'
, Arrow = 'Arrow'
, ChildFunc = 'ChildFunc'
, Block = 'Block'
, If = 'If'
, ElseIf = 'ElseIf'
, Else = 'Else'
, While = 'While'
, For = 'For'
, ForIn = 'ForIn'
, Switch = 'Switch'
, Case = 'Case'
, Default = 'Default'
, Break = 'Break'
, Continue = 'Continue'
, Func = 'Func'
, Return = 'Return'
, Try = 'Try'
, Catch = 'Catch'
, Throw = 'Throw'
, Args = 'Args'
}

export interface ParameterDoc {
	name: string
	description: string
}
export interface OperatorDoc {
	description: string
	params:ParameterDoc[]
}

export interface OperandMetadata {
	type: OperandType,
	name: string,
	children?: OperandMetadata[],
	returnType?: string,
	property?: string
	parameters?: Parameter[],
	clause?: string,
	alias?: string,
	number?: number
}

export interface Format {
	name: string
	pattern: string
	regExp: RegExp
}

export interface Sing {
	name:string
	params:Parameter[]
	return:string
	async: boolean
}

export interface OperatorAdditionalInfo {
	doc?: OperatorDoc
	priority: number
}

export interface FunctionAdditionalInfo {
	doc?: OperatorDoc
	deterministic?:boolean
	multipleParams?:boolean
}
