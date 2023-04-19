import { Context, Operand } from '../../domain';
export declare class OperandHelper {
    toExpression(operand: Operand): string;
    objectKey(obj: any): any;
    getKeys(variable: Operand, fields: Operand[], list: any[], context: Context): any[];
    haveAggregates(operand: Operand): boolean;
    findAggregates(operand: Operand): Operand[];
    solveAggregates(list: any[], variable: Operand, operand: Operand, context: Context): Operand;
    count(list: any[], variable: Operand, aggregate: Operand, context: Context): number;
    first(list: any[], variable: Operand, aggregate: Operand, context: Context): any;
    last(list: any[], variable: Operand, aggregate: Operand, context: Context): any;
    max(list: any[], variable: Operand, aggregate: Operand, context: Context): any;
    min(list: any[], variable: Operand, aggregate: Operand, context: Context): any;
    avg(list: any[], variable: Operand, aggregate: Operand, context: Context): number;
    sum(list: any[], variable: Operand, aggregate: Operand, context: Context): number;
}
export declare const operandHelper: OperandHelper;
