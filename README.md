# 3xpr

>3xpr is an extensible expression evaluator and parser.
>
>Besides the operators, functions, variables, objects and arrays that are supported.
>
>It is possible to extend it with your own functions, operators, etc

## Features

- Constants, enums, number, string, datetime, variables, objects and array
- [Arithmetic](https://github.com/data7expressions/3xpr/wiki/Arithmetic)
, [assignment](https://github.com/data7expressions/3xpr/wiki/Assignment)
, [comparison](https://github.com/data7expressions/3xpr/wiki/Comparison)
, [logical](https://github.com/data7expressions/3xpr/wiki/Logical)
and [bitwise](https://github.com/data7expressions/3xpr/wiki/Bitwise) operators
- [Number](https://github.com/data7expressions/3xpr/wiki/Numeric)
, [string](https://github.com/data7expressions/3xpr/wiki/String)
,	[datetime](https://github.com/data7expressions/3xpr/wiki/DateTime)
, [array](https://github.com/data7expressions/3xpr/wiki/Array)
and [nullable functions](https://github.com/data7expressions/3xpr/wiki/Nullable)
- [Conversion functions](https://github.com/data7expressions/3xpr/wiki/Conversion)
- [Arrow functions](https://github.com/data7expressions/3xpr/wiki/Arrow)
- [Group functions](https://github.com/data7expressions/3xpr/wiki/Group) (distinct, first, last, min, max, sum and avg)
- [Sets functions](https://github.com/data7expressions/3xpr/wiki/Sets) (union, intersection, difference and symmetric difference)
- [Control flows](https://github.com/data7expressions/3xpr/wiki/Flows) flows
- Environment variables
- [Extend](https://github.com/data7expressions/3xpr/wiki/Extend)
- [Metadata](https://github.com/data7expressions/3xpr/wiki/Metadata)

## Quick start

```javascript
import { expressions as exp } from '3xpr'

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

## Extend

You can extend the library by adding enums, constants, formats, operators, and functions.
To do this, use the following functions:

- **AddConstant**: Adds a constant to the library.
- **AddEnum**: Adds an enumeration to the library.
- **AddFormat**: Adds a format to the library.
- **AddOperator**: Adds an operator to the library.
- **AddFunction**: Adds a function to the library.

### Example

```typescript
import { expressions as exp } from '3xpr'
const CryptoJS = require('crypto-js')

exp.addFunction(
	'encrypt(value:string):string',
	(value: string, key:string):string => CryptoJS.AES.encrypt(value, key).toString(),
	{ description: 'Encrypt a string' }
)
exp.addFunction(
	'decrypt(value:string):string', 
	(value: string, key:string):string => CryptoJS.AES.decrypt(value, key).toString(CryptoJS.enc.Utf8),
	{ description: 'Decrypt a string' }
)
```

## Related projects

- [typ3s](https://www.npmjs.com/package/typ3s)
- [jexp](https://www.npmjs.com/package/jexp)
- [lambdaorm](https://www.npmjs.com/package/lambdaorm)

## Documentation

Full documentation is available in the [Wiki](https://github.com/data7expressions/3xpr/wiki).
