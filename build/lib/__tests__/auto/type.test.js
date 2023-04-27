"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const lib_1 = require("../../../lib");
describe('type', () => {
    const context = JSON.parse('{}');
    test('lab', () => {
        expect(lib_1.expressions.type('1 + a')).toStrictEqual('integer');
        expect(lib_1.expressions.type('b + a')).toStrictEqual('any');
        expect(lib_1.expressions.type('nvl(a ,1)')).toStrictEqual('integer');
        expect(lib_1.expressions.type('nvl(a ,"text")')).toStrictEqual('string');
        expect(lib_1.expressions.type('nvl(a , b * 5 )')).toStrictEqual('number');
        expect(lib_1.expressions.type('a.strCount("o")')).toStrictEqual('number');
        expect(lib_1.expressions.type('[1,2,3].map(p => nvl(a, p))')).toStrictEqual('[integer]');
        expect(lib_1.expressions.type('a = max([1,2,3])')).toStrictEqual('integer');
        expect(lib_1.expressions.type('a = max([1,2,3]) > c')).toStrictEqual('boolean');
        expect(lib_1.expressions.type('d=c.b*2')).toStrictEqual('number');
        expect(lib_1.expressions.type('d=`value of a is: ${a}`')).toStrictEqual('string');
        expect(lib_1.expressions.type('!(a=="1" || b>2)')).toStrictEqual('boolean');
        expect(lib_1.expressions.type('a = {firstName: "John", lastName: "Lennon", age: 40}')).toStrictEqual('{firstName:string,lastName:string,age:integer}');
        expect(lib_1.expressions.type('ods.union(prime)')).toStrictEqual('any');
        expect(lib_1.expressions.type('cities.push(salta).name')).toStrictEqual('any');
        expect(lib_1.expressions.type('a = cities.push(salta).name')).toStrictEqual('any');
    });
});
//# sourceMappingURL=type.test.js.map