"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterService = void 0;
// import { Const, Var, Template, Operator, CallFunc, Arrow, List, Obj, Property } from './operands'
const domain_1 = require("../../../domain");
const typ3s_1 = require("typ3s");
class ParameterService {
    parameters(operand) {
        const parameters = [];
        if (operand.type === domain_1.OperandType.Var) {
            parameters.push({ name: operand.name, type: typ3s_1.Type.stringify(operand.returnType) });
        }
        for (const child of operand.children) {
            const childParameters = this.parameters(child);
            const newParameters = childParameters.filter((p) => !parameters.map((p) => p.name).includes(p.name));
            if (newParameters.length > 0) {
                parameters.push(...newParameters);
            }
        }
        return parameters;
    }
}
exports.ParameterService = ParameterService;
//# sourceMappingURL=parameterService.js.map