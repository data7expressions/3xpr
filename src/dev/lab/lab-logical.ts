import { HelperTest } from '../helperTest'

(async () => {
	const context = { a: '1', b: 2, c: { a: 4, b: 5 }, d: 'house', e: 'car' }
	const list = [
		'a=="1" && b==2',
		'a=="1" && b>2',
		'a=="1" || b>2',
		'!(a=="1" || b>2)'
	]
	await HelperTest.buildSuite({ name: 'logical', context: context, expressions: list })
})()
