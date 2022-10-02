import { expressions } from '../../lib'

describe('Access', () => {
	test('labs', () => {			
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
		expect(['20001','20002']).toStrictEqual(expressions.eval('orders.number',context))
		expect('20001').toBe(expressions.eval('orders[0].number',context))
		expect('20001').toBe(expressions.eval('orders[0]["number"]',context))
		expect('Paul').toBe(expressions.eval('orders[1].customer.firstName',context))
		expect('John').toBe(expressions.eval('orders.customer[0]["firstName"]',context))
		expect('John').toBe(expressions.eval('orders.customer[0]["first"+"Name"]',context))
		expect('Paul').toBe(expressions.eval('orders[1].customer["firstName"]',context))
		expect([]).toStrictEqual(expressions.eval('orders.0.number',context))
		expect([]).toStrictEqual(expressions.eval('orders.1.customer.firstName',context))
		expect(['John','Paul']).toStrictEqual(expressions.eval('orders.customer.firstName',context))
		expect([]).toStrictEqual(expressions.eval('orders.0.details.article',context))
		expect([]).toStrictEqual(expressions.eval('orders[0].details.2.article',context))
		expect([]).toStrictEqual(expressions.eval('orders.0.details',context))
		expect('Paul').toBe(expressions.eval('orders.customer[orders.customer.length()-1]["firstName"]',context))
		expect(['Pear','Banana','White grape','Apple']).toStrictEqual(expressions.eval('orders.details.article.distinct()',context))
		expect(['Pear','White grape','Apple','Pear']).toStrictEqual(expressions.eval('orders.details.article.filter(p => p.includes("e"))',context))
		expect(['Pear','White grape','Apple']).toStrictEqual(expressions.eval('orders.details.article.filter(p => p.includes("e")).distinct()',context))
		expect(['Apple','Pear']).toStrictEqual(expressions.eval('orders.filter(p=> p.number == "20002").details.article.filter(p => p.includes("e"))',context))
		expect([{"nro":"20001","customer":"John Murphy"},{"nro":"20002","customer":"Paul Smith"}]).toStrictEqual(expressions.eval('orders.map(p => {nro:p.number, customer: `${p.customer.firstName} ${p.customer.lastName}`})',context))
		expect(['Pear','Banana','White grape','Apple']).toStrictEqual(expressions.eval('orders.map(p => {nro:p.number, articles: p.details.article }).articles.distinct()',context))
	})
})	