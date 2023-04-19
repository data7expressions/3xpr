import { Format, OperatorAdditionalInfo, FunctionAdditionalInfo, OperatorMetadata } from '../entities'

export interface IModelService {
	get operatorAlias():[string, any][]
	get functionAlias():[string, any][]
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
	getConstantValue (name:string): any | undefined
	getEnumValue (name:string, option:string):any
	getEnum (name:string):any
	getFormat (name:string): Format | undefined
	getOperator (operator:string, operands?:number): OperatorMetadata
	getFunction (name: string): OperatorMetadata
	priority (name: string, cardinality?:number): number
	isEnum (name:string):boolean
	isConstant (name:string):boolean
	isOperator (name:string, operands?:number):boolean
	isFunction (name:string):boolean
}
