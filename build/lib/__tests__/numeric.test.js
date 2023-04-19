"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe('Numeric', () => {
    test('arithmetic', () => {
        expect(2).toBe(__1.expressions.eval('1+1'));
        expect(1 + 1).toBe(__1.expressions.eval('1+1'));
        expect(3 + 2 - 1).toBe(__1.expressions.eval('3+2-1'));
        expect(3 * 4 - 1).toBe(__1.expressions.eval('3*4-1'));
        expect(1 + 4 * 2).toBe(__1.expressions.eval('1+4*2'));
        expect(4 + 4 + 2 + 50 + 600).toBe(__1.expressions.eval('4+4+2+50+600'));
        expect(1 - 2 - 5).toBe(__1.expressions.eval('1-2-5'));
        expect((1 + 4) * 2).toBe(__1.expressions.eval('(1+4)*2'));
        expect((2 + 3) * 2).toBe(__1.expressions.eval('(2+3)*2'));
        expect(2 * (3 + 2)).toBe(__1.expressions.eval('2*(3+2)'));
        expect(2 * (3 + 2) * (2 + 2)).toBe(__1.expressions.eval('2*(3+2)*(2+2)'));
        expect(1 + 2 * 3 * 4).toBe(__1.expressions.eval('1+2*3*4'));
        expect(2 * 3 + 4 * 5).toBe(__1.expressions.eval('2*3+4*5'));
        expect((1 + (2 ** 3) * 4)).toBe(__1.expressions.eval('(1+(2**3)*4'));
        expect(1 + 2 ** 3 * 4).toBe(__1.expressions.eval('1+2**3*4'));
        expect(1 + 2 ** (3 * 4)).toBe(__1.expressions.eval('1+2**(3*4)'));
    });
    test('comparisons', () => {
        expect(3 > 2).toBe(__1.expressions.eval('3>2'));
        expect(2 * 2 < 3).toBe(__1.expressions.eval('3>2*2'));
        expect(2 * 22 < -3).toBe(__1.expressions.eval('-3>2*2'));
        expect(2 * 2 <= 4).toBe(__1.expressions.eval('4>=2*2'));
        expect(2 * 2 >= 3).toBe(__1.expressions.eval('3<=2*2'));
        expect(2 * 2 !== 3).toBe(__1.expressions.eval('3!=2*2'));
        expect(2 * 2 !== 4).toBe(__1.expressions.eval('4!=2*2'));
        expect(2 * 2 !== -4).toBe(__1.expressions.eval('-4!=2*2'));
        expect(-2 * 2 === -4).toBe(__1.expressions.eval('-4==-2*2'));
        expect(-(2 * 2) === -4).toBe(__1.expressions.eval('-4==-(2*2)'));
    });
    test('variables', () => {
        expect(false).toBe(__1.expressions.eval('a>b', { a: 1, b: 2 }));
        expect(3).toBe(__1.expressions.eval('a+b', { a: 1, b: 2 }));
        expect(-2).toBe(__1.expressions.eval('-a*b', { a: 1, b: 2 }));
        expect(true).toBe(__1.expressions.eval('a*3==b+1', { a: 1, b: 2 }));
        expect(8).toBe(__1.expressions.eval('(a*b)+(2*a+2*b)', { a: 1, b: 2 }));
        expect(5).toBe(__1.expressions.eval('2**b+a', { a: 1, b: 2 }));
        expect(5).toBe(__1.expressions.eval('c.b', { a: '1', b: 2, c: { a: 4, b: 5 } }));
    });
    test('assignments', () => {
        const data = { a: '1', b: 2, c: { a: 4, b: 5 } };
        __1.expressions.eval('a=8', data);
        expect(8).toBe(data.a);
        __1.expressions.eval('c.a=1', data);
        expect(1).toBe(data.c.a);
    });
    test('functions', () => {
        expect(2).toBe(__1.expressions.eval('nvl(a,b)', { a: null, b: 2 }));
    });
});
//# sourceMappingURL=numeric.test.js.map