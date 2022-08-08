import { show } from './util'

(async () => {
	const context = { musicians: ['Charly Garcia', 'Fito Paez', 'Luiz Alberto Spinetta'] }
	const list = [
		'musicians[0]',
		'musicians[3]'
	]
	show(list, context)
})()
