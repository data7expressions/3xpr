/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('comparison', () => {
	const context = JSON.parse('{"a":"1","b":2,"c":{"a":4,"b":5},"d":"house","e":"car","f":"","g":null,"devices":["phone","computer","robot"],"pi":3.141516,"requerid":false,"device":"phone","date":"2022-08-22","time":"22:14:30","dateTime":"1997-07-08T22:14:30.000Z"}')
	test('lab', () => {
		expect(exp.eval('3>2', context)).toStrictEqual(true)
		expect(exp.eval('a+b', context)).toStrictEqual('12')
		expect(exp.eval('-3>2*2', context)).toStrictEqual(false)
		expect(exp.eval('a*3==b+1', context)).toStrictEqual(true)
		expect(exp.eval('a*3===b+1', context)).toStrictEqual(true)
		expect(exp.eval('-4==-(2*2)', context)).toStrictEqual(true)
		expect(exp.eval('4!=2*2', context)).toStrictEqual(false)
		expect(exp.eval('4!==2*2', context)).toStrictEqual(false)
		expect(exp.eval('4<>2*2', context)).toStrictEqual(false)
		expect(exp.eval('c.a>b*2', context)).toStrictEqual(false)
		expect(exp.eval('c.a>=b*2', context)).toStrictEqual(true)
		expect(exp.eval('c.a<=b*2', context)).toStrictEqual(true)
		expect(exp.eval('c.a<b*2', context)).toStrictEqual(false)
		expect(exp.eval('d<e', context)).toStrictEqual(false)
		expect(exp.eval('d>e', context)).toStrictEqual(true)
		expect(exp.eval('d<>e', context)).toStrictEqual(true)
		expect(exp.eval('includes(devices,"phone")', context)).toStrictEqual(true)
		expect(exp.eval('includes(devices,"other")', context)).toStrictEqual(false)
		expect(exp.eval('contains(devices,"other")', context)).toStrictEqual(false)
		expect(exp.eval('devices.contains("phone")', context)).toStrictEqual(true)
		expect(exp.eval('devices.contains(device)', context)).toStrictEqual(true)
		expect(exp.eval('["garage", "house","office"].contains(d)', context)).toStrictEqual(true)
		expect(exp.eval('["garage", "house","office"].includes(d)', context)).toStrictEqual(true)
		expect(exp.eval('in(device,devices)', context)).toStrictEqual(true)
		expect(exp.eval('device.in(devices)', context)).toStrictEqual(true)
		expect(exp.eval('in(2,[1,3,4])', context)).toStrictEqual(false)
		expect(exp.eval('in(2,[1,2,3,4])', context)).toStrictEqual(true)
		expect(exp.eval('d.in(["garage", "house","office"])', context)).toStrictEqual(true)
		expect(exp.eval('d.in("garage", "house","office")', context)).toStrictEqual(true)
		expect(exp.eval('between(12,10,20)', context)).toStrictEqual(true)
		expect(exp.eval('between(2,10,20)', context)).toStrictEqual(false)
		expect(exp.eval('between(pi,1,5)', context)).toStrictEqual(true)
		expect(exp.eval('isNull(f)', context)).toStrictEqual(false)
		expect(exp.eval('isNull(g)', context)).toStrictEqual(true)
		expect(exp.eval('isNotNull(f)', context)).toStrictEqual(true)
		expect(exp.eval('isNotNull(g)', context)).toStrictEqual(false)
		expect(exp.eval('isBoolean(requerid)', context)).toStrictEqual(true)
		expect(exp.eval('isNumber(pi)', context)).toStrictEqual(true)
		expect(exp.eval('isDecimal(pi)', context)).toStrictEqual(true)
		expect(exp.eval('isInteger(pi)', context)).toStrictEqual(false)
		expect(exp.eval('isInteger(b)', context)).toStrictEqual(true)
		expect(exp.eval('isString(b)', context)).toStrictEqual(false)
		expect(exp.eval('isString(d)', context)).toStrictEqual(true)
		expect(exp.eval('isDate(date)', context)).toStrictEqual(true)
		expect(exp.eval('isDateTime(dateTime)', context)).toStrictEqual(true)
		expect(exp.eval('isDateTime(time)', context)).toStrictEqual(false)
		expect(exp.eval('isTime(time)', context)).toStrictEqual(false)
		expect(exp.eval('isObject(c)', context)).toStrictEqual(true)
		expect(exp.eval('isObject(device)', context)).toStrictEqual(false)
		expect(exp.eval('isObject(devices)', context)).toStrictEqual(false)
		expect(exp.eval('isArray(c)', context)).toStrictEqual(false)
		expect(exp.eval('isArray(device)', context)).toStrictEqual(false)
		expect(exp.eval('isArray(devices)', context)).toStrictEqual(true)
		expect(exp.eval('isBooleanFormat(requerid)', context)).toStrictEqual(true)
		expect(exp.eval('isNumberFormat(pi)', context)).toStrictEqual(true)
		expect(exp.eval('isDecimalFormat(pi)', context)).toStrictEqual(true)
		expect(exp.eval('isIntegerFormat(pi)', context)).toStrictEqual(false)
		expect(exp.eval('isIntegerFormat(b)', context)).toStrictEqual(true)
		expect(exp.eval('isDateFormat(date)', context)).toStrictEqual(true)
		expect(exp.eval('isDateTimeFormat(dateTime)', context)).toStrictEqual(true)
		expect(exp.eval('isDateTimeFormat(time)', context)).toStrictEqual(false)
		expect(exp.eval('isTimeFormat(time)', context)).toStrictEqual(false)
	})
})
