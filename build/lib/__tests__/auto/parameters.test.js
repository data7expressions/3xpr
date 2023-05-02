"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const lib_1 = require("../../../lib");
describe('parameters', () => {
    const context = JSON.parse('{}');
    test('lab', () => {
        expect(lib_1.expressions.parameters('1 + a')).toStrictEqual([{ name: 'a', type: 'integer' }]);
        expect(lib_1.expressions.parameters('b + a')).toStrictEqual([{ name: 'b', type: 'any' }, { name: 'a', type: 'any' }]);
        expect(lib_1.expressions.parameters('nvl(a ,1)')).toStrictEqual([{ name: 'a', type: 'integer' }]);
        expect(lib_1.expressions.parameters('nvl(a ,"text")')).toStrictEqual([{ name: 'a', type: 'string' }]);
        expect(lib_1.expressions.parameters('nvl(a , b * 5 )')).toStrictEqual([{ name: 'a', type: 'number' }, { name: 'b', type: 'number' }]);
        expect(lib_1.expressions.parameters('a.strCount("o")')).toStrictEqual([{ name: 'a', type: 'string' }]);
        expect(lib_1.expressions.parameters('[1,2,3].map(p => nvl(a, p))')).toStrictEqual([{ name: 'p', type: 'integer' }, { name: 'a', type: 'integer' }]);
        expect(lib_1.expressions.parameters('a = max([1,2,3])')).toStrictEqual([{ name: 'a', type: 'integer' }]);
        expect(lib_1.expressions.parameters('a = max([1,2,3]) > c')).toStrictEqual([{ name: 'a', type: 'boolean' }, { name: 'c', type: 'integer' }]);
        expect(lib_1.expressions.parameters('d=c.b*2')).toStrictEqual([{ name: 'd', type: 'number' }, { name: 'c.b', type: 'number' }]);
        expect(lib_1.expressions.parameters('d=`value of a is: ${a}`')).toStrictEqual([{ name: 'd', type: 'string' }]);
        expect(lib_1.expressions.parameters('!(a=="1" || b>2)')).toStrictEqual([{ name: 'a', type: 'string' }, { name: 'b', type: 'integer' }]);
        expect(lib_1.expressions.parameters('a = {firstName: "John", lastName: "Lennon", age: 40}')).toStrictEqual([{ name: 'a', type: '{firstName:string,lastName:string,age:integer}' }]);
        expect(lib_1.expressions.parameters('ods.union(prime)')).toStrictEqual([{ name: 'ods', type: 'any' }, { name: 'prime', type: 'any' }]);
        expect(lib_1.expressions.parameters('cities.push(salta).name')).toStrictEqual([{ name: 'cities', type: '[{name:any}]' }, { name: 'salta', type: '{name:any}' }]);
        expect(lib_1.expressions.parameters('a = cities.push(salta).name')).toStrictEqual([{ name: 'a', type: 'any' }, { name: 'cities', type: '[{name:any}]' }, { name: 'salta', type: '{name:any}' }]);
    });
});
//# sourceMappingURL=parameters.test.js.map