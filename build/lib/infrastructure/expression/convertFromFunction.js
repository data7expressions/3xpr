"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionConvertFromFunction = void 0;
const helper_1 = require("../../application/helper");
const domain_1 = require("../../domain");
class ExpressionConvertFromFunction {
    // eslint-disable-next-line no-useless-constructor
    constructor(operandService) {
        this.operandService = operandService;
    }
    /**
     * Convert a lambda expression to a query expression
     * @param lambda lambda expression
     * @returns Expression manager
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    toExpression(func) {
        if (!func) {
            throw new Error('empty lambda function}');
        }
        const expression = helper_1.helper.expression.clearLambda(func);
        const operand = this.operandService.build(expression, 'basic', true);
        let aux = operand;
        while (aux.type !== domain_1.OperandType.Var) {
            if (aux.children.length > 0) {
                aux = aux.children[0];
            }
        }
        if (aux.name.includes('.')) {
            // Example: __model_1.Products.map(p=>p) =>  Products.map(p=>p)
            // Example: __model_1.Orders.details.map(p=>p) =>  Orders.details.map(p=>p)
            const names = aux.name.split('.');
            if (names[0].startsWith('__')) {
                // aux.name = names.slice(1).join('.')
                const result = expression.replace(names[0] + '.', '');
                return result;
            }
        }
        // Example: Products.map(p=>p) =>  Products.map(p=>p)
        // Example: Orders.details.map(p=>p) =>  Orders.details.map(p=>p)
        return expression;
    }
}
exports.ExpressionConvertFromFunction = ExpressionConvertFromFunction;
//# sourceMappingURL=convertFromFunction.js.map