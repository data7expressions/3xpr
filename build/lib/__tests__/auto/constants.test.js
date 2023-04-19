"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const __1 = require("../../");
describe('constants', () => {
    const context = JSON.parse('{}');
    test('lab', () => {
        expect(__1.expressions.eval('a = true', context)).toStrictEqual(true);
        expect(__1.expressions.eval('a = 1', context)).toStrictEqual(1);
        expect(__1.expressions.eval('pi = 3.14159', context)).toStrictEqual(3.14159);
        expect(__1.expressions.eval('musician = "Charly Garcia" ', context)).toStrictEqual('Charly Garcia');
        expect(__1.expressions.eval('a = nvl(null,false)', context)).toStrictEqual(false);
    });
});
//# sourceMappingURL=constants.test.js.map