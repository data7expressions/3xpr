"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessOperandBuilder = void 0;
const operandBuilder_1 = require("./operandBuilder");
const factory_1 = require("./factory/process/factory");
class ProcessOperandBuilder extends operandBuilder_1.OperandBuilder {
    constructor(model) {
        super(new factory_1.ProcessEvaluatorFactory(model), model);
    }
    get key() {
        return 'process';
    }
}
exports.ProcessOperandBuilder = ProcessOperandBuilder;
//# sourceMappingURL=processOperandBuilder.js.map