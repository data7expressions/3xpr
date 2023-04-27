import { Parameter, ActionObserver } from './commons/domain';
import { Helper } from './commons/application';
export declare const helper: Helper;
export declare const expressions: import("./operand/application").IExpressions;
export * from './commons/domain';
export * from './commons/application';
export * from './model/domain';
export * from './model/application';
export * from './operand/domain';
export * from './operand/application';
export * from './expression/application';
export * from './expression/infrastructure';
export * from './operand/infrastructure';
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
export declare const run: (expression: string, data?: any) => any;
export declare const subscribe: (observer: ActionObserver) => void;
export declare const unsubscribe: (observer: ActionObserver) => void;
