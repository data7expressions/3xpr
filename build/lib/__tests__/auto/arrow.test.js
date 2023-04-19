"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const __1 = require("../../");
describe('arrow', () => {
    const context = JSON.parse('{"cities":[{"name":"Buenos Aires","province":"BA","population":2890151,"coordinates":{"lat":34.36,"long":58.26}},{"name":"Córdoba","province":"CB","population":1317298,"coordinates":{"lat":31.42,"long":64.18}},{"name":"Rosario","province":"SF","population":948312,"coordinates":{"lat":32.58,"long":60.36}},{"name":"Mar del Plata","province":"BA","population":593337,"coordinates":{"lat":38,"long":57.33}}],"salta":{"name":"Salta","province":"SA","population":520683,"coordinates":{"lat":24.33,"long":64.3}},"posadas":{"name":"Posadas","province":"MI","population":275028,"coordinates":{"lat":27.22,"long":55.53}},"musicians":["Charly Garcia","Fito Paez","Luiz Alberto Spinetta"],"pair":[2,4,6],"ods":[1,3,5]}');
    test('lab', () => {
        expect(__1.expressions.eval('cities.where(p-> p.province <> "BA").len()', context)).toStrictEqual(2);
        expect(__1.expressions.eval('cities.where(p-> p.province != "BA").length()', context)).toStrictEqual(2);
        expect(__1.expressions.eval('pair.foreach(p=>b=b+p)', context)).toStrictEqual([2, 4, 6]);
        expect(__1.expressions.eval('pair.filter(p=> p<5).foreach(p => b=b+p)', context)).toStrictEqual([2, 4]);
        expect(__1.expressions.eval('cities.sort(p=> p.name).name', context)).toStrictEqual(['Buenos Aires', 'Córdoba', 'Mar del Plata', 'Rosario']);
        expect(__1.expressions.eval('cities.reverse(p=> p.name).name', context)).toStrictEqual(['Rosario', 'Mar del Plata', 'Córdoba', 'Buenos Aires']);
        expect(__1.expressions.eval('ods.filter(p=> p>1 && p<5).reverse()', context)).toStrictEqual([3]);
        expect(__1.expressions.eval('ods.filter(p=> p>1 && p<5).map(p=> p*2).reverse()', context)).toStrictEqual([6]);
        expect(__1.expressions.eval('cities.order(p=> p.name).name', context)).toStrictEqual(['Buenos Aires', 'Córdoba', 'Mar del Plata', 'Rosario']);
        expect(__1.expressions.eval('cities.name', context)).toStrictEqual(['Buenos Aires', 'Córdoba', 'Rosario', 'Mar del Plata']);
        expect(__1.expressions.eval('cities.select(p=> p.coordinates).select(p=> p.lat)', context)).toStrictEqual([34.36, 31.42, 32.58, 38]);
        expect(__1.expressions.eval('cities.map(p=> p.coordinates).lat', context)).toStrictEqual([34.36, 31.42, 32.58, 38]);
        expect(__1.expressions.eval('cities.map(p=>[p.coordinates.lat,p.coordinates.long])', context)).toStrictEqual([[34.36, 58.26], [31.42, 64.18], [32.58, 60.36], [38, 57.33]]);
        expect(__1.expressions.eval('cities.distinct(p=> p.province)', context)).toStrictEqual(['BA', 'CB', 'SF']);
        expect(__1.expressions.eval('cities.coordinates.lat', context)).toStrictEqual([34.36, 31.42, 32.58, 38]);
        expect(__1.expressions.eval('cities.x', context)).toStrictEqual([]);
        expect(__1.expressions.eval('cities.x.x', context)).toStrictEqual([]);
        expect(__1.expressions.eval('cities.delete(p-> p.province === "BA").name', context)).toStrictEqual(['Córdoba', 'Rosario']);
        expect(__1.expressions.eval('cities.remove(p-> p.province === "BA").name', context)).toStrictEqual(['Córdoba', 'Rosario']);
    });
});
//# sourceMappingURL=arrow.test.js.map