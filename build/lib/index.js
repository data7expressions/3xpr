"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribe = exports.subscribe = exports.validate = exports.addSchema = exports.evaluate = exports.parameters = exports.parse = exports.expressions = void 0;
const expressions_1 = require("./expressions");
__exportStar(require("./model"), exports);
__exportStar(require("./operand"), exports);
__exportStar(require("./manager"), exports);
__exportStar(require("./parser"), exports);
exports.expressions = expressions_1.Expressions.instance;
/**
     * Parser expression
     * @param expression  expression
     * @returns Operand
     */
const parse = (expression) => {
    return exports.expressions.parse(expression);
};
exports.parse = parse;
/**
 * Get parameters of expression
 * @param expression  expression
 * @returns Parameters of expression
 */
const parameters = (expression) => {
    return exports.expressions.parameters(expression);
};
exports.parameters = parameters;
/**
 * Evaluate and solve expression
 * @param expression  string expression
 * @param data Data with variables
 * @returns Result of the evaluate expression
 */
const evaluate = (expression, data) => {
    return exports.expressions.eval(expression, data);
};
exports.evaluate = evaluate;
const addSchema = (schema) => {
    return exports.expressions.addSchema(schema);
};
exports.addSchema = addSchema;
const validate = async (schema, data) => {
    return exports.expressions.validate(schema, data);
};
exports.validate = validate;
const subscribe = (observer) => {
    exports.expressions.subscribe(observer);
};
exports.subscribe = subscribe;
const unsubscribe = (observer) => {
    exports.expressions.subscribe(observer);
};
exports.unsubscribe = unsubscribe;
//# sourceMappingURL=index.js.map