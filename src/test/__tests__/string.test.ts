import { expressions } from '../../lib'

describe('Strings', () => {

	test('operators', () => {	
		expect("a").toBe(expressions.eval('"a"')) 
    expect("a"<"b").toBe(expressions.eval('"a"<"b"')) 
		expect("a \"b\" " < "b").toBe(expressions.eval('"a ""b"" "<"b"')) 
		
	})

	test('functions', () => {
		expect("Aaa").toBe(expressions.eval('title(a)',{"a":"aaa","b":2}))  
		expect("Aaa").toBe(expressions.eval('title("aaa")')) 
		expect(3).toBe(expressions.eval('strCount(a,"a")',{"a":"aaa"}))
		expect(0).toBe(expressions.eval('strCount(a,"b")',{"a":"aaa"})) 
		expect("AAA").toBe(expressions.eval('upper(a)',{"a":"aaa"}))
	})

	test('labs', () => {
		const context = { firstName: 'Juan'
		, lastName: 'Lopez'
		, email: 'jlopez@email.com'
		, age: 44
		, food: 'pizza'
		, film: 'Estación central'
		, a: null
		, b: ''
		, c: ' '
		}
		expect('Pizza').toBe(expressions.eval('capitalize(food)',context))
		expect('D').toBe(expressions.eval('chr(68)',context))
		expect('Lopez, Juan').toBe(expressions.eval('concat(lastName,", ",firstName)',context))
		expect('Lopez, Juan').toBe(expressions.eval('concatenate(lastName,", ",firstName)',context))
		expect('Estación Central').toBe(expressions.eval('title(film)',context))
		expect('estación central').toBe(expressions.eval('lower(film)',context))
		expect(true).toBe(expressions.eval('length(email) > 10 && length(email) < 100',context))
		expect(true).toBe(expressions.eval('email.length() > 10 && email.length() < 100',context))
		expect(true).toBe(expressions.eval('isEmpty(b)',context))
		expect(false).toBe(expressions.eval('isNotEmpty(c)',context))
		expect(true).toBe(expressions.eval('isNotEmpty(film)',context))
		expect('______Juan').toBe(expressions.eval('lpad(firstName,10,"_")',context))
		expect('a  ').toBe(expressions.eval('ltrim("  a  ")',context))
		expect('Est*ción centr*l').toBe(expressions.eval('replace(film,"a","*")',context))
		expect('jlo*****com').toBe(expressions.eval('mask(email)',context))
		expect('Juan______').toBe(expressions.eval('rpad(firstName,10,"_")',context))
		expect('  a').toBe(expressions.eval('rtrim("  a  ")',context))
		expect('st').toBe(expressions.eval('substr(film,1,3)',context))
		expect('st').toBe(expressions.eval('substring(film,1,3)',context))
		expect('ESTACIÓN CENTRAL').toBe(expressions.eval('upper(film)',context))
		expect(true).toBe(expressions.eval('startWith(film,"E")',context))
		expect(2).toBe(expressions.eval('strCount(film,"a")',context))
		expect('Juan is 44 years old and likes pizza').toBe(expressions.eval('`${firstName} is ${age} years old and likes ${food}`',context))
		expect(true).toBe(expressions.eval('test("5","[a-zA-Z0-9_.]+$")',context))
		expect(false).toBe(expressions.eval('test("%","[a-zA-Z0-9_.]+$")',context))
		expect(true).toBe(expressions.eval('isEmpty(a)',context))
		expect(true).toBe(expressions.eval('isEmpty(b)',context))
		expect(true).toBe(expressions.eval('isEmpty(c)',context))
		expect(false).toBe(expressions.eval('isEmpty(food)',context))
		expect('/home/flavio').toBe(expressions.eval('$HOME',context))
		expect('flavio').toBe(expressions.eval('${USER}',context))
		expect('/home/flavioflavio').toBe(expressions.eval('concat($HOME,$USER)',context))
		expect('/home/flavioflavio').toBe(expressions.eval('concat(${HOME},$USER)',context))
		expect('value of home: /home/flavio').toBe(expressions.eval('`value of home: $HOME`',context))
	})
})	