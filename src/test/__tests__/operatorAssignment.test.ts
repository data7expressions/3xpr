import { expressions } from '../../lib'

describe('Operator Array', () => {
	test('labs', () => {	
		const context = { a: '1', b: 2, c: { a: 4, b: 5 } }

		expect(8).toBe(expressions.eval('a=8',context))
		expect(1).toBe(expressions.eval('c.a=1',context))
		expect(10).toBe(expressions.eval('d=c.b*2',context))
		expect('value of a is: 8').toBe(expressions.eval('d=`value of a is: ${a}`',context))
		
	})
})	