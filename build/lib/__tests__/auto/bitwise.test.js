"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const __1 = require("../../");
describe('bitwise', () => {
    const context = JSON.parse('{}');
    test('lab', () => {
        expect(__1.expressions.eval('5 & 1', context)).toStrictEqual(1);
        expect(__1.expressions.eval('5 | 1', context)).toStrictEqual(5);
        expect(__1.expressions.eval('~ 5', context)).toStrictEqual(-6);
        expect(__1.expressions.eval('5 << 1', context)).toStrictEqual(10);
        expect(__1.expressions.eval('5 ^ 1', context)).toStrictEqual(4);
        expect(__1.expressions.eval('5 >> 1', context)).toStrictEqual(2);
    });
});
//# sourceMappingURL=bitwise.test.js.map