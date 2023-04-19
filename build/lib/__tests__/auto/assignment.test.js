"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const __1 = require("../../");
describe('assignment', () => {
    const context = JSON.parse('{"a":"1","b":2,"c":{"a":4,"b":5}}');
    test('lab', () => {
        expect(__1.expressions.eval('a=8', context)).toStrictEqual(8);
        expect(__1.expressions.eval('c.a=1', context)).toStrictEqual(1);
        expect(__1.expressions.eval('d=c.b*2', context)).toStrictEqual(10);
        expect(__1.expressions.eval('d=`value of a is: ${a}`', context)).toStrictEqual('value of a is: 8');
    });
});
//# sourceMappingURL=assignment.test.js.map