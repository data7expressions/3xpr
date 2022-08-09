/* eslint-disable no-template-curly-in-string */
import { show } from './util'

(async () => {
	const context = { devices: ['phone', 'computer', 'robot'], pi: 3.141516 }
	const list = [
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
