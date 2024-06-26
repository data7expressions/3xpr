import { expressions as exp } from '../../lib'
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

	const result = exp.eval('5*(7+9)==5*7+5*9', context)
	console.log(result)
})()
