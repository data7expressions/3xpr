import { expressions as exp } from '../../lib'
(async () => {
	exp.addFunction('orm.execute(expression:string):any', (expression: string) => {
		return exp.eval(expression)
	})

	const result = exp.eval('orm.execute("1+1")')
	console.log(result)
})()
