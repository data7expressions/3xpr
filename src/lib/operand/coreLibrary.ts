import { Operand, Context, IExpressionConfig } from '../model'
import { Operator, ArrowFunction, ChildFunction, Obj, KeyValue, Variable, List } from '.'
import { expressions as exp, Helper } from '../'
import { ExpressionConfig } from '../parser'

export class CoreLibrary {
	private config:IExpressionConfig
	constructor (config:IExpressionConfig) {
		this.config = config
	}

	public load ():void {
		this.initConstants()
		this.initEnums()
		this.initFormats()
		this.initOperators()
		this.generalFunctions()
		this.comparisonFunctions()
		this.nullFunctions()
		this.numberFunctions()
		this.stringFunctions()
		this.initArrayFunctions()
		this.initArrayGroupFunctions()
		this.dateTimeFunctions()
		this.conversionFunctions()
		this.initSetsFunctions()
	}

	private initConstants (): void {
		this.config.addConstant('true', true)
		this.config.addConstant('false', false)
		this.config.addConstant('null', null)
	}

	private initEnums (): void {
		this.config.addEnum('DayOfWeek', { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 })
	}

	private initFormats (): void {
		this.config.addFormat('email', '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
		this.config.addFormat('integer', '^\\d+$')
		this.config.addFormat('decimal', '^\\d+\\.\\d+$')
		this.config.addFormat('string', '^[a-zA-Z0-9_.]+$')
		// https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
		this.config.addFormat('date', '^\\d{4}-\\d{2}-\\d{2}$')
		this.config.addFormat('datetime', '\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]\\d:[0-5]\\d|Z)')
		this.config.addFormat('time', '\\[0-2]\\d:[0-5]\\d:[0-5]\\d')
	}

	private initOperators (): void {
		this.config.addOperator('+(a:T,b:T):T', (a: any, b: any):any => a + b, 5)
		this.config.addOperator('-(a:number,b:number):number', (a: number, b: number):number => a - b, 5)
		this.config.addOperator('-(a:number):number', (a: number):number => a * -1, 9)
		this.config.addOperator('*(a:number,b:number):number', (a: number, b: number):number => a * b, 6)
		this.config.addOperator('/(a:number,b:number):number', (a: number, b: number):number => a / b, 6)
		this.config.addOperator('**(a:number,b:number):number', (a: number, b: number):number => a ** b, 7)
		this.config.addOperator('//(a:number,b:number):number', (a: number, b: number):number => Math.pow(a, 1 / b), 7)
		this.config.addOperator('%(a:number,b:number):number', (a: number, b: number):number => a % b, 8)

		this.config.addOperator('&(a:number,b:number):number', (a: number, b: number):number => a & b, 5)
		this.config.addOperator('|(a:number,b:number):number', (a: number, b: number):number => a | b, 5)
		this.config.addOperator('^(a:number,b:number):number', (a: number, b: number):number => a ^ b, 5)
		this.config.addOperator('~(a:number):number', (a: number):number => ~a, 9)
		this.config.addOperator('<<(a:number,b:number):number', (a: number, b: number):number => a << b, 5)
		this.config.addOperator('>>(a:number,b:number):number', (a: number, b: number):number => a >> b, 5)

		this.config.addOperator('==(a:T,b:T):boolean', (a: any, b: any):boolean => a === b, 4)
		this.config.addOperator('===(a:T,b:T):boolean', (a: any, b: any):boolean => a === b, 4)
		this.config.addOperator('!=(a:T,b:T):boolean', (a: any, b: any):boolean => a !== b, 4)
		this.config.addOperator('!==(a:T,b:T):boolean', (a: any, b: any):boolean => a !== b, 4)
		this.config.addOperator('<>(a:T,b:T):boolean', (a: any, b: any):boolean => a !== b, 4)
		this.config.addOperator('>(a:T,b:T):boolean', (a: any, b: any):boolean => a > b, 4)
		this.config.addOperator('<(a:T,b:T):boolean', (a: any, b: any):boolean => a < b, 4)
		this.config.addOperator('>=(a:T,b:T):boolean', (a: any, b: any):boolean => a >= b, 4)
		this.config.addOperator('<=(a:T,b:T):boolean', (a: any, b: any):boolean => a <= b, 3)

		this.config.addOperator('&&(a:T,b:T):boolean', And, 3)
		this.config.addOperator('||(a:T,b:T):boolean', Or, 3)
		this.config.addOperator('!(a:boolean):boolean', (a: boolean):boolean => !a, 5)

		this.config.addOperator('[](list:T[],index:integer):T', (list: any[], index: any): any => list[index], 2)
		this.config.addOperator('$(name:string):string', (name:string):any => process.env[name], 9)

		this.config.addOperator('=(a:T,b:T):T', Assignment, 1)
		this.config.addOperator('+=(a:number,b:number):number', AssignmentAddition, 1)
		this.config.addOperator('-=(a:number,b:number):number', AssignmentSubtraction, 1)
		this.config.addOperator('*=(a:number,b:number):number', AssignmentMultiplication, 1)
		this.config.addOperator('/=(a:number,b:number):number', AssignmentDivision, 1)
		this.config.addOperator('**=(a:number,b:number):number', AssignmentExponentiation, 1)
		this.config.addOperator('//=(a:number,b:number):number', AssignmentFloorDivision, 1)
		this.config.addOperator('%=(a:number,b:number):number', AssignmentMod, 1)
		this.config.addOperator('&=(a:number,b:number):number', AssignmentBitAnd, 1)
		this.config.addOperator('|=(a:number,b:number):number', AssignmentBitOr, 1)
		this.config.addOperator('^=(a:number,b:number):number', AssignmentBitXor, 1)
		this.config.addOperator('<<=(a:number,b:number):number', AssignmentLeftShift, 1)
		this.config.addOperator('>>=(a:number,b:number):number', AssignmentRightShift, 1)
	}

	private generalFunctions (): void {
		// this.config.addFunction('async sleep(ms?: number)', Functions.sleep)
		this.config.addFunction('console(value:any)', (value: any) => {
			console.log(typeof value === 'object' ? JSON.stringify(value) : value)
		})
	}

	private comparisonFunctions (): void {
		this.config.addFunction('between(value:any,from:any,to:any):boolean',
			(value:any, from:any, to:any):boolean => Helper.validator.between(value, from, to))
		this.config.addFunction('includes(source:string|any[],value:any):boolean',
			(source:string|any[], value:any):boolean => source && value ? source.includes(value) : false)
		this.config.addAlias('in', 'includes')
		this.config.addFunction('isNull(value:any):boolean', (value:any):boolean => Helper.validator.isNull(value))
		this.config.addFunction('isNotNull(value:any):boolean', (value:any):boolean => Helper.validator.isNotNull(value))
		this.config.addFunction('isEmpty(value:string):boolean', (value:any):boolean => Helper.validator.isEmpty(value))
		this.config.addFunction('isNotEmpty(value:string):boolean', (value:any):boolean => Helper.validator.isNotEmpty(value))
		this.config.addFunction('isBoolean(value:any):boolean', (value:any):boolean => Helper.validator.isBoolean(value))
		this.config.addFunction('isNumber(value:any):boolean', (value:any):boolean => Helper.validator.isNumber(value))
		this.config.addFunction('isInteger(value:any):boolean', (value:any):boolean => Helper.validator.isInteger(value))
		this.config.addFunction('isDecimal(value:any):boolean', (value:any):boolean => Helper.validator.isDecimal(value))
		this.config.addFunction('isString(value:any):boolean', (value:any):boolean => Helper.validator.isString(value))
		this.config.addFunction('isDate(value:any):boolean', (value:any):boolean => Helper.validator.isDate(value))
		this.config.addFunction('isDatetime(value:any):boolean', (value:any):boolean => Helper.validator.isDateTime(value))
		this.config.addFunction('isTime(value:any):boolean', (value:any):boolean => Helper.validator.isTime(value))
		this.config.addFunction('isObject(value:any):boolean', (value:any):boolean => Helper.validator.isObject(value))
		this.config.addFunction('isArray(value:any):boolean', (value:any):boolean => Helper.validator.isArray(value))
		this.config.addFunction('isBooleanFormat(value:string):boolean', (value:string):boolean => Helper.validator.isBooleanFormat(value))
		this.config.addFunction('isNumberFormat(value:string):boolean', (value:string):boolean => Helper.validator.isNumberFormat(value))
		this.config.addFunction('isIntegerFormat(value:string):boolean', (value:string):boolean => Helper.validator.isIntegerFormat(value))
		this.config.addFunction('isDecimalFormat(value:string):boolean', (value:string):boolean => Helper.validator.isDecimalFormat(value))
		this.config.addFunction('isDateFormat(value:string):boolean', (value:string):boolean => Helper.validator.isDateFormat(value))
		this.config.addFunction('isDatetimeFormat(value:string):boolean', (value:string):boolean => Helper.validator.isDateTimeFormat(value))
		this.config.addFunction('isTimeFormat(value:string):boolean', (value:string):boolean => Helper.validator.isTimeFormat(value))
	}

	private nullFunctions (): void {
		this.config.addFunction('nvl(value:T, default:T):T', (value:any, _default:any):any => Helper.utils.nvl(value, _default))
		this.config.addFunction('nvl2(value:any, a:T,b:T):T', (value:any, a:any, b:any):any => Helper.utils.nvl2(value, a, b))
	}

	private numberFunctions (): void {
		this.config.addFunction('abs(x:number):number', Math.abs)
		this.config.addFunction('acos(x:number):number', Math.acos)
		this.config.addFunction('asin(x:number):number', Math.asin)
		this.config.addFunction('atan(x:number):number', Math.atan)
		this.config.addFunction('atan2(x:number):number', Math.atan2)
		this.config.addFunction('ceil(x:number):number', Math.ceil)
		this.config.addFunction('cos(x:number):number', Math.cos)
		this.config.addFunction('cosh(x:number):number', Math.cosh)
		this.config.addFunction('exp(x:number):number', Math.exp)
		this.config.addFunction('floor(x:number):number', Math.floor)
		this.config.addFunction('ln(x:number):number', Math.log)
		this.config.addFunction('log10(x:number):number', Math.log10)
		this.config.addFunction('log(x:number):number', Math.log)
		this.config.addFunction('remainder(n1:number,n2:number):number', (n1: number, n2: number) => n1 % n2)
		this.config.addFunction('round(num:number,decimals=0):number', (num: number, decimals = 0) =>
			decimals > 0 ? Number(num.toFixed(decimals)) : Math.round(num)
		)
		this.config.addFunction('sign(x:number):number', Math.sign)
		this.config.addFunction('sin(x:number):number', Math.sin)
		this.config.addFunction('sinh(x:number):number', Math.sinh)
		this.config.addFunction('tan(x:number):number', Math.tan)
		this.config.addFunction('tanh(x:number):number', Math.tanh)
		this.config.addFunction('trunc(x:number):number', Math.trunc)
	}

	private conversionFunctions (): void {
		this.config.addFunction('toString(value:any):string', (value:any):string => Helper.string.toString(value))
		this.config.addFunction('toNumber(value:any):number', (value:any):number => Helper.utils.toNumber(value))
		this.config.addFunction('dateToString(date:date):string', (date:Date) => {
			if (typeof date === 'string') {
				return new Date(date).toISOString()
			}
			return date.toISOString()
		})
		this.config.addFunction('stringify(value:any):string', (value: any): string => JSON.stringify(value))
		this.config.addFunction('parse(value:string):any', (value: string): any => JSON.parse(value))
		this.config.addFunction('keys(obj: any):string[]', (obj: any): string[] => typeof obj === 'object' ? Object.keys(obj) : [])
		this.config.addFunction('values(obj: any):any[]', (obj: any): any[] => typeof obj === 'object' ? Object.values(obj) : [])
		this.config.addFunction('entries(obj: any):[string,any][]', (obj: any): [string, any][] => typeof obj === 'object' ? Object.entries(obj) : [])
		this.config.addFunction('fromEntries(entries: [string,any][]): any', (entries: [string, any][]): any => Helper.obj.fromEntries(entries))
	}

	private stringFunctions (): void {
		this.config.addFunction('chr(ascii: number):string ', (ascii: number):string => String.fromCharCode(ascii))
		this.config.addFunction('capitalize(str:string):string', (str:string):string => Helper.string.capitalize(str))
		this.config.addFunction('initcap(str:string):string', (str:string):string => Helper.string.initCap(str))
		this.config.addFunction('strCount(source: string, value: string):number', (source: string, value: string):number => source.split(value).length - 1)
		this.config.addFunction('lower(str: string):string', (str: string):string => str.toLowerCase())
		this.config.addFunction('lpad(str: string, len: number, pad: string):string ', (str: string, len: number, pad: string):string => str.padStart(len, pad))
		this.config.addFunction('ltrim(str: string):string ', (str: string):string => str.trimLeft())
		this.config.addFunction('replace(str: string, source: string, target: string):string ', (str: string, source: string, target: string):string => Helper.string.replace(str, source, target))
		this.config.addFunction('rpad(str: string, len: number, pad: string):string ', (str: string, len: number, pad: string):string => str.padEnd(len, pad))
		this.config.addFunction('rtrim(str: string):string ', (str: string):string => str.trimRight())
		this.config.addFunction('substring(str: string, from: number, count: number):string ', (str: string, from: number, count: number):string => str.substring(from, count))
		this.config.addAlias('substr', 'substring')
		this.config.addFunction('trim(str: string):string', (str: string):string => str.trim())
		this.config.addFunction('upper(str: string):string', (str: string):string => str.toUpperCase())
		this.config.addFunction('concat(...values:any):string', (...values:any):string => Helper.string.concat(values))
		this.config.addAlias('concatenate', 'concat')
		this.config.addFunction('test(value: any, regexp: string):boolean', (value: any, regexp: string):boolean => {
			const _regexp = new RegExp(regexp)
			return _regexp.test(value)
		})
		this.config.addFunction('match(value: string, regexp: string):any', (value: string, regexp: string):any => {
			return value ? value.match(regexp) : null
		})
		this.config.addFunction('mask(value: string):string', (value: string):string => {
			if (!value) return value
			if (value.length > 8) {
				return value.substring(0, 3) + '*****' + value.substring(value.length - 3, value.length)
			} else if (value.length > 5) {
				return value.substring(0, 1) + '*****' + value.substring(value.length - 1, value.length)
			} else {
				return '*'
			}
		})
		this.config.addFunction('startWith(value:string, stringSearched:string, position:number):boolean', (value:string, stringSearched:string, position:number):boolean => value.startsWith(stringSearched, position))
	}

	private dateTimeFunctions (): void {
		this.config.addFunction('curTime():time', ():string => {
			const date = new Date()
			return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds()
		})
		this.config.addFunction('today():date', ():string => {
			const date = new Date()
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
		})
		this.config.addFunction('now():dateTime', ():string => new Date().toISOString())
		this.config.addFunction('time(value: string):time', (value: string):string => {
			const date = new Date(value)
			return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds()
		})
		this.config.addFunction('date(value: string):date', (value: string):string => {
			const date = new Date(value)
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
		})
		this.config.addFunction('datetime(value: string):dateTime', (value: string):string => new Date(value).toISOString())
		this.config.addFunction('year(value: dateTime):integer', (value: string):number => {
			return new Date(value).getFullYear()
		})
		this.config.addFunction('month(value: dateTime):integer', (value: string):number => {
			return new Date(value).getMonth() + 1
		})
		this.config.addFunction('day(value: dateTime):integer', (value: string):number => {
			return new Date(value).getDate()
		})
		this.config.addFunction('weekday(value: dateTime):integer', (value: string):number => {
			return new Date(value).getDay()
		})
		this.config.addFunction('hour(value: dateTime):integer', (value: string) => {
			return new Date(value).getHours()
		})
		this.config.addFunction('minute(value: dateTime):integer', (value: string):number => {
			return new Date(value).getMinutes()
		})
		this.config.addFunction('second(value: dateTime):integer', (value: string):number => {
			return new Date(value).getSeconds()
		})
		this.config.addFunction('millisecond(value: dateTime):integer', (value: string):number => {
			return new Date(value).getMilliseconds()
		})
		this.config.addFunction('addYear(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setFullYear(_date.getFullYear() + value)
			return _date.toISOString()
		})
		this.config.addFunction('addMonth(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setMonth(_date.getMonth() + value)
			return _date.toISOString()
		})
		this.config.addFunction('addDay(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setDate(_date.getDate() + value)
			return _date.toISOString()
		})
		this.config.addFunction('addHour(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setHours(_date.getHours() + value)
			return _date.toISOString()
		})
		this.config.addFunction('addMinute(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setMinutes(_date.getMinutes() + value)
			return _date.toISOString()
		})
		this.config.addFunction('addSecond(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setSeconds(_date.getSeconds() + value)
			return _date.toISOString()
		})
		this.config.addFunction('addMillisecond(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setMilliseconds(_date.getMilliseconds() + value)
			return _date.toISOString()
		})
		this.config.addFunction('addTime(date: dateTime, time: time):dateTime', (date: string, time: string):string => {
			const _time = new Date('2000-01-01T' + time)
			const _date = new Date(date)
			_date.setHours(_date.getHours() + _time.getHours())
			_date.setMinutes(_date.getMinutes() + _time.getMinutes())
			_date.setSeconds(_date.getSeconds() + _time.getSeconds())
			_date.setMilliseconds(_date.getSeconds() + _time.getMilliseconds())
			return _date.toISOString()
		})
		this.config.addFunction('subtractTime(date: dateTime, time: time):dateTime', (date: string, time: string):string => {
			const _time = new Date('2000-01-01T' + time)
			const _date = new Date(date)
			_date.setHours(_date.getHours() - _time.getHours())
			_date.setMinutes(_date.getMinutes() - _time.getMinutes())
			_date.setSeconds(_date.getSeconds() - _time.getSeconds())
			_date.setMilliseconds(_date.getSeconds() - _time.getMilliseconds())
			return _date.toISOString()
		})

		this.config.addFunction('yearDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.abs(_date2.getFullYear() - _date1.getFullYear())
		})
		this.config.addFunction('dayDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor((_date1.getTime() - _date2.getTime()) / (24 * 3600 * 1000))
		})
		this.config.addFunction('hourDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor((_date1.getTime() - _date2.getTime()) / (3600 * 1000))
		})
		this.config.addFunction('secondDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor((_date1.getTime() - _date2.getTime()) / (1000))
		})
		this.config.addFunction('millisecondDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor(_date1.getTime() - _date2.getTime())
		})
		this.config.addFunction('dayToDate(value: number):dateTime', (value: number):string => {
			return new Date(value * 24 * 3600 * 1000).toISOString()
		})
		this.config.addFunction('hourToDate(value: number):dateTime', (value: number):string => {
			return new Date(value * 3600 * 1000).toISOString()
		})
		this.config.addFunction('secondToDate(value: number):dateTime', (value: number):string => {
			return new Date(value * 1000).toISOString()
		})
		this.config.addFunction('millisecondToDate(value: number):dateTime', (value: number):string => {
			return new Date(value).toISOString()
		})
	}

	private initArrayFunctions (): void {
		this.config.addFunction('map(list: any[], predicate: T):T[]', Map)
		this.config.addAlias('select', 'map')
		this.config.addFunction('foreach(list: any[], predicate: any)', Foreach)
		this.config.addAlias('each', 'foreach')
		this.config.addFunction('filter(list: T[], predicate: boolean):T[]', Filter)
		this.config.addAlias('where', 'filter')
		this.config.addFunction('reverse(list: T[], predicate: any):T[]', Reverse)
		this.config.addFunction('sort(list: T[], predicate: any):T[]', Sort)
		this.config.addAlias('order', 'sort')
		this.config.addFunction('remove(list: T[], predicate: boolean):T[]', Remove)
		this.config.addAlias('delete', 'remove')
		this.config.addFunction('push(list: T[], value: T):T[]', (list: any[], item: any): any => {
			list.push(item)
			return list
		})
		this.config.addAlias('insert', 'push')
		this.config.addFunction('pop(list: T[]): T', (list: any[]): any => list.pop())
		this.config.addFunction('length(source: any[]|string):number ', (source: any[]|string):number => source.length)
		this.config.addAlias('len', 'length')
		this.config.addFunction('slice(list: T[], from:integer, to:integer):T[] ', (list: any[], from:number, to:number):any[] => list.slice(from, to))
		this.config.addFunction('page(list: T[], page:integer, records:integer):T[]', (list: any[], page:number, records:number):any[] => {
			let from = (page - 1) * records
			if (from < 0) {
				from = 0
			}
			let to = from + records
			if (to > list.length) {
				to = list.length - 1
			}
			return list.slice(from, to)
		})
		// this.addFunction('insert', ArrayFunctions.insert, OperatorType.arrow, Insert)
		// this.addFunction('update', ArrayFunctions.update, OperatorType.arrow, Update)
	}

	private initArrayGroupFunctions (): void {
		this.config.addFunction('distinct(list: any[], predicate: any): any[]', Distinct)
		this.config.addFunction('first(list: T[], predicate: boolean): T', First)
		this.config.addFunction('last(list: T[], predicate: boolean): T', Last)
		this.config.addFunction('count(list: T[], predicate: boolean): integer', Count)
		this.config.addFunction('max(list: T[], predicate: boolean): T', Max)
		this.config.addFunction('min(list: T[], predicate: boolean): T', Min)
		this.config.addFunction('avg(list: T[], value: number): number', Avg)
		this.config.addFunction('sum(list: T[], value: number): number', Sum)
	}

	private initSetsFunctions (): void {
		this.config.addFunction('union(a: T[], b: T[]): T[]', Union)
		this.config.addFunction('intersection(a: T[], b: T[]): T[]', Intersection)
		this.config.addFunction('difference(a: T[], b: T[]): T[]', Difference)
		this.config.addFunction('symmetricDifference(a: T[], b: T[]): T[]', SymmetricDifference)
	}
}

