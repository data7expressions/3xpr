import { HelperTest } from '../helperTest'

(async () => {
	const context = { }

	const list = [
		'a = true',
		'a = nvl(null,false)'
	]
	await HelperTest.buildSuite({ name: 'constants', context: context, expressions: list })
})()
