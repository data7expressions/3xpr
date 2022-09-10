import { Cache, Data, Parameter } from '../model'
import { ParserManager } from '../parser'
import { OperandManager, Operand } from '../operand'

export class ExpressionsManager {
	private cache: Cache
	private parserManager: ParserManager
	private operandManager: OperandManager

	constructor (cache:Cache, operandManager:OperandManager, parserManager:ParserManager) {
		this.cache = cache
		this.operandManager = operandManager
		this.parserManager = parserManager
	}

	public parse (expression: string): Operand {
		const minifyExpression = this.parserManager.minify(expression)
		const key = `${minifyExpression}_operand`
		const value = this.cache.get(key)
		if (!value) {
			const node = this.parserManager.parse(minifyExpression)
			this.parserManager.setParent(node)
			const operand = this.operandManager.build(node)
			this.cache.set(key, operand)
			// this.cache.set(key, this.operandManager.serialize(operand))
			return operand
		} else {
			// return this.operandManager.deserialize(value)
			return value
		}
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
}
