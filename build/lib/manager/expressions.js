"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionsManager = void 0;
const model_1 = require("../model");
class ExpressionsManager {
    constructor(cache, configManager, operandManager, parserManager) {
        this.observers = [];
        this.cache = cache;
        this.configManager = configManager;
        this.operandManager = operandManager;
        this.parserManager = parserManager;
    }
    parse(expression) {
        const minifyExpression = this.parserManager.minify(expression);
        const key = `${minifyExpression}_operand`;
        const value = this.cache.get(key);
        if (!value) {
            const node = this.parserManager.parse(minifyExpression);
            this.parserManager.setParent(node);
            const operand = this.operandManager.build(node);
            this.cache.set(key, operand);
            // this.cache.set(key, this.operandManager.serialize(operand))
            return operand;
        }
        else {
            // return this.operandManager.deserialize(value)
            return value;
        }
    }
    /**
     * Get parameters of expression
     * @param expression  expression
     * @returns Parameters of expression
     */
    parameters(expression) {
        const operand = this.parse(expression);
        return this.operandManager.parameters(operand);
    }
    /**
     * Evaluate and solve expression
     * @param expression  string expression
     * @param data Data with variables
     * @returns Result of the evaluate expression
     */
    eval(expression, data) {
        const operand = this.parse(expression);
        const _data = new model_1.Data(data !== undefined ? data : {});
        return this.operandManager.eval(operand, _data);
    }
}
exports.ExpressionsManager = ExpressionsManager;
//# sourceMappingURL=expressions.js.map