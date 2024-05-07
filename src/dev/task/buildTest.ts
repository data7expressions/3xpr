/* eslint-disable no-template-curly-in-string */
import { h3lp } from 'h3lp'
import path from 'path'

const template = {
	header:
`/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'
`,
	cases: [{
		name: 'lab',
		template: '\t\texpect(exp.eval(${test}, context)).toStrictEqual(${result})\n'
	}]
}

const templateParameter = {
	header:
`/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'
`,
	cases: [{
		name: 'lab',
		template: '\t\texpect(exp.parameters(${test})).toStrictEqual(${result})\n'
	}]
}

const templateType = {
	header:
`/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'
`,
	cases: [{
		name: 'lab',
		template: '\t\texpect(exp.type(${test})).toStrictEqual(${result})\n'
	}]
}

;(async () => {
	const root = '~/personal/org/data7expressions/expressions-test-suite/tests/v1'
	await h3lp.test
		.createBuilder()
		.add({ source: path.join(root, 'access.json'), template })
		.add({ source: path.join(root, 'arithmetic.json'), template })
		.add({ source: path.join(root, 'array.json'), template })
		.add({ source: path.join(root, 'arrow.json'), template })
		.add({ source: path.join(root, 'assignment.json'), template })
		.add({ source: path.join(root, 'bitwise.json'), template })
		.add({ source: path.join(root, 'comparison.json'), template })
		.add({ source: path.join(root, 'constants.json'), template })
		.add({ source: path.join(root, 'conversion.json'), template })
		.add({ source: path.join(root, 'dateTime.json'), template })
		.add({ source: path.join(root, 'flows.json'), template })
		.add({ source: path.join(root, 'groups.json'), template })
		.add({ source: path.join(root, 'groups.json'), template })
		.add({ source: path.join(root, 'nullable.json'), template })
		.add({ source: path.join(root, 'numeric.json'), template })
		.add({ source: path.join(root, 'parameters.json'), template: templateParameter })
		.add({ source: path.join(root, 'quick.json'), template })
		.add({ source: path.join(root, 'sets.json'), template })
		.add({ source: path.join(root, 'string.json'), template })
		.add({ source: path.join(root, 'type.json'), template: templateType })
		.build('./src/dev/__tests__/auto')
})()
