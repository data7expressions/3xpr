import { Cache, Parameter } from '../model';
import { ParserManager } from '../parser';
import { OperandManager, Operand } from '../operand';
export declare class ExpressionsManager {
    private cache;
    private parserManager;
    private operandManager;
    constructor(cache: Cache, operandManager: OperandManager, parserManager: ParserManager);
    parse(expression: string): Operand;
    /**
     * Get parameters of expression
     * @param expression  expression
     * @returns Parameters of expression
     */
    parameters(expression: string): Parameter[];
    /**
     * Evaluate and solve expression
     * @param expression  string expression
     * @param data Data with variables
     * @returns Result of the evaluate expression
     */
    eval(expression: string, data?: any): any;
}
