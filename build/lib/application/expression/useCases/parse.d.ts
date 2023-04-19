import { Operand, IModelService } from '../../../domain';
export declare class ExpressionParse {
    private readonly model;
    constructor(model: IModelService);
    parse(expression: [string, number, number][]): Operand;
}
