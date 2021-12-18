import { Cache, Data } from '../model'
import { ParserManager, ExpressionConfig } from '../parser'
import { OperandManager, OperandMetadata, Operand, Library } from '../operand'
import { MemoryCache } from './memoryCache'
import { CoreLib } from '../operand/lib/coreLib'

export class Expressions {
	private cache: Cache
	private parserManager: ParserManager
	private operandMetadata:OperandMetadata
	private expressionConfig: ExpressionConfig
	private operandManager: OperandManager

	constructor () {
		this.cache = new MemoryCache()
		this.expressionConfig = new ExpressionConfig()
		this.operandMetadata = new OperandMetadata()
		this.operandMetadata.addLibrary(new CoreLib())
		this.operandManager = new OperandManager(this.operandMetadata, this.expressionConfig)
		this.parserManager = new ParserManager(this.expressionConfig)
	}

	private static _instance: Expressions
	public static get instance (): Expressions {
		if (!this._instance) {
			this._instance = new Expressions()
		}
		return this._instance
	}

	public addLibrary (library:Library):void {
		this.operandMetadata.addLibrary(library)
	}

	/**
	 * Build expression
	 * @param expression expression to build
	 * @returns Operand
	 */
	public parse (expression: string): Operand {
		try {
			const key = 'operand_' + expression
			let operand = this.cache.get(key)
			if (!operand) {
				const node = this.parserManager.parse(expression)
				this.parserManager.setParent(node)
				operand = this.operandManager.build(node)
				this.cache.set(key, operand)
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
}
