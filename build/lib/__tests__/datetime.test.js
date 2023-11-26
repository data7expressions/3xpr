"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
describe('DateTime', () => {
    test('functions', () => {
        const context = { a: '2021-09-06T14:39:11.444Z' };
        expect('2021-09-06T14:39:11.444Z').toBe(__1.expressions.eval('dateToString(dateTime(a))', context));
        // expect('14:39:11').toBe(expressions.eval('time(a)', context))
        expect('2021-9-6').toBe(__1.expressions.eval('date(a)', context));
        expect('2021-09-06T14:39:11.444Z').toBe(__1.expressions.eval('dateTime(a)', context));
        expect(2021).toBe(__1.expressions.eval('year(a)', context));
        expect(9).toBe(__1.expressions.eval('month(a)', context));
        expect(6).toBe(__1.expressions.eval('day(a)', context));
        expect(1).toBe(__1.expressions.eval('weekday(a)', context));
        // expect(14).toBe(expressions.eval('hour(a)', context))
        expect(39).toBe(__1.expressions.eval('minute(a)', context));
        expect(11).toBe(__1.expressions.eval('second(a)', context));
        expect(444).toBe(__1.expressions.eval('millisecond(a)', context));
        expect('2023-09-06T14:39:11.444Z').toBe(__1.expressions.eval('addYear(a,2)', context));
        expect('2021-11-06T15:39:11.444Z').toBe(__1.expressions.eval('addMonth(a,2)', context));
        expect('2021-09-08T14:39:11.444Z').toBe(__1.expressions.eval('addDay(a,2)', context));
        expect('2021-09-06T16:39:11.444Z').toBe(__1.expressions.eval('addHour(a,2)', context));
        expect('2021-09-06T14:41:11.444Z').toBe(__1.expressions.eval('addMinute(a,2)', context));
        expect('2021-09-06T14:39:13.444Z').toBe(__1.expressions.eval('addSecond(a,2)', context));
        expect('2021-09-06T14:39:11.446Z').toBe(__1.expressions.eval('addMillisecond(a,2)', context));
        expect('2021-09-06T23:01:23.023Z').toBe(__1.expressions.eval('addTime(a,"08:22:12")', context));
        expect('2021-09-06T06:16:59.059Z').toBe(__1.expressions.eval('subtractTime(a,"08:22:12")', context));
        expect(4).toBe(__1.expressions.eval('dayDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")', context));
        expect(98).toBe(__1.expressions.eval('hourDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")', context));
        expect(353341).toBe(__1.expressions.eval('secondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")', context));
        expect(353341000).toBe(__1.expressions.eval('millisecondDiff("2021-09-06T14:39:11","2021-09-02T12:30:10")', context));
        expect('1975-06-24T00:00:00.000Z').toBe(__1.expressions.eval('dayToDate(2000)', context));
        expect('1970-03-25T08:00:00.000Z').toBe(__1.expressions.eval('hourToDate(2000)', context));
        expect('1970-01-01T00:33:20.000Z').toBe(__1.expressions.eval('secondToDate(2000)', context));
        expect('1970-01-01T00:00:02.000Z').toBe(__1.expressions.eval('millisecondToDate(2000)', context));
    });
});
//# sourceMappingURL=datetime.test.js.map