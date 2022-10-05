/* eslint-disable no-template-curly-in-string */
import { HelperTest } from '../helperTest'

(async () => {
	const context = { a: '1', b: 2, c: { a: 4, b: 5 } }
	const list = [
		'a=8',
		'c.a=1',
		'd=c.b*2',
		'd=`value of a is: ${a}`'
	]
	await HelperTest.buildSuite({ name: 'assignment', context: context, expressions: list })
})()
