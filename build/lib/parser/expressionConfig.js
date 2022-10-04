"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionConfig = void 0;
/* eslint-disable @typescript-eslint/ban-types */
// import expConfig from './config.json'
const model_1 = require("../model");
class ExpressionConfig {
    constructor() {
        // this.libraries = []
        this.operators = [];
        this.enums = {};
        this.constants = {};
        this.formats = {};
        this.aliases = {};
        this.functions = [];
        this.tripleOperators = [];
        this.doubleOperators = [];
        this.assignmentOperators = [];
        // this.load(expConfig)
    }
    refresh() {
        for (const p in this.operators) {
            const metadata = this.operators[p];
            if (metadata.operator.length === 2) {
                this.doubleOperators.push(metadata.operator);
            }
            else if (metadata.operator.length === 3) {
                this.tripleOperators.push(metadata.operator);
            }
            // if (metadata.category === 'assignment') {
            if (metadata.priority === 1) {
                this.assignmentOperators.push(metadata.operator);
            }
        }
    }
    // public addLibrary (library:Library):void {
    // const index = this.libraries.findIndex(p => p.name === library.name)
    // if (index === undefined) {
    // this.libraries.push(library)
    // } else {
    // this.libraries[index] = library
    // }
    // for (const p in library.operators) {
    // const metadata = library.operators[p]
    // this._addOperator(metadata)
    // }
    // for (const p in library.functions) {
    // const metadata = library.functions[p]
    // this._addFunction(metadata)
    // }
    // for (const name in library.enums) {
    // this.addEnum(name, library.enums[name])
    // }
    // for (const name in library.constants) {
    // this.addConstant(name, library.constants[name])
    // }
    // for (const name in library.formats) {
    // this.addFormat(name, library.formats[name])
    // }
    // this.refresh()
    // }
    // public load (data: any): void {
    // if (data.enums) {
    // for (const name in data.enums) {
    // this.addEnum(name, data.enums[name])
    // }
    // }
    // if (data.constants) {
    // for (const name in data.constants) {
    // this.addConstant(name, data.constants[name])
    // }
    // }
    // if (data.formats) {
    // for (const name in data.formats) {
    // this.addFormat(name, data.formats[name])
    // }
    // }
    // if (data.operators) {
    // for (const type in data.operators) {
    // for (const name in data.operators[type]) {
    // const operatorData = data.operators[type][name]
    // const metadata: OperatorMetadata = {
    // operator: name,
    // deterministic: true,
    // name: operatorData.name,
    // category: operatorData.category,
    // type: OperatorType.operator,
    // operands: operatorData.params.length,
    // priority: operatorData.priority ? operatorData.priority : -1,
    // description: operatorData.description,
    // params: operatorData.params,
    // return: operatorData.return
    // }
    // this._addOperator(metadata)
    // }
    // }
    // }
    // if (data.functions) {
    // for (const name in data.functions) {
    // const functionData = data.functions[name]
    // const metadata: OperatorMetadata = {
    // operator: name,
    // name: name,
    // category: functionData.category,
    // deterministic: functionData.deterministic ? functionData.deterministic : true,
    // type: functionData.type ? functionData.type : OperatorType.function,
    // operands: functionData.params ? functionData.params.length : 0,
    // description: functionData.description,
    // params: functionData.params,
    // return: functionData.return
    // }
    // this._addFunction(metadata)
    // }
    // }
    // this.refresh()
    // }
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
    // public addFunction (metadata: OperatorMetadata): void {
    // this._addFunction(metadata)
    // this.refresh()
    // }
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