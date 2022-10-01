"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpHelper = void 0;
const h3lp_1 = require("h3lp");
class TypeHelper {
    constructor(help) {
        this.help = help;
    }
    getType(value) {
        if (Array.isArray(value)) {
            if (value.length > 0) {
                return { items: this.getType(value[0]) };
            }
            return { items: 'any' };
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
            if (this.help.validator.isInteger(value)) {
                return 'integer';
            }
            return 'decimal';
        }
        else if (typeof value === 'boolean') {
            return 'boolean';
        }
        return 'any';
    }
    isPrimitive(type) {
        let value;
        if (typeof type === 'string') {
            value = type;
        }
        else {
            value = type.toString();
        }
        return ['string', 'integer', 'decimal', 'number', 'boolean', 'date', 'datetime', 'time'].includes(value);
    }
    isArrayType(type) {
        if (typeof type === 'string') {
            return type.startsWith('[') && type.endsWith(']');
        }
        return type.items !== undefined;
    }
    isObjectType(type) {
        if (typeof type === 'string') {
            return type.startsWith('{') && type.endsWith('}');
        }
        return type.properties !== undefined;
    }
    serialize(type) {
        if (type === undefined || type === null) {
            return 'any';
        }
        return JSON.stringify(type);
    }
    deserialize(type) {
        if (type === undefined || type === null) {
            return 'any';
        }
        return JSON.parse(type);
    }
}
class ExpHelper extends h3lp_1.H3lp {
    constructor() {
        super();
        this.type = new TypeHelper(this);
    }
}
exports.ExpHelper = ExpHelper;
//# sourceMappingURL=helper.js.map