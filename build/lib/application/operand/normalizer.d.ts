import { Operand, IModelService, IOperandNormalizer } from '../../domain';
export declare class OperandNormalizer implements IOperandNormalizer {
    protected readonly model: IModelService;
    constructor(model: IModelService);
    normalize(operand: Operand): Operand;
    protected normalizeOperand(operand: Operand): void;
}
