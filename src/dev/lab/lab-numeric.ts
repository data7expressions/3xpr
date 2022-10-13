import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'numeric',
		context: { a: '1', b: 2, c: { a: 4, b: 5 } },
		cases: [{
			name: 'lab',
			func: (expression: any, context: any) => exp.eval(expression, context),
			tests: [
				'c.b',
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
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
