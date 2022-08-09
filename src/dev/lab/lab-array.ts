import { show } from './util'

(async () => {
	const context = {
		cities: [
			{ name: 'Buenos Aires', province: 'BA', population: 2890151, coordinates: { lat: 34.36, long: 58.26 } },
			{ name: 'Córdoba', province: 'CB', population: 1317298, coordinates: { lat: 31.42, long: 64.18 } },
			{ name: 'Rosario', province: 'SF', population: 948312, coordinates: { lat: 32.58, long: 60.36 } },
			{ name: 'Mar del Plata', province: 'BA', population: 593337, coordinates: { lat: 38, long: 57.33 } }
		],
		salta: { name: 'Salta', province: 'SA', population: 520683, coordinates: { lat: 24.33, long: 64.30 } },
		posadas: { name: 'Posadas', province: 'MI', population: 275028, coordinates: { lat: 27.22, long: 55.53 } },
		numbers: [1, 2, 3],
		musicians: ['Charly Garcia', 'Fito Paez', 'Luiz Alberto Spinetta']
	}

	const list = [
		'cities.filter(p=> p.province === "BA").map(p=> p.name).first()',
		'cities.where(p-> p.province == "BA").select( p-> p.name).first()',
		'cities.where(p-> p.province == "BA").select( p-> p.name).last()',
		'cities.first(p-> p.province === "BA").name',
		'cities.first(p-> p.province === "BA").coordinates.lat',
		'cities.first(p-> p.province === "BA").coordinates.x',
		'cities.first(p-> p.province === "BA").x.x',
		'numbers.filter(p=> p>1 && p<5).map(p=> p*2)',
		'numbers.first(p => p%2==0)',
		'numbers.last(p=> p%2==0)',
		'cities.length()',
		'cities.where(p-> p.province <> "BA").len()',
		'cities.where(p-> p.province != "BA").length()',
		'cities.each(p=> p.population=round(p.population/1000000,2)).population',
		'numbers.foreach(p=>b=b+p)',
		'numbers.filter(p=> p<5).foreach(p => b=b+p)',
		'cities.sort(p=> p.name).name',
		'cities.reverse(p=> p.name).name',
		'numbers.filter(p=> p>1 && p<5).reverse()',
		'numbers.filter(p=> p>1 && p<5).map(p=> p*2).reverse()',
		'cities.order(p=> p.name).name',
		'cities.name',
		'cities.select(p=> p.coordinates).select(p=> p.lat)',
		'cities.map(p=> p.coordinates).lat',
		'cities.coordinates.lat',
		'cities.x',
		'cities.x.x',
		'cities.delete(p-> p.province === "BA").name',
		'cities.remove(p-> p.province === "BA").name',
		'cities.push(salta).name',
		'cities.insert(posadas).name',
		'cities.pop().name',
		'musicians[0]',
		'musicians[3]'
	]
	show(list, context)
})()
