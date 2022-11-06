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
	// eslint-disable-next-line no-template-curly-in-string
	const result = exp.eval('`${firstName} is ${age} years old and likes ${food}`', context)
	console.log(result)
})()
