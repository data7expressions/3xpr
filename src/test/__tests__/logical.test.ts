import { expressions } from '../../lib'

describe('Logical', () => {
	test('labs', () => {	
		const context = { a: '1', b: 2, c: { a: 4, b: 5 }, d: 'house', e: 'car' }

		expect(true).toBe(expressions.eval('a=="1" && b==2',context))
		expect(false).toBe(expressions.eval('a=="1" && b>2',context))
		expect(true).toBe(expressions.eval('a=="1" || b>2',context))
		expect(false).toBe(expressions.eval('!(a=="1" || b>2)',context))
		
	})
})	