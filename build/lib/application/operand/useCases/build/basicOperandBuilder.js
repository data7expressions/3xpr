"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicOperandBuilder = void 0;
const operandBuilder_1 = require("./operandBuilder");
const factory_1 = require("./factory/basic/factory");
class BasicOperandBuilder extends operandBuilder_1.OperandBuilder {
    constructor(model) {
        super(new factory_1.EvaluatorFactory(model), model);
    }
    get key() {
        return 'basic';
    }
}
exports.BasicOperandBuilder = BasicOperandBuilder;
//# sourceMappingURL=basicOperandBuilder.js.map