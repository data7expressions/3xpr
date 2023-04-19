import { IOperandService } from '../../domain';
export declare class ExpressionConvertFromFunction {
    private readonly operandService;
    constructor(operandService: IOperandService);
    /**
     * Convert a lambda expression to a query expression
     * @param lambda lambda expression
     * @returns Expression manager
     */
    toExpression(func: Function): string;
}
