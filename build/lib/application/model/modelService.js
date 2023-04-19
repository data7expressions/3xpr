"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelService = void 0;
/* eslint-disable @typescript-eslint/ban-types */
// import expConfig from './config.json'
const domain_1 = require("../../domain");
class ModelService {
    constructor() {
        this._enums = {};
        this._constants = {};
        this._formats = {};
        this._operators = {};
        this._functions = {};
        this._operatorAlias = {};
        this._functionAlias = {};
    }
    get operatorAlias() {
        return Object.entries(this._operatorAlias);
    }
    get functionAlias() {
        return Object.entries(this._functionAlias);
    }
    get constants() {
        return Object.entries(this._constants);
    }
    get formats() {
        return Object.entries(this._formats);
    }
    get enums() {
        return Object.entries(this._enums);
    }
    get operators() {
        const operators = [];
        for (const entry of Object.entries(this._operators)) {
            for (const q of Object.values(entry[1])) {
                operators.push([entry[0], q]);
            }
        }
        for (const entry of Object.entries(this._operatorAlias)) {
            const key = entry[1];
            for (const q of Object.values(this._operators[key])) {
                operators.push([entry[0], q]);
            }
        }
        return operators;
    }
    get functions() {
        let list = [];
        list = Object.entries(this._functions);
        for (const entry of Object.entries(this._functionAlias)) {
            const key = entry[1];
            list.push([entry[0], this._functions[key]]);
        }
        return list;
    }
    addEnum(name, values) {
        if (Array.isArray(values)) {
            if (values.length > 0) {
                this._enums[name] = values;
            }
        }
        else if (typeof values === 'object') {
            const _values = [];
            for (const entry of Object.entries(values)) {
                _values.push([entry[0], entry[1]]);
            }
            this._enums[name] = _values;
        }
        else {
            throw new Error(`enum ${name} invalid values`);
        }
    }
    addFormat(key, pattern) {
        this._formats[key] = { name: key, pattern, regExp: new RegExp(pattern) };
    }
    addConstant(key, value) {
        this._constants[key] = value;
    }
    addOperatorAlias(alias, reference) {
        this._operatorAlias[alias] = reference;
    }
    addFunctionAlias(alias, reference) {
        this._functionAlias[alias] = reference;
    }
    addOperator(sing, source, additionalInfo) {
        const singInfo = this.getSing(sing);
        const metadata = {
            priority: additionalInfo.priority,
            deterministic: false,
            operands: singInfo.params.length,
            params: singInfo.params,
            returnType: singInfo.returnType
        };
        if (source instanceof domain_1.PrototypeEvaluator) {
            metadata.custom = source;
        }
        else if (typeof source === 'function') {
            metadata.function = source;
        }
        else {
            throw new Error(`operator ${singInfo.name} source not supported`);
        }
        if (additionalInfo && additionalInfo.doc) {
            metadata.doc = additionalInfo.doc;
        }
        if (this._operators[singInfo.name] === undefined) {
            this._operators[singInfo.name] = {};
        }
        this._operators[singInfo.name][metadata.operands] = metadata;
    }
    addFunction(sing, source, additionalInfo) {
        const singInfo = this.getSing(sing);
        const metadata = {
            deterministic: additionalInfo && additionalInfo.deterministic ? additionalInfo.deterministic : true,
            operands: singInfo.params.length,
            params: singInfo.params,
            returnType: singInfo.returnType
        };
        if (source instanceof domain_1.PrototypeEvaluator) {
            metadata.custom = source;
        }
        else if (typeof source === 'function') {
            metadata.function = source;
        }
        else {
            throw new Error(`function ${singInfo.name} source not supported`);
        }
        if (additionalInfo && additionalInfo.doc) {
            metadata.doc = additionalInfo.doc;
        }
        this._functions[singInfo.name] = metadata;
    }
    getEnumValue(name, option) {
        if (this._enums[name] === undefined) {
            throw new Error(`enum: ${name} not found `);
        }
        const values = this._enums[name];
        const value = values.find(p => p[0] === option);
        if (value === undefined) {
            throw new Error(`option ${option} in enum: ${name} not found `);
        }
        return value[1];
    }
    getEnum(name) {
        return this._enums[name];
    }
    getConstantValue(name) {
        return this._constants[name];
    }
    getFormat(name) {
        return this._formats[name];
    }
    getOperator(name, operands) {
        let operators = this._operators[name];
        if (operators === undefined) {
            const key = this._operatorAlias[name];
            if (key) {
                operators = this._operators[key];
            }
            else {
                throw new Error(`operator: ${name} not found `);
            }
        }
        if (operands !== undefined) {
            const operator = operators[operands];
            if (operator === undefined) {
                throw new Error(`operator ${name} with ${operands} operands not found `);
            }
            return operator;
        }
        else if (Object.keys(operators).length === 1) {
            return Object.values(operators)[0];
        }
        else if (operators[2] !== undefined) {
            return operators[2];
        }
        throw new Error(`it is necessary to determine the number of operands for the operator ${name}`);
    }
    getFunction(name) {
        let metadata = this._functions[name];
        if (metadata === undefined) {
            const key = this._functionAlias[name];
            if (key) {
                metadata = this._functions[key];
            }
            else {
                throw new Error(`function: ${name} not found `);
            }
        }
        return metadata;
    }
    isEnum(name) {
        const names = name.split('.');
        return this._enums[names[0]] !== undefined;
    }
    isConstant(name) {
        return this._constants[name] !== undefined;
    }
    isOperator(name, operands) {
        let operators = this._operators[name];
        if (operators === undefined) {
            const key = this._operatorAlias[name];
            if (key) {
                operators = this._operators[key];
            }
            else {
                return false;
            }
        }
        if (operands !== undefined) {
            return operators && operators[operands] !== undefined;
        }
        return true;
    }
    isFunction(name) {
        return this._functions[name] !== undefined || this._functionAlias[name] !== undefined;
    }
    priority(name, cardinality) {
        const metadata = this.getOperator(name, cardinality);
        return metadata && metadata.priority ? metadata.priority : -1;
    }
    getSing(sing) {
        const buffer = Array.from(sing);
        const length = buffer.length;
        let index = 0;
        let functionName = '';
        let prefix = '';
        let _return = '';
        let chars = [];
        // Clear begin spaces
        while (buffer[index] === ' ') {
            index++;
        }
        for (; buffer[index] !== '('; index++) {
            if (buffer[index] === ' ' && buffer[index + 1] !== ' ' && buffer[index + 1] !== '(') {
                prefix = chars.join('');
                chars = [];
            }
            else if (buffer[index] !== ' ') {
                chars.push(buffer[index]);
            }
        }
        functionName = chars.join('');
        chars = [];
        const params = [];
        let name = '';
        let type = '';
        let _default = '';
        let hadDefault = false;
        let multiple = false;
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
                    multiple = true;
                    name = name.replace('...', '');
                }
                // Add Param
                params.push({ name, type: type !== '' ? type : 'any', default: _default !== '' ? _default : undefined, multiple });
                if (buffer[index] === ')') {
                    break;
                }
                chars = [];
                name = '';
                type = '';
                _default = '';
                hadDefault = false;
                multiple = false;
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
            _return = chars.join('');
        }
        return {
            name: functionName,
            returnType: _return !== '' ? _return : 'void',
            params,
            isAsync: prefix === 'async'
        };
    }
    getTypeFromValue(type) {
        // TODO:
        return type;
    }
}
exports.ModelService = ModelService;
//# sourceMappingURL=modelService.js.map