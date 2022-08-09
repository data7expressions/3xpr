import { expressions } from '../../lib'

describe('Operator Arithmetics', () => {
	test('labs', () => {	
		const context = { a: '1', b: 2, c: { a: 4, b: 5 } }

		expect(4).toBe(expressions.eval('3+2-1',context))
		expect(11).toBe(expressions.eval('3*4-1',context))
		expect(-6).toBe(expressions.eval('1-2-5',context))
		expect(10).toBe(expressions.eval('(2+3)*2',context))
		expect(10).toBe(expressions.eval('2*(3+2)',context))
		expect(25).toBe(expressions.eval('1+2*3*4',context))
		expect(33).toBe(expressions.eval('(1+(2**3)*4',context))
		expect(4097).toBe(expressions.eval('1+2**(3*4)',context))
		expect(8).toBe(expressions.eval('(a*b)+(2*a+2*b)',context))
		expect('41').toBe(expressions.eval('2**b+a',context))
		expect(5).toBe(expressions.eval('c.b',context))
		
	})
})	