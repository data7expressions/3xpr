import { Expressions, Parameter, ActionObserver, Operand } from './expression'
export * from './expression'

export const expressions = Expressions.instance

/**
	 * Parser expression
	 * @param expression  expression
	 * @returns Operand
	 */
export const build = (expression: string): Operand => {
	return expressions.build(expression)
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

export const subscribe = (observer:ActionObserver):void => {
	expressions.subscribe(observer)
}

export const unsubscribe = (observer:ActionObserver): void => {
	expressions.subscribe(observer)
}
