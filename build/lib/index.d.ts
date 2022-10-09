import { Parameter, ActionObserver, Operand } from './expression';
export * from './expression';
export declare const expressions: import("./expression").IExpressions;
/**
     * Parser expression
     * @param expression  expression
     * @returns Operand
     */
export declare const build: (expression: string) => Operand;
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
export declare const subscribe: (observer: ActionObserver) => void;
export declare const unsubscribe: (observer: ActionObserver) => void;
