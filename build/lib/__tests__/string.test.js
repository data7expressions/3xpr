"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe('Strings', () => {
    test('operators', () => {
        expect('a').toBe(__1.expressions.eval('"a"'));
        expect('a' < 'b').toBe(__1.expressions.eval('"a"<"b"'));
        expect('a "b" ' < 'b').toBe(__1.expressions.eval('"a ""b"" "<"b"'));
    });
    test('functions', () => {
        expect('Aaa').toBe(__1.expressions.eval('title(a)', { a: 'aaa', b: 2 }));
        expect('Aaa').toBe(__1.expressions.eval('title("aaa")'));
        expect(3).toBe(__1.expressions.eval('strCount(a,"a")', { a: 'aaa' }));
        expect(0).toBe(__1.expressions.eval('strCount(a,"b")', { a: 'aaa' }));
        expect('AAA').toBe(__1.expressions.eval('upper(a)', { a: 'aaa' }));
    });
});
//# sourceMappingURL=string.test.js.map