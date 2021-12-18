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
        this.operandMetadata = new operand_1.OperandMetadata();
        this.operandMetadata.addLibrary(new coreLib_1.CoreLib());
        this.operandManager = new operand_1.OperandManager(this.operandMetadata, this.expressionConfig);
        this.parserManager = new parser_1.ParserManager(this.expressionConfig);
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new Expressions();
        }
        return this._instance;
    }
    get metadata() {
        return this.operandMetadata;
    }
    get parser() {
        return this.parserManager;
    }
    get config() {
        return this.expressionConfig;
    }
    /**
     * Build expression
     * @param expression expression to build
     * @returns Operand
     */
    parse(expression) {
        try {
            const key = 'operand_' + expression;
            let operand = this.cache.get(key);
            if (!operand) {
                const node = this.parserManager.parse(expression);
                this.parserManager.setParent(node);
                operand = this.operandManager.build(node);
                this.cache.set(key, operand);
            }
            return operand;
        }
        catch (error) {
            console.log(error);
            throw new Error('build expression: ' + expression + ' error: ' + error.toString());
        }
    }
    /**
     * Evaluate and solve expression
     * @param expression  string expression
     * @param data Data with variables
     * @returns Result of the evaluale expression
     */
    eval(expression, data) {
        const operand = this.parse(expression);
        const _data = new model_1.Data(data !== undefined ? data : {});
        return this.operandManager.eval(operand, _data);
    }
}
exports.Expressions = Expressions;
//# sourceMappingURL=expressions.js.map