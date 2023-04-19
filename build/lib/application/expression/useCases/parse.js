"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionParse = void 0;
const parser_1 = require("../services/parser");
class ExpressionParse {
    // eslint-disable-next-line no-useless-constructor
    constructor(model) {
        this.model = model;
    }
    parse(expression) {
        return new parser_1.Parser(this.model, expression).parse();
    }
}
exports.ExpressionParse = ExpressionParse;
//# sourceMappingURL=parse.js.map