import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'comparison',
		context: {
			a: '1',
			b: 2,
			c: { a: 4, b: 5 },
			d: 'house',
			e: 'car',
			f: '',
			g: null,
			devices: ['phone', 'computer', 'robot'],
			pi: 3.141516,
			requerid: false,
			device: 'phone',
			date: '2022-08-22',
			time: '22:14:30',
			dateTime: '1997-07-08T22:14:30.000Z'
		},
		cases: [{
			name: 'lab',
			func: (expression: any, context: any) => exp.eval(expression, context),
			tests: [
				'3>2',
				'a+b',
				'-3>2*2',
				'a*3==b+1',
				'a*3===b+1',
				'-4==-(2*2)',
				'4!=2*2',
				'4!==2*2',
				'4<>2*2',
				'c.a>b*2',
				'c.a>=b*2',
				'c.a<=b*2',
				'c.a<b*2',
				'd<e',
				'd>e',
				'd<>e',
				// 'c.a>=0?"positive":"negative"',
				// '2*(c.a==4?2:4)'
				'includes(devices,"phone")',
				'includes(devices,"other")',
				'in(devices,"other")',
				'devices.in("phone")',
				'devices.in(device)',
				'["garage", "house","office"].in(d)',
				'between(12,10,20)',
				'between(2,10,20)',
				'between(pi,1,5)',
				'isNull(f)',
				'isNull(g)',
				'isNotNull(f)',
				'isNotNull(g)',
				'isBoolean(requerid)',
				'isNumber(pi)',
				'isDecimal(pi)',
				'isInteger(pi)',
				'isInteger(b)',
				'isString(b)',
				'isString(d)',
				'isDate(date)',
				'isDateTime(dateTime)',
				'isDateTime(time)',
				'isTime(time)',
				'isObject(c)',
				'isObject(device)',
				'isObject(devices)',
				'isArray(c)',
				'isArray(device)',
				'isArray(devices)',
				'isBooleanFormat(requerid)',
				'isNumberFormat(pi)',
				'isDecimalFormat(pi)',
				'isIntegerFormat(pi)',
				'isIntegerFormat(b)',
				'isDateFormat(date)',
				'isDateTimeFormat(dateTime)',
				'isDateTimeFormat(time)',
				'isTimeFormat(time)'
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
