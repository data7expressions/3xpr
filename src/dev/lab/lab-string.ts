import { expressions } from '../../lib'

(async () => {
	// String
	const context = { firstName: 'Juan', lastName: 'Lopez', email: 'jlopez@email.com', age: 44, food: 'pizza', film: 'Estación central', data: '{"b":1}', coordinate: { lat: 48.87, long: 2.29 } }
	console.log('capitalize(food)' + ' => ' + expressions.eval('capitalize(food)', context))
	console.log('chr(68)' + ' => ' + expressions.eval('chr(68)', context))
	console.log('concat(lastName,", ",firstName)' + ' => ' + expressions.eval('concat(lastName,", ",firstName)', context))
	console.log('initcap(film)' + ' => ' + expressions.eval('initcap(film)', context))
	console.log('lower(film)' + ' => ' + expressions.eval('lower(film)', context))
	console.log('lpad(firstName,10,"_")' + ' => ' + expressions.eval('lpad(firstName,10,"_")', context))
	console.log('ltrim("  a  ")' + ' => ' + expressions.eval('ltrim("  a  ")', context))
	console.log('replace(film,"a","*")' + ' => ' + expressions.eval('replace(film,"a","*")', context))
	// console.log(expressions.eval('match("¡Hello world!","He.*o")', {}))
	console.log('mask(email)' + ' => ' + expressions.eval('mask(email)', context))
	console.log('parse(data).b' + ' => ' + expressions.eval('parse(data).b', context))
	console.log('rpad(firstName,10,"_")' + ' => ' + expressions.eval('rpad(firstName,10,"_")', context))
	console.log('rtrim("  a  ")' + ' => ' + expressions.eval('rtrim("  a  ")', context))
	console.log('substr(film,1,3)' + ' => ' + expressions.eval('substr(film,1,3)', context))
	console.log('substring(film,1,3)' + ' => ' + expressions.eval('substring(film,1,3)', context))
	console.log('upper(film)' + ' => ' + expressions.eval('upper(film)', context))
	console.log('strCount(film,"a")' + ' => ' + expressions.eval('strCount(film,"a")', context))
	console.log('stringify(coordinate)' + ' => ' + expressions.eval('stringify(coordinate)', context))
	// eslint-disable-next-line no-template-curly-in-string
	console.log('`${firstName} is ${age} years old and likes ${food}`' + ' => ' + expressions.eval('`${firstName} is ${age} years old and likes ${food}`', context))
	console.log('test("5","[a-zA-Z0-9_.]+$")' + ' => ' + expressions.eval('test("5","[a-zA-Z0-9_.]+$")', {}))
	console.log('test("%","[a-zA-Z0-9_.]+$")' + ' => ' + expressions.eval('test("%","[a-zA-Z0-9_.]+$")', {}))
})()
