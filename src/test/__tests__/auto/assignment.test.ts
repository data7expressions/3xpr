/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'
describe('assignment', () => {
	const context = JSON.parse('{"a":8,"b":2,"c":{"a":1,"b":5},"d":"value of a is: 8"}')
	test('lab', () => {
		expect(exp.eval('a=8', context)).toStrictEqual(8)
		expect(exp.eval('c.a=1', context)).toStrictEqual(1)
		expect(exp.eval('d=c.b*2', context)).toStrictEqual(10)
		expect(exp.eval('d=`value of a is: ${a}`', context)).toStrictEqual('value of a is: 8')
	})
})
