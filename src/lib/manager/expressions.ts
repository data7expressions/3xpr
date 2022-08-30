import { Cache, Data, Parameter } from '../model'
import { ParserManager, ExpressionConfig } from '../parser'
import { OperandManager, Operand } from '../operand'
import { MemoryCache } from './memoryCache'
import { CoreLib } from '../operand/lib/coreLib'

export class Expressions {
	private cache: Cache
	private parserManager: ParserManager
	private expressionConfig: ExpressionConfig
	private operandManager: OperandManager

	constructor () {
		this.cache = new MemoryCache()
		this.expressionConfig = new ExpressionConfig()
		this.expressionConfig.addLibrary(new CoreLib())
		this.operandManager = new OperandManager(this.expressionConfig)
		this.parserManager = new ParserManager(this.expressionConfig)
	}

	private static _instance: Expressions
	public static get instance (): Expressions {
		if (!this._instance) {
			this._instance = new Expressions()
		}
		return this._instance
	}

	public get parser (): ParserManager {
		return this.parserManager
	}

	public get config (): ExpressionConfig {
		return this.expressionConfig
	}

	public get operand (): OperandManager {
		return this.operandManager
	}

	public parse (expression: string): Operand {
		const minifyExpression = this.parser.minify(expression)
		const key = `${minifyExpression}_operand`
		const value = this.cache.get(key)
		if (!value) {
			const node = this.parserManager.parse(minifyExpression)
			this.parserManager.setParent(node)
			const operand = this.operandManager.build(node)
			this.cache.set(key, this.operandManager.serialize(operand))
			return operand
		} else {
			return this.operandManager.deserialize(value)
		}
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluate expression
	 */
	public eval (expression: string, data?: any): any {
		const operand = this.parse(expression)
		const _data = new Data(data !== undefined ? data : {})
		return this.operandManager.eval(operand, _data)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): Parameter[] {
		const operand = this.parse(expression)
		return this.operandManager.parameters(operand)
	}
}
