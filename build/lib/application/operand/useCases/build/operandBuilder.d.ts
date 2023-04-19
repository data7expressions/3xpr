import { Operand, IOperandBuilder, IEvaluatorFactory, IModelService } from '../../../../domain';
import { OperandNormalize, OperandReduce } from '../../';
import { ExpressionNormalize, ExpressionParse } from '../../../expression';
export declare abstract class OperandBuilder implements IOperandBuilder {
    protected readonly evaluatorFactory: IEvaluatorFactory;
    protected expressionNormalize: ExpressionNormalize;
    protected expressionParse: ExpressionParse;
    protected normalize: OperandNormalize;
    protected reduce: OperandReduce;
    constructor(evaluatorFactory: IEvaluatorFactory, modelService: IModelService);
    abstract get key(): string;
    build(expression: string): Operand;
    clone(source: Operand): Operand;
    protected complete(operand: Operand, index?: number, parentId?: string): void;
}
