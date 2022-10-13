import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'nullable',
		context: { a: 1, b: null, c: '', e: 'hello' },
		cases: [{
			name: 'lab',
			func: (expression: any, context: any) => exp.eval(expression, context),
			tests: [
				'nvl(a,2)',
				'nvl(b,2)',
				'nvl2(b,"is not null","is null")',
				'nvl2(c,"is not null","is null")',
				'nvl2(d,"is not null","is null")'
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
