import { Type } from 'typ3s'
import { ICache } from 'h3lp'
import {
	Data, Operand, Context, IParameterService, Parameter,
	Format, OperatorMetadata, ITypeService, IModelService, ActionObserver,
	FunctionAdditionalInfo, OperatorAdditionalInfo, IOperandService, IOperandBuilder
} from '../../domain'
import { CoreLibrary, OperandService, BasicOperandBuilder, ProcessOperandBuilder, IExpressions } from '../../application'
import { ExpressionConvertFromFunction } from './convertFromFunction'
import { ExpressionConvertFromGraphql } from './convertFromGraphql'

export class ExpressionsAdapter implements IExpressions {
	public operandService:IOperandService
	private convertFromFunction:ExpressionConvertFromFunction
	private convertFromGraphql:ExpressionConvertFromGraphql
	private observers:ActionObserver[] = []
	constructor (
		public readonly _model: IModelService,
		typeService: ITypeService,
		private readonly parameterService: IParameterService,
		cache: ICache<string, Operand>
	) {
		this.operandService = new OperandService(typeService, cache)
		const basic = new BasicOperandBuilder(_model)
		const process = new ProcessOperandBuilder(_model)
		new CoreLibrary(_model, basic).load()
		this.operandService.addBuilder(basic)
		this.operandService.addBuilder(process)
		this.convertFromFunction = new ExpressionConvertFromFunction(this.operandService)
		this.convertFromGraphql = new ExpressionConvertFromGraphql()
	}

	public get model (): IModelService {
		return this._model
	}

	public get operators (): [string, OperatorMetadata][] {
		return this.model.operators
	}

	public get enums (): [string, [string, any][]][] {
		return this.model.enums
	}

	public get formats (): [string, Format][] {
		return this.model.formats
	}

	public get constants (): [string, any][] {
		return this.model.constants
	}

	public get functions (): [string, OperatorMetadata][] {
		return this.model.functions
	}

	public addOperator (sing:string, source:any, additionalInfo: OperatorAdditionalInfo):void {
		this.model.addOperator(source, sing, additionalInfo)
	}

	public addFunction (sing:string, source:any, additionalInfo?: FunctionAdditionalInfo):void {
		this.model.addFunction(sing, source, additionalInfo)
	}

	public addEnum (key:string, values:[string, any][] | any):void {
		this.model.addEnum(key, values)
	}

	public addFormat (key:string, pattern:string):void {
		this.model.addFormat(key, pattern)
	}

	public addConstant (key:string, value:any):void {
		this.model.addConstant(key, value)
	}

	public addOperatorAlias (alias:string, reference:string):void {
		this.model.addOperatorAlias(alias, reference)
	}

	public addFunctionAlias (alias:string, reference:string):void {
		this.model.addFunctionAlias(alias, reference)
	}

	public addOperandBuilder (builder:IOperandBuilder):void {
		this.operandService.addBuilder(builder)
	}

	/**
	 * Convert a lambda expression to a query expression
	 * @param lambda lambda expression
	 * @returns Expression manager
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression (func: Function): string {
		return this.convertFromFunction.toExpression(func)
	}

	public graphqlToExpression (graphql: string): [string, any ] {
		return this.convertFromGraphql.toExpression(graphql)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): Parameter[] {
		const operand = this.operandService.typed(expression, 'basic')
		return this.parameterService.parameters(operand)
	}

	/**
	 * Get type of expression
	 * @param expression  expression
	 * @returns Type of expression
	 */
	public type (expression: string): string {
		const operand = this.operandService.typed(expression, 'basic')
		return Type.stringify(operand.returnType)
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluate expression
	 */
	public eval (expression: string, data?: any): any {
		const context = new Context(new Data(data))
		try {
			this.beforeExecutionNotify(expression, context)
			const operand = this.operandService.build(expression, 'basic', true)
			const result = operand.eval(context)
			this.afterExecutionNotify(expression, context, result)
			return result
		} catch (error) {
			this.errorExecutionNotify(expression, context, error)
			throw error
		}
	}

	public run (expression: string, data: any = {}): any {
		const context = new Context(new Data(data))
		try {
			this.beforeExecutionNotify(expression, context)
			const operand = this.operandService.build(expression, 'process', true)
			const result = operand.eval(context)
			this.afterExecutionNotify(expression, context, result)
			return result
		} catch (error) {
			this.errorExecutionNotify(expression, context, error)
			throw error
		}
	}

	// Listeners and subscribers
	public subscribe (observer:ActionObserver):void {
		this.observers.push(observer)
	}

	public unsubscribe (observer:ActionObserver): void {
		const index = this.observers.indexOf(observer)
		if (index === -1) {
			throw new Error('Subject: Nonexistent observer.')
		}
		this.observers.splice(index, 1)
	}

	public build (expression: string, useCache:boolean): Operand {
		return this.operandService.build(expression, 'basic', useCache)
	}

	public clone (source:Operand):Operand {
		return this.operandService.clone(source, 'basic')
	}

	private beforeExecutionNotify (expression:string, context: Context) {
		const args = { expression, context }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.before(args)
			} else {
				if (this.eval(observer.condition, context)) {
					observer.before(args)
				}
			}
		})
	}

	private afterExecutionNotify (expression:string, context: Context, result:any) {
		const args = { expression, context, result }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.after(args)
			} else {
				if (this.eval(observer.condition, context)) {
					observer.after(args)
				}
			}
		})
	}

	private errorExecutionNotify (expression:string, context: Context, error:any) {
		const args = { expression, context, error }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.error(args)
			} else {
				if (this.eval(observer.condition, context)) {
					observer.error(args)
				}
			}
		})
	}
}
