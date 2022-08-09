import { expressions } from '../../lib'

describe('Operator Array', () => {
	test('labs', () => {	
		const context = { a: '1', b: 2, c: { a: 4, b: 5 }, d: 'house', e: 'car' }

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
		
	})
})	