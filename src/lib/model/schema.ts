/* eslint-disable @typescript-eslint/ban-types */

export enum PropertyType {
	any = 'any',
	boolean = 'boolean',
	integer = 'integer',
	decimal = 'decimal',
	string = 'string',
	date = 'date',
	time = 'time',
	datetime = 'datetime',
	object = 'object',
	array = 'array'
}

export enum ConstraintType {
	type = 'type',
	enum = 'enum',
	format = 'format',
	range = 'range',
	custom = 'custom'
}
export enum ConstraintEvaluateType {
	expression = 'expression',
	function = 'function'
}
export interface Constraint {
	message: string
	type: ConstraintType
	evaluateType: ConstraintEvaluateType
	expression?: string
	func?: Function
}
export interface Schema {
	$id?: string
	$schema?: string
	// https://json-schema.org/understanding-json-schema/structuring.html?highlight=ref
	$ref?: string
	$extends?: string
	// https://json-schema.org/understanding-json-schema/structuring.html?highlight=defs
	$defs: any

	title?: string
	name?: string
	type: PropertyType
	enum?: string | string[]
	items?: Schema
	properties?: any
	constraints?: Constraint[]

	// Validation Keywords for Numeric Instances (number and integer)
	// https://json-schema.org/draft/2020-12/json-schema-validation.html
	multipleOf:number
	minimum?: any
	maximum?: any
	exclusiveMaximum?: number
	exclusiveMinimum?: number
	// Validation Keywords for Strings
	maxLength?: number
	minLength?: number
	format?: string
	pattern?: string
	// Validation Keywords for Arrays
	maxItems?: number
	minItems?: number
	uniqueItems?: boolean
	maxContains?: number
	minContains?: number
	// Validation Keywords for Objects
	maxProperties?: number
	minProperties?: number
	// required?: boolean
	required?: string[]
}
export interface ValidateError {
	message:string
	data?:any
}
export interface ValidateResult {
	errors:ValidateError[]
	result: 'ok' | 'error'
}
