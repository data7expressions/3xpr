/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('nullable', () => {
	const context = JSON.parse('{"a":1,"b":null,"c":"","e":"hello"}')
	test('lab', () => {
		expect(exp.eval('nvl(a,2)', context)).toStrictEqual(1)
		expect(exp.eval('nvl(b,2)', context)).toStrictEqual(2)
		expect(exp.eval('nvl2(b,"is not null","is null")', context)).toStrictEqual('is null')
		expect(exp.eval('nvl2(c,"is not null","is null")', context)).toStrictEqual('is not null')
		expect(exp.eval('nvl2(d,"is not null","is null")', context)).toStrictEqual('is null')
	})
})
