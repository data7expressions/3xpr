// import { helper, expressions as exp } from '../../lib'

// (async () => {
// const file = './data/countries.json'
// const content = await helper.fs.read(file)
// if (content === null) {
// console.error(`cannot read file ${file}`)
// return
// }
// const context = JSON.parse(content)
// const list = [
// '.[0].name',
// '.[0].states',
// '.[0].states.filter(p=>p.name === "Badghis")',
// '.name',
// '.states',
// '.states.filter(p=>p.name === "Badghis")',
// '.states.name',
// '.states.name.filter(p=> substring(p,0,1)=="A")',
// '.filter(p=>p.name === "Afghanistan")',
// '.[0].states.count()',
// '.[0].states.count(p=> startWith(p.name,"B"))',
// '.states.max(p=> p.name)',
// '.states.min(p=> p.name)',
// '.states.sum(p=> toNumber(p.latitude))',
// '.states.avg(p=> toNumber(p.latitude))',
// '.states.filter(p=> startWith(p.name,"B")).sum(p=> toNumber(p.latitude))'
// ]

// await HelperTest.buildSuite({ name: 'file-countries', context: context, expressions: list })
// })()
