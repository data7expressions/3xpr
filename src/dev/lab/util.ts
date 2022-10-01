import { expressions as exp, Helper } from '../../lib'

export function show (list:string[], context:any, func:(expression:string, context?:any)=> any = (expression:string, context:any) => exp.eval(expression, context)) {
	const tests = []
	const examples = []
	for (const expression of list) {
		try {
			const result = func(expression, context)
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
					} else if (typeof result[0] === 'object') {
						expect = JSON.stringify(result)
					} else {
						expect = '[' + result.join(',') + ']'
					}
				}
			} else if (typeof result === 'object') {
				expect = JSON.stringify(result)
			} else if (result === null) {
				expect = 'null'
			} else if (result === undefined) {
				expect = 'undefined'
			} else {
				expect = result
			}
			if (expression.includes('\n')) {
				tests.push(`expect(${expect}).${testCompare}(expressions.eval(\`${expression}\`,context))`)
				examples.push(`|\`${expression}\`|${expect}|`)
			} else {
				tests.push(`expect(${expect}).${testCompare}(expressions.eval('${expression}',context))`)
				examples.push(`|${expression}|${expect}|`)
			}
		} catch (error:any) {
			console.log(error.stack)
			console.log(`exp: ${expression} error: ${error}`)
		}
	}
	console.log(examples.join('\n'))
	console.log(tests.join('\n'))
}

export const test = async (expression:string, file:string) => {
	try {
		const content = await Helper.fs.read(file)
		if (!content) {
			throw Error(`can not read file ${file}`)
		}
		const data = Helper.utils.tryParse(content)
		if (data === null || data === undefined) {
			throw Error(`can not parse content of ${file}`)
		}
		const result = exp.eval(expression, { '.': data })
		console.log(JSON.stringify(result, null, 2))
	} catch (error:any) {
		console.error(error.stack)
	}
}
