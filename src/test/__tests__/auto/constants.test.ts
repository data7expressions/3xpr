/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'
describe('constants', () => {
	const context = JSON.parse('{"a":false,"pi":3.14159,"name":"Bpb"}')
	test('lab', () => {
		expect(exp.eval('a = true', context)).toStrictEqual(true)
		expect(exp.eval('a = 1', context)).toStrictEqual(1)
		expect(exp.eval('pi = 3.14159', context)).toStrictEqual(3.14159)
		expect(exp.eval('name = "Bpb" ', context)).toStrictEqual('Bpb')
		expect(exp.eval('a = nvl(null,false)', context)).toStrictEqual(false)
	})
})
