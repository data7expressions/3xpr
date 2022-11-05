/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('arithmetic', () => {
	const context = JSON.parse('{"a":"1","b":2,"c":{"a":4,"b":5}}')
	test('lab', () => {
		expect(exp.eval('3+2-1', context)).toStrictEqual(4)
		expect(exp.eval('3*4-1', context)).toStrictEqual(11)
		expect(exp.eval('1-2-5', context)).toStrictEqual(-6)
		expect(exp.eval('(2+3)*2', context)).toStrictEqual(10)
		expect(exp.eval('2*(3+2)', context)).toStrictEqual(10)
		expect(exp.eval('1+2*3*4', context)).toStrictEqual(25)
		expect(exp.eval('(1+(2**3)*4', context)).toStrictEqual(33)
		expect(exp.eval('1+2**(3*4)', context)).toStrictEqual(4097)
		expect(exp.eval('(a*b)+(2*a+2*b)', context)).toStrictEqual(8)
		expect(exp.eval('2**b+a', context)).toStrictEqual('41')
	})
})
