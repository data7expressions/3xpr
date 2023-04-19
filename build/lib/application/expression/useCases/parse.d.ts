import { Operand, IModelService, IExpressionParse } from '../../../domain';
export declare class ExpressionParse implements IExpressionParse {
    private readonly model;
    constructor(model: IModelService);
    parse(expression: [string, number, number][]): Operand;
}
