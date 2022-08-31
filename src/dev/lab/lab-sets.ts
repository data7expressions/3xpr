import { show } from './util'

(async () => {
	const context = {
		ods: [1, 3, 5, 7, 9],
		prime: [2, 3, 5, 7],
		orders: [
			{
				number: '20003',
				details: [
					{ article: 'Pear', qty: 2 },
					{ article: 'Banana', qty: 2 },
					{ article: 'White grape', qty: 1 },
					{ article: 'Apple', qty: 1 }
				]
			},
			{
				number: '20004',
				details: [
					{ article: 'Apple', qty: 1 },
					{ article: 'Banana', qty: 2 },
					{ article: 'Pear', qty: 1 }
				]
			}
		]
	}
	// TODO: falla, hay que revisar todos
	const list = [
		'ods.union(prime)',
		'ods.intersection(prime)',
		'ods.difference(prime)',
		'ods.symmetricDifference(prime)',
		'orders[0].details.union(orders[1].details)',
		'orders[0].details.intersection(orders[1].details)',
		'orders[0].details.difference(orders[1].details)',
		'orders[0].details.symmetricDifference(orders[1].details)'
	]
	show(list, context)
})()
