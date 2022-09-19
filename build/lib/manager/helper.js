"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpHelper = void 0;
const h3lp_1 = require("h3lp");
class ExpHelper extends h3lp_1.Helper {
    isPositiveInteger(value) {
        if (typeof value !== 'string') {
            return false;
        }
        const num = Number(value);
        return Number.isInteger(num) && num >= 0;
    }
}
exports.ExpHelper = ExpHelper;
//# sourceMappingURL=helper.js.map