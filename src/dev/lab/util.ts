import { expressions } from '../../lib'

export function show (list:string[], context:any) {
	const tests = []
	const examples = []
	for (const exp of list) {
		try {
			const result = expressions.eval(exp, context)
			examples.push(`|${exp}|${result}|`)
			const expect = typeof result === 'string' ? `'${result}'` : result
			tests.push(`expect(${expect}).toBe(expressions.eval('${exp}',context))`)
		} catch (error) {
			console.log(`exp: ${exp} error: ${error}`)
		}
	}
	console.log(examples.join('\n'))
	console.log(tests.join('\n'))
}
