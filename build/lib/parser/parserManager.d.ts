import { Node } from './node';
import { ExpressionConfig } from './expressionConfig';
import { IParserManager } from './../model';
export declare class ParserManager implements IParserManager {
    doubleOperators: string[];
    tripleOperators: string[];
    assignmentOperators: string[];
    private config;
    constructor(config: ExpressionConfig);
    refresh(): void;
    priority(name: string, cardinality?: number): number;
    parse(expression: string): Node;
    toExpression(node: Node): string;
    clearChildEmpty(node: Node): Node;
    minify(expression: string): string;
    private _minify;
}
