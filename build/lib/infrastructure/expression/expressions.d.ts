import { ICache } from 'h3lp';
import { Operand, IParameterService, Parameter, Format, OperatorMetadata, ITypeService, IModelService, ActionObserver, FunctionAdditionalInfo, OperatorAdditionalInfo, IOperandService, IOperandBuilder } from '../../domain';
import { IExpressions } from '../../application';
export declare class Expressions implements IExpressions {
    readonly _model: IModelService;
    private readonly parameterService;
    private _operandService;
    private convertFromFunction;
    private convertFromGraphql;
    private observers;
    constructor(_model: IModelService, typeService: ITypeService, parameterService: IParameterService, cache: ICache<string, Operand>);
    get operandService(): IOperandService;
    get model(): IModelService;
    get operators(): [string, OperatorMetadata][];
    get enums(): [string, [string, any][]][];
    get formats(): [string, Format][];
    get constants(): [string, any][];
    get functions(): [string, OperatorMetadata][];
    addOperator(sing: string, source: any, additionalInfo: OperatorAdditionalInfo): void;
    addFunction(sing: string, source: any, additionalInfo?: FunctionAdditionalInfo): void;
    addEnum(key: string, values: [string, any][] | any): void;
    addFormat(key: string, pattern: string): void;
    addConstant(key: string, value: any): void;
    addOperatorAlias(alias: string, reference: string): void;
    addFunctionAlias(alias: string, reference: string): void;
    addOperandBuilder(builder: IOperandBuilder): void;
    /**
     * Convert a lambda expression to a query expression
     * @param lambda lambda expression
     * @returns Expression manager
     */
    toExpression(func: Function): string;
    graphqlToExpression(graphql: string): [string, any];
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
    type(expression: string): string;
    /**
     * Evaluate and solve expression
     * @param expression  string expression
     * @param data Data with variables
     * @returns Result of the evaluate expression
     */
    eval(expression: string, data?: any): any;
    run(expression: string, data?: any): any;
    subscribe(observer: ActionObserver): void;
    unsubscribe(observer: ActionObserver): void;
    build(expression: string, useCache: boolean): Operand;
    clone(source: Operand): Operand;
    private beforeExecutionNotify;
    private afterExecutionNotify;
    private errorExecutionNotify;
}
