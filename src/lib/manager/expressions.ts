import { IExpressions, IBuilder, Cache, Data, Operand, Parameter, Format, OperatorMetadata, IOperandTypeManager, IModelManager, ActionObserver, ISerializer, IOperandBuilder, Context } from '../model'
import { Parser, ModelManager } from '../parser'
import { OperandBuilder, OperandTypeManager, OperandSerializer, CoreLibrary } from '../operand'
import { Helper, MemoryCache } from '.'

// eslint-disable-next-line no-use-before-define
export class ExpressionsBuilder implements IBuilder<IExpressions> {
	public build ():IExpressions {
		const cache = new MemoryCache()
		const expressionConfig = new ModelManager()
		const typeManager = new OperandTypeManager(expressionConfig)
		const serializer = new OperandSerializer(expressionConfig)
		const operandBuilder = new OperandBuilder(expressionConfig)
		new CoreLibrary(expressionConfig).load()
		return new Expressions(cache, expressionConfig, serializer, operandBuilder, typeManager)
	}
}

export class Expressions implements IExpressions {
	private cache: Cache
	private model: IModelManager
	private observers:ActionObserver[]=[];
	private operandBuilder: IOperandBuilder
	private typeManager: IOperandTypeManager
	private serializer: ISerializer<Operand>

	constructor (cache:Cache, model: IModelManager, serializer:ISerializer<Operand>, operandBuilder:IOperandBuilder, typeManager: IOperandTypeManager) {
		this.cache = cache
		this.model = model
		this.serializer = serializer
		this.operandBuilder = operandBuilder
		this.typeManager = typeManager
	}

	private static _instance: IExpressions
	public static get instance (): IExpressions {
		if (!this._instance) {
			this._instance = new ExpressionsBuilder().build()
		}
		return this._instance
	}

	public get operators (): OperatorMetadata[] {
		return this.model.operators
	}

	public get enums (): any {
		return this.model.enums
	}

	public get formats (): any {
		return this.model.formats
	}

	public get constants (): any {
		return this.model.constants
	}

	public get functions (): OperatorMetadata[] {
		return this.model.functions
	}

	public addFunction (source:any, sing:string, deterministic?:boolean):void {
		this.model.addFunction(source, sing, deterministic)
	}

	public addEnum (key:string, source:any):void {
		this.model.addEnum(key, source)
	}

	public addFormat (key:string, pattern:string):void {
		this.model.addFormat(key, pattern)
	}

	public addConstant (key:string, value:any):void {
		this.model.addConstant(key, value)
	}

	public addAlias (alias:string, reference:string):void {
		this.model.addAlias(alias, reference)
	}

	public isEnum (name:string): boolean {
		return this.model.isEnum(name)
	}

	public getEnumValue (name:string, option:string):any {
		return this.model.getEnumValue(name, option)
	}

	public getEnum (name:string):any {
		return this.model.getEnum(name)
	}

	public isConstant (name:string): boolean {
		return this.model.isConstant(name)
	}

	public getConstantValue (name:string):any {
		return this.model.getConstantValue(name)
	}

	public getFormat (name:string): Format | undefined {
		return this.model.getFormat(name)
	}

	public getOperator (operator:string, operands?:number): OperatorMetadata {
		return this.model.getOperator(operator, operands)
	}

	public getFunction (name: string): OperatorMetadata {
		return this.model.getFunction(name)
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
		const parser = new Parser(this.model, buffer)
		const node = parser.parse()
		Helper.exp.clearChildEmpty(node)
		const operand = this.operandBuilder.build(node)
		return operand
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
