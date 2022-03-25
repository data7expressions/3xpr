import { Node } from './node';
import { ExpressionConfig } from './expressionConfig';
export declare class ParserManager {
    doubleOperators: string[];
    tripleOperators: string[];
    assigmentOperators: string[];
    private expressionConfig;
    private reAlphanumeric;
    constructor(expressionConfig: ExpressionConfig);
    refresh(): void;
    priority(name: string, cardinality?: number): number;
    isEnum(name: string): boolean;
    getEnumValue(name: string, option: any): any;
    getEnum(name: string): any;
    parse(expression: string): Node;
    toExpression(node: Node): string;
    serialize(value: Node): any;
    deserialize(json: any): Node;
    clearChildEmpty(node: Node): Node;
    setParent(node: Node, parent?: Node, index?: number): Node;
    minify(expression: string): string;
    private _minify;
    private _serialize;
    private _deserialize;
}
