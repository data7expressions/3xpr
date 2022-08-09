import { show } from './util'

(async () => {
	const context = { a: '1', b: 2, c: { a: 4, b: 5 } }
	const list = [
		'3+2-1',
		'3*4-1',
		'1-2-5',
		'(2+3)*2',
		'2*(3+2)',
		'1+2*3*4',
		'(1+(2**3)*4',
		'1+2**(3*4)',
		'(a*b)+(2*a+2*b)',
		'2**b+a',
		'c.b'
	]
	show(list, context)
})()
