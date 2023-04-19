"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandReducer = void 0;
/* eslint-disable no-case-declarations */
const domain_1 = require("../../domain");
const factory_1 = require("./factory");
class OperandReducer {
    // eslint-disable-next-line no-useless-constructor
    constructor(model) {
        this.model = model;
    }
    reduce(operand) {
        if (operand.type === domain_1.OperandType.Operator) {
            return this.reduceOperand(operand);
        }
        else if (operand.type === domain_1.OperandType.CallFunc) {
            // Example: .[0].states.filter() where function name is states.filter
            const names = operand.name.split('.');
            const funcName = names[names.length - 1];
            const funcMetadata = this.model.getFunction(funcName);
            if (funcMetadata && funcMetadata.deterministic) {
                return this.reduceOperand(operand);
            }
        }
        return operand;
    }
    reduceOperand(operand) {
        let allConstants = true;
        for (const child of operand.children) {
            if (!(child.type === domain_1.OperandType.Const)) {
                allConstants = false;
                break;
            }
        }
        if (allConstants) {
            const value = operand.eval(new domain_1.Context());
            const constant = new factory_1.ConstBuilder().build(operand.pos, value);
            constant.id = operand.id;
            return constant;
        }
        else {
            for (let i = 0; i < operand.children.length; i++) {
                const child = operand.children[i];
                operand.children[i] = this.reduce(child);
            }
        }
        return operand;
    }
}
exports.OperandReducer = OperandReducer;
//# sourceMappingURL=reducer.js.map