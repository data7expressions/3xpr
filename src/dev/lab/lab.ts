import { expressions } from '../../lib'
// import { Helper } from '../../lib/manager/helper'

(async () => {
	// const data: any = {}
	// const testPath = 'src/test/__tests__/test'
	// const expression = await Helper.readFile(testPath + '/forIn-01.js') as string
	// expressions.eval(expression, data)
	const data = { a: [1, 2, 3], b: 0, c: 0 }
	expressions.eval('c=a.length()', data)
	console.log(data.c)
})()
