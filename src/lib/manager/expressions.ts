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

	public parse (expression: string): Operand {
		try {
			const minfyExpression = this.parser.minify(expression)
			const key = `${minfyExpression}_operand`
			let operand = this.cache.get(key)
			if (!operand) {
				const node = this.parserManager.parse(minfyExpression)
				this.parserManager.setParent(node)
				operand = this.operandManager.build(node)
				this.cache.set(key, this.operandManager.clone(operand))
			}
			return operand as Operand
		} catch (error: any) {
			console.log(error)
			throw new Error('build expression: ' + expression + ' error: ' + error.toString())
		}
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluale expression
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
