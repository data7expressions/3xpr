"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpHelper = void 0;
const h3lp_1 = require("h3lp");
class ExpHelper extends h3lp_1.H3lp {
    constructor() {
        super();
        // eslint-disable-next-line prefer-regex-literals
        this.reAlphanumeric = new RegExp('[a-zA-Z0-9_.]+$');
    }
    isAlphanumeric(value) {
        return this.reAlphanumeric.test(value);
    }
}
exports.ExpHelper = ExpHelper;
//# sourceMappingURL=helper.js.map