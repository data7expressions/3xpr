import { test } from './util'

(async () => {
	const file = './data/countries.json'
	await test('.[0].name', file)
	await test('.[0].states', file)
	await test('.[0].states.filter(p=>p.name === "Badghis")', file)
	await test('.name', file)
	await test('.states', file)
	await test('.states.filter(p=>p.name === "Badghis")', file)
	await test('.states.name', file)
	await test('.states.name.filter(p=> substring(p,0,1)=="A")', file)
	await test('.filter(p=>p.name === "Afghanistan")', file)
	await test('.[0].states.count()', file)
	await test('.[0].states.count(p=> startWith(p.name,"B"))', file)
	await test('.states.max(p=> p.name)', file)
	await test('.states.min(p=> p.name)', file)
	await test('.states.sum(p=> toNumber(p.latitude))', file)
	await test('.states.avg(p=> toNumber(p.latitude))', file)
	await test('.states.filter(p=> startWith(p.name,"B")).sum(p=> toNumber(p.latitude))', file)
})()
