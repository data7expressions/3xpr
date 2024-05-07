/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('array', () => {
	const context = JSON.parse('{"cities":[{"name":"Buenos Aires","province":"BA","population":2890151,"coordinates":{"lat":34.36,"long":58.26}},{"name":"Córdoba","province":"CB","population":1317298,"coordinates":{"lat":31.42,"long":64.18}},{"name":"Rosario","province":"SF","population":948312,"coordinates":{"lat":32.58,"long":60.36}},{"name":"Mar del Plata","province":"BA","population":593337,"coordinates":{"lat":38,"long":57.33}}],"salta":{"name":"Salta","province":"SA","population":520683,"coordinates":{"lat":24.33,"long":64.3}},"posadas":{"name":"Posadas","province":"MI","population":275028,"coordinates":{"lat":27.22,"long":55.53}},"musicians":["Charly Garcia","Fito Paez","Luiz Alberto Spinetta"],"pair":[2,4,6],"ods":[1,3,5]}')
	test('lab', () => {
		expect(exp.eval('cities.length()', context)).toStrictEqual(4)
		expect(exp.eval('concat(ods,pair)', context)).toStrictEqual([1, 3, 5, 2, 4, 6])
		expect(exp.eval('concatenate(pair,ods).sort()', context)).toStrictEqual([1, 2, 3, 4, 5, 6])
		expect(exp.eval('cities.name', context)).toStrictEqual(['Buenos Aires', 'Córdoba', 'Rosario', 'Mar del Plata'])
		expect(exp.eval('in("San Luis",cities.name)', context)).toStrictEqual(false)
		expect(exp.eval('cities.coordinates.lat', context)).toStrictEqual([34.36, 31.42, 32.58, 38])
		expect(exp.eval('cities.x', context)).toStrictEqual([])
		expect(exp.eval('cities.x.x', context)).toStrictEqual([])
		expect(exp.eval('concatenate(pair,ods).slice(2,3)', context)).toStrictEqual([6])
		expect(exp.eval('concatenate(pair,ods).page(2,3)', context)).toStrictEqual([1, 3, 5])
		expect(exp.eval('cities.push(salta).name', context)).toStrictEqual(['Buenos Aires', 'Córdoba', 'Rosario', 'Mar del Plata', 'Salta'])
		expect(exp.eval('cities.insert(posadas).name', context)).toStrictEqual(['Buenos Aires', 'Córdoba', 'Rosario', 'Mar del Plata', 'Salta', 'Posadas'])
		expect(exp.eval('cities.pop().name', context)).toStrictEqual('Posadas')
		expect(exp.eval('musicians[0]', context)).toStrictEqual('Charly Garcia')
		expect(exp.eval('musicians[musicians.length()-1]', context)).toStrictEqual('Luiz Alberto Spinetta')
	})
})
