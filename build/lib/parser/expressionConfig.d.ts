import { OperatorMetadata } from '../model';
import { Library } from './../operand';
export interface Format {
    name: string;
    pattern: string;
    regExp: RegExp;
}
export declare class ExpressionConfig {
    libraries: Library[];
    operators: OperatorMetadata[];
    enums: any;
    formats: any;
    functions: OperatorMetadata[];
    constructor();
    addLibrary(library: Library): void;
    load(data: any): void;
    private addEnum;
    private addFormat;
    private addOperator;
    private addFunction;
    isEnum(name: string): boolean;
    getEnumValue(name: string, option: string): any;
    getEnum(name: string): any;
    getFormat(name: string): Format | undefined;
    getOperator(operator: string, operands?: number): OperatorMetadata;
    getFunction(name: string): OperatorMetadata;
}
