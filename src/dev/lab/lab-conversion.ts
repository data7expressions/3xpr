import { HelperTest } from '../helperTest'

(async () => {
	const context = {
		customer: { firstName: 'Juan', lastName: 'Lopez', birthday: '1975-03-20T23:45:11' },
		data: '{"b":1}'
	}
	const list = [
		'toString(month(customer.birthday))',
		'toNumber("3.141516")',
		'dateToString(datetime(customer.birthday))',
		'keys(customer)',
		'values(customer)',
		'entries(customer)',
		'fromEntries(entries(customer))',
		'stringify(customer)',
		'parse(data).b'
	]
	await HelperTest.buildSuite({ name: 'conversion', context: context, expressions: list })
})()
