"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = exports.ExpHelper = exports.ExpressionHelper = void 0;
const h3lp_1 = require("h3lp");
const operandHelper_1 = require("./operandHelper");
class ExpressionHelper {
    // eslint-disable-next-line no-useless-constructor
    constructor(str) {
        this.str = str;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    clearLambda(func) {
        let str = func.toString().trim();
        let index = str.indexOf('=>') + 2;
        str = str.substring(index, str.length).trim();
        index = str.indexOf('(');
        if (index > -1) {
            // Example: xxx.Products.map()
            const form = str.substring(0, index).trim();
            const parts = form.split('.');
            if (parts.length > 2) {
                return this.str.replace(str, parts[0] + '.', '');
            }
        }
        else {
            // Example: xxx.Products
            const parts = str.split('.');
            if (parts.length > 1) {
                return this.str.replace(str, parts[0] + '.', '');
            }
        }
        return str;
    }
}
exports.ExpressionHelper = ExpressionHelper;
class ExpHelper extends h3lp_1.H3lp {
    constructor() {
        super();
        this.operand = operandHelper_1.operandHelper;
        this.expression = new ExpressionHelper(this.str);
    }
}
exports.ExpHelper = ExpHelper;
exports.helper = new ExpHelper();
//# sourceMappingURL=helper.js.map