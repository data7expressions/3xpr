import { Expressions } from './expressions'
import { Parameter, ActionObserver, ValidateResult, Schema } from './model'
import { Operand } from './operand'

export * from './model'
export * from './operand'
export * from './manager'
export * from './parser'
export const expressions = Expressions.instance

/**
	 * Parser expression
	 * @param expression  expression
	 * @returns Operand
	 */
export const parse = (expression: string): Operand => {
	return expressions.parse(expression)
}

/**
 * Get parameters of expression
 * @param expression  expression
 * @returns Parameters of expression
 */
export const parameters = (expression: string): Parameter[] => {
	return expressions.parameters(expression)
}

/**
 * Evaluate and solve expression
 * @param expression  string expression
 * @param data Data with variables
 * @returns Result of the evaluate expression
 */
export const evaluate = (expression: string, data?: any): any => {
	return expressions.eval(expression, data)
}

export const addSchema = (schema:Schema):Schema => {
	return expressions.addSchema(schema)
}

export const validate = async (schema: string|Schema, data:any) : Promise<ValidateResult> => {
	return expressions.validate(schema, data)
}

export const subscribe = (observer:ActionObserver):void => {
	expressions.subscribe(observer)
}

export const unsubscribe = (observer:ActionObserver): void => {
	expressions.subscribe(observer)
}
