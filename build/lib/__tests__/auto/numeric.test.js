"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const __1 = require("../../");
describe('numeric', () => {
    const context = JSON.parse('{"a":"1","b":2,"c":{"a":4,"b":5}}');
    test('lab', () => {
        expect(__1.expressions.eval('c.b', context)).toStrictEqual(5);
        expect(__1.expressions.eval('abs(-9)', context)).toStrictEqual(9);
        expect(__1.expressions.eval('acos(0.434)', context)).toStrictEqual(1.1218683324277348);
        expect(__1.expressions.eval('asin(0.434)', context)).toStrictEqual(0.44892799436716174);
        expect(__1.expressions.eval('atan(2)', context)).toStrictEqual(1.1071487177940904);
        expect(__1.expressions.eval('atan2(90, 15)', context)).toStrictEqual(1.4056476493802699);
        expect(__1.expressions.eval('ceil(2)', context)).toStrictEqual(2);
        expect(__1.expressions.eval('cos(2)', context)).toStrictEqual(-0.4161468365471424);
        expect(__1.expressions.eval('cosh(2)', context)).toStrictEqual(3.7621956910836314);
        expect(__1.expressions.eval('exp(7)', context)).toStrictEqual(1096.6331584284585);
        expect(__1.expressions.eval('floor(7)', context)).toStrictEqual(7);
        expect(__1.expressions.eval('ln(7)', context)).toStrictEqual(1.9459101490553132);
        expect(__1.expressions.eval('log(7,10)', context)).toStrictEqual(1.9459101490553132);
        expect(__1.expressions.eval('log10(7)', context)).toStrictEqual(0.8450980400142568);
        expect(__1.expressions.eval('remainder(7,2)', context)).toStrictEqual(1);
        expect(__1.expressions.eval('round(7.984938,2)', context)).toStrictEqual(7.98);
        expect(__1.expressions.eval('sign(-7)', context)).toStrictEqual(-1);
        expect(__1.expressions.eval('sin(7)', context)).toStrictEqual(0.6569865987187891);
        expect(__1.expressions.eval('sinh(7)', context)).toStrictEqual(548.3161232732465);
        expect(__1.expressions.eval('tan(7)', context)).toStrictEqual(0.8714479827243187);
        expect(__1.expressions.eval('tanh(7)', context)).toStrictEqual(0.9999983369439447);
        expect(__1.expressions.eval('trunc(7.984938,2)', context)).toStrictEqual(7);
    });
});
//# sourceMappingURL=numeric.test.js.map