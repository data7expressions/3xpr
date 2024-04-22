import { Parameter, ActionObserver } from './shared/domain'
import { ExprH3lp } from './shared/infrastructure'
import { ExpressionsBuilder } from './expression/infrastructure/expressionsBuilder'
import { typeH3lp } from 'typ3s'

export * from './shared/domain'
export * from './shared/infrastructure'
export * from './model/domain'
export * from './model/application'
export * from './operand/domain'
export * from './operand/application'
export * from './operand/infrastructure'
export * from './expression/domain'
export * from './expression/application'
export * from './expression/infrastructure'
export const exprHelper = new ExprH3lp(typeH3lp)
export const expressions = new ExpressionsBuilder(exprHelper).build()

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

export const evalAsync = (expression: string, data?: any): Promise<any> => {
	return expressions.evalAsync(expression, data)
}

export const subscribe = (observer:ActionObserver):void => {
	expressions.subscribe(observer)
}

export const unsubscribe = (observer:ActionObserver): void => {
	expressions.subscribe(observer)
}
