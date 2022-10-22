import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'arrow',
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
				'cities.where(p-> p.province <> "BA").len()',
				'cities.where(p-> p.province != "BA").length()',
				// 'cities.each(p=> p.population=round(p.population/1000000,2)).population',
				'pair.foreach(p=>b=b+p)',
				'pair.filter(p=> p<5).foreach(p => b=b+p)',
				'cities.sort(p=> p.name).name',
				'cities.reverse(p=> p.name).name',
				'ods.filter(p=> p>1 && p<5).reverse()',
				'ods.filter(p=> p>1 && p<5).map(p=> p*2).reverse()',
				'cities.order(p=> p.name).name',
				'cities.name',
				'cities.select(p=> p.coordinates).select(p=> p.lat)',
				'cities.map(p=> p.coordinates).lat',
				'cities.map(p=>[p.coordinates.lat,p.coordinates.long])',
				'cities.distinct(p=> p.province)',
				'cities.coordinates.lat',
				'cities.x',
				'cities.x.x',
				'cities.delete(p-> p.province === "BA").name',
				'cities.remove(p-> p.province === "BA").name'
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
