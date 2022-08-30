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
		'orders.min(p=> p.number)',
		'orders.details.min(p=> p.article )',
		'orders.details.max(p=> p.unitPrice * p.qty )',
		'round(orders.details.avg(p=> p.unitPrice * p.qty ),2)',
		'orders[1].details.sum(p=> p.unitPrice * p.qty )',
		'orders.details.count(p=> p.unitPrice * p.qty < 3 )',
		'orders.details.first(p=> p.unitPrice * p.qty < 3 ).article',
		'orders.details.last(p=> p.unitPrice * p.qty < 3 ).article',
		'orders.details.first(p=> p.unitPrice * p.qty < 3 )'
	]
	show(groups, context)

	const list = [
		'orders.details.filter(p=> p.unitPrice < 2).map(p=> p.article).first()',
		'orders.details.where(p-> p.unitPrice < 2).select( p-> p.article).first()',
		'orders.details.where(p-> p.unitPrice < 2).select( p-> p.article).last()',
		'orders.details.first(p-> p.unitPrice < 2).article',
		'orders.first(p-> p.number === "20001").customer.firstName',
		'orders.first(p-> p.number === "20001").customer.x',
		'orders.first(p-> p.number === "20001").x.x',
		'orders.details.filter(p=> p.unitPrice > 1.80 && p.unitPrice < 2).map(p=> p.unitPrice * p.qty)',
		'orders.details.first(p=> p.unitPrice > 1.80 && p.unitPrice < 2)',
		'orders.details.last(p=> p.unitPrice > 1.80 && p.unitPrice < 2)',
		'orders.details.where(p-> p.article === "Banana").len()',
		'orders.details.where(p-> p.article  !== "Banana").length()',
		'orders.each(p=> p.total=round(p.details.sum(q=> q.qty*q.unitPrice),2)).map(p=>{nro:p.number,total:p.total})',
		'orders.details.foreach(p=>total=p.qty*p.unitPrice).total',
		'orders.details.filter(p=>p.article=="Banana").foreach(p=>total=p.qty*p.unitPrice).total',
		'orders.details.sort(p=> p.article).article',
		'orders.details.reverse(p=> p.article).article',
		'orders.details.filter(p=> p.unitPrice > 1.80 && p.unitPrice < 2).reverse()',
		'orders.details.filter(p=> p.unitPrice > 1.80 && p.unitPrice < 2).map(p=> p.article).reverse()',
		'orders.order(p=> p.number).number',
		'orders.select(p=> p.customer).select(p=> p.firstName)',
		'orders.map(p=> p.customer).firstName',
		'orders.customer.firstName',
		'orders.details.delete(p-> p.unitPrice * p.qty > 4).article',
		'orders.remove(p-> p.number === "20002").customer.lastName'
	]
	show(list, context)
})()
