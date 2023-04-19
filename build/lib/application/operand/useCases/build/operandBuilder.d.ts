import { Operand, IOperandBuilder, IEvaluatorFactory, IOperandNormalizer, IOperandReducer, IExpressionNormalize, IExpressionParse } from '../../../../domain';
export declare abstract class OperandBuilder implements IOperandBuilder {
    protected readonly expressionNormalize: IExpressionNormalize;
    protected readonly expressionParse: IExpressionParse;
    protected readonly normalizer: IOperandNormalizer;
    protected readonly reducer: IOperandReducer;
    protected readonly evaluatorfactory: IEvaluatorFactory;
    constructor(expressionNormalize: IExpressionNormalize, expressionParse: IExpressionParse, normalizer: IOperandNormalizer, reducer: IOperandReducer, evaluatorfactory: IEvaluatorFactory);
    abstract get key(): string;
    build(expression: string): Operand;
    clone(source: Operand): Operand;
    protected complete(operand: Operand, index?: number, parentId?: string): void;
}
