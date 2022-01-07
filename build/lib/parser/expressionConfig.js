"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionConfig = void 0;
const config_json_1 = __importDefault(require("./config.json"));
const model_1 = require("../model");
class ExpressionConfig {
    constructor() {
        this.libraries = [];
        this.operators = [];
        this.enums = {};
        this.functions = [];
        this.load(config_json_1.default);
    }
    addLibrary(library) {
        const index = this.libraries.findIndex(p => p.name === library.name);
        if (index === undefined) {
            this.libraries.push(library);
        }
        else {
            this.libraries[index] = library;
        }
        for (const p in library.operators) {
            const metadata = library.operators[p];
            this.addOperator(metadata);
        }
        for (const p in library.functions) {
            const metadata = library.functions[p];
            this.addFunction(metadata);
        }
        for (const name in library.enums) {
            this.addEnum(name, library.enums[name]);
        }
    }
    load(data) {
        for (const name in data.enums) {
            this.addEnum(name, data.enums[name]);
        }
        for (const type in data.operators) {
            for (const name in data.operators[type]) {
                const operatorData = data.operators[type][name];
                const metadata = {
                    operator: name,
                    deterministic: true,
                    name: operatorData.name,
                    category: operatorData.category,
                    type: model_1.OperatorType.operator,
                    operands: operatorData.params.length,
                    priority: operatorData.priority ? operatorData.priority : -1,
                    description: operatorData.description,
                    params: operatorData.params,
                    return: operatorData.return
                };
                this.addOperator(metadata);
            }
        }
        for (const name in data.functions) {
            const functionData = data.functions[name];
            const metadata = {
                operator: name,
                name: name,
                category: functionData.category,
                deterministic: functionData.deterministic ? functionData.deterministic : true,
                type: functionData.type ? functionData.type : model_1.OperatorType.function,
                operands: functionData.params ? functionData.params.length : 0,
                description: functionData.description,
                params: functionData.params,
                return: functionData.return
            };
            this.addFunction(metadata);
        }
    }
    addEnum(key, source) {
        this.enums[key] = source;
    }
    addOperator(metadata) {
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
    addFunction(metadata) {
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
        return !!this.enums[names[0]];
    }
    getEnumValue(name, option) {
        return this.enums[name][option];
    }
    getEnum(name) {
        return this.enums[name];
    }
    getOperator(operator, operands) {
        const metadata = this.operators.find(p => p.operator === operator && p.operands === operands);
        if (metadata === undefined) {
            throw new Error(`operator: ${operator} not found `);
        }
        return metadata;
    }
    getFunction(name) {
        const metadata = this.functions.find(p => p.name === name);
        if (metadata === undefined) {
            throw new Error(`function: ${name} not found `);
        }
        return metadata;
    }
}
exports.ExpressionConfig = ExpressionConfig;
//# sourceMappingURL=expressionConfig.js.map