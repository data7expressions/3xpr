/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('type', () => {
	// const context = JSON.parse('{}')
	test('lab', () => {
		expect(exp.type('1 + a')).toStrictEqual('integer')
		expect(exp.type('b + a')).toStrictEqual('any')
		expect(exp.type('nvl(a ,1)')).toStrictEqual('integer')
		expect(exp.type('nvl(a ,"text")')).toStrictEqual('string')
		expect(exp.type('nvl(a , b * 5 )')).toStrictEqual('number')
		expect(exp.type('a.strCount("o")')).toStrictEqual('number')
		expect(exp.type('[1,2,3].map(p => nvl(a, p))')).toStrictEqual('[integer]')
		expect(exp.type('a = max([1,2,3])')).toStrictEqual('integer')
		expect(exp.type('a = max([1,2,3]) > c')).toStrictEqual('boolean')
		expect(exp.type('d=c.b*2')).toStrictEqual('number')
		expect(exp.type('d=`value of a is: ${a}`')).toStrictEqual('string')
		expect(exp.type('!(a=="1" || b>2)')).toStrictEqual('boolean')
		expect(exp.type('a = {firstName: "John", lastName: "Lennon", age: 40}')).toStrictEqual('{firstName:string,lastName:string,age:integer}')
		expect(exp.type('ods.union(prime)')).toStrictEqual('any')
		expect(exp.type('cities.push(salta).name')).toStrictEqual('any')
		expect(exp.type('a = cities.push(salta).name')).toStrictEqual('any')
	})
})
