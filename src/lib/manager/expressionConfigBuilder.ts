import { Operand, Context, IExpressionConfig } from '../model'
import { Operator, ArrowFunction, ChildFunction, Obj, KeyValue, Constant, Variable, List, FunctionRef } from '../operand'
import { Helper } from '.'
import { expressions as exp } from '../'
import { ExpressionConfig } from '../parser'

export class ExpressionConfigBuilder {
	public build ():IExpressionConfig {
		const config = new ExpressionConfig()
		this.initConstants(config)
		this.initEnums(config)
		this.initFormats(config)
		this.initOperators(config)
		this.generalFunctions(config)
		this.comparisonFunctions(config)
		this.nullFunctions(config)
		this.numberFunctions(config)
		this.stringFunctions(config)
		this.initArrayFunctions(config)
		this.initArrayGroupFunctions(config)
		this.dateTimeFunctions(config)
		this.conversionFunctions(config)
		this.initSetsFunctions(config)
		config.refresh()
		return config
	}

	private initConstants (config:IExpressionConfig) {
		config.addConstant('true', true)
		config.addConstant('false', false)
		config.addConstant('null', null)
	}

	private initEnums (config:IExpressionConfig) {
		config.addEnum('DayOfWeek', { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 })
	}

	private initFormats (config:IExpressionConfig) {
		config.addFormat('email', '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
		config.addFormat('integer', '^\\d+$')
		config.addFormat('decimal', '^\\d+\\.\\d+$')
		config.addFormat('string', '^[a-zA-Z0-9_.]+$')
		// https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
		config.addFormat('date', '^\\d{4}-\\d{2}-\\d{2}$')
		config.addFormat('datetime', '\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]\\d:[0-5]\\d|Z)')
		config.addFormat('time', '\\[0-2]\\d:[0-5]\\d:[0-5]\\d')
	}

	private initOperators (config:IExpressionConfig) {
		config.addOperator('+(a:T,b:T):T', (a: any, b: any):any => a + b, 5)
		config.addOperator('-(a:number,b:number):number', (a: number, b: number):number => a - b, 5)
		config.addOperator('-(a:number):number', (a: number):number => a * -1, 9)
		config.addOperator('*(a:number,b:number):number', (a: number, b: number):number => a * b, 6)
		config.addOperator('/(a:number,b:number):number', (a: number, b: number):number => a / b, 6)
		config.addOperator('**(a:number,b:number):number', (a: number, b: number):number => a ** b, 7)
		config.addOperator('//(a:number,b:number):number', (a: number, b: number):number => Math.pow(a, 1 / b), 7)
		config.addOperator('%(a:number,b:number):number', (a: number, b: number):number => a % b, 8)

		config.addOperator('&(a:number,b:number):number', (a: number, b: number):number => a & b, 5)
		config.addOperator('|(a:number,b:number):number', (a: number, b: number):number => a | b, 5)
		config.addOperator('^(a:number,b:number):number', (a: number, b: number):number => a ^ b, 5)
		config.addOperator('~(a:number):number', (a: number):number => ~a, 9)
		config.addOperator('<<(a:number,b:number):number', (a: number, b: number):number => a << b, 5)
		config.addOperator('>>(a:number,b:number):number', (a: number, b: number):number => a >> b, 5)

		config.addOperator('==(a:T,b:T):boolean', (a: any, b: any):boolean => a === b, 4)
		config.addOperator('===(a:T,b:T):boolean', (a: any, b: any):boolean => a === b, 4)
		config.addOperator('!=(a:T,b:T):boolean', (a: any, b: any):boolean => a !== b, 4)
		config.addOperator('!==(a:T,b:T):boolean', (a: any, b: any):boolean => a !== b, 4)
		config.addOperator('<>(a:T,b:T):boolean', (a: any, b: any):boolean => a !== b, 4)
		config.addOperator('>(a:T,b:T):boolean', (a: any, b: any):boolean => a > b, 4)
		config.addOperator('<(a:T,b:T):boolean', (a: any, b: any):boolean => a < b, 4)
		config.addOperator('>=(a:T,b:T):boolean', (a: any, b: any):boolean => a >= b, 4)
		config.addOperator('<=(a:T,b:T):boolean', (a: any, b: any):boolean => a <= b, 3)

		config.addOperator('&&(a:T,b:T):boolean', And, 3)
		config.addOperator('||(a:T,b:T):boolean', Or, 3)
		config.addOperator('!(a:boolean):boolean', (a: boolean):boolean => !a, 5)

		config.addOperator('[](list:T[],index:integer):T', (list: any[], index: any): any => list[index], 2)
		config.addOperator('$(name:string):string', (name:string):any => process.env[name], 9)

		config.addOperator('=(a:T,b:T):T', Assignment, 1)
		config.addOperator('+=(a:number,b:number):number', AssignmentAddition, 1)
		config.addOperator('-=(a:number,b:number):number', AssignmentSubtraction, 1)
		config.addOperator('*=(a:number,b:number):number', AssignmentMultiplication, 1)
		config.addOperator('/=(a:number,b:number):number', AssignmentDivision, 1)
		config.addOperator('**=(a:number,b:number):number', AssignmentExponentiation, 1)
		config.addOperator('//=(a:number,b:number):number', AssignmentFloorDivision, 1)
		config.addOperator('%=(a:number,b:number):number', AssignmentMod, 1)
		config.addOperator('&=(a:number,b:number):number', AssignmentBitAnd, 1)
		config.addOperator('|=(a:number,b:number):number', AssignmentBitOr, 1)
		config.addOperator('^=(a:number,b:number):number', AssignmentBitXor, 1)
		config.addOperator('<<=(a:number,b:number):number', AssignmentLeftShift, 1)
		config.addOperator('>>=(a:number,b:number):number', AssignmentRightShift, 1)
	}

	private generalFunctions (config:IExpressionConfig) {
		// config.addFunction('async sleep(ms?: number)', Functions.sleep)
		config.addFunction('console(value:any)', (value: any) => {
			console.log(typeof value === 'object' ? JSON.stringify(value) : value)
		})
	}

	private comparisonFunctions (config:IExpressionConfig) {
		config.addFunction('between(value:any,from:any,to:any):boolean', Functions.between)
		config.addFunction('includes(list:string|any[],value:any):boolean', Functions.includes)
		config.addAlias('in', 'includes')
		config.addFunction('isNull(value:any):boolean', Functions.isNull)
		config.addFunction('isNotNull(value:any):boolean', Functions.isNotNull)
		config.addFunction('isEmpty(value:string):boolean', Functions.isEmpty)
		config.addFunction('isNotEmpty(value:string):boolean', Functions.isNotEmpty)
		config.addFunction('isBoolean(value:any):boolean', Functions.isBoolean)
		config.addFunction('isNumber(value:any):boolean', Functions.isNumber)
		config.addFunction('isInteger(value:any):boolean', Functions.isInteger)
		config.addFunction('isDecimal(value:any):boolean', Functions.isDecimal)
		config.addFunction('isString(value:any):boolean', Functions.isString)
		config.addFunction('isDate(value:any):boolean', Functions.isDate)
		config.addFunction('isDatetime(value:any):boolean', Functions.isDatetime)
		config.addFunction('isTime(value:any):boolean', Functions.isTime)
		config.addFunction('isObject(value:any):boolean', Functions.isObject)
		config.addFunction('isArray(value:any):boolean', Functions.isArray)
		config.addFunction('isBooleanFormat(value:string):boolean', Functions.isBooleanFormat)
		config.addFunction('isNumberFormat(value:string):boolean', Functions.isNumberFormat)
		config.addFunction('isIntegerFormat(value:string):boolean', Functions.isIntegerFormat)
		config.addFunction('isDecimalFormat(value:string):boolean', Functions.isDecimalFormat)
		config.addFunction('isDateFormat(value:string):boolean', Functions.isDateFormat)
		config.addFunction('isDatetimeFormat(value:string):boolean', Functions.isDatetimeFormat)
		config.addFunction('isTimeFormat(value:string):boolean', Functions.isTimeFormat)
	}

	private nullFunctions (config:IExpressionConfig) {
		config.addFunction('nvl(value:T, default:T):T', Functions.nvl)
		config.addFunction('nvl2(value:any, a:T,b:T):T', Functions.nvl2)
	}

	private numberFunctions (config:IExpressionConfig) {
		config.addFunction('abs(x:number):number', Math.abs)
		config.addFunction('acos(x:number):number', Math.acos)
		config.addFunction('asin(x:number):number', Math.asin)
		config.addFunction('atan(x:number):number', Math.atan)
		config.addFunction('atan2(x:number):number', Math.atan2)
		config.addFunction('ceil(x:number):number', Math.ceil)
		config.addFunction('cos(x:number):number', Math.cos)
		config.addFunction('cosh(x:number):number', Math.cosh)
		config.addFunction('exp(x:number):number', Math.exp)
		config.addFunction('floor(x:number):number', Math.floor)
		config.addFunction('ln(x:number):number', Math.log)
		config.addFunction('log10(x:number):number', Math.log10)
		config.addFunction('log(x:number):number', Math.log)
		config.addFunction('remainder(n1:number,n2:number):number', (n1: number, n2: number) => n1 % n2)
		config.addFunction('round(num:number,decimals=0):number', (num: number, decimals = 0) =>
			decimals > 0 ? Number(num.toFixed(decimals)) : Math.round(num)
		)
		config.addFunction('sign(x:number):number', Math.sign)
		config.addFunction('sin(x:number):number', Math.sin)
		config.addFunction('sinh(x:number):number', Math.sinh)
		config.addFunction('tan(x:number):number', Math.tan)
		config.addFunction('tanh(x:number):number', Math.tanh)
		config.addFunction('trunc(x:number):number', Math.trunc)
	}

	private conversionFunctions (config:IExpressionConfig) {
		config.addFunction('toString(value:any):string', Functions.toString)
		config.addFunction('toNumber(value:any):number', Functions.toNumber)
		config.addFunction('dateToString(date:date):string', (date:Date) => {
			if (typeof date === 'string') {
				return new Date(date).toISOString()
			}
			return date.toISOString()
		})
		config.addFunction('stringify(value:any):string', (value: any): string => JSON.stringify(value))
		config.addFunction('parse(value:string):any', (value: string): any => JSON.parse(value))
		config.addFunction('keys(obj: any):string[]', (obj: any): string[] => typeof obj === 'object' ? Object.keys(obj) : [])
		config.addFunction('values(obj: any):any[]', (obj: any): any[] => typeof obj === 'object' ? Object.values(obj) : [])
		config.addFunction('entries(obj: any):[string,any][]', (obj: any): [string, any][] => typeof obj === 'object' ? Object.entries(obj) : [])
		config.addFunction('fromEntries(entries: [string,any][]): any', (entries: [string, any][]): any => Helper.obj.fromEntries(entries))
	}

	private stringFunctions (config:IExpressionConfig) {
		config.addFunction('chr(ascii: number):string ', (ascii: number):string => String.fromCharCode(ascii))
		config.addFunction('capitalize(str:string):string', (str:string):string => StringFunction.capitalize(str))
		config.addFunction('initcap(str:string):string', (str:string):string => StringFunction.initCap(str))
		config.addFunction('strCount(source: string, value: string):number', (source: string, value: string):number => source.split(value).length - 1)
		config.addFunction('lower(str: string):string', (str: string):string => str.toLowerCase())
		config.addFunction('lpad(str: string, len: number, pad: string):string ', (str: string, len: number, pad: string):string => str.padStart(len, pad))
		config.addFunction('ltrim(str: string):string ', (str: string):string => str.trimLeft())
		config.addFunction('replace(str: string, source: string, target: string):string ', (str: string, source: string, target: string):string => Helper.string.replace(str, source, target))
		config.addFunction('rpad(str: string, len: number, pad: string):string ', (str: string, len: number, pad: string):string => str.padEnd(len, pad))
		config.addFunction('rtrim(str: string):string ', (str: string):string => str.trimRight())
		config.addFunction('substring(str: string, from: number, count: number):string ', (str: string, from: number, count: number):string => str.substring(from, count))
		config.addAlias('substr', 'substring')
		config.addFunction('trim(str: string):string', (str: string):string => str.trim())
		config.addFunction('upper(str: string):string', (str: string):string => str.toUpperCase())
		config.addFunction('concat(...values:any):string', (...values:any):string => Functions.concat(values))
		config.addAlias('concatenate', 'concat')
		config.addFunction('test(value: any, regexp: string):boolean', (value: any, regexp: string):boolean => {
			const _regexp = new RegExp(regexp)
			return _regexp.test(value)
		})
		config.addFunction('match(value: string, regexp: string):any', (value: string, regexp: string):any => {
			return value ? value.match(regexp) : null
		})
		config.addFunction('mask(value: string):string', (value: string):string => {
			if (!value) return value
			if (value.length > 8) {
				return value.substring(0, 3) + '*****' + value.substring(value.length - 3, value.length)
			} else if (value.length > 5) {
				return value.substring(0, 1) + '*****' + value.substring(value.length - 1, value.length)
			} else {
				return '*'
			}
		})
		config.addFunction('startWith(value:string, stringSearched:string, position:number):boolean', (value:string, stringSearched:string, position:number):boolean => value.startsWith(stringSearched, position))
	}

	private dateTimeFunctions (config:IExpressionConfig) {
		config.addFunction('curTime():time', ():string => {
			const date = new Date()
			return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds()
		})
		config.addFunction('today():date', ():string => {
			const date = new Date()
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
		})
		config.addFunction('now():dateTime', ():string => new Date().toISOString())
		config.addFunction('time(value: string):time', (value: string):string => {
			const date = new Date(value)
			return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds()
		})
		config.addFunction('date(value: string):date', (value: string):string => {
			const date = new Date(value)
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
		})
		config.addFunction('datetime(value: string):dateTime', (value: string):string => new Date(value).toISOString())
		config.addFunction('year(value: dateTime):integer', (value: string):number => {
			return new Date(value).getFullYear()
		})
		config.addFunction('month(value: dateTime):integer', (value: string):number => {
			return new Date(value).getMonth() + 1
		})
		config.addFunction('day(value: dateTime):integer', (value: string):number => {
			return new Date(value).getDate()
		})
		config.addFunction('weekday(value: dateTime):integer', (value: string):number => {
			return new Date(value).getDay()
		})
		config.addFunction('hour(value: dateTime):integer', (value: string) => {
			return new Date(value).getHours()
		})
		config.addFunction('minute(value: dateTime):integer', (value: string):number => {
			return new Date(value).getMinutes()
		})
		config.addFunction('second(value: dateTime):integer', (value: string):number => {
			return new Date(value).getSeconds()
		})
		config.addFunction('millisecond(value: dateTime):integer', (value: string):number => {
			return new Date(value).getMilliseconds()
		})
		config.addFunction('addYear(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setFullYear(_date.getFullYear() + value)
			return _date.toISOString()
		})
		config.addFunction('addMonth(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setMonth(_date.getMonth() + value)
			return _date.toISOString()
		})
		config.addFunction('addDay(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setDate(_date.getDate() + value)
			return _date.toISOString()
		})
		config.addFunction('addHour(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setHours(_date.getHours() + value)
			return _date.toISOString()
		})
		config.addFunction('addMinute(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setMinutes(_date.getMinutes() + value)
			return _date.toISOString()
		})
		config.addFunction('addSecond(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setSeconds(_date.getSeconds() + value)
			return _date.toISOString()
		})
		config.addFunction('addMillisecond(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setMilliseconds(_date.getMilliseconds() + value)
			return _date.toISOString()
		})
		config.addFunction('addTime(date: dateTime, time: time):dateTime', (date: string, time: string):string => {
			const _time = new Date('2000-01-01T' + time)
			const _date = new Date(date)
			_date.setHours(_date.getHours() + _time.getHours())
			_date.setMinutes(_date.getMinutes() + _time.getMinutes())
			_date.setSeconds(_date.getSeconds() + _time.getSeconds())
			_date.setMilliseconds(_date.getSeconds() + _time.getMilliseconds())
			return _date.toISOString()
		})
		config.addFunction('subtractTime(date: dateTime, time: time):dateTime', (date: string, time: string):string => {
			const _time = new Date('2000-01-01T' + time)
			const _date = new Date(date)
			_date.setHours(_date.getHours() - _time.getHours())
			_date.setMinutes(_date.getMinutes() - _time.getMinutes())
			_date.setSeconds(_date.getSeconds() - _time.getSeconds())
			_date.setMilliseconds(_date.getSeconds() - _time.getMilliseconds())
			return _date.toISOString()
		})

		config.addFunction('yearDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.abs(_date2.getFullYear() - _date1.getFullYear())
		})
		config.addFunction('dayDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor((_date1.getTime() - _date2.getTime()) / (24 * 3600 * 1000))
		})
		config.addFunction('hourDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor((_date1.getTime() - _date2.getTime()) / (3600 * 1000))
		})
		config.addFunction('secondDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor((_date1.getTime() - _date2.getTime()) / (1000))
		})
		config.addFunction('millisecondDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor(_date1.getTime() - _date2.getTime())
		})
		config.addFunction('dayToDate(value: number):dateTime', (value: number):string => {
			return new Date(value * 24 * 3600 * 1000).toISOString()
		})
		config.addFunction('hourToDate(value: number):dateTime', (value: number):string => {
			return new Date(value * 3600 * 1000).toISOString()
		})
		config.addFunction('secondToDate(value: number):dateTime', (value: number):string => {
			return new Date(value * 1000).toISOString()
		})
		config.addFunction('millisecondToDate(value: number):dateTime', (value: number):string => {
			return new Date(value).toISOString()
		})
	}

	private initArrayFunctions (config:IExpressionConfig) {
		config.addFunction('map(list: any[], predicate: T):T[]', Map)
		config.addAlias('select', 'map')
		config.addFunction('foreach(list: any[], predicate: any)', Foreach)
		config.addAlias('each', 'foreach')
		config.addFunction('filter(list: T[], predicate: boolean):T[]', Filter)
		config.addAlias('where', 'filter')
		config.addFunction('reverse(list: T[], predicate: any):T[]', Reverse)
		config.addFunction('sort(list: T[], predicate: any):T[]', Sort)
		config.addAlias('order', 'sort')
		config.addFunction('remove(list: T[], predicate: boolean):T[]', Remove)
		config.addAlias('delete', 'remove')
		config.addFunction('push(list: T[], value: T):T[]', (list: any[], item: any): any => {
			list.push(item)
			return list
		})
		config.addAlias('insert', 'push')
		config.addFunction('pop(list: T[]): T', (list: any[]): any => list.pop())
		config.addFunction('length(source: any[]|string):number ', (source: any[]|string):number => source.length)
		config.addAlias('len', 'length')
		config.addFunction('slice(list: T[], from:integer, to:integer):T[] ', (list: any[], from:number, to:number):any[] => list.slice(from, to))
		config.addFunction('page(list: T[], page:integer, records:integer):T[]', (list: any[], page:number, records:number):any[] => {
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

	private initArrayGroupFunctions (config:IExpressionConfig) {
		config.addFunction('distinct(list: any[], predicate: any): any[]', Distinct)
		config.addFunction('first(list: T[], predicate: boolean): T', First)
		config.addFunction('last(list: T[], predicate: boolean): T', Last)
		config.addFunction('count(list: T[], predicate: boolean): integer', Count)
		config.addFunction('max(list: T[], predicate: boolean): T', Max)
		config.addFunction('min(list: T[], predicate: boolean): T', Min)
		config.addFunction('avg(list: T[], value: number): number', Avg)
		config.addFunction('sum(list: T[], value: number): number', Sum)
	}

	private initSetsFunctions (config:IExpressionConfig) {
		config.addFunction('union(a: T[], b: T[]): T[]', Union)
		config.addFunction('intersection(a: T[], b: T[]): T[]', Intersection)
		config.addFunction('difference(a: T[], b: T[]): T[]', Difference)
		config.addFunction('symmetricDifference(a: T[], b: T[]): T[]', SymmetricDifference)
	}
}
class CoreHelper {
	public static objectKey (obj:any) : any {
		const keys = Object.keys(obj).sort()
		const list:string[] = []
		for (const key of keys) {
			list.push(key)
			list.push(obj[key].toString())
		}
		return list.join('|')
	}

	public static getKeys (variable:Variable, fields: KeyValue[], list: any[], context: Context): any[] {
		const keys:any[] = []
		// loop through the list and group by the grouper fields
		for (const item of list) {
			let key = ''
			const values = []
			for (const keyValue of fields) {
				context.data.set(variable.name, item)
				// variable.set(item)
				const value = keyValue.children[0].eval(context)
				if (typeof value === 'object') {
					throw new Error(`Property value ${keyValue.name} is an object, so it cannot be grouped`)
				}
				key = key === '' ? value : `${key}-${value}`
				values.push({ name: keyValue.name, value: value })
			}
			// find if the key already exists in the list of keys
			const keyItem = keys.find((p:any) => p.key === key)
			if (keyItem) {
				// if the key exists add the item
				keyItem.items.push(item)
			} else {
				// if the key does not exist add the key, the values and the item
				keys.push({ key: key, values: values, items: [item], summarizers: [] })
			}
		}
		return keys
	}

	public static haveAggregates (operand: Operand): boolean {
		if (!(operand instanceof ArrowFunction) && operand instanceof FunctionRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			return true
		} else if (operand.children && operand.children.length > 0) {
			for (const child of operand.children) {
				if (this.haveAggregates(child)) {
					return true
				}
			}
		}
		return false
	}

	public static findAggregates (operand: Operand): FunctionRef[] {
		if (!(operand instanceof ArrowFunction) && operand instanceof FunctionRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			return [operand]
		} else if (operand.children && operand.children.length > 0) {
			let aggregates:FunctionRef[] = []
			for (const child of operand.children) {
				const childAggregates = this.findAggregates(child)
				if (childAggregates.length > 0) {
					aggregates = aggregates.concat(childAggregates)
				}
			}
			return aggregates
		}
		return []
	}

	public static solveAggregates (list: any[], variable: Variable, operand: Operand, context: Context): Operand {
		if (!(operand instanceof ArrowFunction) && operand instanceof FunctionRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			let value:any
			switch (operand.name) {
			case 'avg':
				value = this.avg(list, variable, operand.children[0], context)
				break
			case 'count':
				value = this.count(list, variable, operand.children[0], context)
				break
			case 'first':
				value = this.first(list, variable, operand.children[0], context)
				break
			case 'last':
				value = this.last(list, variable, operand.children[0], context)
				break
			case 'max':
				value = this.max(list, variable, operand.children[0], context)
				break
			case 'min':
				value = this.min(list, variable, operand.children[0], context)
				break
			case 'sum':
				value = this.sum(list, variable, operand.children[0], context)
				break
			}
			return new Constant(value)
		} else if (operand.children && operand.children.length > 0) {
			for (let i = 0; i < operand.children.length; i++) {
				operand.children[i] = this.solveAggregates(list, variable, operand.children[i], context)
			}
		}
		return operand
	}

	public static count (list: any[], variable: Variable, aggregate: Operand, context: Context): number {
		let count = 0
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			if (aggregate.eval(context)) {
				count++
			}
		}
		return count
	}

	public static first (list: any[], variable: Variable, aggregate: Operand, context: Context): any {
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			if (aggregate.eval(context)) {
				return item
			}
		}
		return null
	}

	public static last (list: any[], variable: Variable, aggregate: Operand, context: Context): any {
		for (let i = list.length - 1; i >= 0; i--) {
			const item = list[i]
			// variable.set(item)
			context.data.set(variable.name, item)
			if (aggregate.eval(context)) {
				return item
			}
		}
		return null
	}

	public static max (list: any[], variable: Variable, aggregate: Operand, context: Context): any {
		let max:any
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (max === undefined || (value !== null && value > max)) {
				max = value
			}
		}
		return max
	}

	public static min (list: any[], variable: Variable, aggregate: Operand, context: Context): any {
		let min:any
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (min === undefined || (value !== null && value < min)) {
				min = value
			}
		}
		return min
	}

	public static avg (list: any[], variable: Variable, aggregate: Operand, context: Context): number {
		let sum = 0
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (value !== null) {
				sum = sum + value
			}
		}
		return list.length > 0 ? sum / list.length : 0
	}

	public static sum (list: any[], variable: Variable, aggregate: Operand, context: Context): number {
		let sum = 0
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (value !== null) {
				sum = sum + value
			}
		}
		return sum
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
class StringFunction {
	public static capitalize = function (str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	public static initCap (str: string): string {
		const newStr = str.split(' ')
		let i
		const arr = []
		for (i = 0; i < newStr.length; i++) {
			arr.push(StringFunction.capitalize(newStr[i]))
		}
		return arr.join(' ')
	}
}
class Functions {
	static nvl (value: any, _default: any): any {
		return Functions.isNotNull(value) ? value : _default
	}

