"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionConfig = void 0;
const config_json_1 = __importDefault(require("./config.json"));
class ExpressionConfig {
    constructor() {
        this.operators = {};
        this.enums = {};
        this.functions = {};
        this.load(config_json_1.default);
    }
    load(data) {
        for (const name in data.enums) {
            this.addEnum(name, data.enums[name]);
        }
        for (const type in data.operators) {
            const count = type === 'ternary' ? 3 : type === 'binary' ? 2 : 1;
            for (const name in data.operators[type]) {
                const metadata = data.operators[type][name];
                this.addOperator(name, count, metadata);
            }
        }
        for (const name in data.functions) {
            const metadata = data.functions[name];
            this.addFunction(name, metadata);
        }
    }
    addEnum(key, source) {
        this.enums[key] = source;
    }
    addOperator(name, operands, metadata) {
        if (!this.operators[name])
            this.operators[name] = {};
        this.operators[name][operands] = metadata;
    }
    addFunction(name, metadata) {
        this.functions[name] = metadata;
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
    getOperator(name, operands) {
        try {
            if (this.operators[name]) {
                const operator = this.operators[name];
                if (operator[operands]) {
                    return operator[operands];
                }
            }
            return null;
        }
        catch (error) {
            throw new Error('error with operator: ' + name);
        }
    }
    getFunction(name) {
        try {
            if (this.functions[name]) {
                return this.functions[name];
            }
            return null;
        }
        catch (error) {
            throw new Error('error with function: ' + name);
        }
    }
}
exports.ExpressionConfig = ExpressionConfig;
//# sourceMappingURL=expressionConfig.js.map