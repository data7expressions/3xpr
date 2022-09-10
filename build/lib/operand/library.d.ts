import { Parameter, OperatorMetadata, OperatorType } from '../model';
export interface Metadata {
    description?: string;
    return: string;
    params: Parameter[];
}
export declare abstract class Library {
    name: string;
    enums: any;
    formats: any;
    operators: OperatorMetadata[];
    functions: OperatorMetadata[];
    constructor(name: string);
    addEnum(name: string, source: any): void;
    addFormat(name: string, pattern: any): void;
    addFunction(name: string, source: any, type?: OperatorType, custom?: any, deterministic?: boolean): any;
    addOperator(name: string, source: any, custom?: any): any;
    private getMetadata;
    private getArgs;
}
