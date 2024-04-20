import { Parameter, ActionObserver } from './shared/domain';
import { ExprH3lp } from './shared/infrastructure';
export * from './shared/domain';
export * from './shared/infrastructure';
export * from './model/domain';
export * from './model/application';
export * from './operand/domain';
export * from './operand/application';
export * from './operand/infrastructure';
export * from './expression/domain';
export * from './expression/application';
export * from './expression/infrastructure';
export declare const exprHelper: ExprH3lp;
export declare const expressions: import("./expression/domain").Expressions;
/**
 * Get parameters of expression
 * @param expression  expression
 * @returns Parameters of expression
 */
export declare const parameters: (expression: string) => Parameter[];
/**
 * Evaluate and solve expression
 * @param expression  string expression
 * @param data Data with variables
 * @returns Result of the evaluate expression
 */
export declare const evaluate: (expression: string, data?: any) => any;
export declare const evalAsync: (expression: string, data?: any) => Promise<any>;
export declare const subscribe: (observer: ActionObserver) => void;
export declare const unsubscribe: (observer: ActionObserver) => void;
