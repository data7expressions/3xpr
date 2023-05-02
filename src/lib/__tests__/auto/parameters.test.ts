/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('parameters', () => {
	// const context = JSON.parse('{}')
	test('lab', () => {
		expect(exp.parameters('1 + a')).toStrictEqual([{ name: 'a', type: 'integer' }])
		expect(exp.parameters('b + a')).toStrictEqual([{ name: 'b', type: 'any' }, { name: 'a', type: 'any' }])
		expect(exp.parameters('nvl(a ,1)')).toStrictEqual([{ name: 'a', type: 'integer' }])
		expect(exp.parameters('nvl(a ,"text")')).toStrictEqual([{ name: 'a', type: 'string' }])
		expect(exp.parameters('nvl(a , b * 5 )')).toStrictEqual([{ name: 'a', type: 'number' }, { name: 'b', type: 'number' }])
		expect(exp.parameters('a.strCount("o")')).toStrictEqual([{ name: 'a', type: 'string' }])
		expect(exp.parameters('[1,2,3].map(p => nvl(a, p))')).toStrictEqual([{ name: 'p', type: 'integer' }, { name: 'a', type: 'integer' }])
		expect(exp.parameters('a = max([1,2,3])')).toStrictEqual([{ name: 'a', type: 'integer' }])
		expect(exp.parameters('a = max([1,2,3]) > c')).toStrictEqual([{ name: 'a', type: 'boolean' }, { name: 'c', type: 'integer' }])
		expect(exp.parameters('d=c.b*2')).toStrictEqual([{ name: 'd', type: 'number' }, { name: 'c.b', type: 'number' }])
		expect(exp.parameters('d=`value of a is: ${a}`')).toStrictEqual([{ name: 'd', type: 'string' }])
		expect(exp.parameters('!(a=="1" || b>2)')).toStrictEqual([{ name: 'a', type: 'string' }, { name: 'b', type: 'integer' }])
		expect(exp.parameters('a = {firstName: "John", lastName: "Lennon", age: 40}')).toStrictEqual([{ name: 'a', type: '{firstName:string,lastName:string,age:integer}' }])
		expect(exp.parameters('ods.union(prime)')).toStrictEqual([{ name: 'ods', type: 'any' }, { name: 'prime', type: 'any' }])
		expect(exp.parameters('cities.push(salta).name')).toStrictEqual([{ name: 'cities', type: '[{name:any}]' }, { name: 'salta', type: '{name:any}' }])
		expect(exp.parameters('a = cities.push(salta).name')).toStrictEqual([{ name: 'a', type: 'any' }, { name: 'cities', type: '[{name:any}]' }, { name: 'salta', type: '{name:any}' }])
	})
})
