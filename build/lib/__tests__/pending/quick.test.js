"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const __1 = require("../../");
describe('quick', () => {
    const context = JSON.parse('{"country":"Spain","region":"Europe","phoneCode":"34","timezones":[{"city":"Madrid","offset":1,"pos":{"lat":40.4165,"log":-3.70256}},{"city":"Ceuta","offset":1,"pos":{"lat":35.8883,"log":-5.3162}},{"city":"Canary","offset":0,"pos":{"lat":28.1248,"log":-15.43}}]}');
    test('lab', () => {
        expect(__1.expressions.eval('5*(7+9)==(5*7+5*9)', context)).toStrictEqual(true);
        expect(__1.expressions.eval('toNumber(phoneCode) <= 30', context)).toStrictEqual(false);
        expect(__1.expressions.eval('`${country} belongs to ${region}`', context)).toStrictEqual('Spain belongs to Europe');
        expect(__1.expressions.eval('timezones.filter(p => substring(p.city,0,1)=="C")', context)).toStrictEqual([{ city: 'Ceuta', offset: 1, pos: { lat: 35.89, log: -5.32 } }, { city: 'Canary', offset: 0, pos: { lat: 28.12, log: -15.43 } }]);
        expect(__1.expressions.eval('timezones.filter(p => p.offset == 1).sort(p => p.pos.lat).city', context)).toStrictEqual(['Ceuta', 'Madrid']);
        expect(__1.expressions.eval('stringify(timezones.first(p => p.city == "Madrid").pos)', context)).toStrictEqual('{"lat":40.4165,"log":-3.70256}');
        expect(__1.expressions.eval('timezones.filter(p => p.pos.lat > 30 && p.pos.log > -4).pos.lat', context)).toStrictEqual([40.4165]);
        expect(__1.expressions.eval('sort(timezones.city)', context)).toStrictEqual(['Canary', 'Ceuta', 'Madrid']);
        expect(__1.expressions.eval('timezones[0].city', context)).toStrictEqual('Madrid');
        expect(__1.expressions.eval('round(timezones.first(p=> p.city =="Madrid").pos.lat - timezones.first(p=> p.city =="Ceuta").pos.lat,2)', context)).toStrictEqual(4.53);
        expect(__1.expressions.eval('timezones.each(p => p.pos={lat:round(p.pos.lat,2),log:round(p.pos.log,2)}).map(p=> stringify(p))', context)).toStrictEqual(['{\'city\':\'Madrid\',\'offset\':1,\'pos\':{\'lat\':40.42,\'log\':-3.7}}', '{\'city\':\'Ceuta\',\'offset\':1,\'pos\':{\'lat\':35.89,\'log\':-5.32}}', '{\'city\':\'Canary\',\'offset\':0,\'pos\':{\'lat\':28.12,\'log\':-15.43}}']);
    });
});
//# sourceMappingURL=quick.test.js.map