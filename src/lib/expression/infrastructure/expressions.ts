import { Type } from 'typ3s'
import { MemoryCache } from 'h3lp'
import { ModelService, Library } from '../../model/domain'
import { Data, Operand, Context, Parameter, Format, ActionObserver } from '../../shared/domain'
import { OperatorMetadata, FunctionAdditionalInfo, OperatorAdditionalInfo, ParameterService } from '../../operand/domain'
import { OperandClone, OperandSerializerImpl, ParameterServiceImpl } from '../../operand/application'
import { CoreLibrary } from './library'
import { OperandBuild, OperandBuilderCacheDecorator, OperandBuilderImpl } from '../application'
import { IExpressions } from '../domain'
import { ExpressionConvert } from '../application/useCases/convert'
import { ModelServiceImpl } from '../../model/application'
import { AsyncEvaluatorFactoryBuilder, ConstBuilderImpl, SyncEvaluatorFactoryBuilder } from '../../operand/infrastructure'
import { ExpressionConvertFunction } from './convertFrom/convertFromFunction'
import { ExpressionConvertGraphql } from './convertFrom/convertFromGraphql'

export class Expressions implements IExpressions {
	public model: ModelService
	private expressionConvert:ExpressionConvert
	private parameterService:ParameterService
	private operandBuild:OperandBuild
	private operandClone = new OperandClone()
	private observers:ActionObserver[] = []
	constructor () {
		const constBuilder = new ConstBuilderImpl()
		this.model = new ModelServiceImpl()
		this.parameterService = new ParameterServiceImpl()
		const operandSerializer = new OperandSerializerImpl()
		const syncEvaluatorFactory = new SyncEvaluatorFactoryBuilder(this.model).build()
		const asyncEvaluatorFactory = new AsyncEvaluatorFactoryBuilder(this.model).build()
		this.operandBuild = new OperandBuild()
			.add('sync',
				new OperandBuilderCacheDecorator(
					new OperandBuilderImpl(syncEvaluatorFactory, this.model, constBuilder),
					new MemoryCache<string, string>(),
					operandSerializer,
					syncEvaluatorFactory))
			.add('async', new OperandBuilderCacheDecorator(
				new OperandBuilderImpl(asyncEvaluatorFactory, this.model, constBuilder),
				new MemoryCache<string, string>(),
				operandSerializer,
				asyncEvaluatorFactory))

		this.expressionConvert = new ExpressionConvert()
			.add('function', new ExpressionConvertFunction(this.operandBuild.get('sync')))
			.add('graphql', new ExpressionConvertGraphql())

		new CoreLibrary(this.operandBuild.get('sync')).load(this.model)
	}

	public addLibrary (library:Library):IExpressions {
		library.load(this.model)
		return this
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

	public convert (source: any, from:string): [string, any] {
		return this.expressionConvert.convert(source, from)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): Parameter[] {
		const operand = this.operandBuild.build(expression, 'sync')
		return this.parameterService.parameters(operand)
	}

	/**
	 * Get type of expression
	 * @param expression  expression
	 * @returns Type of expression
	 */
	public type (expression: string): string {
		const operand = this.operandBuild.build(expression, 'sync')
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
			const operand = this.operandBuild.build(expression, 'sync')
			const result = operand.eval(context)
			this.afterExecutionNotify(expression, context, result)
			return result
		} catch (error) {
			this.errorExecutionNotify(expression, context, error)
			throw error
		}
	}

	public evalAsync (expression: string, data: any = {}): Promise<any> {
		const context = new Context(new Data(data))
		try {
			this.beforeExecutionNotify(expression, context)
			const operand = this.operandBuild.build(expression, 'async')
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

	public build (expression: string): Operand {
		return this.operandBuild.build(expression, 'sync')
	}

	public clone (source:Operand):Operand {
		return this.operandClone.clone(source, 'sync')
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
