import { expressions as exp } from '../../lib'

(async () => {
	const context = {
		firstName: 'Juan',
		lastName: 'Lopez',
		email: 'jlopez@email.com',
		age: 44,
		food: 'pizza',
		film: 'Estación central',
		a: null,
		b: '',
		c: ' '
	}
	exp.addEnum('ColorConversion', { BGR2GRAY: 6, BGR2HSV: 40, BGR2RGB: 4, GRAY2BGR: 8, HSV2BGR: 54, HSV2RGB: 55, RGB2GRAY: 7, RGB2HSV: 41 })
	exp.addEnum('Color', { RED: 1, GREEN: 2, BLUE: 3 })
	// eslint-disable-next-line no-template-curly-in-string
	const result = exp.eval('`${firstName} is ${age} years old and likes ${food}`', context)
	console.log(result)
})()
