import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'array',
		context: {
			cities: [
				{ name: 'Buenos Aires', province: 'BA', population: 2890151, coordinates: { lat: 34.36, long: 58.26 } },
				{ name: 'Córdoba', province: 'CB', population: 1317298, coordinates: { lat: 31.42, long: 64.18 } },
				{ name: 'Rosario', province: 'SF', population: 948312, coordinates: { lat: 32.58, long: 60.36 } },
				{ name: 'Mar del Plata', province: 'BA', population: 593337, coordinates: { lat: 38, long: 57.33 } }
			],
			salta: { name: 'Salta', province: 'SA', population: 520683, coordinates: { lat: 24.33, long: 64.30 } },
			posadas: { name: 'Posadas', province: 'MI', population: 275028, coordinates: { lat: 27.22, long: 55.53 } },
			musicians: ['Charly Garcia', 'Fito Paez', 'Luiz Alberto Spinetta'],
			pair: [2, 4, 6],
			ods: [1, 3, 5]
		},
		cases: [{
			name: 'lab',
			func: (expression: any, context: any) => exp.eval(expression, context),
			tests: [
				'cities.length()',
				'concat(ods,pair)',
				'concatenate(pair,ods).sort()',
				'cities.name',
				'in("San Luis",cities.name)',
				'cities.coordinates.lat',
				'cities.x',
				'cities.x.x',
				'concatenate(pair,ods).slice(2,3)',
				'concatenate(pair,ods).page(2,3)',
				'cities.push(salta).name',
				'cities.insert(posadas).name',
				'cities.pop().name',
				'musicians[0]',
				// 'musicians[3]',
				'musicians[musicians.length()-1]'
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
