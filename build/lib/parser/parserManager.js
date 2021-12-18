"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserManager = void 0;
const node_1 = require("./node");
const parser_1 = require("./parser");
class ParserManager {
    constructor(expressionConfig) {
        this.expressionConfig = expressionConfig;
        // eslint-disable-next-line prefer-regex-literals
        this.reAlphanumeric = new RegExp('[a-zA-Z0-9_.]+$');
        this.tripleOperators = [];
        this.doubleOperators = [];
        this.assigmentOperators = [];
        this.refresh();
    }
    refresh() {
        for (const key in this.expressionConfig.operators) {
            if (key.length === 2)
                this.doubleOperators.push(key);
            else if (key.length === 3)
                this.tripleOperators.push(key);
            const operator = this.expressionConfig.operators[key];
            if (operator[2] && operator[2].category === 'assignment') {
                this.assigmentOperators.push(key);
            }
        }
    }
    priority(name, cardinality = 2) {
        try {
            const metadata = this.expressionConfig.operators[name][cardinality];
            return metadata ? metadata.priority : -1;
        }
        catch (error) {
            throw new Error('error to priority : ' + name);
        }
    }
    isEnum(name) {
        return this.expressionConfig.isEnum(name);
    }
    getEnumValue(name, option) {
        return this.expressionConfig.getEnumValue(name, option);
    }
    getEnum(name) {
        return this.expressionConfig.getEnum(name);
    }
    parse(expression) {
        try {
            const buffer = this.minify(expression);
            const parser = new parser_1.Parser(this, buffer);
            const node = parser.parse();
            //  delete _parser
            this.setParent(node);
            return node;
        }
        catch (error) {
            throw new Error('expression: ' + expression + ' error: ' + error.toString());
        }
    }
    toExpression(node) {
        const list = [];
        if (!node || !node.type) {
            console.log(node);
        }
        switch (node.type) {
            case 'const':
            case 'var':
                list.push(node.name);
                break;
            case 'array':
                list.push('[');
                for (let i = 0; i < node.children.length; i++) {
                    if (i > 0)
                        list.push(',');
                    list.push(this.toExpression(node.children[i]));
                }
                list.push(']');
                break;
            case 'keyVal':
                list.push(node.name + ':');
                list.push(this.toExpression(node.children[0]));
                break;
            case 'obj':
                list.push('{');
                for (let i = 0; i < node.children.length; i++) {
                    if (i > 0)
                        list.push(',');
                    list.push(this.toExpression(node.children[i]));
                }
                list.push('}');
                break;
            case 'oper':
                if (node.children.length === 1) {
                    list.push(node.name);
                    list.push(this.toExpression(node.children[0]));
                }
                else if (node.children.length === 2) {
                    list.push('(');
                    list.push(this.toExpression(node.children[0]));
                    list.push(node.name);
                    list.push(this.toExpression(node.children[1]));
                    list.push(')');
                }
                break;
            case 'funcRef':
                list.push(node.name);
                list.push('(');
                for (let i = 0; i < node.children.length; i++) {
                    if (i > 0)
                        list.push(',');
                    list.push(this.toExpression(node.children[i]));
                }
                list.push(')');
                break;
            case 'childFunc':
                list.push(this.toExpression(node.children[0]));
                list.push('.' + node.name);
                list.push('(');
                for (let i = 1; i < node.children.length; i++) {
                    if (i > 1)
                        list.push(',');
                    list.push(this.toExpression(node.children[i]));
                }
                list.push(')');
                break;
            case 'arrow':
                list.push(this.toExpression(node.children[0]));
                list.push('.' + node.name);
                list.push('(');
                list.push(node.children[1].name);
                list.push('=>');
                list.push(this.toExpression(node.children[2]));
                list.push(')');
                break;
            default:
                throw new Error('node: ' + node.type + ' not supported');
        }
        return list.join('');
    }
    serialize(value) {
        return this._serialize(value);
    }
    deserialize(json) {
        const node = this._deserialize(json);
        return this.setParent(node);
    }
    setParent(node, parent, index = 0) {
        try {
            if (parent) {
                node.id = parent.id + '.' + index.toString();
                node.parent = parent;
                node.index = index;
                node.level = parent.level ? parent.level + 1 : 0;
            }
            else {
                node.id = '0';
                node.parent = undefined;
                node.index = 0;
                node.level = 0;
            }
            if (node.children.length > 0) {
                for (let i = 0; i < node.children.length; i++) {
                    this.setParent(node.children[i], node, i);
                }
            }
        }
        catch (error) {
            throw new Error('set parent: ' + node.name + ' error: ' + error.toString());
        }
        return node;
    }
    minify(expression) {
        let isString = false;
        let quotes = '';
        const buffer = expression.split('');
        const length = buffer.length;
        const result = [];
        let i = 0;
        while (i < length) {
            const p = buffer[i];
            if (isString && p === quotes)
                isString = false;
            else if (!isString && (p === '\'' || p === '"')) {
                isString = true;
                quotes = p;
            }
            if (isString) {
                result.push(p);
            }
            else if (p === ' ') {
                // solo deberia dejar los espacios cuando es entre caracteres alfanumericos.
                // por ejemplo en el caso de "} if" no deberia quedar un espacio
                if (i + 1 < length && i - 1 >= 0 && this.reAlphanumeric.test(buffer[i - 1]) && this.reAlphanumeric.test(buffer[i + 1])) {
                    result.push(p);
                }
            }
            else if (p !== '\n' && p !== '\r' && p !== '\t') {
                result.push(p);
            }
            i += 1;
        }
        return result;
    }
    _serialize(node) {
        const children = [];
        for (const p in node.children) {
            children.push(this._serialize(node.children[p]));
        }
        if (children.length === 0)
            return { n: node.name, t: node.type };
        return { n: node.name, t: node.type, c: children };
    }
    _deserialize(serialized) {
        const children = [];
        if (serialized.c) {
            for (const p in serialized.c) {
                children.push(this._deserialize(p));
            }
        }
        return new node_1.Node(serialized.n, serialized.t, children);
    }
}
exports.ParserManager = ParserManager;
//# sourceMappingURL=parserManager.js.map