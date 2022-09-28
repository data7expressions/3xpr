import { Context } from './context'
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
	public type: string
	public id?: string
	// public parent?: Operand
	public index?: number
	public level?: number
	public children: Operand[]
	constructor (name: string, children: Operand[] = [], type = 'any') {
		this.name = name
		this.children = children
		this.type = type
		this.id = undefined
		// this.parent = undefined
		this.index = 0
		this.level = 0
	}

	public clone () {
		throw new Error('NotImplemented')
		// // const obj = this
		// const children = []
		// if (this.children) {
		// for (const k in this.children) {
		// const p = this.children[k]
		// const child = p && typeof p === 'object' ? JSON.parse(JSON.stringify(p)) : p
		// children.push(child)
		// }
		// }
		// return new this.constructor(this.name, children)
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// public set (value: any) { throw new Error('NotImplemented') }
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
	type?: string,
	property?: string
	parameters?: Parameter[],
	clause?: string,
	alias?: string,
	number?: number
}

export interface IOperandTypeManager {
	solve (operand: Operand):string
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
