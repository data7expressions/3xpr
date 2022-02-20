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
