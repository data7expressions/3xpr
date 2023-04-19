"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const __1 = require("../../");
describe('arithmetic', () => {
    const context = JSON.parse('{"a":"1","b":2,"c":{"a":4,"b":5}}');
    test('lab', () => {
        expect(__1.expressions.eval('3+2-1', context)).toStrictEqual(4);
        expect(__1.expressions.eval('3*4-1', context)).toStrictEqual(11);
        expect(__1.expressions.eval('1-2-5', context)).toStrictEqual(-6);
        expect(__1.expressions.eval('(2+3)*2', context)).toStrictEqual(10);
        expect(__1.expressions.eval('2*(3+2)', context)).toStrictEqual(10);
        expect(__1.expressions.eval('1+2*3*4', context)).toStrictEqual(25);
        expect(__1.expressions.eval('(1+(2**3)*4', context)).toStrictEqual(33);
        expect(__1.expressions.eval('1+2**(3*4)', context)).toStrictEqual(4097);
        expect(__1.expressions.eval('(a*b)+(2*a+2*b)', context)).toStrictEqual(8);
        expect(__1.expressions.eval('2**b+a', context)).toStrictEqual('41');
    });
});
//# sourceMappingURL=arithmetic.test.js.map