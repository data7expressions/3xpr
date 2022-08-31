# js-expressions

>Js-expression is an extensible expression evaluator and parser.
>
>Besides the operators, functions, variables, objects and arrays that are supported.
>
>It is possible to extend it with your own functions, operators, etc

## Features

- Constants, enums, number, string, datetime, variables, objects and array
- [Arithmetic](https://github.com/FlavioLionelRita/js-expressions/wiki/Arithmetic)
, [assignment](https://github.com/FlavioLionelRita/js-expressions/wiki/Assignment)
, [comparison](https://github.com/FlavioLionelRita/js-expressions/wiki/Comparison)
, [logical](https://github.com/FlavioLionelRita/js-expressions/wiki/Logical)
and [bitwise](https://github.com/FlavioLionelRita/js-expressions/wiki/Bitwise) operators
- [Number](https://github.com/FlavioLionelRita/js-expressions/wiki/Numeric)
, [string](https://github.com/FlavioLionelRita/js-expressions/wiki/String)
,	[datetime](https://github.com/FlavioLionelRita/js-expressions/wiki/Datetime)
, [array](https://github.com/FlavioLionelRita/js-expressions/wiki/Array)
and [nullable](https://github.com/FlavioLionelRita/js-expressions/wiki/Nullable) functions
- [Conversion](https://github.com/FlavioLionelRita/js-expressions/wiki/Conversion) functions
- [Arrow](https://github.com/FlavioLionelRita/js-expressions/wiki/Arrow) functions
- [Group](https://github.com/FlavioLionelRita/js-expressions/wiki/Group) functions (distinct, first, last, min, max, sum and avg)
- [Sets](https://github.com/FlavioLionelRita/js-expressions/wiki/Sets) functions (union, intersection, difference and symmetric difference)
- [Control flows](https://github.com/FlavioLionelRita/js-expressions/wiki/Flows) flows
- Environment variables
- [Extend](https://github.com/FlavioLionelRita/js-expressions/wiki/Extend)

## Quick start

```javascript
import { expressions as exp } from 'js-expressions'

const context = {
name: 'Spain',
region: 'Europe',
phoneCode: '34',
timezones: [
	{ name: 'Madrid', offset: 1, pos: { lat: 40.4165, log: -3.70256 } },
	{ name: 'Ceuta', offset: 1, pos: { lat: 35.8883, log: -5.3162 } },
	{ name: 'Canary', offset: 0, pos: { lat: 28.1248, log: -15.43 } }
	]
}

const result = exp.eval('5*(7+9)==(5*7+5*9)')
console.log(result)
// Output: true

// use context
exp.eval('toNumber(phoneCode) <= 30', context)
// false

// template
exp.eval('`${name} belongs to ${region}`', context)
// 'Spain belongs to Europe'

exp.eval('timezones.filter(p => substring(p.name,0,1)=="C")', context)
// ['{"name":"Ceuta","offset":1,"pos":{"lat":35.8883,"log":-5.3162}}'
// ,'{"name":"Canary","offset":0,"pos":{"lat":28.1248,"log":-15.43}}']

exp.eval('timezones.filter(p => p.offset == 1).sort(p => p.pos.lat).name', context)
// ['Ceuta','Madrid']

exp.eval('stringify(timezones.first(p => p.name == "Madrid").pos)', context)
// '{"lat":40.4165,"log":-3.70256}'

exp.eval('timezones.filter(p => p.pos.lat > 30 && p.pos.log > -4).pos.lat', context)
// [40.4165]

exp.eval('sort(timezones.name)', context)
// ['Canary','Ceuta','Madrid']

exp.eval('timezones[0].name', context)
// 'Madrid'

exp.eval('round(timezones.first(p=> p.name =="Madrid").pos.lat - timezones.first(p=> p.name =="Ceuta").pos.lat,2)', context)
// 4.55

exp.eval('timezones.each(p => p.pos={lat:round(p.pos.lat,2),log:round(p.pos.log,2)}).map(p=> stringify(p))', context)
// ['{"name":"Madrid","offset":1,"pos":{"lat":40.4,"log":-3.7}}'
// ,'{"name":"Ceuta","offset":1,"pos":{"lat":35.9,"log":-5.3}}'
// ,'{"name":"Canary","offset":0,"pos":{"lat":28.1,"log":-15.45}}']

exp.eval(`
list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
total = 0;
for (i = 0; i < list.length(); i += 1) {
	total += list[i];
}
`, context)
console.log(context.total)
// 45

exp.eval(`
while (p=timezones.pop()) {
	console(p);
}
`, context)
// outputs:
//         {"name":"Canary","offset":0,"pos":{"lat":28.1,"log":-15.45}}
//         {"name":"Ceuta","offset":1,"pos":{"lat":35.9,"log":-5.3}}
//         {"name":"Madrid","offset":1,"pos":{"lat":40.4,"log":-3.7}}
```

## Documentation

- [Arithmetic](https://github.com/FlavioLionelRita/js-expressions/wiki/Arithmetic)
- [Comparison](https://github.com/FlavioLionelRita/js-expressions/wiki/Comparison)
- [Logical](https://github.com/FlavioLionelRita/js-expressions/wiki/Logical)
- [Bitwise](https://github.com/FlavioLionelRita/js-expressions/wiki/Bitwise)
- [Numeric](https://github.com/FlavioLionelRita/js-expressions/wiki/Numeric)
- [String](https://github.com/FlavioLionelRita/js-expressions/wiki/String)
- [Datetime](https://github.com/FlavioLionelRita/js-expressions/wiki/Datetime)
- [Nullable](https://github.com/FlavioLionelRita/js-expressions/wiki/Nullable)
- [Conversion](https://github.com/FlavioLionelRita/js-expressions/wiki/Conversion)
- [Assignment](https://github.com/FlavioLionelRita/js-expressions/wiki/Assignment)
- [Array](https://github.com/FlavioLionelRita/js-expressions/wiki/Array)
- [Arrow](https://github.com/FlavioLionelRita/js-expressions/wiki/Arrow)
- [Group](https://github.com/FlavioLionelRita/js-expressions/wiki/Group)
- [Sets](https://github.com/FlavioLionelRita/js-expressions/wiki/Sets)
- [Control flows](https://github.com/FlavioLionelRita/js-expressions/wiki/Flows)
- [Extend](https://github.com/FlavioLionelRita/js-expressions/wiki/Extend)
