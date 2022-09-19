import { show } from './util'

(async () => {
	const context = {
		orders: [
			{
				number: '20001',
				customer: { firstName: 'John', lastName: 'Murphy' },
				orderTime: '2022-07-30T10:15:54',
				details: [
					{ article: 'Pear', unitPrice: 1.78, qty: 2 },
					{ article: 'Banana', unitPrice: 1.99, qty: 1 },
					{ article: 'White grape', unitPrice: 2.03, qty: 1 }
				]
			},
			{
				number: '20002',
				customer: { firstName: 'Paul', lastName: 'Smith' },
				orderTime: '2022-07-30T12:12:43',
				details: [
					{ article: 'Apple', unitPrice: 2.15, qty: 1 },
					{ article: 'Banana', unitPrice: 1.99, qty: 2 },
					{ article: 'Pear', unitPrice: 1.78, qty: 1 }
				]
			}
		]
	}

	const groups = [
		'orders.number',
		'orders[0].number',
		'orders[0]["number"]',
		'orders[1].customer.firstName',
		'orders.customer[0]["firstName"]',
		'orders.customer[0]["first"+"Name"]',
		'orders[1].customer["firstName"]',
		// 'orders.1["customer"]["firstName"]',
		'orders.0.number',
		'orders.1.customer.firstName',
		'orders.customer.firstName',
		'orders.0.details.article',
		'orders[0].details.2.article',
		'orders.0.details',
		'orders.customer[orders.customer.length()-1]["firstName"]',
		'orders.details.article.distinct()',
		'orders.details.article.filter(p => p.includes("e"))',
		'orders.details.article.filter(p => p.includes("e")).distinct()',
		'orders.filter(p=> p.number == "20002").details.article.filter(p => p.includes("e"))',
		// eslint-disable-next-line no-template-curly-in-string
		'orders.map(p => {nro:p.number, customer: `${p.customer.firstName} ${p.customer.lastName}`})',
		'orders.map(p => {nro:p.number, articles: p.details.article }).articles.distinct()'
	]
	show(groups, context)
})()