	static nvl2 (value: any, a: any, b: any): any {
		return Functions.isNotNull(value) ? a : b
	}

	static isNull (value: any): boolean {
		return value === undefined || value === null
	}

	static isNotNull (value: any): boolean {
		return !Functions.isNull(value)
	}

	static isEmpty (value: string): boolean {
		return value === null || value === undefined || value.toString().trim().length === 0
	}

	static isNotEmpty (value: string): boolean {
		return !Functions.isEmpty(value)
	}

	static isBoolean (value: any): boolean {
		return typeof value === 'boolean'
	}

	static isNumber (value: any): boolean {
		return Functions.isDecimal(value)
	}

	static isInteger (value: any): boolean {
		return Number.isInteger(value)
	}

	static isDecimal (value: any): boolean {
		return !isNaN(value)
	}

	static isString (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return typeof value === 'string'
	}

	static isDate (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		if (typeof value === 'string') {
			return Functions.isDateFormat(value as string)
		} else {
			return typeof value.getMonth === 'function'
		}
	}

	static isDatetime (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		if (typeof value === 'string') {
			return Functions.isDatetimeFormat(value as string)
		} else {
			return typeof value.getMonth === 'function'
		}
	}

	static isObject (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return typeof value === 'object' && !Array.isArray(value)
	}

