"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionConvertFromGraphql = void 0;
const h3lp_1 = require("h3lp");
class ExpressionConvertFromGraphql {
    toExpression(graphql) {
        return new GraphqlParser(graphql).parse();
    }
}
exports.ExpressionConvertFromGraphql = ExpressionConvertFromGraphql;
class GraphqlParser {
    constructor(source) {
        this.buffer = source.split('');
        this.length = this.buffer.length;
        this.index = 0;
        this.expression = [];
        this.context = {};
    }
    get end() {
        return this.index >= this.length;
    }
    get current() {
        return this.buffer[this.index];
    }
    parse() {
        this.read();
        return [this.expression.join(''), this.context];
    }
    read(level = 0, _break = '', prefix = '') {
        while (!this.end) {
            const name = this.getName();
            this.expression.push(prefix + name);
            this.forwardSpaces();
            if (this.current === _break) {
                this.index += 1;
                break;
            }
            else if (this.current === '{') {
                this.index += 1;
                this.expression.push(level === 0 ? '.map(p=> [' : '.include(p=> [');
                this.read(level + 1, '}', 'p.');
                this.expression.push('])');
            }
            else if (this.current === '(') {
                this.readArgs(')');
            }
            if (!this.end) {
                this.expression.push(',');
            }
        }
    }
    readArgs(_break = '') {
        // while (true) {
        // const name = this.getName()
        // this.forwardSpaces()
        // if (this.current === ':') this.index += 1
        // else throw new Error(`attribute ${name} without value`)
        // const value = this.read()
        // properties.push({ name, type })
        // this.forwardSpaces()
        // if (this.current === ',') {
        // this.index += 1
        // } else if (this.current === '}') {
        // this.index += 1
        // break
        // } else {
        // throw new Error('Object without end')
        // }
        // }
        // return { properties }
    }
    getName(increment = true) {
        const buff = [];
        if (increment) {
            while (!this.end && h3lp_1.h3lp.val.isAlphanumeric(this.current)) {
                buff.push(this.current);
                this.index += 1;
            }
        }
        else {
            let index = this.index;
            while (!this.end && h3lp_1.h3lp.val.isAlphanumeric(this.buffer[index])) {
                buff.push(this.buffer[index]);
                index += 1;
            }
        }
        return buff.join('');
    }
    forwardSpaces() {
        while (!this.end && this.buffer[this.index] === ' ') {
            this.index += 1;
        }
    }
}
//# sourceMappingURL=convertFromGraphql.js.map