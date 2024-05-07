/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('groups', () => {
	const context = JSON.parse('{"orders":[{"number":"20001","customer":{"firstName":"John","lastName":"Murphy"},"orderTime":"2022-07-30T10:15:54","details":[{"article":"Pear","unitPrice":1.78,"qty":2},{"article":"Banana","unitPrice":1.99,"qty":1},{"article":"White grape","unitPrice":2.03,"qty":1}]},{"number":"20002","customer":{"firstName":"Paul","lastName":"Smith"},"orderTime":"2022-07-30T12:12:43","details":[{"article":"Apple","unitPrice":2.15,"qty":1},{"article":"Banana","unitPrice":1.99,"qty":2},{"article":"Pear","unitPrice":1.78,"qty":1}]}]}')
	test('lab', () => {
		expect(exp.eval('orders.min(p=> p.number)', context)).toStrictEqual('20001')
		expect(exp.eval('orders.details.min(p=> p.article )', context)).toStrictEqual('Apple')
		expect(exp.eval('orders.details.max(p=> p.unitPrice * p.qty )', context)).toStrictEqual(3.98)
		expect(exp.eval('orders.details.avg(p=> p.unitPrice * p.qty )', context)).toStrictEqual(2.5816666666666666)
		expect(exp.eval('orders[1].details.sum(p=> p.unitPrice * p.qty )', context)).toStrictEqual(7.91)
		expect(exp.eval('orders.details.count(p=> p.unitPrice * p.qty < 3 )', context)).toStrictEqual(4)
		expect(exp.eval('orders.details.first(p=> p.unitPrice * p.qty < 3 ).article', context)).toStrictEqual('Banana')
		expect(exp.eval('orders.details.last(p=> p.unitPrice * p.qty < 3 ).article', context)).toStrictEqual('Pear')
		expect(exp.eval('orders.details.first(p=> p.unitPrice * p.qty < 3 )', context)).toStrictEqual({ article: 'Banana', unitPrice: 1.99, qty: 1, subtotal: 1.99 })
		expect(exp.eval('orders.each(p=>p.total=p.details.sum(q=>q.qty*q.unitPrice)).map(p=>{nro:p.number,total:p.total})', context)).toStrictEqual([{ nro: '20001', total: 7.58 }, { nro: '20002', total: 7.91 }])
		expect(exp.eval('orders.details.foreach(p=>p.subtotal=p.qty*p.unitPrice).subtotal', context)).toStrictEqual([3.56, 1.99, 2.03, 2.15, 3.98, 1.78])
		expect(exp.eval('orders.details.foreach(p=>total=nvl(total,0)+p.qty*p.unitPrice);total', context)).toStrictEqual(15.49)
		expect(exp.eval('orders.details.distinct(p=>p.article)', context)).toStrictEqual(['Pear', 'Banana', 'White grape', 'Apple'])
		expect(exp.eval('orders.details.distinct(p=>{article:p.article,qty:p.qty})', context)).toStrictEqual([{ article: 'Pear', qty: 2 }, { article: 'Banana', qty: 1 }, { article: 'White grape', qty: 1 }, { article: 'Apple', qty: 1 }, { article: 'Banana', qty: 2 }, { article: 'Pear', qty: 1 }])
		expect(exp.eval('orders.details.map(p=>{article:p.article,count:count(1),total:sum(p.qty * p.unitPrice)})', context)).toStrictEqual([{ article: 'Pear', count: 2, total: 5.34 }, { article: 'Banana', count: 2, total: 5.97 }, { article: 'White grape', count: 1, total: 2.03 }, { article: 'Apple', count: 1, total: 2.15 }])
		expect(exp.eval('{total:orders[0].details.sum(p=>p.qty * p.unitPrice)}', context)).toStrictEqual({ total: 7.58 })
		expect(exp.eval('orders.map(p=>{nro:p.number,total:p.details.sum(q=>q.qty * q.unitPrice)})', context)).toStrictEqual([{ nro: '20001', total: 7.58 }, { nro: '20002', total: 7.91 }])
	})
})
