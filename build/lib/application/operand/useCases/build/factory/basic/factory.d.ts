import { Operand, IEvaluator, IEvaluatorFactory, IModelService, Position } from '../../../../../../domain';
export declare class ConstBuilder {
    build(pos: Position, value: any): Operand;
}
export declare class EvaluatorFactory implements IEvaluatorFactory {
    protected readonly model: IModelService;
    constructor(model: IModelService);
    protected createOperator(operand: Operand): IEvaluator;
    protected createFunction(operand: Operand): IEvaluator;
    create(operand: Operand): IEvaluator | undefined;
}
