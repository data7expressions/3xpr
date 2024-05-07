import { expressions } from '../../lib'

describe('Strings', () => {
	test('operators', () => {
		expect('a').toBe(expressions.eval('"a"'))
		expect('a' < 'b').toBe(expressions.eval('"a"<"b"'))
		expect('a "b" ' < 'b').toBe(expressions.eval('"a ""b"" "<"b"'))
	})

	test('functions', () => {
		expect('Aaa').toBe(expressions.eval('title(a)', { a: 'aaa', b: 2 }))
		expect('Aaa').toBe(expressions.eval('title("aaa")'))
		expect(3).toBe(expressions.eval('strCount(a,"a")', { a: 'aaa' }))
		expect(0).toBe(expressions.eval('strCount(a,"b")', { a: 'aaa' }))
		expect('AAA').toBe(expressions.eval('upper(a)', { a: 'aaa' }))
	})
})
