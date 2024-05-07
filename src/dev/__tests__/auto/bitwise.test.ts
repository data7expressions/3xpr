/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('bitwise', () => {
	const context = JSON.parse('{}')
	test('lab', () => {
		expect(exp.eval('5 & 1', context)).toStrictEqual(1)
		expect(exp.eval('5 | 1', context)).toStrictEqual(5)
		expect(exp.eval('~ 5', context)).toStrictEqual(-6)
		expect(exp.eval('5 << 1', context)).toStrictEqual(10)
		expect(exp.eval('5 ^ 1', context)).toStrictEqual(4)
		expect(exp.eval('5 >> 1', context)).toStrictEqual(2)
	})
})
