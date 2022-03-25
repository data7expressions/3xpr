import { Node, ExpressionConfig } from '../parser/index';
import { Data, Parameter } from '../model';
import { Operand } from './operands';
export interface OperandMetadata {
    classtype: string;
    name: string;
    children?: OperandMetadata[];
    type?: string;
    property?: string;
    parameters?: Parameter[];
    clause?: string;
    alias?: string;
    number?: number;
}
export declare class OperandManager {
    private expressionConfig;
    constructor(expressionConfig: ExpressionConfig);
    build(node: Node): Operand;
    clone(value: Operand): Operand;
    serialize(operand: Operand): OperandMetadata;
    deserialize(value: OperandMetadata): Operand;
    eval(operand: Operand, data: Data): any;
    parameters(operand: Operand): Parameter[];
    private loadParameters;
    private initialize;
    private reduce;
    private reduceOperand;
    private setParent;
    private nodeToOperand;
    private createOperand;
    private solveTypes;
}
