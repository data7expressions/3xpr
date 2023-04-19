import { IOperandNormalizer, IOperandReducer, IExpressionNormalize, IExpressionParse, IModelService } from '../../../../domain';
import { OperandBuilder } from './operandBuilder';
export declare class BasicOperandBuilder extends OperandBuilder {
    constructor(expressionNormalize: IExpressionNormalize, expressionParse: IExpressionParse, normalizer: IOperandNormalizer, reducer: IOperandReducer, model: IModelService);
    get key(): string;
}
