import { Node, ExpressionConfig } from '../parser/index';
import { Data, Parameter } from '../model';
import { Operand } from './operands';
export interface OperandMetadata {
    classType: string;
    name: string;
    children?: OperandMetadata[];
    type?: string;
    property?: string;
    parameters?: Parameter[];
    clause?: string;
    alias?: string;
    number?: number;
}
export declare class OperandTypeManager {
    private expressionConfig;
    constructor(expressionConfig: ExpressionConfig);
    solve(operand: Operand): string;
    private solveVariableType;
    private solveArrayType;
    private solveArrowType;
    private elementType;
    private solveTypes;
}
export declare class OperandManager {
    private expressionConfig;
    private typeManager;
    constructor(expressionConfig: ExpressionConfig, typeManager: OperandTypeManager);
    build(node: Node): Operand;
    clone(value: Operand): Operand;
    serialize(operand: Operand): string;
    private _serialize;
    deserialize(value: string): Operand;
    private _deserialize;
    eval(operand: Operand, data: Data): any;
    parameters(operand: Operand): Parameter[];
    private loadParameters;
    initialize(operand: Operand): void;
    private reduce;
    private reduceOperand;
    private setParent;
    private nodeToOperand;
    private createOperand;
}
