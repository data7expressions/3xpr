import { H3lp, Validator } from 'h3lp';
import { Operand, Context, Type } from '../model';
import { Node } from '../parser';
import { KeyValue, Variable, FunctionRef } from '../operand';
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
declare class ExpressionHelper {
    private validator;
    constructor(validator: Validator);
    toExpression(node: Node): string;
    clearChildEmpty(node: Node): Node;
    minify(expression: string): string[];
}
declare class OperandHelper {
    objectKey(obj: any): any;
    getKeys(variable: Variable, fields: KeyValue[], list: any[], context: Context): any[];
    haveAggregates(operand: Operand): boolean;
    findAggregates(operand: Operand): FunctionRef[];
    solveAggregates(list: any[], variable: Variable, operand: Operand, context: Context): Operand;
    count(list: any[], variable: Variable, aggregate: Operand, context: Context): number;
    first(list: any[], variable: Variable, aggregate: Operand, context: Context): any;
    last(list: any[], variable: Variable, aggregate: Operand, context: Context): any;
    max(list: any[], variable: Variable, aggregate: Operand, context: Context): any;
    min(list: any[], variable: Variable, aggregate: Operand, context: Context): any;
    avg(list: any[], variable: Variable, aggregate: Operand, context: Context): number;
    sum(list: any[], variable: Variable, aggregate: Operand, context: Context): number;
}
export declare class ExpHelper extends H3lp {
    type: TypeHelper;
    exp: ExpressionHelper;
    operand: OperandHelper;
    constructor();
}
export {};
