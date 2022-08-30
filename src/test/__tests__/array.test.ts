import { expressions } from '../../lib'

describe('Array', () => {

	test('children', () => {
		let data: any = { "a": [1, 2, 3], "b": 0 }
		expressions.eval('a.push(b)', data)
		expect([1, 2, 3, 0]).toEqual(data.a)

		data = { "a": [1, 2, 3], "b": 0 }
		expressions.eval('c=a.pop()', data)
		expect(3).toBe(data.c)
		expect([1, 2]).toEqual(data.a)

		data = { "a": [1, 2, 3], "b": 0 }
		expressions.eval('c=a.length()', data)
		expect(3).toBe(data.c)
		expect([1, 2, 3]).toEqual(data.a)
	})


	test('arrow', () => {
		let data: any = { "a": [1, 2, 3], "b": 0 }
		expressions.eval('a.foreach(p=>b=b+p)', data)
		expect(6).toBe(data['b'])
		data = { "a": [1, 2, 3, 4, 5], "b": 0 }
		expressions.eval('a.filter(p=> p<5).foreach(p => b=b+p)', data)
		expect(10).toBe(data['b'],)
		data = { "a": [1, 2, 3, 4, 5], "b": 0 }
		expect(2).toBe(expressions.eval('a.first(p => p%2==0)', data))
		data = { "a": [1, 2, 3, 4, 5], "b": 0 }
		expect(4).toBe(expressions.eval('a.last(p=> p%2==0)', data))
		data = { "a": [1, 2, 3, 4, 5], "b": 0 }
		expect([4, 6, 8]).toEqual(expressions.eval('a.filter(p=> p>1 && p<5).map(p=> p*2)', data))
		data = { "a": [1, 2, 3, 4, 5], "b": 0 }
		expect([4, 3, 2]).toEqual(expressions.eval('a.filter(p=> p>1 && p<5).reverse()', data))
		data = { "a": [1, 2, 3, 4, 5], "b": 0 }
		expect([8, 6, 4]).toEqual(expressions.eval('a.filter(p=> p>1 && p<5).map(p=> p*2).reverse()', data))
	})

	test('labs', () => {
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
		expect(4).toBe(expressions.eval('cities.length()',context))
		expect(2).toBe(expressions.eval('cities.where(p-> p.province <> "BA").len()',context))
		expect(2).toBe(expressions.eval('cities.where(p-> p.province != "BA").length()',context))
		expect([2.9,1.3,0.95,0.6]).toStrictEqual(expressions.eval('cities.each(p=> p.population=round(p.population/1000000,2)).population',context))
		expect([1,2,3]).toStrictEqual(expressions.eval('numbers.foreach(p=>b=b+p)',context))
		expect([1,2,3]).toStrictEqual(expressions.eval('numbers.filter(p=> p<5).foreach(p => b=b+p)',context))
		expect(['Buenos Aires','Córdoba','Mar del Plata','Rosario']).toStrictEqual(expressions.eval('cities.sort(p=> p.name).name',context))
		expect(['Rosario','Mar del Plata','Córdoba','Buenos Aires']).toStrictEqual(expressions.eval('cities.reverse(p=> p.name).name',context))
		expect([3,2]).toStrictEqual(expressions.eval('numbers.filter(p=> p>1 && p<5).reverse()',context))
		expect([6,4]).toStrictEqual(expressions.eval('numbers.filter(p=> p>1 && p<5).map(p=> p*2).reverse()',context))
		expect(['Buenos Aires','Córdoba','Mar del Plata','Rosario']).toStrictEqual(expressions.eval('cities.order(p=> p.name).name',context))
		expect(['Buenos Aires','Córdoba','Rosario','Mar del Plata']).toStrictEqual(expressions.eval('cities.name',context))
		expect(false).toBe(expressions.eval('in("San Luis",cities.name)',context))
		expect([34.36,31.42,32.58,38]).toStrictEqual(expressions.eval('cities.select(p=> p.coordinates).select(p=> p.lat)',context))
		expect([34.36,31.42,32.58,38]).toStrictEqual(expressions.eval('cities.map(p=> p.coordinates).lat',context))
		expect([[34.36,58.26],[31.42,64.18],[32.58,60.36],[38,57.33]]).toStrictEqual(expressions.eval('cities.map(p=>[p.coordinates.lat,p.coordinates.long])',context))
		expect(['BA','CB','SF']).toStrictEqual(expressions.eval('cities.distinct(p=> p.province)',context))
		expect([34.36,31.42,32.58,38]).toStrictEqual(expressions.eval('cities.coordinates.lat',context))
		expect([]).toStrictEqual(expressions.eval('cities.x',context))
		expect([]).toStrictEqual(expressions.eval('cities.x.x',context))
		expect(['Córdoba','Rosario']).toStrictEqual(expressions.eval('cities.delete(p-> p.province === "BA").name',context))
		expect(['Córdoba','Rosario']).toStrictEqual(expressions.eval('cities.remove(p-> p.province === "BA").name',context))
		expect(['Buenos Aires','Córdoba','Rosario','Mar del Plata','Salta']).toStrictEqual(expressions.eval('cities.push(salta).name',context))
		expect(['Buenos Aires','Córdoba','Rosario','Mar del Plata','Salta','Posadas']).toStrictEqual(expressions.eval('cities.insert(posadas).name',context))
		expect('Posadas').toBe(expressions.eval('cities.pop().name',context))
		expect('Charly Garcia').toBe(expressions.eval('musicians[0]',context))
		expect(undefined).toBe(expressions.eval('musicians[3]',context))
		expect('Luiz Alberto Spinetta').toBe(expressions.eval('musicians[musicians.length()-1]',context))
	})

	test('group', () => {
		const context = {
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
		expect('20001').toBe(expressions.eval('orders.min(p=> p.number)',context))
		expect('Apple').toBe(expressions.eval('orders.details.min(p=> p.article )',context))
		expect(3.98).toBe(expressions.eval('orders.details.max(p=> p.unitPrice * p.qty )',context))
		expect(2.5816666666666666).toBe(expressions.eval('orders.details.avg(p=> p.unitPrice * p.qty )',context))
		expect(7.91).toBe(expressions.eval('orders[1].details.sum(p=> p.unitPrice * p.qty )',context))
		expect(4).toBe(expressions.eval('orders.details.count(p=> p.unitPrice * p.qty < 3 )',context))
		expect('Banana').toBe(expressions.eval('orders.details.first(p=> p.unitPrice * p.qty < 3 ).article',context))
		expect('Pear').toBe(expressions.eval('orders.details.last(p=> p.unitPrice * p.qty < 3 ).article',context))
		expect({"article":"Banana","unitPrice":1.99,"qty":1}).toStrictEqual(expressions.eval('orders.details.first(p=> p.unitPrice * p.qty < 3 )',context))
		expect([{"nro":"20001","total":7.58},{"nro":"20002","total":7.91}]).toStrictEqual(expressions.eval('orders.each(p=>p.total=p.details.sum(q=>q.qty*q.unitPrice)).map(p=>{nro:p.number,total:p.total})',context))
		expect([3.56,1.99,2.03,2.15,3.98,1.78]).toStrictEqual(expressions.eval('orders.details.foreach(p=>p.subtotal=p.qty*p.unitPrice).subtotal',context))
		expect(15.49).toBe(expressions.eval('orders.details.foreach(p=>total=nvl(total,0)+p.qty*p.unitPrice);total',context))
		expect([1.99,3.98]).toStrictEqual(expressions.eval('orders.details.filter(p=>p.article=="Banana").foreach(p=>p.total=p.qty*p.unitPrice).total',context))
		expect(['Pear','Banana','White grape','Apple']).toStrictEqual(expressions.eval('orders.details.distinct(p=>p.article)',context))
		expect([{"article":"Pear","qty":2},{"article":"Banana","qty":1},{"article":"White grape","qty":1},{"article":"Apple","qty":1},{"article":"Banana","qty":2},{"article":"Pear","qty":1}]).toStrictEqual(expressions.eval('orders.details.distinct(p=>{article:p.article,qty:p.qty})',context))
		expect([{"article":"Pear","count":2,"total":5.34},{"article":"Banana","count":2,"total":5.97},{"article":"White grape","count":1,"total":2.03},{"article":"Apple","count":1,"total":2.15}]).toStrictEqual(expressions.eval('orders.details.map(p=>{article:p.article,count:count(1),total:sum(p.qty * p.unitPrice)})',context))
		expect({"total":7.58}).toStrictEqual(expressions.eval('{total:orders[0].details.sum(p=>p.qty * p.unitPrice)}',context))
		expect([{"nro":"20001","total":7.58},{"nro":"20002","total":7.91}]).toStrictEqual(expressions.eval('orders.map(p=>{nro:p.number,total:p.details.sum(q=>q.qty * q.unitPrice)})',context))
	})
})	