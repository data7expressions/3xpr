import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'datetime',
		context: {},
		cases: [{
			name: 'lab',
			func: (expression: any, context: any) => exp.eval(expression, context),
			tests: [
				'today()',
				'now()',
				'curTime()',
				'time("2021-09-06T14:39:11.444Z")',
				'date("2021-09-06T14:39:11.444Z")',
				'datetime("2021-09-06T14:39:11.444Z")',
				'year("2021-09-06T14:39:11.444Z")',
				'month("2021-09-06T14:39:11.444Z")',
				'day("2021-09-06T14:39:11.444Z")',
				'weekday("2021-09-06T14:39:11.444Z")',
				'hour("2021-09-06T14:39:11.444Z")',
				'minute("2021-09-06T14:39:11.444Z")',
				'second("2021-09-06T14:39:11.444Z")',
				'millisecond("2021-09-06T14:39:11.444Z")',
				'addYear("2021-09-06T14:39:11.444Z",2)',
				'addMonth("2021-09-06T14:39:11.444Z",2)',
				'addDay("2021-09-06T14:39:11.444Z",2)',
				'addHour("2021-09-06T14:39:11.444Z",2)',
				'addMinute("2021-09-06T14:39:11.444Z",2)',
				'addSecond("2021-09-06T14:39:11.444Z",2)',
				'addMillisecond("2021-09-06T14:39:11.444Z",2)',
				'addTime("2021-09-06T14:39:11.444Z","08:22:12")',
				'subtractTime("2021-09-06T14:39:11.444Z","08:22:12")',
				'dayDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',
				'hourDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',
				'secondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',
				'millisecondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',
				'dayToDate(2000)',
				'hourToDate(2000)',
				'secondToDate(2000)',
				'millisecondToDate(2000)'
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
