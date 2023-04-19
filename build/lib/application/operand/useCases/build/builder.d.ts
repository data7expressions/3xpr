import { Operand, IOperandBuilder, IEvaluatorFactory, IOperandNormalizer, IOperandReducer, IExpressionNormalize, IExpressionParse } from '../../../../domain';
export declare class OperandBuilder implements IOperandBuilder {
    private readonly expressionNormalize;
    private readonly expressionParse;
    private readonly normalizer;
    private readonly reducer;
    private readonly factory;
    constructor(expressionNormalize: IExpressionNormalize, expressionParse: IExpressionParse, normalizer: IOperandNormalizer, reducer: IOperandReducer, factory: IEvaluatorFactory);
    build(expression: string): Operand;
    clone(source: Operand): Operand;
    private complete;
}
