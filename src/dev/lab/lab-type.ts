/* eslint-disable no-template-curly-in-string */
import { helper, expressions as exp } from '../../lib'
import { templateType } from '../test'

(async () => {
	const test = {
		name: 'type',
		context: { },
		cases: [{
			name: 'lab',
			func: (expression: string) => exp.getType(expression),
			tests: [
				'1 + a',
				'b + a',
				'nvl(a ,1)',
				'nvl(a ,"text")',
				'nvl(a , b * 5 )',
				'a.strCount("o")',
				'[1,2,3].map(p => nvl(a, p))',
				'a = max([1,2,3])',
				'a = max([1,2,3]) > c',
				'd=c.b*2',
				'd=`value of a is: ${a}`',
				'!(a=="1" || b>2)',
				'a = {firstName: "John", lastName: "Lennon", age: 40}',
				'ods.union(prime)',
				'cities.push(salta).name',
				'a = cities.push(salta).name'
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, templateType)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
