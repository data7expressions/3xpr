import { expressions as exp } from '../../lib'

(async () => {
// const list = [
// 'Product { name supplier { name contact phone } }',
// 'Product(id:1){ name supplier { name contact phone } }'
// ]
// for (const p of list) {
// const result = exp.graphqlToExpression(p)
// console.log(`${p} => ${result}`)
// }

	const data: any = { a: [1, 2, 3], b: 0 }
	exp.eval('a.foreach(p=>b=b+p)', data)
	console.log(data.b)
})()
