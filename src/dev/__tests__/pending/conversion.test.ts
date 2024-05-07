/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('conversion', () => {
	// eslint-disable-next-line no-useless-escape
	const context = JSON.parse('{"customer":{"firstName":"Juan","lastName":"Lopez","birthday":"1975-03-20T23:45:11"},"data":"{\"b\":1}"}')
	test('lab', () => {
		expect(exp.eval('toString(month(customer.birthday))', context)).toStrictEqual('3')
		expect(exp.eval('toNumber("3.141516")', context)).toStrictEqual(3.141516)
		expect(exp.eval('dateToString(dateTime(customer.birthday))', context)).toStrictEqual('1975-03-20T22:45:11.000Z')
		expect(exp.eval('keys(customer)', context)).toStrictEqual(['firstName', 'lastName', 'birthday'])
		expect(exp.eval('values(customer)', context)).toStrictEqual(['Juan', 'Lopez', '1975-03-20T23:45:11'])
		expect(exp.eval('entries(customer)', context)).toStrictEqual([['firstName', 'Juan'], ['lastName', 'Lopez'], ['birthday', '1975-03-20T23:45:11']])
		expect(exp.eval('fromEntries(entries(customer))', context)).toStrictEqual({ firstName: 'Juan', lastName: 'Lopez', birthday: '1975-03-20T23:45:11' })
		expect(exp.eval('stringify(customer)', context)).toStrictEqual('{"firstName":"Juan","lastName":"Lopez","birthday":"1975-03-20T23:45:11"}')
		expect(exp.eval('parse(data).b', context)).toStrictEqual(1)
	})
})
