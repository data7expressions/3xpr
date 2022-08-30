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
        const minifyExpression = this.parser.minify(expression);
        const key = `${minifyExpression}_operand`;
        const value = this.cache.get(key);
        if (!value) {
            const node = this.parserManager.parse(minifyExpression);
            this.parserManager.setParent(node);
            const operand = this.operandManager.build(node);
            this.cache.set(key, this.operandManager.serialize(operand));
            return operand;
        }
        else {
            return this.operandManager.deserialize(value);
        }
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
    /**
     * Get parameters of expression
     * @param expression  expression
     * @returns Parameters of expression
     */
    parameters(expression) {
        const operand = this.parse(expression);
        return this.operandManager.parameters(operand);
    }
}
exports.Expressions = Expressions;
//# sourceMappingURL=expressions.js.map