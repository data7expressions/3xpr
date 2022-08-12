import { expressions } from '../../lib'

describe('Logical', () => {
	test('labs', () => {	
		const context = { a: 1, b: null, c: '', e: 'hello' }

		expect(1).toBe(expressions.eval('nvl(a,2)',context))
		expect(2).toBe(expressions.eval('nvl(b,2)',context))
		expect('is null').toBe(expressions.eval('nvl2(b,"is not null","is null")',context))
		expect('is not null').toBe(expressions.eval('nvl2(c,"is not null","is null")',context))
		expect('is null').toBe(expressions.eval('nvl2(d,"is not null","is null")',context))
		expect(true).toBe(expressions.eval('isNull(b)',context))
		expect(false).toBe(expressions.eval('isNull(c)',context))
		expect(false).toBe(expressions.eval('isNotNull(b)',context))
		expect(true).toBe(expressions.eval('isNotNull(c)',context))
		
	})
})	