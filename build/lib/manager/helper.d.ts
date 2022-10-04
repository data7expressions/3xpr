import { H3lp, Validator } from 'h3lp';
import { Type } from './../model';
import { Node } from './../parser';
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
export declare class ExpHelper extends H3lp {
    type: TypeHelper;
    exp: ExpressionHelper;
    constructor();
}
export {};
