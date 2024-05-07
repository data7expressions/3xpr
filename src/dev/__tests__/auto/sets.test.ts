/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('sets', () => {
	const context = JSON.parse('{"ods":[1,3,5,7,9],"prime":[2,3,5,7],"orders":[{"number":"20003","details":[{"article":"Pear","qty":2},{"article":"Banana","qty":2},{"article":"White grape","qty":1},{"article":"Apple","qty":1}]},{"number":"20004","details":[{"article":"Apple","qty":1},{"article":"Banana","qty":2},{"article":"Pear","qty":1}]}]}')
	test('lab', () => {
		expect(exp.eval('ods.union(prime)', context)).toStrictEqual([1, 3, 5, 7, 9, 2])
		expect(exp.eval('ods.intersection(prime)', context)).toStrictEqual([3, 5, 7])
		expect(exp.eval('ods.difference(prime)', context)).toStrictEqual([1, 9])
		expect(exp.eval('ods.symmetricDifference(prime)', context)).toStrictEqual([1, 9, 2])
		expect(exp.eval('orders[0].details.union(orders[1].details)', context)).toStrictEqual([{ article: 'Pear', qty: 2 }, { article: 'Banana', qty: 2 }, { article: 'White grape', qty: 1 }, { article: 'Apple', qty: 1 }, { article: 'Pear', qty: 1 }])
		expect(exp.eval('orders[0].details.intersection(orders[1].details)', context)).toStrictEqual([{ article: 'Apple', qty: 1 }, { article: 'Banana', qty: 2 }])
		expect(exp.eval('orders[0].details.difference(orders[1].details)', context)).toStrictEqual([{ article: 'Pear', qty: 2 }, { article: 'White grape', qty: 1 }])
		expect(exp.eval('orders[0].details.symmetricDifference(orders[1].details)', context)).toStrictEqual([{ article: 'Pear', qty: 2 }, { article: 'White grape', qty: 1 }, { article: 'Pear', qty: 1 }])
	})
})
