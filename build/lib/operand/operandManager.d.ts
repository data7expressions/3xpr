import { Node, ExpressionConfig } from '../parser/index';
import { Data } from '../model';
import { Operand } from './operands';
export declare class OperandManager {
    private expressionConfig;
    constructor(expressionConfig: ExpressionConfig);
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
