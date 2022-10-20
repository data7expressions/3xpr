import { Type, Data, Operand, Context, IExpressions, IBuilder, ICache, Parameter, Format, IOperandBuilder, OperatorMetadata, ITypeManager, IModelManager, ActionObserver, FunctionAdditionalInfo, OperatorAdditionalInfo } from './contract'
import { ModelManager, nodeHelper } from './parser'
import { TypeManager, CoreLibrary, OperandFactory } from './operand'
import { ProcessOperandFactory } from './process'
import { MemoryCache } from './core'
import { OperandBuilder } from '.'

// eslint-disable-next-line no-use-before-define
export class ExpressionsBuilder implements IBuilder<IExpressions> {
	public build ():IExpressions {
		const model = new ModelManager()
		const typeManager = new TypeManager(model)
		const basic = new OperandBuilder(model, new OperandFactory(model))
		const process = new OperandBuilder(model, new ProcessOperandFactory(model))
		// const operandManager = new OperandManager(model)
		new CoreLibrary(model).load()
		return new Expressions(model, basic, process, typeManager)
	}
}

export class Expressions implements IExpressions {
	private cache: ICache<Operand>
	private observers:ActionObserver[]=[];
	constructor (private readonly model: IModelManager, private readonly basic:IOperandBuilder, private readonly process:IOperandBuilder, private readonly type: ITypeManager) {
		this.cache = new MemoryCache<Operand>()
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

	public addOperator (source:any, sing:string, additionalInfo: OperatorAdditionalInfo):void {
		this.model.addOperator(source, sing, additionalInfo)
	}

	public addFunction (source:any, sing:string, additionalInfo?: FunctionAdditionalInfo):void {
		this.model.addFunction(source, sing, additionalInfo)
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

	public clone (operand: Operand):Operand {
		// TODO: resolver si el operand es process y no basic
		return this.basic.clone(operand)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): Parameter[] {
		const operand = this.typed(expression)
		return this.type.parameters(operand)
	}

	/**
	 * Get type of expression
	 * @param expression  expression
	 * @returns Type of expression
	 */
	public getType (expression: string): string {
		const operand = this.typed(expression)
		return Type.toString(operand.returnType)
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluate expression
	 */
	public eval (expression: string, data?: any): any {
		try {
			this.beforeExecutionNotify(expression, data)
			const operand = this.basicBuild(expression)
			const context = new Context(new Data(data))
			const result = operand.eval(context)
			this.afterExecutionNotify(expression, data, result)
			return result
		} catch (error) {
			this.errorExecutionNotify(expression, data, error)
			throw error
		}
	}

	public run (expression: string, data?: any): any {
		try {
			this.beforeExecutionNotify(expression, data)
			const operand = this.processBuild(expression)
			const context = new Context(new Data(data))
			const result = operand.eval(context)
			this.afterExecutionNotify(expression, data, result)
			return result
		} catch (error) {
			this.errorExecutionNotify(expression, data, error)
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

	private basicBuild (expression: string): Operand {
		try {
			const minifyExpression = nodeHelper.minify(expression)
			const key = `${minifyExpression.join('')}_operand`
			const value = this.cache.get(key)
			if (!value) {
				const operand = this.basic.build(minifyExpression)
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
			const minifyExpression = nodeHelper.minify(expression)
			const key = `${minifyExpression.join('')}_process`
			const value = this.cache.get(key)
			if (!value) {
				const operand = this.process.build(minifyExpression)
				this.cache.set(key, operand)
				return operand
			} else {
				return value
			}
		} catch (error: any) {
			throw new Error('expression: ' + expression + ' error: ' + error.toString())
		}
	}

	private typed (expression: string): Operand {
		const minifyExpression = nodeHelper.minify(expression)
		const key = `${minifyExpression.join('')}_operand`
		const value = this.cache.get(key) as Operand
		if (!value) {
			const operand = this.basic.build(minifyExpression)
			this.type.solve(operand)
			this.cache.set(key, operand)
			return operand
		} else if (value.returnType === undefined) {
			this.type.solve(value)
			this.cache.set(key, value)
			return value
		} else {
			return value
		}
	}

	private beforeExecutionNotify (expression:string, data: any) {
		const args = { expression: expression, data: data }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.before(args)
			} else {
				if (this.eval(observer.condition, data)) {
					observer.before(args)
				}
			}
		})
	}

	private afterExecutionNotify (expression:string, data: any, result:any) {
		const args = { expression: expression, data: data, result: result }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.after(args)
			} else {
				if (this.eval(observer.condition, data)) {
					observer.after(args)
				}
			}
		})
	}

	private errorExecutionNotify (expression:string, data: any, error:any) {
		const args = { expression: expression, data: data, error: error }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.error(args)
			} else {
				if (this.eval(observer.condition, data)) {
					observer.error(args)
				}
			}
		})
	}
}
