/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'
describe('constants', () => {
	const context = JSON.parse('{"a":false}')
	test('lab', () => {
		expect(exp.eval('a = true', context)).toStrictEqual(true)
		expect(exp.eval('a = nvl(null,false)', context)).toStrictEqual(false)
	})
})
