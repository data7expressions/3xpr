import { Operand, IModelService } from '../../../domain';
export declare class OperandReduce {
    protected readonly model: IModelService;
    constructor(model: IModelService);
    reduce(operand: Operand): Operand;
    protected reduceOperand(operand: Operand): Operand;
}
