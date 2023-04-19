import { H3lp, StringHelper } from 'h3lp';
import { OperandHelper } from './operandHelper';
export declare class ExpressionHelper {
    private readonly str;
    constructor(str: StringHelper);
    clearLambda(func: Function): string;
}
export declare class ExpHelper extends H3lp {
    operand: OperandHelper;
    expression: ExpressionHelper;
    constructor();
}
export declare const helper: ExpHelper;
