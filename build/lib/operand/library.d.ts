export declare class Library {
    name: string;
    language: string;
    enums: any;
    operators: any;
    functions: any;
    constructor(name: string, language: string);
    addEnum(key: string, source: any): void;
    addFunction(name: string, source: any, custom?: any, isArrowFunction?: boolean): void;
    addOperator(name: string, source: any, custom?: any, customFunction?: any): void;
    getMetadata(source: any): {
        originalName: any;
        signature: string;
        doc: null;
        args: {
            name: any;
            default: any;
        }[];
    };
    getArgs(source: string): any;
}
