import { Operand, IModelService } from '../../../domain';
export declare class OperandNormalize {
    protected readonly model: IModelService;
    constructor(model: IModelService);
    normalize(operand: Operand): Operand;
    protected normalizeOperand(operand: Operand): void;
}
