/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'
describe('logical', () => {
	const context = JSON.parse('{"a":"1","b":2,"c":{"a":4,"b":5},"d":"house","e":"car"}')
	test('lab', () => {
		expect(exp.eval('a=="1" && b==2', context)).toStrictEqual(true)
		expect(exp.eval('a=="1" && b>2', context)).toStrictEqual(false)
		expect(exp.eval('a=="1" || b>2', context)).toStrictEqual(true)
		expect(exp.eval('!(a=="1" || b>2)', context)).toStrictEqual(false)
	})
})
