import { expressions } from '../../lib'

describe('Datetime', () => {

	test('functions', () => {
		const context = {a:"2021-09-06T14:39:11.444Z" }
		expect("2021-09-06T14:39:11.444Z").toBe(expressions.eval('dateToString(datetime(a))',context))		
		expect("16:40:11").toBe(expressions.eval('time(a)',context)) 
		expect("2021-9-6").toBe(expressions.eval('date(a)',context))
		expect("2021-09-06T14:39:11.444Z").toBe(expressions.eval('datetime(a)',context))
		expect(2021).toBe(expressions.eval('year(a)',context))
		expect(9).toBe(expressions.eval('month(a)',context))
		expect(6).toBe(expressions.eval('day(a)',context))
		expect(1).toBe(expressions.eval('weekday(a)',context))
		expect(16).toBe(expressions.eval('hour(a)',context))
		expect(39).toBe(expressions.eval('minute(a)',context))
		expect(11).toBe(expressions.eval('second(a)',context))
		expect(444).toBe(expressions.eval('millisecond(a)',context))
		expect("2023-09-06T14:39:11.444Z").toBe(expressions.eval('addYear(a,2)',context))
		expect("2021-11-06T15:39:11.444Z").toBe(expressions.eval('addMonth(a,2)',context))
		expect("2021-09-08T14:39:11.444Z").toBe(expressions.eval('addDay(a,2)',context))
		expect("2021-09-06T16:39:11.444Z").toBe(expressions.eval('addHour(a,2)',context))
		expect("2021-09-06T14:41:11.444Z").toBe(expressions.eval('addMinute(a,2)',context))
		expect("2021-09-06T14:39:13.444Z").toBe(expressions.eval('addSecond(a,2)',context))
		expect("2021-09-06T14:39:11.446Z").toBe(expressions.eval('addMillisecond(a,2)',context))
		expect("2021-09-06T23:01:23.023Z").toBe(expressions.eval('addTime(a,"08:22:12")',context))
		expect("2021-09-06T06:16:59.059Z").toBe(expressions.eval('subtractTime(a,"08:22:12")',context))
		expect(4).toBe(expressions.eval('dayDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',context))
		expect(98).toBe(expressions.eval('hourDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',context))
		expect(353341).toBe(expressions.eval('secondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',context))
		expect(353341000).toBe(expressions.eval('millisecondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',context))
		expect("1975-06-24T00:00:00.000Z").toBe(expressions.eval('dayToDate(2000)',context))
		expect("1970-03-25T08:00:00.000Z").toBe(expressions.eval('hourToDate(2000)',context))
		expect("1970-01-01T00:33:20.000Z").toBe(expressions.eval('secondToDate(2000)',context))
		expect("1970-01-01T00:00:02.000Z").toBe(expressions.eval('millisecondToDate(2000)',context))		
	})

	test('labs', () => {	
		const context = {}
		// expect('2022-8-9').toBe(expressions.eval('today()',context))
		// expect('2022-08-08T23:37:20.490Z').toBe(expressions.eval('now()',context))
		// expect('1:38:20').toBe(expressions.eval('curTime()',context))
		expect('16:40:11').toBe(expressions.eval('time("2021-09-06T14:39:11.444Z")',context))
		expect('2021-9-6').toBe(expressions.eval('date("2021-09-06T14:39:11.444Z")',context))
		expect('2021-09-06T14:39:11.444Z').toBe(expressions.eval('datetime("2021-09-06T14:39:11.444Z")',context))
		expect('2021-09-06T14:39:11.444Z').toBe(expressions.eval('dateToString(datetime("2021-09-06T14:39:11.444Z"))',context))
		expect(2021).toBe(expressions.eval('year("2021-09-06T14:39:11.444Z")',context))
		expect(9).toBe(expressions.eval('month("2021-09-06T14:39:11.444Z")',context))
		expect(6).toBe(expressions.eval('day("2021-09-06T14:39:11.444Z")',context))
		expect(1).toBe(expressions.eval('weekday("2021-09-06T14:39:11.444Z")',context))
		expect(16).toBe(expressions.eval('hour("2021-09-06T14:39:11.444Z")',context))
		expect(39).toBe(expressions.eval('minute("2021-09-06T14:39:11.444Z")',context))
		expect(11).toBe(expressions.eval('second("2021-09-06T14:39:11.444Z")',context))
		expect(444).toBe(expressions.eval('millisecond("2021-09-06T14:39:11.444Z")',context))
		expect('2023-09-06T14:39:11.444Z').toBe(expressions.eval('addYear("2021-09-06T14:39:11.444Z",2)',context))
		expect('2021-11-06T15:39:11.444Z').toBe(expressions.eval('addMonth("2021-09-06T14:39:11.444Z",2)',context))
		expect('2021-09-08T14:39:11.444Z').toBe(expressions.eval('addDay("2021-09-06T14:39:11.444Z",2)',context))
		expect('2021-09-06T16:39:11.444Z').toBe(expressions.eval('addHour("2021-09-06T14:39:11.444Z",2)',context))
		expect('2021-09-06T14:41:11.444Z').toBe(expressions.eval('addMinute("2021-09-06T14:39:11.444Z",2)',context))
		expect('2021-09-06T14:39:13.444Z').toBe(expressions.eval('addSecond("2021-09-06T14:39:11.444Z",2)',context))
		expect('2021-09-06T14:39:11.446Z').toBe(expressions.eval('addMillisecond("2021-09-06T14:39:11.444Z",2)',context))
		expect('2021-09-06T23:01:23.023Z').toBe(expressions.eval('addTime("2021-09-06T14:39:11.444Z","08:22:12")',context))
		expect('2021-09-06T06:16:59.059Z').toBe(expressions.eval('subtractTime("2021-09-06T14:39:11.444Z","08:22:12")',context))
		expect(4).toBe(expressions.eval('dayDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',context))
		expect(98).toBe(expressions.eval('hourDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',context))
		expect(353341).toBe(expressions.eval('secondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',context))
		expect(353341000).toBe(expressions.eval('millisecondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")',context))
		expect('1975-06-24T00:00:00.000Z').toBe(expressions.eval('dayToDate(2000)',context))
		expect('1970-03-25T08:00:00.000Z').toBe(expressions.eval('hourToDate(2000)',context))
		expect('1970-01-01T00:33:20.000Z').toBe(expressions.eval('secondToDate(2000)',context))
		expect('1970-01-01T00:00:02.000Z').toBe(expressions.eval('millisecondToDate(2000)',context))
	})
})