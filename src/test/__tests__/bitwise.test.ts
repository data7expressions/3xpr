import { expressions } from '../../lib'

describe('Bitwise', () => {
	test('labs', () => {	
		const context = { a: '1', b: 2, c: { a: 4, b: 5 } }

		expect(1).toBe(expressions.eval('5 & 1',context))
		expect(5).toBe(expressions.eval('5 | 1',context))
		expect(-6).toBe(expressions.eval('~ 5',context))
		expect(10).toBe(expressions.eval('5 << 1',context))
		expect(4).toBe(expressions.eval('5 ^ 1',context))
		expect(2).toBe(expressions.eval('5 >> 1',context))
		
	})
})	