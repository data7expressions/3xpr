export interface ParamMetadata {
	name: string
	type: string
	default:any
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
	desc?: string
	lib?: string
	operands: number
	priority?:number
	return:string
	params: ParamMetadata[]
	function?: any
	custom?: any
}
