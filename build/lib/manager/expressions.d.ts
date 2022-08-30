import { Parameter } from '../model';
import { ParserManager, ExpressionConfig } from '../parser';
import { OperandManager, Operand } from '../operand';
export declare class Expressions {
    private cache;
    private parserManager;
    private expressionConfig;
    private operandManager;
    constructor();
    private static _instance;
    static get instance(): Expressions;
    get parser(): ParserManager;
    get config(): ExpressionConfig;
    get operand(): OperandManager;
    parse(expression: string): Operand;
    /**
     * Evaluate and solve expression
     * @param expression  string expression
     * @param data Data with variables
     * @returns Result of the evaluate expression
     */
    eval(expression: string, data?: any): any;
    /**
     * Get parameters of expression
     * @param expression  expression
     * @returns Parameters of expression
     */
    parameters(expression: string): Parameter[];
}
