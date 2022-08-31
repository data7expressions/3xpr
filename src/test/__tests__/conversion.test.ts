import { expressions } from '../../lib'

describe('Conversion', () => {
	test('labs', () => {	
		const context = {
			customer: { firstName: 'Juan', lastName: 'Lopez', birthday: '1975-03-20T23:45:11' },
			data: '{"b":1}'
		}
		expect('3').toStrictEqual(expressions.eval('toString(month(customer.birthday))',context))
		expect(3.141516).toStrictEqual(expressions.eval('toNumber("3.141516")',context))
		expect('1975-03-20T22:45:11.000Z').toStrictEqual(expressions.eval('dateToString(datetime(customer.birthday))',context))
		expect(['firstName','lastName','birthday']).toStrictEqual(expressions.eval('keys(customer)',context))
		expect(['Juan','Lopez','1975-03-20T23:45:11']).toStrictEqual(expressions.eval('values(customer)',context))
		expect([["firstName","Juan"],["lastName","Lopez"],["birthday","1975-03-20T23:45:11"]]).toStrictEqual(expressions.eval('entries(customer)',context))
		expect({"firstName":"Juan","lastName":"Lopez","birthday":"1975-03-20T23:45:11"}).toStrictEqual(expressions.eval('fromEntries(entries(customer))',context))
		expect('{"firstName":"Juan","lastName":"Lopez","birthday":"1975-03-20T23:45:11"}').toStrictEqual(expressions.eval('stringify(customer)',context))
		expect(1).toBe(expressions.eval('parse(data).b',context))		
	})
})	