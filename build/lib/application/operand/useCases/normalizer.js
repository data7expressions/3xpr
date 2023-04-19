"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandNormalize = void 0;
/* eslint-disable no-case-declarations */
const domain_1 = require("../../../domain");
class OperandNormalize {
    // eslint-disable-next-line no-useless-constructor
    constructor(model) {
        this.model = model;
    }
    normalize(operand) {
        if (operand.type === domain_1.OperandType.Var && operand.children.length === 0) {
            // Example: Products => Products.map(p=>p)
            const arrowVariable = new domain_1.Operand(operand.pos, 'p', domain_1.OperandType.Var);
            const allFields = new domain_1.Operand(operand.pos, 'p', domain_1.OperandType.Var);
            const map = new domain_1.Operand(operand.pos, 'map', domain_1.OperandType.Arrow, [operand, arrowVariable, allFields]);
            this.normalizeOperand(map);
            return map;
        }
        else {
            this.normalizeOperand(operand);
            return operand;
        }
    }
    normalizeOperand(operand) {
        if (operand.type === domain_1.OperandType.Arrow || operand.type === domain_1.OperandType.ChildFunc || operand.type === domain_1.OperandType.CallFunc) {
            const alias = this.model.functionAlias.find(p => p[0] === operand.name);
            if (alias) {
                operand.name = alias[1];
            }
        }
        else if (operand.type === domain_1.OperandType.Operator) {
            const alias = this.model.operatorAlias.find(p => p[0] === operand.name);
            if (alias) {
                operand.name = alias[1];
            }
        }
        for (const child of operand.children) {
            this.normalizeOperand(child);
        }
    }
}
exports.OperandNormalize = OperandNormalize;
//# sourceMappingURL=normalizer.js.map