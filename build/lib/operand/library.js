"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
class Library {
    constructor(name, language) {
        this.name = name;
        this.language = language;
        this.enums = {};
        this.operators = {};
        this.functions = {};
    }
    addEnum(key, source) {
        this.enums[key] = source;
    }
    addFunction(name, source, custom = null, isArrowFunction = false) {
        const metadata = this.getMetadata(source);
        metadata.lib = this.name;
        metadata['language '] = this.language;
        metadata.isArrowFunction = isArrowFunction;
        this.functions[name] = { function: source, metadata: metadata, custom: custom };
    }
    addOperator(name, source, custom = null, customFunction = null) {
        if (!this.operators[name])
            this.operators[name] = {};
        const metadata = this.getMetadata(source);
        const operands = metadata.args.length;
        metadata.lib = this.name;
        metadata['language '] = this.language;
        this.operators[name][operands] = { function: source, metadata: metadata, custom: custom, customFunction: customFunction };
    }
    getMetadata(source) {
        const args = [];
        const _args = this.getArgs(source);
        for (const k in _args) {
            const p = _args[k];
            const data = p.split('=');
            const arg = {
                name: data[0],
                default: data.length > 1 ? data[1] : null
            };
            args.push(arg);
        }
        return {
            originalName: source.name,
            signature: '(' + _args.toString() + ')',
            doc: null,
            args: args
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