import { Cache, Data, Operand, Parameter, Format, OperatorMetadata, IOperandTypeManager, IExpressionConfig, ActionObserver, ISerializer, IOperandBuilder, Context } from '../model'
import { Parser } from '../parser'
import { OperandBuilder, OperandTypeManager, OperandSerializer } from './../operand'
import { Helper, MemoryCache } from '.'
import { ExpressionConfigBuilder } from './expressionConfigBuilder'

export class ExpressionsBuilder {
	public build ():Expressions {
		const cache = new MemoryCache()
		const expressionConfig = new ExpressionConfigBuilder().build()
		const typeManager = new OperandTypeManager(expressionConfig)
		const serializer = new OperandSerializer(expressionConfig)
		const operandBuilder = new OperandBuilder(expressionConfig)
		return new Expressions(cache, expressionConfig, serializer, operandBuilder, typeManager)
	}
}

export class Expressions {
	private cache: Cache
	private config: IExpressionConfig
	private observers:ActionObserver[]=[];
	private operandBuilder: IOperandBuilder
	private typeManager: IOperandTypeManager
	private serializer: ISerializer<Operand>

	constructor (cache:Cache, config: IExpressionConfig, serializer:ISerializer<Operand>, operandBuilder:IOperandBuilder, typeManager: IOperandTypeManager) {
		this.cache = cache
		this.config = config
		this.serializer = serializer
		this.operandBuilder = operandBuilder
		this.typeManager = typeManager
	}

	private static _instance: Expressions
	public static get instance (): Expressions {
		if (!this._instance) {
			this._instance = new ExpressionsBuilder().build()
		}
		return this._instance
	}

	public get operators (): OperatorMetadata[] {
		return this.config.operators
	}

	public get enums (): any {
		return this.config.enums
	}

	public get formats (): any {
		return this.config.formats
	}

	public get functions (): OperatorMetadata[] {
		return this.config.functions
	}

	public addFunction (source:any, sing:string, deterministic?:boolean):void {
		this.config.addFunction(source, sing, deterministic)
	}

	public addEnum (key:string, source:any):void {
		this.config.addEnum(key, source)
	}

	public addFormat (key:string, pattern:string):void {
		this.config.addFormat(key, pattern)
	}

	public addConstant (key:string, value:any):void {
		this.config.addConstant(key, value)
	}

	public refresh ():void {
		this.config.refresh()
	}

	public addAlias (alias:string, reference:string):void {
		this.config.addAlias(alias, reference)
	}

	public isEnum (name:string): boolean {
		return this.config.isEnum(name)
	}

	public getEnumValue (name:string, option:string):any {
		return this.config.getEnumValue(name, option)
	}

	public getEnum (name:string):any {
		return this.config.getEnum(name)
	}

	public isConstant (name:string): boolean {
		return this.config.isConstant(name)
	}

	public getConstantValue (name:string):any {
		return this.config.getConstantValue(name)
	}

	public getFormat (name:string): Format | undefined {
		return this.config.getFormat(name)
	}

	public getOperator (operator:string, operands?:number): OperatorMetadata {
		return this.config.getOperator(operator, operands)
	}

	public getFunction (name: string): OperatorMetadata {
		return this.config.getFunction(name)
	}

	public clone (operand: Operand):Operand {
		return this.serializer.clone(operand)
	}

	/**
	 * Parser expression
	 * @param expression  expression
	 * @returns Operand
	 */
	public parse (expression: string): Operand {
		try {
			const minifyExpression = Helper.exp.minify(expression)
			const key = `${minifyExpression.join('')}_operand`
			const value = this.cache.get(key)
			if (!value) {
				const operand = this._parse(minifyExpression)
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
		const minifyExpression = Helper.exp.minify(expression)
		const key = `${minifyExpression.join('')}_operand`
		const value = this.cache.get(key) as Operand
		if (!value) {
			const operand = this._parse(minifyExpression)
			this.typeManager.solve(operand)
			this.cache.set(key, operand)
			return operand
		} else if (value.type === undefined) {
			this.typeManager.solve(value)
			this.cache.set(key, value)
			return value
		} else {
			return value
		}
	}

	private _parse (buffer: string[]): Operand {
		const parser = new Parser(this.config, buffer)
		const node = parser.parse()
		Helper.exp.clearChildEmpty(node)
		const operand = this.operandBuilder.build(node)
		return operand
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
	public getType (expression: string): string {
		const operand = this.typed(expression)
		return Helper.type.toString(operand.type)
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluate expression
	 */
	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluate expression
	 */
	public eval (expression: string, data?: any): any {
		try {
			this.beforeExecutionNotify(expression, data)
			const operand = this.parse(expression)
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
