import { show } from './util'

(async () => {
	const context = { a: '1', b: 2, c: { a: 4, b: 5 }, d: 'house', e: 'car', devices: ['phone', 'computer', 'robot'], pi: 3.141516 }
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
		'd<>e',
		// 'c.a>=0?"positive":"negative"',
		// '2*(c.a==4?2:4)'
		'includes("phone",devices)',
		'includes("other",devices)',
		'in("other",devices)',
		'between(12,10,20)',
		'between(2,10,20)',
		'between(pi,1,5)'
	]
	show(list, context)
})()
