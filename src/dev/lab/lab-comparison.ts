import { show } from './util'

(async () => {
	const context = { a: '1', b: 2, c: { a: 4, b: 5 }, d: 'house', e: 'car' }
	const list = [
		'3>2',
		'a+b',
		'-3>2*2',
		'a*3==b+1',
		'a*3===b+1',
		'-4==-(2*2)',
		'4!=2*2',
		'4!==2*2',
		'4<>2*2',
		'c.a>b*2',
		'c.a>=b*2',
		'c.a<=b*2',
		'c.a<b*2',
		'd<e',
		'd>e',
		'd<>e'
	]
	show(list, context)
})()
