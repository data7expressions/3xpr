import { OperatorMetadata } from '../model';
import { Library } from './../operand';
export declare class ExpressionConfig {
    private libraries;
    operators: OperatorMetadata[];
    private enums;
    private functions;
    constructor();
    addLibrary(library: Library): void;
    private load;
    private addEnum;
    private addOperator;
    private addFunction;
    isEnum(name: string): boolean;
    getEnumValue(name: string, option: string): any;
    getEnum(name: string): any;
    getOperator(operator: string, operands: number): OperatorMetadata;
    getFunction(name: string): OperatorMetadata;
}
