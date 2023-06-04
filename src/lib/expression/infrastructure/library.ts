import { helper } from '../..'
import { Context, Operand, OperandType, IEvaluator } from '../../shared/domain'
import { ModelService, Library } from '../../model/domain'
import { PrototypeEvaluator, OperandBuilder } from '../../operand/domain'
import { OperandClone } from '../../operand/application'
export class CoreLibrary implements Library {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly builder: OperandBuilder,
		private readonly operandClone: OperandClone
	) {}

	public load (model: ModelService):void {
		this.constants(model)
		this.enums(model)
		this.formats(model)
		this.operators(model)
		this.generalFunctions(model)
		this.comparisonFunctions(model)
		this.nullFunctions(model)
		this.numberFunctions(model)
		this.stringFunctions(model)
		this.arrayFunctions(model)
		this.groupFunctions(model)
		this.dateTimeFunctions(model)
		this.conversionFunctions(model)
		this.setsFunctions(model)
	}

	private constants (model: ModelService): void {
		model.addConstant('true', true)
		model.addConstant('false', false)
		model.addConstant('null', null)
	}

	private enums (model: ModelService): void {
		model.addEnum('DayOfWeek', [['Sunday', 0], ['Monday', 1], ['Tuesday', 2], ['Wednesday', 3], ['Thursday', 4], ['Friday', 5], ['Saturday', 6]])
	}

	private formats (model: ModelService): void {
		model.addFormat('email', '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')
		model.addFormat('integer', '^\\d+$')
		model.addFormat('decimal', '^\\d+\\.\\d+$')
		model.addFormat('string', '^[a-zA-Z0-9_.]+$')
		// https://stackoverflow.com/questions/3143070/javascript-regex-iso-dateTime
		model.addFormat('date', '^\\d{4}-\\d{2}-\\d{2}$')
		model.addFormat('dateTime', '\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]\\d:[0-5]\\d|Z)')
		model.addFormat('time', '\\[0-2]\\d:[0-5]\\d:[0-5]\\d')
	}

	private operators (model: ModelService): void {
		model.addOperator('+(a:T,b:T):T', (a: any, b: any):any => a + b, { priority: 5 })
		model.addOperator('-(a:number,b:number):number', (a: number, b: number):number => a - b, { priority: 5 })
		model.addOperator('-(a:number):number', (a: number):number => a * -1, { priority: 9 })
		model.addOperator('*(a:number,b:number):number', (a: number, b: number):number => a * b, { priority: 6 })
		model.addOperator('/(a:number,b:number):number', (a: number, b: number):number => a / b, { priority: 6 })
		model.addOperator('**(a:number,b:number):number', (a: number, b: number):number => a ** b, { priority: 7 })
		model.addOperator('//(a:number,b:number):number', (a: number, b: number):number => Math.pow(a, 1 / b), { priority: 7 })
		model.addOperator('%(a:number,b:number):number', (a: number, b: number):number => a % b, { priority: 8 })

		model.addOperator('&(a:number,b:number):number', (a: number, b: number):number => a & b, { priority: 5 })
		model.addOperator('|(a:number,b:number):number', (a: number, b: number):number => a | b, { priority: 5 })
		model.addOperator('^(a:number,b:number):number', (a: number, b: number):number => a ^ b, { priority: 5 })
		model.addOperator('~(a:number):number', (a: number):number => ~a, { priority: 9 })
		model.addOperator('<<(a:number,b:number):number', (a: number, b: number):number => a << b, { priority: 5 })
		model.addOperator('>>(a:number,b:number):number', (a: number, b: number):number => a >> b, { priority: 5 })

		model.addOperator('==(a:T,b:T):boolean', (a: any, b: any):boolean => a === b, { priority: 4 })
		model.addOperatorAlias('===', '==')
		model.addOperator('!=(a:T,b:T):boolean', (a: any, b: any):boolean => a !== b, { priority: 4 })
		model.addOperatorAlias('!==', '!=')
		model.addOperatorAlias('<>', '!=')
		model.addOperator('>(a:T,b:T):boolean', (a: any, b: any):boolean => a > b, { priority: 4 })
		model.addOperator('<(a:T,b:T):boolean', (a: any, b: any):boolean => a < b, { priority: 4 })
		model.addOperator('>=(a:T,b:T):boolean', (a: any, b: any):boolean => a >= b, { priority: 4 })
		model.addOperator('<=(a:T,b:T):boolean', (a: any, b: any):boolean => a <= b, { priority: 3 })

		model.addOperator('&&(a:boolean,b:boolean):boolean', new And(), { priority: 3 })
		model.addOperator('||(a:boolean,b:boolean):boolean', new Or(), { priority: 3 })
		model.addOperator('!(a:boolean):boolean', (a: boolean):boolean => !a, { priority: 5 })

		// index is any, because it can also be string when used to access a property of an object
		// example: orders[0]["number"]
		model.addOperator('[](list:T[],index:any):T', (list: any[], index: any): any => list[index], { priority: 2 })
		model.addOperator('$(name:string):string', (name:string):any => process.env[name], { priority: 9 })

		model.addOperator('=(a:T,b:T):T', new Assignment(), { priority: 1 })
		model.addOperator('+=(a:number,b:number):number', new AssignmentAddition(), { priority: 1 })
		model.addOperator('-=(a:number,b:number):number', new AssignmentSubtraction(), { priority: 1 })
		model.addOperator('*=(a:number,b:number):number', new AssignmentMultiplication(), { priority: 1 })
		model.addOperator('/=(a:number,b:number):number', new AssignmentDivision(), { priority: 1 })
		model.addOperator('**=(a:number,b:number):number', new AssignmentExponentiation(), { priority: 1 })
		model.addOperator('//=(a:number,b:number):number', new AssignmentFloorDivision(), { priority: 1 })
		model.addOperator('%=(a:number,b:number):number', new AssignmentMod(), { priority: 1 })
		model.addOperator('&=(a:number,b:number):number', new AssignmentBitAnd(), { priority: 1 })
		model.addOperator('|=(a:number,b:number):number', new AssignmentBitOr(), { priority: 1 })
		model.addOperator('^=(a:number,b:number):number', new AssignmentBitXor(), { priority: 1 })
		model.addOperator('<<=(a:number,b:number):number', new AssignmentLeftShift(), { priority: 1 })
		model.addOperator('>>=(a:number,b:number):number', new AssignmentRightShift(), { priority: 1 })
	}

	private generalFunctions (model: ModelService): void {
		// model.addFunction('async sleep(ms?: number)', Functions.sleep)
		model.addFunction('console(value:any)', (value: any) => {
			console.log(typeof value === 'object' ? JSON.stringify(value) : value)
		})
	}

	private nullFunctions (model: ModelService): void {
		model.addFunction('nvl(value:T, default:T):T', (value:any, _default:any):any => helper.utils.nvl(value, _default))
		model.addFunction('nvl2(value:any, a:T,b:T):T', (value:any, a:any, b:any):any => helper.utils.nvl2(value, a, b))
	}

	private comparisonFunctions (model: ModelService): void {
		model.addFunction('between(value:T,from:T,to:T):boolean',
			(value:any, from:any, to:any):boolean => helper.val.between(value, from, to))
		model.addFunction('includes(source:string|T[],value:string|T):boolean',
			(source:string|any[], value:any):boolean => source && value ? source.includes(value) : false)
		model.addFunctionAlias('contains', 'includes')
		model.addFunction('in(source:T,...values:T):boolean',
			(source:any, ...values:any):boolean => {
				if (source === undefined || values === undefined) {
					return false
				}
				if (values.length === 1 && Array.isArray(values)) {
					return values[0].includes(source)
				} else {
					return values.includes(source)
				}
			})
		model.addFunction('isNull(value:any):boolean', (value:any):boolean => helper.val.isNull(value))
		model.addFunction('isNotNull(value:any):boolean', (value:any):boolean => helper.val.isNotNull(value))
		model.addFunction('isEmpty(value:string):boolean', (value:any):boolean => helper.val.isEmpty(value))
		model.addFunction('isNotEmpty(value:string):boolean', (value:any):boolean => helper.val.isNotEmpty(value))
		model.addFunction('isBoolean(value:any):boolean', (value:any):boolean => helper.val.isBoolean(value))
		model.addFunction('isNumber(value:any):boolean', (value:any):boolean => helper.val.isNumber(value))
		model.addFunction('isInteger(value:any):boolean', (value:any):boolean => helper.val.isInteger(value))
		model.addFunction('isDecimal(value:any):boolean', (value:any):boolean => helper.val.isDecimal(value))
		model.addFunction('isString(value:any):boolean', (value:any):boolean => helper.val.isString(value))
		model.addFunction('isDate(value:any):boolean', (value:any):boolean => helper.val.isDate(value))
		model.addFunction('isDateTime(value:any):boolean', (value:any):boolean => helper.val.isDateTime(value))
		model.addFunction('isTime(value:any):boolean', (value:any):boolean => helper.val.isTime(value))
		model.addFunction('isObject(value:any):boolean', (value:any):boolean => helper.val.isObject(value))
		model.addFunction('isArray(value:any):boolean', (value:any):boolean => helper.val.isArray(value))
		model.addFunction('isBooleanFormat(value:string):boolean', (value:string):boolean => helper.val.isBooleanFormat(value))
		model.addFunction('isNumberFormat(value:string):boolean', (value:string):boolean => helper.val.isNumberFormat(value))
		model.addFunction('isIntegerFormat(value:string):boolean', (value:string):boolean => helper.val.isIntegerFormat(value))
		model.addFunction('isDecimalFormat(value:string):boolean', (value:string):boolean => helper.val.isDecimalFormat(value))
		model.addFunction('isDateFormat(value:string):boolean', (value:string):boolean => helper.val.isDateFormat(value))
		model.addFunction('isDateTimeFormat(value:string):boolean', (value:string):boolean => helper.val.isDateTimeFormat(value))
		model.addFunction('isTimeFormat(value:string):boolean', (value:string):boolean => helper.val.isTimeFormat(value))
	}

	private numberFunctions (model: ModelService): void {
		model.addFunction('abs(x:number):number', Math.abs)
		model.addFunction('acos(x:number):number', Math.acos)
		model.addFunction('asin(x:number):number', Math.asin)
		model.addFunction('atan(x:number):number', Math.atan)
		model.addFunction('atan2(x:number):number', Math.atan2)
		model.addFunction('ceil(x:number):number', Math.ceil)
		model.addFunction('cos(x:number):number', Math.cos)
		model.addFunction('cosh(x:number):number', Math.cosh)
		model.addFunction('exp(x:number):number', Math.exp)
		model.addFunction('floor(x:number):number', Math.floor)
		model.addFunction('ln(x:number):number', Math.log)
		model.addFunction('log10(x:number):number', Math.log10)
		model.addFunction('log(x:number):number', Math.log)
		model.addFunction('remainder(n1:number,n2:number):number', (n1: number, n2: number) => n1 % n2)
		model.addFunction('round(num:number,decimals=0):number', (num: number, decimals = 0) =>
			decimals > 0 ? Number(num.toFixed(decimals)) : Math.round(num)
		)
		model.addFunction('sign(x:number):number', Math.sign)
		model.addFunction('sin(x:number):number', Math.sin)
		model.addFunction('sinh(x:number):number', Math.sinh)
		model.addFunction('tan(x:number):number', Math.tan)
		model.addFunction('tanh(x:number):number', Math.tanh)
		model.addFunction('trunc(x:number):number', Math.trunc)
	}

	private conversionFunctions (model: ModelService): void {
		model.addFunction('toString(value:any):string', (value:any):string => helper.str.toString(value))
		model.addFunction('toNumber(value:any):number', (value:any):number => helper.utils.toNumber(value))
		model.addFunction('dateToString(date:date):string', (date:Date) => {
			if (typeof date === 'string') {
				return new Date(date).toISOString()
			}
			return date.toISOString()
		})
		model.addFunction('stringify(value:any):string', (value: any): string => JSON.stringify(value))
		model.addFunction('parse(value:string):any', (value: string): any => JSON.parse(value))
		model.addFunction('keys(obj: any):string[]', (obj: any): string[] => typeof obj === 'object' ? Object.keys(obj) : [])
		model.addFunction('values(obj: any):any[]', (obj: any): any[] => typeof obj === 'object' ? Object.values(obj) : [])
		model.addFunction('entries(obj: any):[string,any][]', (obj: any): [string, any][] => typeof obj === 'object' ? Object.entries(obj) : [])
		model.addFunction('fromEntries(entries: [string,any][]): any', (entries: [string, any][]): any => helper.obj.fromEntries(entries))
	}

	private stringFunctions (model: ModelService): void {
		model.addFunction('chr(ascii: number):string', (ascii: number):string => String.fromCharCode(ascii))
		model.addFunction('capitalize(value:string):string', (value:string):string => helper.str.capitalize(value))
		model.addFunction('endsWith(value:string, sub:string, start:number):boolean', (value:string, sub:string, start:number):boolean => value.endsWith(sub, start))
		model.addFunction('strCount(source: string, value: string):number', (source: string, value: string):number => source.split(value).length - 1)
		model.addFunction('lower(value: string):string', (value: string):string => value.toLowerCase())
		model.addFunction('lpad(value: string, len: number, pad: string):string', (value: string, len: number, pad: string):string => value.padStart(len, pad))
		model.addFunction('ltrim(value: string):string', (value: string):string => value.trimLeft())
		model.addFunction('indexOf(value:string, sub:string, start:number):number', (value:string, sub:string, start:number):number => value.indexOf(sub, start))
		model.addFunction('join(values:string[],separator:string=","):string', (values:string[], separator = ','):string => values.join(separator))
		model.addFunction('replace(value: string, source: string, target: string):string', (value: string, source: string, target: string):string => helper.str.replace(value, source, target))
		model.addFunction('rpad(value: string, len: number, pad: string):string', (value: string, len: number, pad: string):string => value.padEnd(len, pad))
		model.addFunction('rtrim(value: string):string', (value: string):string => value.trimRight())
		model.addFunction('substring(value: string, from: number, count: number):string', (value: string, from: number, count: number):string => value.substring(from, count))
		model.addFunctionAlias('substr', 'substring')
		model.addFunction('trim(value: string):string', (value: string):string => value.trim())
		model.addFunction('upper(value: string):string', (value: string):string => value.toUpperCase())
		model.addFunction('concat(...values:any):string', (...values:any):string => helper.str.concat(values))
		model.addFunctionAlias('concatenate', 'concat')
		model.addFunction('test(value: string, regexp: string):boolean', (value: any, regexp: string):boolean => new RegExp(regexp).test(value))
		model.addFunction('title(value:string):string', (value:string):string => helper.str.initCap(value))
		model.addFunction('match(value: string, regexp: string):any', (value: string, regexp: string):any => value ? value.match(regexp) : null)
		model.addFunction('mask(value: string):string', (value: string):string => {
			if (!value) return value
			if (value.length > 8) {
				return value.substring(0, 3) + '*****' + value.substring(value.length - 3, value.length)
			} else if (value.length > 5) {
				return value.substring(0, 1) + '*****' + value.substring(value.length - 1, value.length)
			} else {
				return '*'
			}
		})
		model.addFunction('split(value:string,separator:string=","):string[]', (value:string, separator = ','):string[] => value.split(separator))
		model.addFunction('startWith(value:string, sub:string, start:number):boolean', (value:string, sub:string, start:number):boolean => value.startsWith(sub, start))
	}

	private dateTimeFunctions (model: ModelService): void {
		model.addFunction('curTime():time', ():string => {
			const date = new Date()
			return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds()
		})
		model.addFunction('today():date', ():string => {
			const date = new Date()
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
		})
		model.addFunction('now():dateTime', ():string => new Date().toISOString())
		model.addFunction('time(value: string):time', (value: string):string => {
			const date = new Date(value)
			return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds()
		})
		model.addFunction('date(value: string):date', (value: string):string => {
			const date = new Date(value)
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
		})
		model.addFunction('dateTime(value: string):dateTime', (value: string):string => new Date(value).toISOString())
		model.addFunction('year(value: dateTime):integer', (value: string):number => {
			return new Date(value).getFullYear()
		})
		model.addFunction('month(value: dateTime):integer', (value: string):number => {
			return new Date(value).getMonth() + 1
		})
		model.addFunction('day(value: dateTime):integer', (value: string):number => {
			return new Date(value).getDate()
		})
		model.addFunction('weekday(value: dateTime):integer', (value: string):number => {
			return new Date(value).getDay()
		})
		model.addFunction('hour(value: dateTime):integer', (value: string) => {
			return new Date(value).getHours()
		})
		model.addFunction('minute(value: dateTime):integer', (value: string):number => {
			return new Date(value).getMinutes()
		})
		model.addFunction('second(value: dateTime):integer', (value: string):number => {
			return new Date(value).getSeconds()
		})
		model.addFunction('millisecond(value: dateTime):integer', (value: string):number => {
			return new Date(value).getMilliseconds()
		})
		model.addFunction('addYear(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setFullYear(_date.getFullYear() + value)
			return _date.toISOString()
		})
		model.addFunction('addMonth(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setMonth(_date.getMonth() + value)
			return _date.toISOString()
		})
		model.addFunction('addDay(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setDate(_date.getDate() + value)
			return _date.toISOString()
		})
		model.addFunction('addHour(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setHours(_date.getHours() + value)
			return _date.toISOString()
		})
		model.addFunction('addMinute(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setMinutes(_date.getMinutes() + value)
			return _date.toISOString()
		})
		model.addFunction('addSecond(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setSeconds(_date.getSeconds() + value)
			return _date.toISOString()
		})
		model.addFunction('addMillisecond(date: dateTime, value: number):dateTime', (date: string, value: number):string => {
			const _date = new Date(date)
			_date.setMilliseconds(_date.getMilliseconds() + value)
			return _date.toISOString()
		})
		model.addFunction('addTime(date: dateTime, time: time):dateTime', (date: string, time: string):string => {
			const _time = new Date('2000-01-01T' + time)
			const _date = new Date(date)
			_date.setHours(_date.getHours() + _time.getHours())
			_date.setMinutes(_date.getMinutes() + _time.getMinutes())
			_date.setSeconds(_date.getSeconds() + _time.getSeconds())
			_date.setMilliseconds(_date.getSeconds() + _time.getMilliseconds())
			return _date.toISOString()
		})
		model.addFunction('subtractTime(date: dateTime, time: time):dateTime', (date: string, time: string):string => {
			const _time = new Date('2000-01-01T' + time)
			const _date = new Date(date)
			_date.setHours(_date.getHours() - _time.getHours())
			_date.setMinutes(_date.getMinutes() - _time.getMinutes())
			_date.setSeconds(_date.getSeconds() - _time.getSeconds())
			_date.setMilliseconds(_date.getSeconds() - _time.getMilliseconds())
			return _date.toISOString()
		})

		model.addFunction('yearDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.abs(_date2.getFullYear() - _date1.getFullYear())
		})
		model.addFunction('dayDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor((_date1.getTime() - _date2.getTime()) / (24 * 3600 * 1000))
		})
		model.addFunction('hourDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor((_date1.getTime() - _date2.getTime()) / (3600 * 1000))
		})
		model.addFunction('secondDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor((_date1.getTime() - _date2.getTime()) / (1000))
		})
		model.addFunction('millisecondDiff(date1: dateTime, date2: dateTime):integer', (date1: string, date2: string):number => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor(_date1.getTime() - _date2.getTime())
		})
		model.addFunction('dayToDate(value: number):dateTime', (value: number):string => {
			return new Date(value * 24 * 3600 * 1000).toISOString()
		})
		model.addFunction('hourToDate(value: number):dateTime', (value: number):string => {
			return new Date(value * 3600 * 1000).toISOString()
		})
		model.addFunction('secondToDate(value: number):dateTime', (value: number):string => {
			return new Date(value * 1000).toISOString()
		})
		model.addFunction('millisecondToDate(value: number):dateTime', (value: number):string => {
			return new Date(value).toISOString()
		})
	}

	private arrayFunctions (model: ModelService): void {
		model.addFunction('map(list: any[], predicate: T):T[]', new Map(this.builder, this.operandClone))
		model.addFunctionAlias('select', 'map')
		model.addFunction('foreach(list: any[], predicate: any):void', new Foreach())
		model.addFunctionAlias('each', 'foreach')
		model.addFunction('filter(list: T[], predicate: boolean):T[]', new Filter())
		model.addFunctionAlias('where', 'filter')
		model.addFunction('reverse(list: T[], predicate: any):T[]', new Reverse())
		model.addFunction('sort(list: T[], predicate: any):T[]', new Sort())
		model.addFunctionAlias('order', 'sort')
		model.addFunction('remove(list: T[], predicate: boolean):T[]', new Remove())
		model.addFunctionAlias('delete', 'remove')
		model.addFunction('push(list: T[], value: T):T[]', (list: any[], item: any): any => {
			list.push(item)
			return list
		})
		model.addFunctionAlias('insert', 'push')
		model.addFunction('bulkInsert(list: T[], value: T[]):T[]', (list: any[], items: any[]): any => {
			for (const item of items) {
				list.push(item)
			}
			return list
		})
		model.addFunction('pop(list: T[]): T', (list: any[]): any => list.pop())
		model.addFunction('length(source: any[]|string):number', (source: any[]|string):number => source.length)
		model.addFunctionAlias('len', 'length')
		model.addFunction('slice(list: T[], from:integer, to:integer):T[]', (list: any[], from:number, to:number):any[] => list.slice(from, to))
		model.addFunction('page(list: T[], page:integer, records:integer):T[]', (list: any[], page:number, records:number):any[] => {
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
		// this.addFunction('update', ArrayFunctions.update, OperatorType.arrow, Update)
	}

	private groupFunctions (model: ModelService): void {
		model.addFunction('distinct(list: any[], predicate: any): any[]', new Distinct())
		model.addFunction('first(list: T[], predicate: boolean): T', new First())
		model.addFunction('last(list: T[], predicate: boolean): T', new Last())
		model.addFunction('count(list: T[], predicate: boolean): integer', new Count())
		model.addFunction('max(list: T[], predicate: boolean): T', new Max())
		model.addFunction('min(list: T[], predicate: boolean): T', new Min())
		model.addFunction('avg(list: T[], value: number): number', new Avg())
		model.addFunction('sum(list: T[], value: number): number', new Sum())
	}

	private setsFunctions (model: ModelService): void {
		model.addFunction('union(a: T[], b: T[]): T[]', new Union())
		model.addFunction('intersection(a: T[], b: T[]): T[]', new Intersection())
		model.addFunction('difference(a: T[], b: T[]): T[]', new Difference())
		model.addFunction('symmetricDifference(a: T[], b: T[]): T[]', new SymmetricDifference())
	}
}

class And extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new And(operand)
	}

	public eval (context: Context): boolean {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		if (!this.operand.children[0].eval(context) as boolean) return false
		return this.operand.children[1].eval(context) as boolean
	}
}
class Or extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Or(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		if (this.operand.children[0].eval(context)) return true
		return this.operand.children[1].eval(context)
	}
}
class Assignment extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Assignment(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentAddition extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentAddition(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[0].eval(context) + this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentSubtraction extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentSubtraction(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[0].eval(context) - this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentMultiplication extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentMultiplication(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[0].eval(context) * this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentDivision extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentDivision(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[0].eval(context) / this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentExponentiation extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentExponentiation(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[0].eval(context) ** this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentFloorDivision extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentFloorDivision(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = Math.floor(this.operand.children[0].eval(context) / this.operand.children[1].eval(context))
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentMod extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentMod(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[0].eval(context) % this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentBitAnd extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentBitAnd(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[0].eval(context) & this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentBitOr extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentBitOr(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[0].eval(context) | this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentBitXor extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentBitXor(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[0].eval(context) ^ this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentLeftShift extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentLeftShift(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[0].eval(context) << this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class AssignmentRightShift extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new AssignmentRightShift(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const value = this.operand.children[0].eval(context) >> this.operand.children[1].eval(context)
		context.data.set(this.operand.children[0].name, value)
		return value
	}
}
class Map extends PrototypeEvaluator {
	// eslint-disable-next-line no-useless-constructor
	public constructor (
		private readonly builder:OperandBuilder,
		private readonly operandClone:OperandClone,
		operand?: Operand) {
		super(operand)
	}

	public clone (operand:Operand): IEvaluator {
		return new Map(this.builder, this.operandClone, operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const rows = []
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (this.operand.children[2].type === OperandType.Obj) {
			const groupers:Operand[] = []
			const aggregates:Operand[] = []
			for (const child of this.operand.children[2].children) {
				// In the case of being an object the value to return, find out if there are fields that are summarized
				const keyValue = child
				if (keyValue) {
					if (helper.operand.haveAggregates(keyValue.children[0])) {
						aggregates.push(keyValue)
					} else {
						groupers.push(keyValue)
					}
				}
			}
			if (aggregates.length > 0) {
				// case with aggregate functions
				const keys = helper.operand.getKeys(this.operand.children[1], groupers, list, context)
				// once you got all the keys you have to calculate the aggregates fields
				const variable = this.operand.children[1]
				for (const key of keys) {
					for (const keyValue of aggregates) {
						const operandCloned = this.operandClone.clone(keyValue.children[0], 'sync')
						const operandResolved = helper.operand.solveAggregates(key.items, variable, operandCloned, context)
						const value = operandResolved.eval(context)
						key.summarizers.push({ name: keyValue.name, value })
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
		} else if (this.operand.children[2].type === OperandType.Var && !Array.isArray(list)) {
			// Example orders.0.number
			return list
		}
		// simple case without aggregate functions
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.operand.children[1].name, item)
			const row = this.operand.children[2].eval(childContext)
			rows.push(row)
		}
		return rows
	}
}
class Distinct extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Distinct(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const rows = []
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (this.operand.children.length === 1) {
			// simple case
			for (const item of list) {
				if (rows.find((p:any) => p === item) === undefined) {
					rows.push(item)
				}
			}
			return rows
		} else if (this.operand.children[2].type === OperandType.Obj) {
			// case with aggregate functions
			const keys = helper.operand.getKeys(this.operand.children[1], this.operand.children[2].children, list, context.newContext())
			// build the list of results
			for (const key of keys) {
				const row:any = {}
				for (const value of key.values) {
					row[value.name] = value.value
				}
				rows.push(row)
			}
			return rows
		} else if (this.operand.children[2].type === OperandType.List) {
			throw new Error('Distinct not support Array result')
		}
		// simple case without aggregate functions
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.operand.children[1].name, item)
			const value = this.operand.children[2].eval(childContext)
			if (rows.find((p:any) => p === value) === undefined) {
				rows.push(value)
			}
		}
		return rows
	}
}
class Foreach extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Foreach(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.operand.children[1].name, item)
			this.operand.children[2].eval(childContext)
		}
		return list
	}
}
class Filter extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Filter(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const rows = []
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.operand.children[1].name, item)
			if (this.operand.children[2].eval(childContext)) {
				rows.push(item)
			}
		}
		return rows
	}
}
class Reverse extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Reverse(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (this.operand.children.length === 1) {
			return list.reverse()
		}
		const values = []
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.operand.children[1].name, item)
			const value = this.operand.children[2].eval(childContext)
			values.push({ value, p: item })
		}
		values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0)
		values.reverse()
		return values.map(p => p.p)
	}
}
class Sort extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Sort(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const values = []
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (this.operand.children.length === 1) {
			return list.sort()
		}
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.operand.children[1].name, item)
			const value = this.operand.children[2].eval(childContext)
			values.push({ value, p: item })
		}
		values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0)
		return values.map(p => p.p)
	}
}
class Remove extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Remove(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const rows = []
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		const childContext = context.newContext()
		for (const item of list) {
			childContext.data.set(this.operand.children[1].name, item)
			if (!this.operand.children[2].eval(childContext)) {
				rows.push(item)
			}
		}
		return rows
	}
}
class First extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new First(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (this.operand.children.length === 1) {
			return list && list.length > 0 ? list[0] : null
		}
		return helper.operand.first(list, this.operand.children[1], this.operand.children[2], context.newContext())
	}
}
class Last extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Last(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (this.operand.children.length === 1) {
			return list && list.length > 0 ? list[list.length - 1] : null
		}
		return helper.operand.last(list, this.operand.children[1], this.operand.children[2], context.newContext())
	}
}
class Count extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Count(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (this.operand.children.length === 1) {
			return list.length
		}
		return helper.operand.count(list, this.operand.children[1], this.operand.children[2], context.newContext())
	}
}
class Max extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Max(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (this.operand.children.length === 1) {
			let max:any
			for (const item of list) {
				if (max === undefined || (item !== null && item > max)) {
					max = item
				}
			}
			return max
		}
		return helper.operand.max(list, this.operand.children[1], this.operand.children[2], context.newContext())
	}
}
class Min extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Min(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (this.operand.children.length === 1) {
			let min:any
			for (const item of list) {
				if (min === undefined || (item !== null && item < min)) {
					min = item
				}
			}
			return min
		}
		return helper.operand.min(list, this.operand.children[1], this.operand.children[2], context.newContext())
	}
}
class Avg extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Avg(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (this.operand.children.length === 1) {
			let sum = 0
			for (const item of list) {
				if (item !== null) {
					sum = sum + item
				}
			}
			return list.length > 0 ? sum / list.length : 0
		}
		return helper.operand.avg(list, this.operand.children[1], this.operand.children[2], context.newContext())
	}
}
class Sum extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Sum(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const list: any[] = this.operand.children[0].eval(context)
		if (!list) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (this.operand.children.length === 1) {
			let sum = 0
			for (const item of list) {
				if (item !== null) {
					sum = sum + item
				}
			}
			return sum
		}
		return helper.operand.sum(list, this.operand.children[1], this.operand.children[2], context.newContext())
	}
}
class Union extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Union(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const a: any[] = this.operand.children[0].eval(context)
		const b: any[] = this.operand.children[1].eval(context)
		if (!a) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (!b) {
			throw new Error(`Array ${this.operand.children[1].name} undefined`)
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
				const key = helper.operand.objectKey(element)
				result.push({ key, value: element })
			}
			for (const element of b) {
				const key = helper.operand.objectKey(element)
				if (!result.find((p:any) => p.key === key)) {
					result.push({ key, value: element })
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
class Intersection extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Intersection(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const a: any[] = this.operand.children[0].eval(context)
		const b: any[] = this.operand.children[1].eval(context)
		if (!a) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (!b) {
			throw new Error(`Array ${this.operand.children[1].name} undefined`)
		}
		if (a.length === 0 || b.length === 0) {
			return []
		}
		const result:any[] = []
		if (Array.isArray(a[0]) || Array.isArray(b[0])) {
			throw new Error('Cannot union arrays of arrays')
		} else if (typeof a[0] === 'object') {
			const keys = a.map((p:any) => helper.operand.objectKey(p))
			for (const element of b) {
				const key = helper.operand.objectKey(element)
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
class Difference extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new Difference(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const a: any[] = this.operand.children[0].eval(context)
		const b: any[] = this.operand.children[1].eval(context)
		if (!a) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (!b) {
			throw new Error(`Array ${this.operand.children[1].name} undefined`)
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
			const keys = b.map((p:any) => helper.operand.objectKey(p))
			for (const element of a) {
				const key = helper.operand.objectKey(element)
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
class SymmetricDifference extends PrototypeEvaluator {
	public clone (operand:Operand): IEvaluator {
		return new SymmetricDifference(operand)
	}

	public eval (context: Context): any {
		if (this.operand === undefined) {
			throw new Error('Operand undefined')
		}
		const a: any[] = this.operand.children[0].eval(context)
		const b: any[] = this.operand.children[1].eval(context)
		if (!a) {
			throw new Error(`Array ${this.operand.children[0].name} undefined`)
		}
		if (!b) {
			throw new Error(`Array ${this.operand.children[1].name} undefined`)
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
			const aKeys = a.map((p:any) => helper.operand.objectKey(p))
			const bKeys = b.map((p:any) => helper.operand.objectKey(p))
			for (const element of a) {
				const key = helper.operand.objectKey(element)
				if (!bKeys.includes(key)) {
					result.push(element)
				}
			}
			for (const element of b) {
				const key = helper.operand.objectKey(element)
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
