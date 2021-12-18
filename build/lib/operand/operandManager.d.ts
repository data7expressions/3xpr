import { Node, ExpressionConfig } from '../parser/index';
import { Data } from '../model';
import { Operand } from './operands';
import { OperandMetadata } from '.';
export declare class OperandManager {
    private metadata;
    expressionConfig: ExpressionConfig;
    constructor(metadata: OperandMetadata, expressionConfig: ExpressionConfig);
    build(node: Node): Operand;
    serialize(operand: Operand): any;
    deserialize(serialized: any): Operand;
    eval(operand: Operand, data: Data): any;
    private initialize;
    private reduce;
    private reduceOperand;
    private setParent;
    private nodeToOperand;
    private createOperand;
    private solveTypes;
}
