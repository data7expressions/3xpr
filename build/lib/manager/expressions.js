"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expressions = exports.ExpressionsBuilder = void 0;
const model_1 = require("../model");
const parser_1 = require("../parser");
const operand_1 = require("./../operand");
const _1 = require(".");
const coreLib_1 = require("../operand/lib/coreLib");
class ExpressionsBuilder {
    build() {
        const cache = new _1.MemoryCache();
        const expressionConfig = new parser_1.ExpressionConfig();
        expressionConfig.addLibrary(new coreLib_1.CoreLib());
        const parserManager = new parser_1.ParserManager(expressionConfig);
        const typeManager = new operand_1.OperandTypeManager(expressionConfig);
        const serializer = new operand_1.OperandSerializer(expressionConfig);
        const operandManager = new operand_1.OperandManager(expressionConfig, typeManager);
        return new Expressions(cache, expressionConfig, parserManager, serializer, operandManager);
    }
}
exports.ExpressionsBuilder = ExpressionsBuilder;
class Expressions {
    constructor(cache, config, parserManager, serializer, operandManager) {
        this.observers = [];
        this.cache = cache;
        this.config = config;
        this.serializer = serializer;
        this.operandManager = operandManager;
        this.parserManager = parserManager;
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new ExpressionsBuilder().build();
        }
        return this._instance;
    }
    get parser() {
        return this.parserManager;
    }
    get libraries() {
        return this.config.libraries;
    }
    get operators() {
        return this.config.operators;
    }
    get enums() {
        return this.config.enums;
    }
    get formats() {
        return this.config.formats;
    }
    get functions() {
        return this.config.functions;
    }
    addLibrary(library) {
        this.config.addLibrary(library);
    }
    load(data) {
        this.config.load(data);
    }
    isEnum(name) {
        return this.config.isEnum(name);
    }
    getEnumValue(name, option) {
        return this.config.getEnumValue(name, option);
    }
    getEnum(name) {
        return this.config.getEnum(name);
    }
    getFormat(name) {
        return this.config.getFormat(name);
    }
    getOperator(operator, operands) {
        return this.config.getOperator(operator, operands);
    }
    getFunction(name) {
        return this.config.getFunction(name);
    }
    clone(operand) {
        return this.serializer.clone(operand);
    }
    /**
     * Parser expression
     * @param expression  expression
     * @returns Operand
     */
    parse(expression) {
        const minifyExpression = this.parserManager.minify(expression);
        const key = `${minifyExpression}_operand`;
        const value = this.cache.get(key);
        if (!value) {
            const node = this.parserManager.parse(minifyExpression);
            // this.parserManager.setParent(node)
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
            const context = new model_1.Context(new model_1.Data(data));
            const result = operand.eval(context);
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