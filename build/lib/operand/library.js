"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
const model_1 = require("../model");
class Library {
    constructor(name) {
        this.name = name;
        this.enums = {};
        this.formats = {};
        this.operators = [];
        this.functions = [];
    }
    addEnum(name, source) {
        this.enums[name] = source;
    }
    addFormat(name, pattern) {
        this.formats[name] = pattern;
    }
    addFunction(name, source, type = model_1.OperatorType.function, custom = null, deterministic = true) {
        const metadata = this.getMetadata(source);
        this.functions.push({
            name: name,
            operator: name,
            type: type,
            deterministic: deterministic,
            lib: this.name,
            operands: metadata.params.length,
            description: metadata.description,
            params: metadata.params,
            return: metadata.return,
            function: source,
            custom: custom
        });
    }
    addOperator(name, source, custom = null) {
        const metadata = this.getMetadata(source);
        this.operators.push({
            operator: name,
            name: source.name,
            deterministic: true,
            type: model_1.OperatorType.operator,
            lib: this.name,
            operands: metadata.params.length,
            description: metadata.description,
            params: metadata.params,
            return: metadata.return,
            function: source,
            custom: custom
        });
    }
    getMetadata(source) {
        const args = [];
        const _args = this.getArgs(source);
        for (const k in _args) {
            const p = _args[k];
            const data = p.split('=');
            const arg = {
                name: data[0],
                type: 'any',
                default: data.length > 1 ? data[1] : null
            };
            args.push(arg);
        }
        return {
            return: 'any',
            params: args
        };
    }
    getArgs(source) {
        const args = (f) => f.toString().replace(/[\r\n\s]+/g, ' ')
            .match(/(?:function\s*\w*)?\s*(?:\((.*?)\)|([^\s]+))/)
            .slice(1, 3)
            .join('')
            .split(/\s*,\s*/);
        return args(source);
    }
}
exports.Library = Library;
//# sourceMappingURL=library.js.map