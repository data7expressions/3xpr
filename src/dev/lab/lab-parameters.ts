import { expressions as exp } from '../../lib'
import { show } from './util'

(async () => {
	const context = { a: 1, b: null, c: '', e: 'hello' }
	const list = [
		// '1 + a',
		// 'b + a',
		// 'nvl(a ,1)',
		// 'nvl(a ,"text")',
		// 'nvl(a , b * 5 )',
		// 'a.strCount("o")',
		// '[1,2,3].map(p => nvl(a, p))',
		'a = max([1,2,3])'
		// 'a = max([1,2,3]) > c'
	]
	show(list, context, (expression:string) => exp.parameters(expression))
})()
