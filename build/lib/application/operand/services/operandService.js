"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandService = void 0;
const helper_1 = require("../../helper");
class OperandService {
    constructor(typeService, cache) {
        this.typeService = typeService;
        this.cache = cache;
        this.builders = {};
    }
    addBuilder(builder) {
        this.builders[builder.key] = builder;
    }
    getBuilder(key) {
        return this.builders[key];
    }
    build(expression, type, useCache) {
        try {
            const builder = this.getBuilder(type);
            if (!useCache) {
                return builder.build(expression);
            }
            const key = `${helper_1.helper.utils.hashCode(expression)}-${type}`;
            const value = this.cache.get(key);
            if (!value) {
                const operand = builder.build(expression);
                this.cache.set(key, operand);
                return operand;
            }
            else {
                return value;
            }
        }
        catch (error) {
            throw new Error('expression: ' + expression + ' error: ' + error.toString());
        }
    }
    typed(expression, type) {
        const key = `${helper_1.helper.utils.hashCode(expression)}-${type}`;
        const value = this.cache.get(key);
        if (!value) {
            const builder = this.getBuilder(type);
            const operand = builder.build(expression);
            this.typeService.getType(operand);
            this.cache.set(key, operand);
            return operand;
        }
        else if (value.returnType === undefined) {
            this.typeService.getType(value);
            this.cache.set(key, value);
            return value;
        }
        else {
            return value;
        }
    }
    clone(operand, type) {
        return this.getBuilder(type).clone(operand);
    }
}
exports.OperandService = OperandService;
//# sourceMappingURL=operandService.js.map