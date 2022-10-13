import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'arithmetic',
		context: { a: '1', b: 2, c: { a: 4, b: 5 } },
		cases: [{
			name: 'lab',
			func: (expression: any, context: any) => exp.eval(expression, context),
			tests: [
				'3+2-1',
				'3*4-1',
				'1-2-5',
				'(2+3)*2',
				'2*(3+2)',
				'1+2*3*4',
				'(1+(2**3)*4',
				'1+2**(3*4)',
				'(a*b)+(2*a+2*b)',
				'2**b+a'
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
