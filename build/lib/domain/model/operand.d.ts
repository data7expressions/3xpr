import { Context, Parameter, Position } from '..';
import { Type } from 'typ3s';
export declare enum OperandType {
    Const = "Const",
    Var = "Var",
    Env = "Env",
    Property = "Property",
    Template = "Template",
    KeyVal = "KeyVal",
    List = "List",
    Obj = "Obj",
    Operator = "Operator",
    CallFunc = "CallFunc",
    Arrow = "Arrow",
    ChildFunc = "ChildFunc",
    Block = "Block",
    If = "If",
    ElseIf = "ElseIf",
    Else = "Else",
    While = "While",
    For = "For",
    ForIn = "ForIn",
    Switch = "Switch",
    Case = "Case",
    Default = "Default",
    Break = "Break",
    Continue = "Continue",
    Func = "Func",
    Return = "Return",
    Try = "Try",
    Catch = "Catch",
    Throw = "Throw",
    Args = "Args"
}
export interface ParameterDoc {
    name: string;
    description: string;
}
export interface OperatorDoc {
    description: string;
    params: ParameterDoc[];
}
export interface OperatorAdditionalInfo {
    priority: number;
    doc?: OperatorDoc;
}
export interface FunctionAdditionalInfo {
    deterministic?: boolean;
    doc?: OperatorDoc;
}
export interface IEvaluator {
    eval(context: Context): any;
}
export declare class Operand {
    readonly pos: Position;
    name: any;
    readonly type: OperandType;
    children: Operand[];
    returnType?: Type | undefined;
    evaluator?: IEvaluator;
    number?: number;
    id?: string;
    constructor(pos: Position, name: any, type: OperandType, children?: Operand[], returnType?: Type | undefined);
    eval(context: Context): any;
}
export declare abstract class Evaluator implements IEvaluator {
    protected readonly operand: Operand;
    constructor(operand: Operand);
    abstract eval(context: Context): any;
}
export declare abstract class PrototypeEvaluator implements IEvaluator {
    protected operand?: Operand | undefined;
    constructor(operand?: Operand | undefined);
    abstract clone(operand: Operand): IEvaluator;
    abstract eval(context: Context): any;
}
export interface OperandMetadata {
    pos: Position;
    type: OperandType;
    name: string;
    children?: OperandMetadata[];
    returnType?: string;
    number?: number;
}
export interface OperatorMetadata {
    params: Parameter[];
    deterministic: boolean;
    operands: number;
    returnType: string;
    doc?: OperatorDoc;
    priority?: number;
    function?: Function;
    custom?: PrototypeEvaluator;
}
