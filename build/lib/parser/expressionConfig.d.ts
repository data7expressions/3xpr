export declare class ExpressionConfig {
    operators: any;
    enums: any;
    functions: any;
    constructor();
    private load;
    private addEnum;
    private addOperator;
    private addFunction;
    isEnum(name: string): boolean;
    getEnumValue(name: string, option: string): any;
    getEnum(name: string): any;
    getOperator(name: string, operands: number): any;
    getFunction(name: string): any;
}
