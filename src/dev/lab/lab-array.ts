import { expressions } from '../../lib'

(async () => {
	const context = {
		cities: [
			{ name: 'Buenos Aires', province: 'BA', population: 2890151, coordinates: { lat: 34.36, long: 58.26 } },
			{ name: 'Córdoba', province: 'CB', population: 1317298, coordinates: { lat: 31.42, long: 64.18 } },
			{ name: 'Rosario', province: 'SF', population: 948312, coordinates: { lat: 32.58, long: 60.36 } },
			{ name: 'Mar del Plata', province: 'BA', population: 593337, coordinates: { lat: 38, long: 57.33 } }
		],
		salta: { name: 'Salta', province: 'SA', population: 520683, coordinates: { lat: 24.33, long: 64.30 } },
		posadas: { name: 'Posadas', province: 'MI', population: 275028, coordinates: { lat: 27.22, long: 55.53 } }
	}

	console.log('cities.filter(p=> p.province === "BA").map(p=> p.name).first()' + ' => ' + expressions.eval('cities.filter(p=> p.province === "BA").map(p=> p.name).first()', context))
	console.log('cities.where(p-> p.province == "BA").select( p-> p.name).first()' + ' => ' + expressions.eval('cities.where(p-> p.province == "BA").select( p-> p.name).first()', context))
	console.log('cities.where(p-> p.province == "BA").select( p-> p.name).last()' + ' => ' + expressions.eval('cities.where(p-> p.province == "BA").select( p-> p.name).last()', context))
	console.log('cities.first(p-> p.province === "BA").name' + ' => ' + expressions.eval('cities.first(p-> p.province === "BA").name', context))
	console.log('cities.first(p-> p.province === "BA").coordinates.lat' + ' => ' + expressions.eval('cities.first(p-> p.province === "BA").coordinates.lat', context))
	console.log('cities.first(p-> p.province === "BA").coordinates.x' + ' => ' + expressions.eval('cities.first(p-> p.province === "BA").coordinates.x', context))
	console.log('cities.first(p-> p.province === "BA").x.x' + ' => ' + expressions.eval('cities.first(p-> p.province === "BA").x.x', context))
	console.log('cities.where(p-> p.province <> "BA").len()' + ' => ' + expressions.eval('cities.where(p-> p.province <> "BA").len()', context))
	console.log('cities.where(p-> p.province != "BA").length()' + ' => ' + expressions.eval('cities.where(p-> p.province != "BA").length()', context))
	console.log('cities.each(p=> p.population=round(p.population/1000000,2)).population' + ' => ' + expressions.eval('cities.each(p=> p.population=round(p.population/1000000,2)).population', context))
	console.log('cities.sort(p=> p.name).name' + ' => ' + expressions.eval('cities.sort(p=> p.name).name', context))
	console.log('cities.reverse(p=> p.name).name' + ' => ' + expressions.eval('cities.reverse(p=> p.name).name', context))
	console.log('cities.order(p=> p.name).name' + ' => ' + expressions.eval('cities.order(p=> p.name).name', context))
	console.log('cities.name' + ' => ' + expressions.eval('cities.name', context))
	console.log('cities.select(p=> p.coordinates).select(p=> p.lat)' + ' => ' + expressions.eval('cities.select(p=> p.coordinates).select(p=> p.lat)', context))
	console.log('cities.map(p=> p.coordinates).lat' + ' => ' + expressions.eval('cities.map(p=> p.coordinates).lat', context))
	console.log('cities.coordinates.lat' + ' => ' + expressions.eval('cities.coordinates.lat', context))
	console.log('cities.x' + ' => ' + expressions.eval('cities.x', context))
	console.log('cities.x.x' + ' => ' + expressions.eval('cities.x.x', context))
	console.log('cities.delete(p-> p.province === "BA").name' + ' => ' + expressions.eval('cities.delete(p-> p.province === "BA").name', context))
	console.log('cities.remove(p-> p.province === "BA").name' + ' => ' + expressions.eval('cities.remove(p-> p.province === "BA").name', context))
	console.log('cities.push(salta).name' + ' => ' + expressions.eval('cities.push(salta).name', context))
	console.log('cities.insert(posadas).name' + ' => ' + expressions.eval('cities.insert(posadas).name', context))
	console.log('cities.pop().name' + ' => ' + expressions.eval('cities.pop().name', context))
})()
