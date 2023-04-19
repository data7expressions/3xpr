import { Operand, IEvaluator, IEvaluatorFactory, IModelService } from '../../../../domain';
export declare class ProcessOperandFactory implements IEvaluatorFactory {
    protected readonly model: IModelService;
    constructor(model: IModelService);
    protected createOperator(operand: Operand): IEvaluator;
    protected createFunction(operand: Operand): IEvaluator;
    create(operand: Operand): IEvaluator | undefined;
}
