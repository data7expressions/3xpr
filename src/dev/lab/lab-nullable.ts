import { HelperTest } from '../helperTest'

(async () => {
	const context = { a: 1, b: null, c: '', e: 'hello' }
	const list = [
		'nvl(a,2)',
		'nvl(b,2)',
		'nvl2(b,"is not null","is null")',
		'nvl2(c,"is not null","is null")',
		'nvl2(d,"is not null","is null")'
	]
	await HelperTest.buildSuite({ name: 'nullable', context: context, expressions: list })
})()
