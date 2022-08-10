import { expressions as exp } from '../../lib'

export function show (list:string[], context:any) {
	const tests = []
	const examples = []
	for (const expression of list) {
		try {
			const result = exp.eval(expression, context)
			let expect:any
			let testCompare = 'toBe'
			if (typeof result === 'string') {
				expect = `'${result}'`
			} else if (Array.isArray(result)) {
				testCompare = 'toStrictEqual'
				if (result.length === 0) {
					expect = '[]'
				} else {
					if (typeof result[0] === 'string') {
						expect = '[' + result.map(p => `'${p}'`).join(',') + ']'
					} else {
						expect = '[' + result.join(',') + ']'
					}
				}
			} else if (result === null) {
				expect = 'null'
			} else if (result === undefined) {
				expect = 'undefined'
			} else {
				expect = result
			}
			examples.push(`|${expression}|${expect}|`)
			tests.push(`expect(${expect}).${testCompare}(expressions.eval('${expression}',context))`)
		} catch (error) {
			console.log(`exp: ${expression} error: ${error}`)
		}
	}
	console.log(examples.join('\n'))
	console.log(tests.join('\n'))
}
