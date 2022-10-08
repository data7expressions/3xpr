import { H3lp, Validator } from 'h3lp';
import { Operand, Context, Type } from '../model';
import { Node } from '../parser';
import { Var, KeyVal, FuncRef } from '../operand';
declare class TypeHelper {
    private validator;
    constructor(validator: Validator);
    getType(value: any): Type;
    isPrimitive(type: Type | string): boolean;
    isArrayType(type: Type | string): boolean;
    isObjectType(type: Type | string): boolean;
    toString(type?: Type): string;
    serialize(type?: Type): string | undefined;
    deserialize(type?: string): Type | undefined;
}
declare class NodeHelper {
    private validator;
    constructor(validator: Validator);
    toExpression(node: Node): string;
    clear(node: Node): Node;
    minify(expression: string): string[];
    clone(value: Node): Node;
    serialize(node: Node): any;
    deserialize(serialized: any): Node;
}
declare class OperandHelper {
    objectKey(obj: any): any;
    setParent(operand: Operand, index?: number, parent?: Operand): Operand;
    private classTypeToType;
    getKeys(variable: Var, fields: KeyVal[], list: any[], context: Context): any[];
    haveAggregates(operand: Operand): boolean;
    findAggregates(operand: Operand): FuncRef[];
    solveAggregates(list: any[], variable: Var, operand: Operand, context: Context): Operand;
    count(list: any[], variable: Var, aggregate: Operand, context: Context): number;
    first(list: any[], variable: Var, aggregate: Operand, context: Context): any;
    last(list: any[], variable: Var, aggregate: Operand, context: Context): any;
    max(list: any[], variable: Var, aggregate: Operand, context: Context): any;
    min(list: any[], variable: Var, aggregate: Operand, context: Context): any;
    avg(list: any[], variable: Var, aggregate: Operand, context: Context): number;
    sum(list: any[], variable: Var, aggregate: Operand, context: Context): number;
}
export declare class ExpHelper extends H3lp {
    type: TypeHelper;
    node: NodeHelper;
    operand: OperandHelper;
    constructor();
}
export {};
