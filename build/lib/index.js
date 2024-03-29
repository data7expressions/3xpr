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
exports.unsubscribe = exports.subscribe = exports.evalAsync = exports.evaluate = exports.parameters = exports.expressions = exports.helper = void 0;
const h3lp_1 = require("h3lp");
const infrastructure_1 = require("./expression/infrastructure");
__exportStar(require("./shared/domain"), exports);
__exportStar(require("./shared/application"), exports);
__exportStar(require("./model/domain"), exports);
__exportStar(require("./model/application"), exports);
__exportStar(require("./operand/domain"), exports);
__exportStar(require("./operand/application"), exports);
__exportStar(require("./operand/infrastructure"), exports);
__exportStar(require("./expression/domain"), exports);
__exportStar(require("./expression/application"), exports);
__exportStar(require("./expression/infrastructure"), exports);
exports.helper = new infrastructure_1.HelperBuilder().build();
exports.expressions = new infrastructure_1.ExpressionsBuilder(exports.helper).build();
h3lp_1.Factory.add('expressions', exports.expressions);
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
const evalAsync = (expression, data) => {
    return exports.expressions.evalAsync(expression, data);
};
exports.evalAsync = evalAsync;
const subscribe = (observer) => {
    exports.expressions.subscribe(observer);
};
exports.subscribe = subscribe;
const unsubscribe = (observer) => {
    exports.expressions.subscribe(observer);
};
exports.unsubscribe = unsubscribe;
//# sourceMappingURL=index.js.map