class And extends Operator {
	eval (context: Context): boolean {
		if (!this.children[0].eval(context) as boolean) return false
		return this.children[1].eval(context) as boolean
	}
}
class Or extends Operator {
	eval (context: Context): any {
		if (this.children[0].eval(context)) return true
		return this.children[1].eval(context)
	}
}
class Assignment extends Operator {
	eval (context: Context): any {
		const value = this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentAddition extends Operator {
	eval (context: Context): any {
		const value = this.children[0].eval(context) + this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentSubtraction extends Operator {
	eval (context: Context): any {
		const value = this.children[0].eval(context) - this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentMultiplication extends Operator {
	eval (context: Context): any {
		const value = this.children[0].eval(context) * this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentDivision extends Operator {
	eval (context: Context): any {
		const value = this.children[0].eval(context) / this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentExponentiation extends Operator {
	eval (context: Context): any {
		const value = this.children[0].eval(context) ** this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentFloorDivision extends Operator {
	eval (context: Context): any {
		const value = Math.floor(this.children[0].eval(context) / this.children[1].eval(context))
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentMod extends Operator {
	eval (context: Context): any {
		const value = this.children[0].eval(context) % this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentBitAnd extends Operator {
	eval (context: Context): any {
		const value = this.children[0].eval(context) & this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentBitOr extends Operator {
	eval (context: Context): any {
		const value = this.children[0].eval(context) | this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentBitXor extends Operator {
	eval (context: Context): any {
		const value = this.children[0].eval(context) ^ this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentLeftShift extends Operator {
	eval (context: Context): any {
		const value = this.children[0].eval(context) << this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class AssignmentRightShift extends Operator {
	eval (context: Context): any {
		const value = this.children[0].eval(context) >> this.children[1].eval(context)
		context.data.set(this.children[0].name, value)
		return value
	}
}
class Map extends ArrowFunction {
	// private serializer: ISerializer<Operand>
	constructor (name: string, children: Operand[] = [], metadata: ExpressionConfig) {
		super(name, children, metadata)
		// this.serializer = serializer
	}

	eval (context: Context): any {
		const rows = []
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (this.children[2] instanceof Obj) {
			const groupers:KeyValue[] = []
			const aggregates:KeyValue[] = []
			for (const child of this.children[2].children) {
				// In the case of being an object the value to return, find out if there are fields that are summarized
				const keyValue = child as KeyValue
				if (keyValue) {
					if (Helper.operand.haveAggregates(keyValue.children[0])) {
						aggregates.push(keyValue)
					} else {
						groupers.push(keyValue)
					}
				}
			}
			if (aggregates.length > 0) {
				// case with aggregate functions
				const keys = Helper.operand.getKeys(this.children[1], groupers, list, context)
				// once you got all the keys you have to calculate the aggregates fields
				const variable = this.children[1] as Variable
				for (const key of keys) {
					for (const keyValue of aggregates) {
						const operandCloned = exp.clone(keyValue.children[0])
						const operandResolved = Helper.operand.solveAggregates(key.items, variable, operandCloned, context)
						const value = operandResolved.eval(context)
						key.summarizers.push({ name: keyValue.name, value: value })
					}
				}
				// build the list of results
				for (const key of keys) {
					const row:any = {}
					for (const value of key.values) {
						row[value.name] = value.value
					}
					for (const summarizer of key.summarizers) {
						row[summarizer.name] = summarizer.value
					}
					rows.push(row)
				}
				return rows
			}
		}
		// simple case without aggregate functions
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.children[1].name, item)
			const row = this.children[2].eval(childContext)
			rows.push(row)
		}
		return rows
	}
}
class Distinct extends ArrowFunction {
	eval (context: Context): any {
		const rows = []
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (this.children.length === 1) {
			// simple case
			for (const item of list) {
				if (rows.find((p:any) => p === item) === undefined) {
					rows.push(item)
				}
			}
			return rows
		} else if (this.children[2] instanceof Obj) {
			// case with aggregate functions
			const keys = Helper.operand.getKeys(this.children[1], this.children[2].children, list, context.newContext())
			// build the list of results
			for (const key of keys) {
				const row:any = {}
				for (const value of key.values) {
					row[value.name] = value.value
				}
				rows.push(row)
			}
			return rows
		} else if (this.children[2] instanceof List) {
			throw new Error('Distinct not support Array result')
		}
		// simple case without aggregate functions
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.children[1].name, item)
			const value = this.children[2].eval(childContext)
			if (rows.find((p:any) => p === value) === undefined) {
				rows.push(value)
			}
		}
		return rows
	}
}
class Foreach extends ArrowFunction {
	eval (context: Context): any {
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.children[1].name, item)
			this.children[2].eval(childContext)
		}
		return list
	}
}
class Filter extends ArrowFunction {
	eval (context: Context): any {
		const rows = []
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.children[1].name, item)
			if (this.children[2].eval(childContext)) {
				rows.push(item)
			}
		}
		return rows
	}
}
class Reverse extends ArrowFunction {
	eval (context: Context): any {
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (this.children.length === 1) {
			return list.reverse()
		}
		const values = []
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.children[1].name, item)
			const value = this.children[2].eval(childContext)
			values.push({ value: value, p: item })
		}
		values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0)
		values.reverse()
		return values.map(p => p.p)
	}
}
class Sort extends ArrowFunction {
	eval (context: Context): any {
		const values = []
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (this.children.length === 1) {
			return list.sort()
		}
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.children[1].name, item)
			const value = this.children[2].eval(childContext)
			values.push({ value: value, p: item })
		}
		values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0)
		return values.map(p => p.p)
	}
}
class Remove extends ArrowFunction {
	eval (context: Context): any {
		const rows = []
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.children[1].name, item)
			if (!this.children[2].eval(childContext)) {
				rows.push(item)
			}
		}
		return rows
	}
}
class First extends ArrowFunction {
	eval (context: Context): any {
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (this.children.length === 1) {
			return list && list.length > 0 ? list[0] : null
		}
		return Helper.operand.first(list, this.children[1], this.children[2], context.newContext())
	}
}
class Last extends ArrowFunction {
	eval (context: Context): any {
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (this.children.length === 1) {
			return list && list.length > 0 ? list[list.length - 1] : null
		}
		return Helper.operand.last(list, this.children[1], this.children[2], context.newContext())
	}
}
class Count extends ArrowFunction {
	eval (context: Context): any {
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (this.children.length === 1) {
			return list.length
		}
		return Helper.operand.count(list, this.children[1], this.children[2], context.newContext())
	}
}
class Max extends ArrowFunction {
	eval (context: Context): any {
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (this.children.length === 1) {
			let max:any
			for (const item of list) {
				if (max === undefined || (item !== null && item > max)) {
					max = item
				}
			}
			return max
		}
		return Helper.operand.max(list, this.children[1], this.children[2], context.newContext())
	}
}
class Min extends ArrowFunction {
	eval (context: Context): any {
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (this.children.length === 1) {
			let min:any
			for (const item of list) {
				if (min === undefined || (item !== null && item < min)) {
					min = item
				}
			}
			return min
		}
		return Helper.operand.min(list, this.children[1], this.children[2], context.newContext())
	}
}
class Avg extends ArrowFunction {
	eval (context: Context): any {
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (this.children.length === 1) {
			let sum = 0
			for (const item of list) {
				if (item !== null) {
					sum = sum + item
				}
			}
			return list.length > 0 ? sum / list.length : 0
		}
		return Helper.operand.avg(list, this.children[1], this.children[2], context.newContext())
	}
}
class Sum extends ArrowFunction {
	eval (context: Context): any {
		const list: any[] = this.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (this.children.length === 1) {
			let sum = 0
			for (const item of list) {
				if (item !== null) {
					sum = sum + item
				}
			}
			return sum
		}
		return Helper.operand.sum(list, this.children[1], this.children[2], context.newContext())
	}
}
class Union extends ChildFunction {
	eval (context: Context): any {
		const a: any[] = this.children[0].eval(context)
		const b: any[] = this.children[1].eval(context)
		if (!a) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (!b) {
			throw new Error(`Array ${this.children[1].name} undefined`)
		}
		if (a.length === 0) {
			return b
		}
		if (b.length === 0) {
			return a
		}
		let result:any[] = []
		if (Array.isArray(a[0]) || Array.isArray(b[0])) {
			throw new Error('Cannot union arrays of arrays')
		} else if (typeof a[0] === 'object') {
			for (const element of a) {
				const key = Helper.operand.objectKey(element)
				result.push({ key: key, value: element })
			}
			for (const element of b) {
				const key = Helper.operand.objectKey(element)
				if (!result.find((p:any) => p.key === key)) {
					result.push({ key: key, value: element })
				}
			}
			return result.map((p:any) => p.value)
		}
		result = result.concat(a)
		for (const element of b) {
			if (!result.includes(element)) {
				result.push(element)
			}
		}
		return result
	}
}
class Intersection extends ChildFunction {
	eval (context: Context): any {
		const a: any[] = this.children[0].eval(context)
		const b: any[] = this.children[1].eval(context)
		if (!a) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (!b) {
			throw new Error(`Array ${this.children[1].name} undefined`)
		}
		if (a.length === 0 || b.length === 0) {
			return []
		}
		const result:any[] = []
		if (Array.isArray(a[0]) || Array.isArray(b[0])) {
			throw new Error('Cannot union arrays of arrays')
		} else if (typeof a[0] === 'object') {
			const keys = a.map((p:any) => Helper.operand.objectKey(p))
			for (const element of b) {
				const key = Helper.operand.objectKey(element)
				if (keys.includes(key)) {
					result.push(element)
				}
			}
			return result
		} else {
			for (const element of b) {
				if (a.includes(element)) {
					result.push(element)
				}
			}
			return result
		}
	}
}
class Difference extends ChildFunction {
	eval (context: Context): any {
		const a: any[] = this.children[0].eval(context)
		const b: any[] = this.children[1].eval(context)
		if (!a) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (!b) {
			throw new Error(`Array ${this.children[1].name} undefined`)
		}
		if (a.length === 0) {
			return []
		}
		if (b.length === 0) {
			return a
		}
		const result:any[] = []
		if (Array.isArray(a[0]) || Array.isArray(b[0])) {
			throw new Error('Cannot union arrays of arrays')
		} else if (typeof a[0] === 'object') {
			const keys = b.map((p:any) => Helper.operand.objectKey(p))
			for (const element of a) {
				const key = Helper.operand.objectKey(element)
				if (!keys.includes(key)) {
					result.push(element)
				}
			}
			return result
		} else {
			for (const element of a) {
				if (!b.includes(element)) {
					result.push(element)
				}
			}
			return result
		}
	}
}
class SymmetricDifference extends ChildFunction {
	eval (context: Context): any {
		const a: any[] = this.children[0].eval(context)
		const b: any[] = this.children[1].eval(context)
		if (!a) {
			throw new Error(`Array ${this.children[0].name} undefined`)
		}
		if (!b) {
			throw new Error(`Array ${this.children[1].name} undefined`)
		}
		if (a.length === 0) {
			return b
		}
		if (b.length === 0) {
			return a
		}
		const result:any[] = []
		if (Array.isArray(a[0]) || Array.isArray(b[0])) {
			throw new Error('Cannot union arrays of arrays')
		} else if (typeof a[0] === 'object') {
			const aKeys = a.map((p:any) => Helper.operand.objectKey(p))
			const bKeys = b.map((p:any) => Helper.operand.objectKey(p))
			for (const element of a) {
				const key = Helper.operand.objectKey(element)
				if (!bKeys.includes(key)) {
					result.push(element)
				}
			}
			for (const element of b) {
				const key = Helper.operand.objectKey(element)
				if (!aKeys.includes(key)) {
					result.push(element)
				}
			}
			return result
		} else {
			for (const element of a) {
				if (!b.includes(element)) {
					result.push(element)
				}
			}
			for (const element of b) {
				if (!a.includes(element)) {
					result.push(element)
				}
			}
			return result
		}
	}
}
