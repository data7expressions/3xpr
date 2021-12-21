import { ParserManager, ExpressionConfig } from '../parser';
import { OperandMetadata, Operand } from '../operand';
export declare class Expressions {
    private cache;
    private parserManager;
    private operandMetadata;
    private expressionConfig;
    private operandManager;
    constructor();
    private static _instance;
    static get instance(): Expressions;
    get metadata(): OperandMetadata;
    get parser(): ParserManager;
    get config(): ExpressionConfig;
    parse(expression: string): Operand;
    /**
     * Evaluate and solve expression
     * @param expression  string expression
     * @param data Data with variables
     * @returns Result of the evaluale expression
     */
    eval(expression: string, data?: any): any;
}
