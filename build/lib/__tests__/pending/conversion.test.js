"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const __1 = require("../../");
describe('conversion', () => {
    // eslint-disable-next-line no-useless-escape
    const context = JSON.parse('{"customer":{"firstName":"Juan","lastName":"Lopez","birthday":"1975-03-20T23:45:11"},"data":"{\"b\":1}"}');
    test('lab', () => {
        expect(__1.expressions.eval('toString(month(customer.birthday))', context)).toStrictEqual('3');
        expect(__1.expressions.eval('toNumber("3.141516")', context)).toStrictEqual(3.141516);
        expect(__1.expressions.eval('dateToString(dateTime(customer.birthday))', context)).toStrictEqual('1975-03-20T22:45:11.000Z');
        expect(__1.expressions.eval('keys(customer)', context)).toStrictEqual(['firstName', 'lastName', 'birthday']);
        expect(__1.expressions.eval('values(customer)', context)).toStrictEqual(['Juan', 'Lopez', '1975-03-20T23:45:11']);
        expect(__1.expressions.eval('entries(customer)', context)).toStrictEqual([['firstName', 'Juan'], ['lastName', 'Lopez'], ['birthday', '1975-03-20T23:45:11']]);
        expect(__1.expressions.eval('fromEntries(entries(customer))', context)).toStrictEqual({ firstName: 'Juan', lastName: 'Lopez', birthday: '1975-03-20T23:45:11' });
        expect(__1.expressions.eval('stringify(customer)', context)).toStrictEqual('{"firstName":"Juan","lastName":"Lopez","birthday":"1975-03-20T23:45:11"}');
        expect(__1.expressions.eval('parse(data).b', context)).toStrictEqual(1);
    });
});
//# sourceMappingURL=conversion.test.js.map