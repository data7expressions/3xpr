import { show } from './util'

(async () => {
	const context = { }

	const list = [
		// 'a = true',
		'a = nvl(null,false)'
	]
	show(list, context)
})()
