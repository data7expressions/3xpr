import { expressions } from '../../lib'
// import { Helper } from '../../lib/manager/helper'

(async () => {
	// const data: any = {}
	// const testPath = 'src/test/__tests__/test'
	// const expression = await Helper.readFile(testPath + '/forIn-01.js') as string
	// expressions.eval(expression, data)
	// const data = { name: 'La casa de PAPEL' }
	// const result = expressions.eval('lower(substring(replace(name," ","-"),0,32))', data)

	console.log(expressions.eval('today()', {}))
	console.log(expressions.eval('now()', {}))
	console.log(expressions.eval('curtime()', {}))

	console.log(expressions.eval('addHours(today(),8)', {}))
	console.log(expressions.eval('addTime(today(),"08:22:12")', {}))

	console.log(expressions.eval('test("5","[a-zA-Z0-9_.]+$")', {}))
	console.log(expressions.eval('test("%","[a-zA-Z0-9_.]+$")', {}))
	console.log(expressions.eval('match("¡Por favor, sí\nhazme el día!","sí.*día")', {}))
	console.log(expressions.eval('match("¡Por favor, sí\nhazme el día!","sí[^]*día")', {}))

	console.log(JSON.stringify(expressions.parameters('(1+b/c)*b')))
})()
