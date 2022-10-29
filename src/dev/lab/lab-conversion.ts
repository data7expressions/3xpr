import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'conversion',
		context: {
			customer: { firstName: 'Juan', lastName: 'Lopez', birthday: '1975-03-20T23:45:11' },
			data: '{"b":1}'
		},
		cases: [{
			name: 'lab',
			func: (expression: any, context: any) => exp.eval(expression, context),
			tests: [
				'toString(month(customer.birthday))',
				'toNumber("3.141516")',
				'dateToString(dateTime(customer.birthday))',
				'keys(customer)',
				'values(customer)',
				'entries(customer)',
				'fromEntries(entries(customer))',
				'stringify(customer)',
				'parse(data).b'
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
