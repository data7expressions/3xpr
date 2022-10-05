"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionConfig = void 0;
/* eslint-disable @typescript-eslint/ban-types */
// import expConfig from './config.json'
const model_1 = require("../model");
class ExpressionConfig {
    constructor() {
        this.operators = [];
        this.enums = {};
        this.constants = {};
        this.formats = {};
        this.aliases = {};
        this.functions = [];
    }
    addEnum(key, source) {
        this.enums[key] = source;
    }
    addFormat(key, pattern) {
        this.formats[key] = { name: key, pattern: pattern, regExp: new RegExp(pattern) };
    }
    addConstant(key, value) {
        this.constants[key] = value;
    }
    addAlias(alias, reference) {
        this.aliases[alias] = reference;
    }
    isEnum(name) {
        const names = name.split('.');
        return this.enums[names[0]] !== undefined;
    }
    isConstant(name) {
        return this.constants[name] !== undefined;
    }
    getEnumValue(name, option) {
        return this.enums[name][option];
    }
    getEnum(name) {
        return this.enums[name];
    }
    getConstantValue(name) {
        return this.constants[name];
    }
    getFormat(name) {
        return this.formats[name];
    }
    getOperator(operator, operands) {
        const list = operands !== undefined ? this.operators.filter(p => p.operator === operator && p.operands === operands) : this.operators.filter(p => p.operator === operator);
        if (list.length === 0) {
            throw new Error(`operator: ${operator} not found `);
        }
        else if (list.length === 1) {
            return list[0];
        }
        else {
            const operatorBinary = list.find(p => p.operands === 2);
            if (operatorBinary === undefined) {
                throw new Error(`operator: ${operator} not found `);
            }
            else {
                return operatorBinary;
            }
        }
    }
    getFunction(name) {
        let metadata = this.functions.find(p => p.name === name);
        if (metadata === undefined) {
            if (this.aliases[name] !== undefined) {
                metadata = this.functions.find(p => p.name === this.aliases[name]);
            }
            if (metadata === undefined) {
                throw new Error(`function: ${name} not found `);
            }
        }
        return metadata;
    }
    priority(name, cardinality) {
        const metadata = this.getOperator(name, cardinality);
        return metadata && metadata.priority ? metadata.priority : -1;
    }
    addOperator(sing, source, priority) {
        const metadata = this.getMetadata(sing);
        let func, custom;
        if (Object.getPrototypeOf(source).name === 'Operator') {
            custom = source;
        }
        else if (typeof source === 'function') {
            func = source;
        }
        else {
            throw new Error(`operator ${metadata.name} source not supported`);
        }
        this._addOperator({
            name: metadata.name,
            operator: metadata.name,
            type: model_1.OperatorType.operator,
            priority: priority,
            deterministic: false,
            operands: metadata.params.length,
            // description: metadata.description,
            params: metadata.params,
            return: metadata.return,
            function: func,
            custom: custom
        });
    }
    addFunction(sing, source, deterministic = true) {
        const metadata = this.getMetadata(sing);
        let func, custom;
        if (['ArrowFunction', 'ChildFunction', 'FunctionRef'].includes(Object.getPrototypeOf(source).name)) {
            custom = source;
        }
        else if (typeof source === 'function') {
            func = source;
        }
        else {
            throw new Error(`function ${metadata.name} source not supported`);
        }
        this._addFunction({
            name: metadata.name,
            operator: metadata.name,
            type: model_1.OperatorType.function,
            deterministic: deterministic,
            operands: metadata.params.length,
            // description: metadata.description,
            params: metadata.params,
            return: metadata.return,
            function: func,
            custom: custom
        });
    }
    _addOperator(metadata) {
        const index = this.operators.findIndex(p => p.operator === metadata.operator && p.operands === metadata.operands);
        if (index === -1) {
            this.operators.push(metadata);
        }
        else {
            if (metadata.function) {
                this.operators[index].function = metadata.function;
            }
            if (metadata.custom) {
                this.operators[index].custom = metadata.custom;
            }
        }
    }
    _addFunction(metadata) {
        const index = this.functions.findIndex(p => p.name === metadata.name && p.type === metadata.type);
        if (index === -1) {
            this.functions.push(metadata);
        }
        else {
            if (metadata.function) {
                this.functions[index].function = metadata.function;
            }
            if (metadata.custom) {
                this.functions[index].custom = metadata.custom;
            }
        }
    }
    getMetadata(sing) {
        const buffer = Array.from(sing);
        const length = buffer.length;
        let index = 0;
        let functionName = '';
        let functionReturn = '';
        let chars = [];
        for (; buffer[index] !== '('; index++) {
            if (buffer[index] !== ' ') {
                chars.push(buffer[index]);
            }
        }
        functionName = chars.join('');
        const params = [];
        chars = [];
        let name = '';
        let type = '';
        let _default = '';
        let hadDefault = false;
        let multipleParams = false;
        for (index++; index < length; index++) {
            if (buffer[index] === ',' || buffer[index] === ')') {
                if (hadDefault) {
                    _default = chars.join('');
                    if (type === '') {
                        type = this.getTypeFromValue(_default);
                    }
                }
                else {
                    type = chars.join('');
                }
                if (name.startsWith('...')) {
                    multipleParams = true;
                    name = name.replace('...', '');
                }
                params.push({ name: name, type: type !== '' ? type : 'any', default: _default !== '' ? _default : undefined });
                if (buffer[index] === ')') {
                    break;
                }
                chars = [];
                name = '';
                type = '';
                _default = '';
            }
            else if (buffer[index] === ':') {
                name = chars.join('');
                chars = [];
            }
            else if (buffer[index] === '=') {
                hadDefault = true;
                if (name === '') {
                    name = chars.join('');
                }
                else {
                    type = chars.join('');
                }
                chars = [];
            }
            else if (buffer[index] !== ' ') {
                chars.push(buffer[index]);
            }
        }
        chars = [];
        let hadReturn = false;
        for (index++; index < length; index++) {
            if (buffer[index] === ':') {
                hadReturn = true;
                continue;
            }
            else if (buffer[index] !== ' ') {
                chars.push(buffer[index]);
            }
        }
        if (hadReturn) {
            functionReturn = chars.join('');
        }
        return {
            name: functionName,
            return: functionReturn !== '' ? functionReturn : 'void',
            params: params,
            multipleParams: multipleParams
        };
    }
    getTypeFromValue(type) {
        return type;
    }
}
exports.ExpressionConfig = ExpressionConfig;
//# sourceMappingURL=expressionConfig.js.map