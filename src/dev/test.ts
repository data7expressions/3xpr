/* eslint-disable no-template-curly-in-string */
import { expressions as exp, exprHelper } from '../lib'

export const template = {
	template: '/* eslint-disable no-template-curly-in-string */\nimport { expressions as exp } from \'../../../lib\'\ndescribe(\'${name}\', () => {\n\tconst context = JSON.parse(\'${context}\')\n${cases}})\n',
	cases: [{
		name: 'lab',
		template: '\t\texpect(exp.eval(${test}, context)).toStrictEqual(${result})\n'
	}]
}

export const templateParameter = {
	template: '/* eslint-disable no-template-curly-in-string */\nimport { expressions as exp } from \'../../../lib\'\ndescribe(\'${name}\', () => {\n\tconst context = JSON.parse(\'${context}\')\n${cases}})\n',
	cases: [{
		name: 'lab',
		template: '\t\texpect(exp.parameters(${test})).toStrictEqual(${result})\n'
	}]
}

export const templateType = {
	template: '/* eslint-disable no-template-curly-in-string */\nimport { expressions as exp } from \'../../../lib\'\ndescribe(\'${name}\', () => {\n\tconst context = JSON.parse(\'${context}\')\n${cases}})\n',
	cases: [{
		name: 'lab',
		template: '\t\texpect(exp.type(${test})).toStrictEqual(${result})\n'
	}]
}

interface TestCase {
	expression:string
	result:any
}

interface TestSuite {
	name:string
	method: string
	context:any
	cases:TestCase[]
}

interface TestSuiteRequest {
	name:string
	context?:any
	method?:string
	func?:(expression: string, context?: any)=>any
	expressions: string[]
}

export class HelperTest {
	public static async buildSuite (request: TestSuiteRequest):Promise<void> {
		const func = request.func || ((expression:string, context:any) => exp.eval(expression, context))
		const context = request.context || {}
		const suite: TestSuite = { name: request.name, method: request.method || 'eval', context, cases: [] }
		for (const expression of request.expressions) {
			try {
				const result = func(expression, context)
				suite.cases.push({ expression, result })
			} catch (error:any) {
				console.log(error.stack)
				console.log(`exp: ${expression} error: ${error}`)
			}
		}
		await exprHelper.fs.write(`./src/dev/tests/${request.name}.json`, JSON.stringify(suite, null, 2))
	}

	public static show (list:string[], context:any, method = 'eval', func:(expression:string, context?:any)=> any = (expression:string, context:any) => exp.eval(expression, context)) {
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
					tests.push(`expect(${expect}).${testCompare}(expressions.${method}(\`${expression}\`${method === 'eval' ? ', context' : ''}))`)
					examples.push(`|\`${expression}\`|${expect}|`)
				} else {
					tests.push(`expect(${expect}).${testCompare}(expressions.${method}('${expression}'${method === 'eval' ? ', context' : ''}))`)
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

	public static async test (expression:string, file:string): Promise<void> {
		try {
			const content = await exprHelper.fs.read(file)
			if (!content) {
				throw Error(`can not read file ${file}`)
			}
			const data = exprHelper.utils.tryParse(content)
			if (data === null || data === undefined) {
				throw Error(`can not parse content of ${file}`)
			}
			const result = exp.eval(expression, { '.': data })
			console.log(JSON.stringify(result, null, 2))
		} catch (error:any) {
			console.error(error.stack)
		}
	}
}
