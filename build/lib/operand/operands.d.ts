import { Data } from '../model';
import { ExpressionConfig } from '../parser';
export declare abstract class Operand {
    name: string;
    type: string;
    id?: string;
    parent?: Operand;
    index?: number;
    level?: number;
    children: Operand[];
    constructor(name: string, children?: Operand[], type?: string);
    clone(): void;
    set(value: any): void;
    abstract eval(): any;
}
export declare class Constant extends Operand {
    constructor(name: string);
    eval(): any;
}
export declare class Variable extends Operand {
    data?: Data;
    number?: number;
    constructor(name: string, type?: string);
    set(value: any): void;
    eval(): any;
}
export declare class Template extends Operand {
    data?: Data;
    constructor(name: string, type?: string);
    eval(): any;
}
export declare class KeyValue extends Operand {
    property?: string;
    eval(): any;
}
export declare class List extends Operand {
    constructor(name: string, children?: Operand[]);
    eval(): any;
}
export declare class Obj extends Operand {
    constructor(name: string, children?: Operand[]);
    eval(): any;
}
export declare class Operator extends Operand {
    metadata?: ExpressionConfig;
    eval(): any;
}
export declare class FunctionRef extends Operand {
    metadata?: ExpressionConfig;
    eval(): any;
}
export declare class ChildFunction extends FunctionRef {
    data?: Data;
}
export declare class ArrowFunction extends FunctionRef {
    data?: Data;
}
export declare class Block extends Operand {
    eval(): any;
}
export declare class If extends Operand {
    eval(): any;
}
export declare class ElseIf extends Operand {
    eval(): any;
}
export declare class Else extends Operand {
    eval(): any;
}
export declare class While extends Operand {
    eval(): any;
}
export declare class For extends Operand {
    eval(): any;
}
export declare class ForIn extends Operand {
    eval(): any;
}
export declare class Switch extends Operand {
    eval(): any;
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
