import { expressions } from '../../lib'

describe('Comparison', () => {
	test('labs', () => {	
		const context = { a: '1', b: 2, c: { a: 4, b: 5 }, d: 'house', e: 'car', devices: ['phone', 'computer', 'robot'], pi: 3.141516 }
	
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
		expect(true).toBe(expressions.eval('includes("phone",devices)',context))
		expect(false).toBe(expressions.eval('includes("other",devices)',context))
		expect(false).toBe(expressions.eval('in("other",devices)',context))
		expect(true).toBe(expressions.eval('between(12,10,20)',context))
		expect(false).toBe(expressions.eval('between(2,10,20)',context))
		expect(true).toBe(expressions.eval('between(pi,1,5)',context))
		
	})
})	