import { Operand, IModelService, IOperandReducer } from '../../../domain';
export declare class OperandReducer implements IOperandReducer {
    protected readonly model: IModelService;
    constructor(model: IModelService);
    reduce(operand: Operand): Operand;
    protected reduceOperand(operand: Operand): Operand;
}
