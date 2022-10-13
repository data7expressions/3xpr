import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'groups',
		context: {
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
		},
		cases: [{
			name: 'lab',
			func: (expression: any, context: any) => exp.eval(expression, context),
			tests: [
				'orders.min(p=> p.number)',
				'orders.details.min(p=> p.article )',
				'orders.details.max(p=> p.unitPrice * p.qty )',
				'orders.details.avg(p=> p.unitPrice * p.qty )',
				'orders[1].details.sum(p=> p.unitPrice * p.qty )',
				'orders.details.count(p=> p.unitPrice * p.qty < 3 )',
				'orders.details.first(p=> p.unitPrice * p.qty < 3 ).article',
				'orders.details.last(p=> p.unitPrice * p.qty < 3 ).article',
				'orders.details.first(p=> p.unitPrice * p.qty < 3 )',
				'orders.each(p=>p.total=p.details.sum(q=>q.qty*q.unitPrice)).map(p=>{nro:p.number,total:p.total})',
				'orders.details.foreach(p=>p.subtotal=p.qty*p.unitPrice).subtotal',
				'orders.details.foreach(p=>total=nvl(total,0)+p.qty*p.unitPrice);total',
				'orders.details.distinct(p=>p.article)',
				'orders.details.distinct(p=>{article:p.article,qty:p.qty})',
				'orders.details.map(p=>{article:p.article,count:count(1),total:sum(p.qty * p.unitPrice)})',
				'{total:orders[0].details.sum(p=>p.qty * p.unitPrice)}',
				'orders.map(p=>{nro:p.number,total:p.details.sum(q=>q.qty * q.unitPrice)})'
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
