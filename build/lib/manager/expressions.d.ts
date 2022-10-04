import { Cache, Operand, Parameter, Format, OperatorMetadata, IOperandTypeManager, IExpressionConfig, ActionObserver, ISerializer, IOperandBuilder } from '../model';
export declare class ExpressionsBuilder {
    build(): Expressions;
}
export declare class Expressions {
    private cache;
    private config;
    private observers;
    private operandBuilder;
    private typeManager;
    private serializer;
    constructor(cache: Cache, config: IExpressionConfig, serializer: ISerializer<Operand>, operandBuilder: IOperandBuilder, typeManager: IOperandTypeManager);
    private static _instance;
    static get instance(): Expressions;
    get operators(): OperatorMetadata[];
    get enums(): any;
    get formats(): any;
    get functions(): OperatorMetadata[];
    addFunction(source: any, sing: string, deterministic?: boolean): void;
    addEnum(key: string, source: any): void;
    addFormat(key: string, pattern: string): void;
    addConstant(key: string, value: any): void;
    refresh(): void;
    addAlias(alias: string, reference: string): void;
    isEnum(name: string): boolean;
    getEnumValue(name: string, option: string): any;
    getEnum(name: string): any;
    isConstant(name: string): boolean;
    getConstantValue(name: string): any;
    getFormat(name: string): Format | undefined;
    getOperator(operator: string, operands?: number): OperatorMetadata;
    getFunction(name: string): OperatorMetadata;
    clone(operand: Operand): Operand;
    /**
     * Parser expression
     * @param expression  expression
     * @returns Operand
     */
    parse(expression: string): Operand;
    private typed;
    private _parse;
    /**
     * Get parameters of expression
     * @param expression  expression
     * @returns Parameters of expression
     */
    parameters(expression: string): Parameter[];
    /**
     * Get type of expression
     * @param expression  expression
     * @returns Type of expression
     */
    getType(expression: string): string;
    /**
     * Evaluate and solve expression
     * @param expression  string expression
     * @param data Data with variables
     * @returns Result of the evaluate expression
     */
    /**
     * Evaluate and solve expression
     * @param expression  string expression
     * @param data Data with variables
     * @returns Result of the evaluate expression
     */
    eval(expression: string, data?: any): any;
    subscribe(observer: ActionObserver): void;
    unsubscribe(observer: ActionObserver): void;
    private beforeExecutionNotify;
    private afterExecutionNotify;
    private errorExecutionNotify;
}
