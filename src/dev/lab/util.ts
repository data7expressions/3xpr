import { expressions } from '../../lib'

export function show (list:string[], context:any) {
	const tests = []
	const examples = []
	for (const exp of list) {
		try {
			const result = expressions.eval(exp, context)
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
			examples.push(`|${exp}|${expect}|`)
			tests.push(`expect(${expect}).${testCompare}(expressions.eval('${exp}',context))`)
		} catch (error) {
			console.log(`exp: ${exp} error: ${error}`)
		}
	}
	console.log(examples.join('\n'))
	console.log(tests.join('\n'))
}
