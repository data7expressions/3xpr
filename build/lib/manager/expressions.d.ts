import { Cache, Operand, Parameter, Format, OperatorMetadata, IExpressionConfig, ActionObserver, IParserManager, ISerializer, IOperandManager } from '../model';
import { Library } from './../operand';
export declare class ExpressionsBuilder {
    build(): Expressions;
}
export declare class Expressions {
    private cache;
    private config;
    private observers;
    private parserManager;
    private operandManager;
    private serializer;
    constructor(cache: Cache, config: IExpressionConfig, parserManager: IParserManager, serializer: ISerializer<Operand>, operandManager: IOperandManager);
    private static _instance;
    static get instance(): Expressions;
    get parser(): IParserManager;
    get libraries(): Library[];
    get operators(): OperatorMetadata[];
    get enums(): any;
    get formats(): any;
    get functions(): OperatorMetadata[];
    addLibrary(library: Library): void;
    load(data: any): void;
    isEnum(name: string): boolean;
    getEnumValue(name: string, option: string): any;
    getEnum(name: string): any;
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
    /**
     * Get parameters of expression
     * @param expression  expression
     * @returns Parameters of expression
     */
    parameters(expression: string): Parameter[];
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
