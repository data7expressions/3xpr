import { expressions as exp } from '../../lib'

(async () => {
	const list = [
		'Product { name supplier { name contact phone } }',
		'Product(id:1){ name supplier { name contact phone } }'
	]
	for (const p of list) {
		const result = exp.graphqlToExpression(p)
		console.log(`${p} => ${result}`)
	}
})()
