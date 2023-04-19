import { Operand } from '../entities';
export interface IExpressionParse {
    parse(expression: [string, number, number][]): Operand;
}
