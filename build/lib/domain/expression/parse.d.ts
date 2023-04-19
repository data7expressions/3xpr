import { Operand } from '../operand/entities';
export interface IExpressionParse {
    parse(expression: [string, number, number][]): Operand;
}
