import { OperatorMetadata } from '../model';
import { Library } from './../operand';
export declare class ExpressionConfig {
    libraries: Library[];
    operators: OperatorMetadata[];
    enums: any;
    functions: OperatorMetadata[];
    constructor();
    addLibrary(library: Library): void;
    load(data: any): void;
    private addEnum;
    private addOperator;
    private addFunction;
    isEnum(name: string): boolean;
    getEnumValue(name: string, option: string): any;
    getEnum(name: string): any;
    getOperator(operator: string, operands?: number): OperatorMetadata;
    getFunction(name: string): OperatorMetadata;
}
