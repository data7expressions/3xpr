"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expressions = exports.ExpressionsBuilder = void 0;
const model_1 = require("../model");
const parser_1 = require("../parser");
const operand_1 = require("../operand");
const _1 = require(".");
// eslint-disable-next-line no-use-before-define
class ExpressionsBuilder {
    build() {
        const cache = new _1.MemoryCache();
        const model = new parser_1.ModelManager();
        const typeManager = new operand_1.OperandTypeManager(model);
        const operandManager = new operand_1.OperandManager(model);
        new operand_1.CoreLibrary(model).load();
        return new Expressions(cache, model, operandManager, typeManager);
    }
}
exports.ExpressionsBuilder = ExpressionsBuilder;
class Expressions {
    constructor(cache, model, operand, type) {
        this.observers = [];
        this.cache = cache;
        this.model = model;
        this.operand = operand;
        this.type = type;
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new ExpressionsBuilder().build();
        }
        return this._instance;
    }
    get operators() {
        return this.model.operators;
    }
    get enums() {
        return this.model.enums;
    }
    get formats() {
        return this.model.formats;
    }
    get constants() {
        return this.model.constants;
    }
    get functions() {
        return this.model.functions;
    }
    addFunction(source, sing, deterministic) {
        this.model.addFunction(source, sing, deterministic);
    }
    addEnum(key, source) {
        this.model.addEnum(key, source);
    }
    addFormat(key, pattern) {
        this.model.addFormat(key, pattern);
    }
    addConstant(key, value) {
        this.model.addConstant(key, value);
    }
    addAlias(alias, reference) {
        this.model.addAlias(alias, reference);
    }
    isEnum(name) {
        return this.model.isEnum(name);
    }
    getEnumValue(name, option) {
        return this.model.getEnumValue(name, option);
    }
    getEnum(name) {
        return this.model.getEnum(name);
    }
    isConstant(name) {
        return this.model.isConstant(name);
    }
    getConstantValue(name) {
        return this.model.getConstantValue(name);
    }
    getFormat(name) {
        return this.model.getFormat(name);
    }
    getOperator(operator, operands) {
        return this.model.getOperator(operator, operands);
    }
    getFunction(name) {
        return this.model.getFunction(name);
    }
    clone(operand) {
        return this.operand.clone(operand);
    }
    /**
     * Parser expression
     * @param expression  expression
     * @returns Operand
     */
    build(expression) {
        try {
            const minifyExpression = _1.Helper.node.minify(expression);
            const key = `${minifyExpression.join('')}_operand`;
            const value = this.cache.get(key);
            if (!value) {
                const operand = this.operand.build(minifyExpression);
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
    /**
     * Get parameters of expression
     * @param expression  expression
     * @returns Parameters of expression
     */
    parameters(expression) {
        const operand = this.typed(expression);
        return this.type.parameters(operand);
    }
    /**
     * Get type of expression
     * @param expression  expression
     * @returns Type of expression
     */
    getType(expression) {
        const operand = this.typed(expression);
        return _1.Helper.type.toString(operand.type);
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
            const operand = this.build(expression);
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
    typed(expression) {
        const minifyExpression = _1.Helper.node.minify(expression);
        const key = `${minifyExpression.join('')}_operand`;
        const value = this.cache.get(key);
        if (!value) {
            const operand = this.operand.build(minifyExpression);
            this.type.solve(operand);
            this.cache.set(key, operand);
            return operand;
        }
        else if (value.type === undefined) {
            this.type.solve(value);
            this.cache.set(key, value);
            return value;
        }
        else {
            return value;
        }
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