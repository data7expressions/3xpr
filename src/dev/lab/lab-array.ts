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
		'in("San Luis",cities.name)',
		'cities.select(p=> p.coordinates).select(p=> p.lat)',
		'cities.map(p=> p.coordinates).lat',
		'cities.map(p=>[p.coordinates.lat,p.coordinates.long])',
		'cities.distinct(p=> p.province)',
		'cities.coordinates.lat',
		'cities.x',
		'cities.x.x',
		'cities.delete(p-> p.province === "BA").name',
		'cities.remove(p-> p.province === "BA").name',
		'cities.push(salta).name',
		'cities.insert(posadas).name',
		'cities.pop().name',
		'musicians[0]',
		'musicians[3]',
		'musicians[musicians.length()-1]'
	]

	// await test('cities.map(p=>[p.customer.firstName,p.customer.lastName])', file)
	show(list, context)

	const context2 = {
		orders: [
			{
				number: '20001',
				customer: { firstName: 'John', lastName: 'Murphy' },
				orderTime: '2022-07-30T10:15:54',
				details: [
					{ article: 'Pear', unitPrice: 1.78, qty: 2 },
					{ article: 'Banana', unitPrice: 1.99, qty: 1 },
					{ article: 'White grape', unitPrice: 2.03, qty: 1 }
				]
			},
			{
				number: '20002',
				customer: { firstName: 'Paul', lastName: 'Smith' },
				orderTime: '2022-07-30T12:12:43',
				details: [
					{ article: 'Apple', unitPrice: 2.15, qty: 1 },
					{ article: 'Banana', unitPrice: 1.99, qty: 2 },
					{ article: 'Pear', unitPrice: 1.78, qty: 1 }
				]
			}
		]
	}

	const groups = [
		'orders.min(p=> p.number)',
		'orders.details.min(p=> p.article )',
		'orders.details.max(p=> p.unitPrice * p.qty )',
		'orders.details.avg(p=> p.unitPrice * p.qty )',
		'orders[1].details.sum(p=> p.unitPrice * p.qty )',
		'orders.details.count(p=> p.unitPrice * p.qty < 3 )',
		'orders.details.first(p=> p.unitPrice * p.qty < 3 ).article',
		'orders.details.last(p=> p.unitPrice * p.qty < 3 ).article',
		'orders.details.first(p=> p.unitPrice * p.qty < 3 )',
		'orders.each(p=>p.total=p.details.sum(q=>q.qty*q.unitPrice)).map(p=>{nro:p.number,total:p.total})',
		'orders.details.foreach(p=>total=p.qty*p.unitPrice).total',
		'orders.details.filter(p=>p.article=="Banana").foreach(p=>total=p.qty*p.unitPrice).total',
		'orders.details.distinct(p=>p.article)',
		'orders.details.distinct(p=>{article:p.article,qty:p.qty})',
		'orders.details.map(p=>{article:p.article,count:count(1),total:sum(p.qty * p.unitPrice)})',
		'{total:orders[0].details.sum(p=>p.qty * p.unitPrice)}',
		'orders.map(p=>{nro:p.number,total:p.details.sum(q=>q.qty * q.unitPrice)})'
	]
	show(groups, context2)
})()
