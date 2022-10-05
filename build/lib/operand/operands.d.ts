import { Context, Operand, Type, IExpressionModel } from '../model';
export declare class Constant extends Operand {
    constructor(name: string);
    eval(): any;
}
export declare class Variable extends Operand {
    number?: number;
    constructor(name: string, type?: Type);
    eval(context: Context): any;
}
export declare class EnvironmentVariable extends Operand {
    constructor(name: string);
    eval(): any;
}
export declare class Template extends Operand {
    constructor(name: string);
    eval(context: Context): any;
}
export declare class Property extends Operand {
    eval(context: Context): any;
}
export declare class KeyValue extends Operand {
    property?: string;
    constructor(name: string, children: Operand[] | undefined, property: string, type?: Type);
    eval(context: Context): any;
}
export declare class List extends Operand {
    constructor(name: string, children?: Operand[]);
    eval(context: Context): any;
}
export declare class Obj extends Operand {
    constructor(name: string, children?: Operand[]);
    eval(context: Context): any;
}
export declare class Operator extends Operand {
    private model;
    constructor(name: string, children: Operand[] | undefined, model: IExpressionModel);
    eval(context: Context): any;
}
export declare class FunctionRef extends Operand {
    private model;
    constructor(name: string, children: Operand[] | undefined, model: IExpressionModel);
    eval(context: Context): any;
}
export declare class ChildFunction extends FunctionRef {
}
export declare class ArrowFunction extends FunctionRef {
}
export declare class Block extends Operand {
    eval(context: Context): any;
}
export declare class If extends Operand {
    eval(context: Context): any;
}
export declare class ElseIf extends Operand {
    eval(): any;
}
export declare class Else extends Operand {
    eval(): any;
}
export declare class While extends Operand {
    eval(context: Context): any;
}
export declare class For extends Operand {
    eval(context: Context): any;
}
export declare class ForIn extends Operand {
    eval(context: Context): any;
}
export declare class Switch extends Operand {
    eval(context: Context): any;
}
export declare class Case extends Operand {
    eval(): any;
}
export declare class Default extends Operand {
    eval(): any;
}
export declare class Break extends Operand {
    eval(): any;
}
export declare class Continue extends Operand {
    eval(): any;
}
export declare class Function extends Operand {
    eval(): any;
}
export declare class Return extends Operand {
    eval(): any;
}
export declare class Try extends Operand {
    eval(): any;
}
export declare class Catch extends Operand {
    eval(): any;
}
export declare class Throw extends Operand {
    eval(): any;
}
