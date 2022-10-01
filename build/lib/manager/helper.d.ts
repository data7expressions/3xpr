import { H3lp } from 'h3lp';
import { Type } from './../model';
declare class TypeHelper {
    private help;
    constructor(help: H3lp);
    getType(value: any): Type;
    isPrimitive(type: Type | string): boolean;
    isArrayType(type: Type | string): boolean;
    isObjectType(type: Type | string): boolean;
    serialize(type?: Type): string;
    deserialize(type: string): Type;
}
export declare class ExpHelper extends H3lp {
    type: TypeHelper;
    constructor();
}
export {};
