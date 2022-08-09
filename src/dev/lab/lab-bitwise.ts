import { show } from './util'

(async () => {
	const context = { }
	const list = [
		'5 & 1',
		'5 | 1',
		'~ 5',
		'5 << 1',
		'5 ^ 1',
		'5 >> 1'
	]
	show(list, context)
})()
