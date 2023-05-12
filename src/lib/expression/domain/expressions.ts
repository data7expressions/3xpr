import { OperatorMetadata, OperatorAdditionalInfo, FunctionAdditionalInfo, EvaluatorFactory } from '../../operand/domain'
import { Format, Parameter, ActionObserver, Operand } from '../../shared/domain'
import { ModelService, Library } from '../../model/domain'

export interface IExpressions {
	get model(): ModelService
	get enums(): [string, [string, any][]][]
	get formats(): [string, Format][]
	get constants(): [string, any][]
	get operators(): [string, OperatorMetadata][]
	get functions(): [string, OperatorMetadata][]
	getEvaluatorFactory (key:string):EvaluatorFactory
	addOperator (sing:string, source:any, additionalInfo: OperatorAdditionalInfo):void
	addFunction (sing:string, source:any, additionalInfo?: FunctionAdditionalInfo):void
	addOperatorAlias (alias:string, reference:string):void
	addFunctionAlias (alias:string, reference:string):void
	addEnum (key:string, values:[string, any][] | any):void
	addFormat (key:string, pattern:string):void
	addConstant (key:string, value:any):void
	addLibrary (library:Library):IExpressions
	convert (source: any, from:string): [string, any]
	clone (source:Operand):Operand
	build (expression: string): Operand
	parameters (expression: string): Parameter[]
	type (expression: string): string
	eval (expression: string, data?: any): any
	evalAsync (expression: string, data?: any): Promise<any>
	subscribe (observer:ActionObserver):void
	unsubscribe (observer:ActionObserver): void
}

export interface ExpressionEvaluate {

	eval (expression: string, data?: any): any
	evalAsync (expression: string, data?: any): Promise<any>
}
