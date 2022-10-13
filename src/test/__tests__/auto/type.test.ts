/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'
describe('type', () => {
	const context = JSON.parse('{}')
	test('lab', () => {
		expect(exp.getType('1 + a')).toStrictEqual('integer')
		expect(exp.getType('b + a')).toStrictEqual('any')
		expect(exp.getType('nvl(a ,1)')).toStrictEqual('integer')
		expect(exp.getType('nvl(a ,"text")')).toStrictEqual('string')
		expect(exp.getType('nvl(a , b * 5 )')).toStrictEqual('number')
		expect(exp.getType('a.strCount("o")')).toStrictEqual('number')
		expect(exp.getType('[1,2,3].map(p => nvl(a, p))')).toStrictEqual('[integer]')
		expect(exp.getType('a = max([1,2,3])')).toStrictEqual('integer')
		expect(exp.getType('a = max([1,2,3]) > c')).toStrictEqual('boolean')
		expect(exp.getType('d=c.b*2')).toStrictEqual('number')
		expect(exp.getType('d=`value of a is: ${a}`')).toStrictEqual('string')
		expect(exp.getType('!(a=="1" || b>2)')).toStrictEqual('boolean')
		expect(exp.getType('a = {firstName: "John", lastName: "Lennon", age: 40}')).toStrictEqual('{firstName:string,lastName:string,age:integer}')
		expect(exp.getType('ods.union(prime)')).toStrictEqual('any')
		expect(exp.getType('cities.push(salta).name')).toStrictEqual('any')
		expect(exp.getType('a = cities.push(salta).name')).toStrictEqual('any')
	})
})
