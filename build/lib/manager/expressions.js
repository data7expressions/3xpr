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
        const expressionConfig = new parser_1.ExpressionConfig();
        const typeManager = new operand_1.OperandTypeManager(expressionConfig);
        const serializer = new operand_1.OperandSerializer(expressionConfig);
        const operandBuilder = new operand_1.OperandBuilder(expressionConfig);
        new operand_1.CoreLibrary(expressionConfig).load();
        return new Expressions(cache, expressionConfig, serializer, operandBuilder, typeManager);
    }
}
exports.ExpressionsBuilder = ExpressionsBuilder;
class Expressions {
    constructor(cache, config, serializer, operandBuilder, typeManager) {
        this.observers = [];
        this.cache = cache;
        this.config = config;
        this.serializer = serializer;
        this.operandBuilder = operandBuilder;
        this.typeManager = typeManager;
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new ExpressionsBuilder().build();
        }
        return this._instance;
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
    addFunction(source, sing, deterministic) {
        this.config.addFunction(source, sing, deterministic);
    }
    addEnum(key, source) {
        this.config.addEnum(key, source);
    }
    addFormat(key, pattern) {
        this.config.addFormat(key, pattern);
    }
    addConstant(key, value) {
        this.config.addConstant(key, value);
    }
    addAlias(alias, reference) {
        this.config.addAlias(alias, reference);
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
    isConstant(name) {
        return this.config.isConstant(name);
    }
    getConstantValue(name) {
        return this.config.getConstantValue(name);
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
        try {
            const minifyExpression = _1.Helper.exp.minify(expression);
            const key = `${minifyExpression.join('')}_operand`;
            const value = this.cache.get(key);
            if (!value) {
                const operand = this._parse(minifyExpression);
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
    typed(expression) {
        const minifyExpression = _1.Helper.exp.minify(expression);
        const key = `${minifyExpression.join('')}_operand`;
        const value = this.cache.get(key);
        if (!value) {
            const operand = this._parse(minifyExpression);
            this.typeManager.solve(operand);
            this.cache.set(key, operand);
            return operand;
        }
        else if (value.type === undefined) {
            this.typeManager.solve(value);
            this.cache.set(key, value);
            return value;
        }
        else {
            return value;
        }
    }
    _parse(buffer) {
        const parser = new parser_1.Parser(this.config, buffer);
        const node = parser.parse();
        _1.Helper.exp.clearChildEmpty(node);
        const operand = this.operandBuilder.build(node);
        return operand;
    }
    /**
     * Get parameters of expression
     * @param expression  expression
     * @returns Parameters of expression
     */
    parameters(expression) {
        const operand = this.typed(expression);
        return this.typeManager.parameters(operand);
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