import { IExpressionNormalize } from '../../../domain';
export declare class ExpressionNormalize implements IExpressionNormalize {
    normalize(expression: string): [string, number, number][];
}
