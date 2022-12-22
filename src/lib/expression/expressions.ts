import { Type, Data, Operand, Context, IExpressions, IBuilder, Parameter, Format, IOperandBuilder, OperatorMetadata, ITypeManager, IModelManager, ActionObserver, FunctionAdditionalInfo, OperatorAdditionalInfo } from './contract'
import { ModelManager, TypeManager, CoreLibrary, EvaluatorFactory, OperandReducer, OperandNormalizer } from './operand'
import { ProcessOperandFactory } from './process'
import { h3lp, MemoryCache, ICache } from 'h3lp'
import { OperandBuilder } from '.'

// eslint-disable-next-line no-use-before-define
export class ExpressionsBuilder implements IBuilder<IExpressions> {
	public build ():IExpressions {
		const model = new ModelManager()
		const typeManager = new TypeManager(model)
		const normalizer = new OperandNormalizer(model)
		const reducer = new OperandReducer(model)
		const basic = new OperandBuilder(model, normalizer, reducer, new EvaluatorFactory(model))
		const process = new OperandBuilder(model, normalizer, reducer, new ProcessOperandFactory(model))
		new CoreLibrary(model).load()
		return new Expressions(model, basic, process, typeManager)
	}
}

export class Expressions implements IExpressions {
	private cache: ICache<number, Operand>
	private processCache: ICache<number, Operand>
	private observers:ActionObserver[] = []
	constructor (private readonly model: IModelManager, private readonly basic:IOperandBuilder, private readonly process:IOperandBuilder, private readonly typeManager: ITypeManager) {
		this.cache = new MemoryCache<number, Operand>()
		this.processCache = new MemoryCache<number, Operand>()
	}

	private static _instance: IExpressions
	public static get instance (): IExpressions {
		if (!this._instance) {
			this._instance = new ExpressionsBuilder().build()
		}
		return this._instance
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

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): Parameter[] {
		const operand = this.typed(expression)
		return this.typeManager.parameters(operand)
	}

	/**
	 * Get type of expression
	 * @param expression  expression
	 * @returns Type of expression
	 */
	public type (expression: string): string {
		const operand = this.typed(expression)
		return Type.toString(operand.returnType)
	}

	public clone (source: Operand): Operand {
		return this.basic.clone(source)
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
			const operand = this.build(expression)
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
			const operand = this.processBuild(expression)
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
		try {
			const key = h3lp.utils.hashCode(expression)
			const value = this.cache.get(key)
			if (!value) {
				const operand = this.basic.build(expression)
				this.cache.set(key, operand)
				return operand
			} else {
				return value
			}
		} catch (error: any) {
			throw new Error('expression: ' + expression + ' error: ' + error.toString())
		}
	}

	private processBuild (expression: string): Operand {
		try {
			const key = h3lp.utils.hashCode(expression)
			const value = this.processCache.get(key)
			if (!value) {
				const operand = this.process.build(expression)
				this.processCache.set(key, operand)
				return operand
			} else {
				return value
			}
		} catch (error: any) {
			throw new Error('expression: ' + expression + ' error: ' + error.toString())
		}
	}

	private typed (expression: string): Operand {
		const key = h3lp.utils.hashCode(expression)
		const value = this.cache.get(key) as Operand
		if (!value) {
			const operand = this.basic.build(expression)
			this.typeManager.type(operand)
			this.cache.set(key, operand)
			return operand
		} else if (value.returnType === undefined) {
			this.typeManager.type(value)
			this.cache.set(key, value)
			return value
		} else {
			return value
		}
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
