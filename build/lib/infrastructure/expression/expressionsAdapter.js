"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionsAdapter = void 0;
const typ3s_1 = require("typ3s");
const domain_1 = require("../../domain");
const application_1 = require("../../application");
const convertFromFunction_1 = require("./convertFromFunction");
const convertFromGraphql_1 = require("./convertFromGraphql");
class ExpressionsAdapter {
    constructor(_model, typeService, parameterService, cache) {
        this._model = _model;
        this.parameterService = parameterService;
        this.observers = [];
        this.operandService = new application_1.OperandService(typeService, cache);
        const basic = new application_1.BasicOperandBuilder(_model);
        const process = new application_1.ProcessOperandBuilder(_model);
        new application_1.CoreLibrary(_model, basic).load();
        this.operandService.addBuilder(basic);
        this.operandService.addBuilder(process);
        this.convertFromFunction = new convertFromFunction_1.ExpressionConvertFromFunction(this.operandService);
        this.convertFromGraphql = new convertFromGraphql_1.ExpressionConvertFromGraphql();
    }
    get model() {
        return this._model;
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
    addOperator(sing, source, additionalInfo) {
        this.model.addOperator(source, sing, additionalInfo);
    }
    addFunction(sing, source, additionalInfo) {
        this.model.addFunction(sing, source, additionalInfo);
    }
    addEnum(key, values) {
        this.model.addEnum(key, values);
    }
    addFormat(key, pattern) {
        this.model.addFormat(key, pattern);
    }
    addConstant(key, value) {
        this.model.addConstant(key, value);
    }
    addOperatorAlias(alias, reference) {
        this.model.addOperatorAlias(alias, reference);
    }
    addFunctionAlias(alias, reference) {
        this.model.addFunctionAlias(alias, reference);
    }
    addOperandBuilder(builder) {
        this.operandService.addBuilder(builder);
    }
    /**
     * Convert a lambda expression to a query expression
     * @param lambda lambda expression
     * @returns Expression manager
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    toExpression(func) {
        return this.convertFromFunction.toExpression(func);
    }
    graphqlToExpression(graphql) {
        return this.convertFromGraphql.toExpression(graphql);
    }
    /**
     * Get parameters of expression
     * @param expression  expression
     * @returns Parameters of expression
     */
    parameters(expression) {
        const operand = this.operandService.typed(expression, 'basic');
        return this.parameterService.parameters(operand);
    }
    /**
     * Get type of expression
     * @param expression  expression
     * @returns Type of expression
     */
    type(expression) {
        const operand = this.operandService.typed(expression, 'basic');
        return typ3s_1.Type.stringify(operand.returnType);
    }
    /**
     * Evaluate and solve expression
     * @param expression  string expression
     * @param data Data with variables
     * @returns Result of the evaluate expression
     */
    eval(expression, data) {
        const context = new domain_1.Context(new domain_1.Data(data));
        try {
            this.beforeExecutionNotify(expression, context);
            const operand = this.operandService.build(expression, 'basic', true);
            const result = operand.eval(context);
            this.afterExecutionNotify(expression, context, result);
            return result;
        }
        catch (error) {
            this.errorExecutionNotify(expression, context, error);
            throw error;
        }
    }
    run(expression, data = {}) {
        const context = new domain_1.Context(new domain_1.Data(data));
        try {
            this.beforeExecutionNotify(expression, context);
            const operand = this.operandService.build(expression, 'process', true);
            const result = operand.eval(context);
            this.afterExecutionNotify(expression, context, result);
            return result;
        }
        catch (error) {
            this.errorExecutionNotify(expression, context, error);
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
    build(expression, useCache) {
        return this.operandService.build(expression, 'basic', useCache);
    }
    clone(source) {
        return this.operandService.clone(source, 'basic');
    }
    beforeExecutionNotify(expression, context) {
        const args = { expression, context };
        this.observers.forEach((observer) => {
            if (observer.condition === undefined) {
                observer.before(args);
            }
            else {
                if (this.eval(observer.condition, context)) {
                    observer.before(args);
                }
            }
        });
    }
    afterExecutionNotify(expression, context, result) {
        const args = { expression, context, result };
        this.observers.forEach((observer) => {
            if (observer.condition === undefined) {
                observer.after(args);
            }
            else {
                if (this.eval(observer.condition, context)) {
                    observer.after(args);
                }
            }
        });
    }
    errorExecutionNotify(expression, context, error) {
        const args = { expression, context, error };
        this.observers.forEach((observer) => {
            if (observer.condition === undefined) {
                observer.error(args);
            }
            else {
                if (this.eval(observer.condition, context)) {
                    observer.error(args);
                }
            }
        });
    }
}
exports.ExpressionsAdapter = ExpressionsAdapter;
//# sourceMappingURL=expressionsAdapter.js.map