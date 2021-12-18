import { expressions } from '../../lib'

describe('Complete Expression', () => {
	test('test', () => {
		
		expect(2).toBe(expressions.eval('1+1'))
	})
})	