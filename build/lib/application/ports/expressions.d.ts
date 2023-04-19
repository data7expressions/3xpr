import { Parameter, Format, OperatorAdditionalInfo, FunctionAdditionalInfo, Operand, OperatorMetadata, ActionObserver, IModelService } from '../../domain';
export interface IExpressions {
    get model(): IModelService;
    get enums(): [string, [string, any][]][];
    get formats(): [string, Format][];
    get constants(): [string, any][];
    get operators(): [string, OperatorMetadata][];
    get functions(): [string, OperatorMetadata][];
    addOperator(sing: string, source: any, additionalInfo: OperatorAdditionalInfo): void;
    addFunction(sing: string, source: any, additionalInfo?: FunctionAdditionalInfo): void;
    addOperatorAlias(alias: string, reference: string): void;
    addFunctionAlias(alias: string, reference: string): void;
    addEnum(key: string, values: [string, any][] | any): void;
    addFormat(key: string, pattern: string): void;
    addConstant(key: string, value: any): void;
    toExpression(func: Function): string;
    graphqlToExpression(graphql: string): string;
    clone(source: Operand): Operand;
    build(expression: string, useCache: boolean): Operand;
    parameters(expression: string): Parameter[];
    type(expression: string): string;
    eval(expression: string, data?: any): any;
    run(expression: string, data?: any): any;
    subscribe(observer: ActionObserver): void;
    unsubscribe(observer: ActionObserver): void;
}