	static isArray (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return Array.isArray(value)
	}

	static isTime (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		if (typeof value === 'string') {
			return Functions.isTimeFormat(value as string)
		} else {
			return typeof value.getMonth === 'function'
		}
	}

	static isBooleanFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		return ['true', 'false'].includes(value.toString())
	}

	static isNumberFormat (value: any): boolean {
		return Functions.isDecimalFormat(value)
	}

	static isIntegerFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		const regex = /^\d+$/
		return value.toString().match(regex) !== null
	}

	static isDecimalFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		const regex = /^\d+\.\d+$/
		return value.toString().match(regex) !== null
	}

	static isStringFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		const regex = /[a-zA-Z0-9_.]+$/
		return value.toString().match(regex) !== null
	}

	static isDateFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		const regex = /^\d{4}-\d{2}-\d{2}$/
		return value.toString().match(regex) !== null
	}

	static isDatetimeFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		const regex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
		return value.toString().match(regex) !== null
	}

	static isTimeFormat (value: any): boolean {
		if (value === null || value === undefined) {
			return false
		}
		// https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
		const regex = /\[0-2]\d:[0-5]\d:[0-5]\d/
		return value.toString().match(regex) !== null
	}

	static async sleep (ms = 1000): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(resolve, ms)
		})
	}

	static between (value: any, from: any, to: any): boolean {
		return value >= from && value < to
	}

	static includes (list: any[]|string, value: any): boolean {
		if (list && value) {
			return list.includes(value)
		} else {
			return false
		}
	}

	static toString (value: any): string {
		return Functions.isNull(value) ? '' : value.toString()
	}

	static toNumber (value: any): number {
		return Functions.isNull(value) ? 0 : parseFloat(value)
	}

	static concat (values:any[]) :any {
		if (!values || values.length === 0) {
			return ''
		}
		if (typeof values[0] === 'string') {
			return ''.concat(...values)
		} else if (Array.isArray(values[0])) {
			return [].concat(...values)
		} else {
			const list:any[] = []
			for (const value of values) {
				list.push(value)
			}
			return list
		}
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
					if (CoreHelper.haveAggregates(keyValue.children[0])) {
						aggregates.push(keyValue)
					} else {
						groupers.push(keyValue)
					}
				}
			}
			if (aggregates.length > 0) {
				// case with aggregate functions
				const keys = CoreHelper.getKeys(this.children[1], groupers, list, context)
				// once you got all the keys you have to calculate the aggregates fields
				const variable = this.children[1] as Variable
				for (const key of keys) {
					for (const keyValue of aggregates) {
						const operandCloned = exp.clone(keyValue.children[0])
						const operandResolved = CoreHelper.solveAggregates(key.items, variable, operandCloned, context)
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
			const keys = CoreHelper.getKeys(this.children[1], this.children[2].children, list, context.newContext())
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
		return CoreHelper.first(list, this.children[1], this.children[2], context.newContext())
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
		return CoreHelper.last(list, this.children[1], this.children[2], context.newContext())
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
		return CoreHelper.count(list, this.children[1], this.children[2], context.newContext())
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
		return CoreHelper.max(list, this.children[1], this.children[2], context.newContext())
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
		return CoreHelper.min(list, this.children[1], this.children[2], context.newContext())
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
		return CoreHelper.avg(list, this.children[1], this.children[2], context.newContext())
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
		return CoreHelper.sum(list, this.children[1], this.children[2], context.newContext())
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
				const key = CoreHelper.objectKey(element)
				result.push({ key: key, value: element })
			}
			for (const element of b) {
				const key = CoreHelper.objectKey(element)
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
			const keys = a.map((p:any) => CoreHelper.objectKey(p))
			for (const element of b) {
				const key = CoreHelper.objectKey(element)
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
			const keys = b.map((p:any) => CoreHelper.objectKey(p))
			for (const element of a) {
				const key = CoreHelper.objectKey(element)
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
			const aKeys = a.map((p:any) => CoreHelper.objectKey(p))
			const bKeys = b.map((p:any) => CoreHelper.objectKey(p))
			for (const element of a) {
				const key = CoreHelper.objectKey(element)
				if (!bKeys.includes(key)) {
					result.push(element)
				}
			}
			for (const element of b) {
				const key = CoreHelper.objectKey(element)
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
