import { Context } from './context'
import { Type } from './type'
import { Node } from './../parser'
// import { Library } from './../operand'

export interface Parameter {
	name: string
	type?: string
	default?: any
	value?:any
}

export enum OperatorType
{ operator = 'operator'
, function = 'function'
, child = 'child'
, arrow = 'arrow'
}

export abstract class Operand {
	public name: string
	public type?: Type
	public id?: string
	public index?: number
	public level?: number
	public children: Operand[]
	constructor (name: string, children: Operand[] = [], type?:Type) {
		this.name = name
		this.children = children
		this.type = type
		this.id = undefined
		this.index = 0
		this.level = 0
	}

	public abstract eval(context: Context): any
}

export interface OperatorMetadata {
	name: string
	operator:string
	type: OperatorType
	deterministic:boolean
	// category?:string
	// description?: string
	// lib?: string
	operands: number
	priority?:number
	return:string
	params: Parameter[]
	function?: any
	custom?: any
}

export interface OperandMetadata {
	classType: string,
	name: string,
	children?: OperandMetadata[],
	type?: string,
	property?: string
	parameters?: Parameter[],
	clause?: string,
	alias?: string,
	number?: number
}

export interface IOperandTypeManager {
	solve (operand: Operand):Type
	parameters (operand: Operand): Parameter[]
}

export interface IOperandBuilder {
	build (node: Node): Operand
}

export interface Format {
	name: string
	pattern: string
	regExp: RegExp
}

export interface Metadata {
	name:string
	params:Parameter[]
	return:string
	description?: string
	deterministic?:boolean
	multipleParams?:boolean
}

export interface IExpressionConfig {
	// get libraries():Library[]
	get operators(): OperatorMetadata[]
	get enums(): any
	get formats(): any
	get functions(): OperatorMetadata[]
	doubleOperators: string[]
	tripleOperators: string[]
	assignmentOperators: string[]
	// addLibrary (library:Library):void

	addEnum (key:string, source:any):void
	addConstant (key:string, value:any):void
	addFormat (key:string, pattern:string):void
	addOperator (sing:string, source:any, priority:number):void
	addFunction (sing:string, source:any, deterministic?:boolean):void
	addAlias (alias:string, reference:string):void
	// load (data: any): void
	isEnum (name:string):boolean
	getEnumValue (name:string, option:string):any
	getEnum (name:string):any
	getFormat (name:string): Format | undefined
	getOperator (operator:string, operands?:number): OperatorMetadata
	getFunction (name: string): OperatorMetadata
	priority (name: string, cardinality?:number): number
	isConstant (name:string):boolean
	getConstantValue (name:string): any | undefined
	refresh () :void
}
