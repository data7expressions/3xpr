import { expressions } from '../../lib'
// import { Helper } from '../../lib/manager/helper'

(async () => {
	// String
	// const data: any = {}
	// const testPath = 'src/test/__tests__/test'
	// const expression = await Helper.readFile(testPath + '/forIn-01.js') as string
	// expressions.eval(expression, data)
	// console.log(expressions.eval('lower(substring(replace(name," ","-"),0,32))', { name: 'La casa de PAPEL' }))
	// eslint-disable-next-line no-template-curly-in-string
	// console.log(expressions.eval('`${name} is ${age} years old and likes ${food}`', { name: 'juan', age: 44, food: 'pizza' }))
	// console.log(expressions.eval('stringify(a)', { a: { name: 'juan', age: 44, food: 'pizza' } }))
	// console.log(expressions.eval('obj=parse(a);obj.name', { a: '{"name":"juan","age":44,"food":"pizza"}' }))

	// Datetime labs
	// console.log(expressions.eval('today()', {}))
	// console.log(expressions.eval('now()', {}))
	// console.log(expressions.eval('curtime()', {}))
	// console.log(expressions.eval('addHours(today(),8)', {}))
	// console.log(expressions.eval('addTime(today(),"08:22:12")', {}))
	// console.log(expressions.eval('test("5","[a-zA-Z0-9_.]+$")', {}))
	// console.log(expressions.eval('test("%","[a-zA-Z0-9_.]+$")', {}))
	// console.log(expressions.eval('match("¡Por favor, sí\nhazme el día!","sí.*día")', {}))
	// console.log(expressions.eval('match("¡Por favor, sí\nhazme el día!","sí[^]*día")', {}))

	// console.log(JSON.stringify(expressions.parameters('(1+b/c)*b')))

	// console.log(expressions.eval('type=="phone"?concat(type,"-",imei):concat(type,"-",mac)', { type: 'phone', imei: 'imei', mac: 'mac' }))
	// if
	// console.log(expressions.eval('if(type=="phone"){id=concat(type,"-",imei)}else{id=concat(type,"-",mac)};id;', { type: 'phone', imei: 'imei', mac: 'mac' }))
	// console.log(expressions.eval('if(type=="phone"){concat(type,"-",imei)}else{concat(type,"-",mac)}', { type: 'phone', imei: 'imei', mac: 'mac' }))
	// console.log(expressions.eval('if(type=="phone"){concat(type,"-",imei)}else{concat(type,"-",mac)}', { type: 'computer', imei: 'imei', mac: 'mac' }))
	// console.log(expressions.eval('if(type=="phone"){concat(type,"-",imei)}else if(type=="robot"){concat(type,"-","111")}else{concat(type,"-",mac)}', { type: 'computer', imei: 'imei', mac: 'mac' }))
	// console.log(expressions.eval('if(type=="phone"){concat(type,"-",imei)}else if(type=="robot"){concat(type,"-","111")}else{concat(type,"-",mac)}', { type: 'robot', imei: 'imei', mac: 'mac' }))

	// case
	// console.log(expressions.eval('switch(type){ case "phone": concat(type,"-",imei); case "robot": concat(type,"-","111"); default: concat(type,"-",mac);}', { type: 'phone', imei: 'imei', mac: 'mac' }))
	// console.log(expressions.eval('switch(type){ case "phone": concat(type,"-",imei); case "robot": concat(type,"-","111"); default: concat(type,"-",mac);}', { type: 'computer', imei: 'imei', mac: 'mac' }))
	// console.log(expressions.eval('switch(type){ case "phone": concat(type,"-",imei); case "robot": concat(type,"-","111"); default: concat(type,"-",mac);}', { type: 'robot', imei: 'imei', mac: 'mac' }))
	// console.log(expressions.eval('switch(type){ case "phone": concat(type,"-",imei); case "robot": concat(type,"-","111"); default: concat(type,"-",mac)}', { type: 'computer', imei: 'imei', mac: 'mac' }))
	// console.log(expressions.eval('switch(type){ case "phone": concat(type,"-",imei); case "robot": concat(type,"-","111")}', { type: 'robot', imei: 'imei', mac: 'mac' }))

	console.log(expressions.eval('concat(type,"-",switch(type){case"phone":imei;default: mac;})', { type: 'phone', imei: 'imei', mac: 'mac' }))

	console.log(expressions.eval('in(value,["phone","computer","robot"])', { value: 'phone' }))
	console.log(expressions.eval('in(value,["phone","computer","robot"])', { value: 'other' }))
})()
