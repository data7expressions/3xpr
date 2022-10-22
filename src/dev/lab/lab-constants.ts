import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'constants',
		context: {},
		cases: [{
			name: 'lab',
			func: (expression: any, context: any) => exp.eval(expression, context),
			tests: [
				'a = true',
				'a = 1',
				'pi = 3.14159',
				'musician = "Charly Garcia" ',
				'a = nvl(null,false)'
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
