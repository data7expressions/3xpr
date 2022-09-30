"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpHelper = void 0;
const h3lp_1 = require("h3lp");
class ExpHelper extends h3lp_1.H3lp {
    getType(value) {
        if (Array.isArray(value)) {
            if (value.length > 0) {
                return { ElementType: this.getType(value[0]) };
            }
            return { ElementType: 'any' };
        }
        else if (typeof value === 'object') {
            const properties = [];
            for (const entry of Object.entries(value)) {
                properties.push({ name: entry[0], type: this.getType(entry[1]) });
            }
            return { properties: properties };
        }
        else if (typeof value === 'string') {
            // TODO determinar si es fecha.
            return 'string';
        }
        else if (typeof value === 'number') {
            if (this.validator.isInteger(value)) {
                return 'integer';
            }
            return 'decimal';
        }
        else if (typeof value === 'boolean') {
            return 'boolean';
        }
        return 'any';
    }
}
exports.ExpHelper = ExpHelper;
//# sourceMappingURL=helper.js.map