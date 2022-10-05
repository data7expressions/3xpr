import { expressions } from '../../lib'

describe('Comparison', () => {
	test('labs', () => {	
		const context = {
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
			datetime: '1997-07-08T22:14:30.000Z'
		}
		
		expect(true).toBe(expressions.eval('3>2',context))
		expect('12').toBe(expressions.eval('a+b',context))
		expect(false).toBe(expressions.eval('-3>2*2',context))
		expect(true).toBe(expressions.eval('a*3==b+1',context))
		expect(true).toBe(expressions.eval('a*3===b+1',context))
		expect(true).toBe(expressions.eval('-4==-(2*2)',context))
		expect(false).toBe(expressions.eval('4!=2*2',context))
		expect(false).toBe(expressions.eval('4!==2*2',context))
		expect(false).toBe(expressions.eval('4<>2*2',context))
		expect(false).toBe(expressions.eval('c.a>b*2',context))
		expect(true).toBe(expressions.eval('c.a>=b*2',context))
		expect(true).toBe(expressions.eval('c.a<=b*2',context))
		expect(false).toBe(expressions.eval('c.a<b*2',context))
		expect(false).toBe(expressions.eval('d<e',context))
		expect(true).toBe(expressions.eval('d>e',context))
		expect(true).toBe(expressions.eval('d<>e',context))
		expect(false).toBe(expressions.eval('includes("phone",devices)',context))
		expect(false).toBe(expressions.eval('includes("other",devices)',context))
		expect(false).toBe(expressions.eval('in("other",devices)',context))
		expect(false).toBe(expressions.eval('"phone".in(devices)',context))
		expect(false).toBe(expressions.eval('device.in(devices)',context))
		expect(false).toBe(expressions.eval('d.in(["garage", "house","office"])',context))
		expect(true).toBe(expressions.eval('between(12,10,20)',context))
		expect(false).toBe(expressions.eval('between(2,10,20)',context))
		expect(true).toBe(expressions.eval('between(pi,1,5)',context))
		expect(false).toBe(expressions.eval('isNull(f)',context))
		expect(true).toBe(expressions.eval('isNull(g)',context))
		expect(true).toBe(expressions.eval('isNotNull(f)',context))
		expect(false).toBe(expressions.eval('isNotNull(g)',context))
		expect(true).toBe(expressions.eval('isBoolean(requerid)',context))
		expect(true).toBe(expressions.eval('isNumber(pi)',context))
		expect(true).toBe(expressions.eval('isDecimal(pi)',context))
		expect(false).toBe(expressions.eval('isInteger(pi)',context))
		expect(true).toBe(expressions.eval('isInteger(b)',context))
		expect(false).toBe(expressions.eval('isString(b)',context))
		expect(true).toBe(expressions.eval('isString(d)',context))
		expect(true).toBe(expressions.eval('isDate(date)',context))
		expect(true).toBe(expressions.eval('isDateTime(datetime)',context))
		expect(false).toBe(expressions.eval('isDateTime(time)',context))
		expect(false).toBe(expressions.eval('isTime(time)',context))
		expect(true).toBe(expressions.eval('isObject(c)',context))
		expect(false).toBe(expressions.eval('isObject(device)',context))
		expect(false).toBe(expressions.eval('isObject(devices)',context))
		expect(false).toBe(expressions.eval('isArray(c)',context))
		expect(false).toBe(expressions.eval('isArray(device)',context))
		expect(true).toBe(expressions.eval('isArray(devices)',context))
		expect(true).toBe(expressions.eval('isBooleanFormat(requerid)',context))
		expect(true).toBe(expressions.eval('isDateFormat(date)',context))
		expect(true).toBe(expressions.eval('isDateTimeFormat(datetime)',context))
		expect(false).toBe(expressions.eval('isDateTimeFormat(time)',context))
		expect(false).toBe(expressions.eval('isTimeFormat(time)',context))
		
	})
})	