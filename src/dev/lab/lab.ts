import { expressions as exp } from '../../lib'

(async () => {
	// const context = {
	// firstName: 'Juan',
	// lastName: 'Lopez',
	// email: 'jlopez@email.com',
	// age: 44,
	// food: 'pizza',
	// film: 'Estación central',
	// a: null,
	// b: '',
	// c: ' '
	// }
	// exp.addEnum('ColorConversion', { BGR2GRAY: 6, BGR2HSV: 40, BGR2RGB: 4, GRAY2BGR: 8, HSV2BGR: 54, HSV2RGB: 55, RGB2GRAY: 7, RGB2HSV: 41 })
	// exp.addEnum('Color', { RED: 1, GREEN: 2, BLUE: 3 })
	// // eslint-disable-next-line no-template-curly-in-string
	// const result = exp.eval('`${firstName} is ${age} years old and likes ${food}`', context)
	// console.log(result)
	// console.log(exp.eval('1===a', { a: 2 }))
	// const context = { orders: [{ number: '20001', customer: { firstName: 'John', lastName: 'Murphy' }, orderTime: '2022-07-30T10:15:54', details: [{ article: 'Pear', unitPrice: 1.78, qty: 2 }, { article: 'Banana', unitPrice: 1.99, qty: 1 }, { article: 'White grape', unitPrice: 2.03, qty: 1 }] }, { number: '20002', customer: { firstName: 'Paul', lastName: 'Smith' }, orderTime: '2022-07-30T12:12:43', details: [{ article: 'Apple', unitPrice: 2.15, qty: 1 }, { article: 'Banana', unitPrice: 1.99, qty: 2 }, { article: 'Pear', unitPrice: 1.78, qty: 1 }] }] }
	// const result = exp.eval('orders.0.number', context)
	// console.log(result)
	const context = { cities: [{ name: 'Buenos Aires', province: 'BA', population: 2890151, coordinates: { lat: 34.36, long: 58.26 } }, { name: 'Córdoba', province: 'CB', population: 1317298, coordinates: { lat: 31.42, long: 64.18 } }, { name: 'Rosario', province: 'SF', population: 948312, coordinates: { lat: 32.58, long: 60.36 } }, { name: 'Mar del Plata', province: 'BA', population: 593337, coordinates: { lat: 38, long: 57.33 } }], salta: { name: 'Salta', province: 'SA', population: 520683, coordinates: { lat: 24.33, long: 64.3 } }, posadas: { name: 'Posadas', province: 'MI', population: 275028, coordinates: { lat: 27.22, long: 55.53 } }, musicians: ['Charly Garcia', 'Fito Paez', 'Luiz Alberto Spinetta'], pair: [2, 4, 6], ods: [1, 3, 5] }
	const result = exp.eval('cities.where(p-> p.province <> "BA").len()', context)
	console.log(result)
})()
