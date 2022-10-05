import { HelperTest } from '../helperTest'

(async () => {
	const context = { }
	const list = [
		'5 & 1',
		'5 | 1',
		'~ 5',
		'5 << 1',
		'5 ^ 1',
		'5 >> 1'
	]
	await HelperTest.buildSuite({ name: 'bitwise', context: context, expressions: list })
})()
