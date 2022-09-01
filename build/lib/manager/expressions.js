"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expressions = void 0;
const model_1 = require("../model");
const parser_1 = require("../parser");
const operand_1 = require("../operand");
const memoryCache_1 = require("./memoryCache");
const coreLib_1 = require("../operand/lib/coreLib");
class Expressions {
    constructor() {
        this.observers = [];
        this.cache = new memoryCache_1.MemoryCache();
        this.expressionConfig = new parser_1.ExpressionConfig();
        this.expressionConfig.addLibrary(new coreLib_1.CoreLib());
        this.operandManager = new operand_1.OperandManager(this.expressionConfig);
        this.parserManager = new parser_1.ParserManager(this.expressionConfig);
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new Expressions();
        }
        return this._instance;
    }
    get parser() {
        return this.parserManager;
    }
    get config() {
        return this.expressionConfig;
    }
    get operand() {
        return this.operandManager;
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
        try {
            this.beforeExecutionNotify(expression, data);
            const operand = this.parse(expression);
            const _data = new model_1.Data(data !== undefined ? data : {});
            const result = this.operandManager.eval(operand, _data);
            this.afterExecutionNotify(expression, data, result);
            return result;
        }
        catch (error) {
            this.errorExecutionNotify(expression, data, error);
            throw error;
        }
    }
    // Listeners and subscribers
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index === -1) {
            throw new Error('Subject: Nonexistent observer.');
        }
        this.observers.splice(index, 1);
    }
    beforeExecutionNotify(expression, data) {
        const args = { expression: expression, data: data };
        this.observers.forEach((observer) => {
            if (observer.condition === undefined) {
                observer.before(args);
            }
            else {
                if (this.eval(observer.condition, data)) {
                    observer.before(args);
                }
            }
        });
    }
    afterExecutionNotify(expression, data, result) {
        const args = { expression: expression, data: data, result: result };
        this.observers.forEach((observer) => {
            if (observer.condition === undefined) {
                observer.after(args);
            }
            else {
                if (this.eval(observer.condition, data)) {
                    observer.after(args);
                }
            }
        });
    }
    errorExecutionNotify(expression, data, error) {
        const args = { expression: expression, data: data, error: error };
        this.observers.forEach((observer) => {
            if (observer.condition === undefined) {
                observer.error(args);
            }
            else {
                if (this.eval(observer.condition, data)) {
                    observer.error(args);
                }
            }
        });
    }
}
exports.Expressions = Expressions;
//# sourceMappingURL=expressions.js.map