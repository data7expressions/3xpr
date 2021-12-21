export declare abstract class Library {
    name: string;
    enums: any;
    operators: any;
    functions: any;
    constructor(name: string);
    protected abstract initEnums(): any;
    protected abstract initOperators(): any;
    protected abstract initArrowFunctions(): any;
    addEnum(key: string, source: any): void;
    addFunction(name: string, source: any, custom?: any, isArrowFunction?: boolean): any;
    addOperator(name: string, source: any, custom?: any, customFunction?: any): any;
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
