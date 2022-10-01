import { Context } from './context'
import { Type } from './type'
import { Node } from './../parser'
import { Library } from './../operand'

export interface Parameter {
	name: string
	type: string
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
	category?:string
	description?: string
	lib?: string
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
	type: string,
	property?: string
	parameters?: Parameter[],
	clause?: string,
	alias?: string,
	number?: number
}

export interface IOperandTypeManager {
	solve (operand: Operand):Type
}

export interface IOperandManager {
	build (node: Node): Operand
	parameters (operand: Operand): Parameter[]
}

export interface Format {
	name: string
	pattern: string
	regExp: RegExp
}
export interface IExpressionConfig {
	get libraries():Library[]
	get operators(): OperatorMetadata[]
	get enums(): any
	get formats(): any
	get functions(): OperatorMetadata[]
	addLibrary (library:Library):void
	load (data: any): void
	isEnum (name:string):boolean
	getEnumValue (name:string, option:string):any
	getEnum (name:string):any
	getFormat (name:string): Format | undefined
	getOperator (operator:string, operands?:number): OperatorMetadata
	getFunction (name: string): OperatorMetadata
}
