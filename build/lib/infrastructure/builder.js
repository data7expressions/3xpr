"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionsBuilder = void 0;
const h3lp_1 = require("h3lp");
const application_1 = require("../application");
// eslint-disable-next-line no-use-before-define
class ExpressionsBuilder {
    build() {
        const model = new application_1.ModelService();
        const typeManager = new application_1.TypeService(model);
        const parameterManager = new application_1.ParameterService();
        const normalizer = new application_1.OperandNormalizer(model);
        const reducer = new application_1.OperandReducer(model);
        const expressionNormalize = new application_1.ExpressionNormalize();
        const expressionParse = new application_1.ExpressionParse(model);
        const cache = new h3lp_1.MemoryCache();
        return new application_1.Expressions(model, typeManager, parameterManager, expressionNormalize, expressionParse, normalizer, reducer, cache);
    }
}
exports.ExpressionsBuilder = ExpressionsBuilder;
//# sourceMappingURL=builder.js.map