import { Node, ExpressionConfig } from '../parser/index';
import { Parameter } from '../model';
import { Operand, IOperandTypeManager, IOperandManager } from './../model';
export declare class OperandManager implements IOperandManager {
    private expressionConfig;
    private typeManager;
    constructor(expressionConfig: ExpressionConfig, typeManager: IOperandTypeManager);
    build(node: Node): Operand;
    parameters(operand: Operand): Parameter[];
    private reduce;
    private reduceOperand;
    private nodeToOperand;
    private createOperand;
}
