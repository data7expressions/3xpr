"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandBuilder = void 0;
/* eslint-disable no-case-declarations */
const domain_1 = require("../../../../domain");
const __1 = require("../../");
const expression_1 = require("../../../expression");
class OperandBuilder {
    constructor(evaluatorFactory, modelService) {
        this.evaluatorFactory = evaluatorFactory;
        this.expressionNormalize = new expression_1.ExpressionNormalize();
        this.expressionParse = new expression_1.ExpressionParse(modelService);
        this.normalize = new __1.OperandNormalize(modelService);
        this.reduce = new __1.OperandReduce(modelService);
    }
    build(expression) {
        const expressionNormalized = this.expressionNormalize.normalize(expression);
        const operand = this.expressionParse.parse(expressionNormalized);
        const normalized = this.normalize.normalize(operand);
        this.complete(normalized);
        return this.reduce.reduce(normalized);
    }
    clone(source) {
        const children = [];
        for (const child of source.children) {
            children.push(this.clone(child));
        }
        const target = new domain_1.Operand(source.pos, source.name, source.type, children, source.returnType);
        target.id = source.id;
        target.evaluator = this.evaluatorFactory.create(target);
        return target;
    }
    complete(operand, index = 0, parentId) {
        const id = parentId ? parentId + '.' + index : index.toString();
        if (operand.children) {
            for (let i = 0; i < operand.children.length; i++) {
                const child = operand.children[i];
                this.complete(child, i, id);
            }
        }
        operand.id = id;
        operand.evaluator = this.evaluatorFactory.create(operand);
    }
}
exports.OperandBuilder = OperandBuilder;
//# sourceMappingURL=operandBuilder.js.map