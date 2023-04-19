import { Operand, IOperandBuilder, IModelService, IEvaluatorFactory, IOperandNormalizer, IOperandReducer } from '../../domain';
export declare class OperandBuilder implements IOperandBuilder {
    protected readonly model: IModelService;
    protected readonly normalizer: IOperandNormalizer;
    protected readonly reducer: IOperandReducer;
    protected readonly factory: IEvaluatorFactory;
    constructor(model: IModelService, normalizer: IOperandNormalizer, reducer: IOperandReducer, factory: IEvaluatorFactory);
    build(expression: string): Operand;
    clone(source: Operand): Operand;
    protected complete(operand: Operand, index?: number, parentId?: string): void;
}
