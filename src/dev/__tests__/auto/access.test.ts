/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('access', () => {
	const context = JSON.parse('{"orders":[{"number":"20001","customer":{"firstName":"John","lastName":"Murphy"},"orderTime":"2022-07-30T10:15:54","details":[{"article":"Pear","unitPrice":1.78,"qty":2},{"article":"Banana","unitPrice":1.99,"qty":1},{"article":"White grape","unitPrice":2.03,"qty":1}]},{"number":"20002","customer":{"firstName":"Paul","lastName":"Smith"},"orderTime":"2022-07-30T12:12:43","details":[{"article":"Apple","unitPrice":2.15,"qty":1},{"article":"Banana","unitPrice":1.99,"qty":2},{"article":"Pear","unitPrice":1.78,"qty":1}]}]}')
	test('lab', () => {
		expect(exp.eval('orders.number', context)).toStrictEqual(['20001', '20002'])
		expect(exp.eval('orders[0].number', context)).toStrictEqual('20001')
		expect(exp.eval('orders[0]["number"]', context)).toStrictEqual('20001')
		expect(exp.eval('orders[1].customer.firstName', context)).toStrictEqual('Paul')
		expect(exp.eval('orders.customer[0]["firstName"]', context)).toStrictEqual('John')
		expect(exp.eval('orders.customer[0]["first"+"Name"]', context)).toStrictEqual('John')
		expect(exp.eval('orders[1].customer["firstName"]', context)).toStrictEqual('Paul')
		expect(exp.eval('orders.1["customer"]["firstName"]', context)).toStrictEqual('Paul')
		expect(exp.eval('orders.0.number', context)).toStrictEqual('20001')
		expect(exp.eval('orders.1.customer.firstName', context)).toStrictEqual('Paul')
		expect(exp.eval('orders.customer.firstName', context)).toStrictEqual(['John', 'Paul'])
		expect(exp.eval('orders.0.details.article', context)).toStrictEqual(['Pear', 'Banana', 'White grape'])
		expect(exp.eval('orders[0].details.2.article', context)).toStrictEqual('White grape')
		expect(exp.eval('orders.0.details', context)).toStrictEqual([{ article: 'Pear', unitPrice: 1.78, qty: 2 }, { article: 'Banana', unitPrice: 1.99, qty: 1 }, { article: 'White grape', unitPrice: 2.03, qty: 1 }])
		expect(exp.eval('orders.customer[orders.customer.length()-1]["firstName"]', context)).toStrictEqual('Paul')
		expect(exp.eval('orders.details.article.distinct()', context)).toStrictEqual(['Pear', 'Banana', 'White grape', 'Apple'])
		expect(exp.eval('orders.details.article.filter(p => p.includes("e"))', context)).toStrictEqual(['Pear', 'White grape', 'Apple', 'Pear'])
		expect(exp.eval('orders.details.article.filter(p => p.includes("e")).distinct()', context)).toStrictEqual(['Pear', 'White grape', 'Apple'])
		expect(exp.eval('orders.filter(p=> p.number == "20002").details.article.filter(p => p.includes("e"))', context)).toStrictEqual(['Apple', 'Pear'])
		expect(exp.eval('orders.map(p => {nro:p.number, customer: `${p.customer.firstName} ${p.customer.lastName}`})', context)).toStrictEqual([{ nro: '20001', customer: 'John Murphy' }, { nro: '20002', customer: 'Paul Smith' }])
		expect(exp.eval('orders.map(p => {nro:p.number, articles: p.details.article }).articles.distinct()', context)).toStrictEqual(['Pear', 'Banana', 'White grape', 'Apple'])
	})
})
