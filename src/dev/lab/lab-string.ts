/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable comma-style */
/* eslint-disable no-template-curly-in-string */
import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'string',
		context: { firstName: 'Juan'
						, lastName: 'Lopez'
						, email: 'jlopez@email.com'
						, age: 44
						, food: 'pizza'
						, film: 'Estación central'
						, a: null
						, b: ''
						, c: ' '
						},
		cases: [{
			name: 'lab',
			func: (expression: any, context: any) => exp.eval(expression, context),
			tests: [
				'capitalize(food)',
				'chr(68)',
				'concat(lastName,", ",firstName)',
				'concatenate(lastName,", ",firstName)',
				'title(film)',
				'lower(film)',
				'lpad(firstName,10,"_")',
				'ltrim("  a  ")',
				'replace(film,"a","*")',
				// 'match("¡Hello world!","He.*o")'
				'mask(email)',
				'rpad(firstName,10,"_")',
				'rtrim("  a  ")',
				'substr(film,1,3)',
				'substring(film,1,3)',
				'upper(film)',
				'startWith(film,"E")',
				'strCount(film,"a")',
				'`${firstName} is ${age} years old and likes ${food}`',
				'test("5","[a-zA-Z0-9_.]+$")',
				'firstName.test("[a-zA-Z0-9_.]+$")',
				'isEmpty(a)',
				'isEmpty(b)',
				'isEmpty(c)',
				'isEmpty(food)',
				'$HOME',
				'${USER}',
				'concat($HOME,$USER)',
				'concat(${HOME},$USER)',
				'"Hello"+" "+"world"',
				'`value of home: $HOME`',
				'length(email) > 10 && length(email) < 100',
				'email.length() > 10 && email.length() < 100',
				'isEmpty(b)',
				'isNotEmpty(c)',
				'isNotEmpty(film)'
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
