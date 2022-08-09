import { show } from './util'

(async () => {
	const context = { a: '1', b: 2, c: { a: 4, b: 5 } }
	const list = [
		'abs(-9)',
		'acos(0.434)',
		'asin(0.434)',
		'atan(2)',
		'atan2(90, 15)',
		'ceil(2)',
		'cos(2)',
		'cosh(2)',
		'exp(7)',
		'floor(7)',
		'ln(7)',
		'log(7,10)',
		'log10(7)',
		'remainder(7,2)',
		'round(7.984938,2)',
		'sign(-7)',
		'sin(7)',
		'sinh(7)',
		'tan(7)',
		'tanh(7)',
		'trunc(7.984938,2)'
	]
	show(list, context)
})()
