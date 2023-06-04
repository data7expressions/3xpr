import { Factory } from 'h3lp'
import { Parameter, ActionObserver } from './shared/domain'
import { ExpressionsBuilder, HelperBuilder } from './expression/infrastructure'

export * from './shared/domain'
export * from './shared/application'
export * from './model/domain'
export * from './model/application'
export * from './operand/domain'
export * from './operand/application'
export * from './operand/infrastructure'
export * from './expression/domain'
export * from './expression/application'
export * from './expression/infrastructure'
export const helper = new HelperBuilder().build()
export const expressions = new ExpressionsBuilder(helper).build()
Factory.add('expressions', expressions)

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
