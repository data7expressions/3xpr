import { Data } from '../model';
import { OperandMetadata } from './operandMetadata';
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
    metadata?: OperandMetadata;
    eval(): any;
}
export declare class FunctionRef extends Operand {
    metadata?: OperandMetadata;
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
