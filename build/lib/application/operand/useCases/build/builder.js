"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandBuilder = void 0;
/* eslint-disable no-case-declarations */
const domain_1 = require("../../../../domain");
class OperandBuilder {
    // eslint-disable-next-line no-useless-constructor
    constructor(expressionNormalize, expressionParse, normalizer, reducer, factory) {
        this.expressionNormalize = expressionNormalize;
        this.expressionParse = expressionParse;
        this.normalizer = normalizer;
        this.reducer = reducer;
        this.factory = factory;
    }
    build(expression) {
        const expressionNormalized = this.expressionNormalize.normalize(expression);
        const operand = this.expressionParse.parse(expressionNormalized);
        const normalized = this.normalizer.normalize(operand);
        this.complete(normalized);
        return this.reducer.reduce(normalized);
    }
    clone(source) {
        const children = [];
        for (const child of source.children) {
            children.push(this.clone(child));
        }
        const target = new domain_1.Operand(source.pos, source.name, source.type, children, source.returnType);
        target.id = source.id;
        target.evaluator = this.factory.create(target);
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
        operand.evaluator = this.factory.create(operand);
    }
}
exports.OperandBuilder = OperandBuilder;
//# sourceMappingURL=builder.js.map