import { expressions as exp, Helper } from '../../lib'
// import { Helper } from '../../lib/manager/helper'

const test = async (expression:string) => {
	try {
		const source = '~/develop/js-expressions/countries.json'
		const content = await Helper.readFile(source)
		if (!content) {
			throw Error(`can not read file ${source}`)
		}
		const data = Helper.tryParse(content)
		if (data === null || data === undefined) {
			throw Error(`can not parse content of ${source}`)
		}
		const result = exp.eval(expression, { '.': data })
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	}
}
(async () => {
	await test('.[0].name')
	await test('.[0].states')
	await test('.[0].states.filter(p=>p.name === "Badghis")')
	await test('.name')
	await test('.states')
	await test('.states.filter(p=>p.name === "Badghis")')
	await test('.states.name')
	await test('.states.name.filter(p=> substring(p,0,1)=="A")')
	await test('.filter(p=>p.name === "Afghanistan")')
	await test('.[0].states.count()')
	await test('.[0].states.count(p=> startWith(p.name,"B"))')
	await test('.states.max(p=> p.name)')
	await test('.states.min(p=> p.name)')
	await test('.states.sum(p=> toNumber(p.latitude))')
	await test('.states.avg(p=> toNumber(p.latitude))')
	await test('.states.filter(p=> startWith(p.name,"B")).sum(p=> toNumber(p.latitude))')
})()
