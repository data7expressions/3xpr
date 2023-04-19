"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicOperandBuilder = void 0;
const operandBuilder_1 = require("./operandBuilder");
const factory_1 = require("./factory/basic/factory");
class BasicOperandBuilder extends operandBuilder_1.OperandBuilder {
    constructor(expressionNormalize, expressionParse, normalizer, reducer, model) {
        super(expressionNormalize, expressionParse, normalizer, reducer, new factory_1.EvaluatorFactory(model));
    }
    get key() {
        return 'basic';
    }
}
exports.BasicOperandBuilder = BasicOperandBuilder;
//# sourceMappingURL=basicOperandBuilder.js.map