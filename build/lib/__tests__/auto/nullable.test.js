"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const __1 = require("../../");
describe('nullable', () => {
    const context = JSON.parse('{"a":1,"b":null,"c":"","e":"hello"}');
    test('lab', () => {
        expect(__1.expressions.eval('nvl(a,2)', context)).toStrictEqual(1);
        expect(__1.expressions.eval('nvl(b,2)', context)).toStrictEqual(2);
        expect(__1.expressions.eval('nvl2(b,"is not null","is null")', context)).toStrictEqual('is null');
        expect(__1.expressions.eval('nvl2(c,"is not null","is null")', context)).toStrictEqual('is not null');
        expect(__1.expressions.eval('nvl2(d,"is not null","is null")', context)).toStrictEqual('is null');
    });
});
//# sourceMappingURL=nullable.test.js.map