import { Factory, MemoryCache } from 'h3lp'
import { ModelService } from './model/application'
import { Expressions } from './expression/application'
import { Parameter, ActionObserver, Operand } from './shared/domain'
import { Helper } from './shared/application'
Factory.add('exp.operand.cache', new MemoryCache<string, Operand>())
Factory.add('exp.model.service', new ModelService())
export * from './shared/domain'
export * from './shared/application'
export * from './model/domain'
export * from './model/application'
export * from './operand/domain'
export * from './operand/application'
export * from './operand/infrastructure'
export * from './expression/application'
export * from './expression/infrastructure'
export const helper = new Helper()
export const expressions = new Expressions()
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
