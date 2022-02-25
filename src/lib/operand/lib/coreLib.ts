/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Library } from '../library'
import { OperatorType } from './../../model'
import { Operator, ArrowFunction } from '../operands'
import { Helper } from '../../manager'

export class CoreLib extends Library {
	constructor () {
		super('core')
		this.initEnums()
		this.initOperators()
		this.generalFunctions()
		this.conditionFunctions()
		this.nullablesFunctions()
		this.mathFunctions()
		this.stringFunctions()
		this.initArrowFunctions()
		this.datetimeFunctions()
		this.convertFunctions()
	}

	private initEnums () {
		// empty
	}

	private initOperators () {
		this.addOperator('+', Operators.addition)
		this.addOperator('-', Operators.subtraction)
		this.addOperator('-', Operators.negative)
		this.addOperator('*', Operators.multiplication)
		this.addOperator('/', Operators.division)
		this.addOperator('**', Operators.exponentiation)
		this.addOperator('//', Operators.floorDivision)
		this.addOperator('%', Operators.mod)

		this.addOperator('&', Operators.bitAnd)
		this.addOperator('|', Operators.bitOr)
		this.addOperator('^', Operators.bitXor)
		this.addOperator('~', Operators.bitNot)
		this.addOperator('<<', Operators.leftShift)
		this.addOperator('>>', Operators.rightShift)

		this.addOperator('==', Operators.equal)
		this.addOperator('!=', Operators.notEqual)
		this.addOperator('>', Operators.greaterThan)
		this.addOperator('<', Operators.lessThan)
		this.addOperator('>=', Operators.greaterThanOrEqual)
		this.addOperator('<=', Operators.lessThanOrEqual)

		this.addOperator('&&', Operators.and, And)
		this.addOperator('||', Operators.or, Or)
		this.addOperator('!', Operators.not)

		this.addOperator('[]', Operators.item)

		this.addOperator('=', Operators.assigment, Assigment)
		this.addOperator('+=', Operators.assigmentAddition, AssigmentAddition)
		this.addOperator('-=', Operators.assigmentSubtraction, AssigmentSubtraction)
		this.addOperator('*=', Operators.assigmentMultiplication, AssigmentMultiplication)
		this.addOperator('/=', Operators.assigmentDivision, AssigmentDivision)
		this.addOperator('**=', Operators.assigmentExponentiation, AssigmentExponentiation)
		this.addOperator('//=', Operators.assigmentFloorDivision, AssigmentFloorDivision)
		this.addOperator('%=', Operators.assigmentMod, AssigmentMod)
		this.addOperator('&=', Operators.assigmentBitAnd, AssigmentBitAnd)
		this.addOperator('|=', Operators.assigmentBitOr, AssigmentBitOr)
		this.addOperator('^=', Operators.assigmentBitXor, AssigmentBitXor)
		this.addOperator('<<=', Operators.assigmentLeftShift, AssigmentLeftShift)
		this.addOperator('>>=', Operators.assigmentRightShift, AssigmentRightShift)
	}

	private generalFunctions () {
		this.addFunction('sleep', Functions.sleep)
		this.addFunction('stringify', (value: any):string => JSON.stringify(value))
		this.addFunction('parse', (value: string): any => JSON.parse(value))
	}

	private conditionFunctions () {
		this.addFunction('between', Functions.between)
		this.addFunction('in', Functions.in)
	}

	private nullablesFunctions () {
		this.addFunction('nvl', Functions.nvl)
		this.addFunction('nvl2', Functions.nvl2)
		this.addFunction('isNull', Functions.isNull)
		this.addFunction('isNotNull', Functions.isNotNull)
		this.addFunction('isEmpty', Functions.isEmpty)
	}

	private mathFunctions () {
		this.addFunction('abs', Math.abs)
		this.addFunction('acos', Math.acos)
		this.addFunction('asin', Math.asin)
		this.addFunction('atan', Math.atan)
		this.addFunction('atan2', Math.atan2)
		this.addFunction('ceil', Math.ceil)
		this.addFunction('cos', Math.cos)
		this.addFunction('cosh', Math.cosh)
		this.addFunction('exp', Math.exp)
		this.addFunction('floor', Math.floor)
		// this.addFunction('ln',)
		this.addFunction('log10', Math.log10)
		this.addFunction('log', Math.log)
		this.addFunction('remainder', (n1:number, n2:number) => n1 % n2)
		this.addFunction('round', Math.round)
		this.addFunction('sign', Math.sign)
		this.addFunction('sin', Math.sin)
		this.addFunction('sinh', Math.sinh)
		this.addFunction('tan', Math.tan)
		this.addFunction('tanh', Math.tanh)
		this.addFunction('trunc', Math.trunc)
	}

	private stringFunctions () {
		this.addFunction('chr', (ascii: number) => String.fromCharCode(ascii))
		this.addFunction('capitalize', StringFunction.capitalize)
		this.addFunction('initcap', StringFunction.initCap)
		this.addFunction('strCount', (source:string, value:string) => source.split(value).length - 1)
		this.addFunction('lower', (str:string) => str.toLowerCase())
		this.addFunction('lpad', (str:string, len:number, pad:string) => str.padStart(len, pad))
		this.addFunction('ltrim', (str:string) => str.trimLeft())
		this.addFunction('replace', (str:string, source:string, target:string) => Helper.replace(str, source, target))
		this.addFunction('rpad', (str:string, len:number, pad:string) => str.padEnd(len, pad))
		this.addFunction('rtrim', (str:string) => str.trimRight())
		this.addFunction('substring', (str:string, from:number, count:number) => str.substring(from, count))
		this.addFunction('trim', (str:string) => str.trim())
		this.addFunction('upper', (str:string) => str.toUpperCase())
		this.addFunction('concat', (...strings: string[]) => ''.concat(...strings))
		this.addFunction('test', (value:any, regexp:string) => {
			const _regexp = new RegExp(regexp)
			return _regexp.test(value)
		})
		this.addFunction('match', (value: string, regexp: string) => {
			return value ? value.match(regexp) : null
		})
	}

	// TODO: trabajar todas las fechas como strign en formato ISO
	private datetimeFunctions () {
		this.addFunction('curtime', () => {
			const date = new Date()
			return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds()
		})
		this.addFunction('today', () => {
			const date = new Date()
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
		})
		this.addFunction('now', () => new Date().toISOString())
		this.addFunction('time', (value:string) => {
			const date = new Date(value)
			return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds()
		})
		this.addFunction('date', (value:string) => {
			const date = new Date(value)
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
		})
		this.addFunction('datetime', (value:string) => new Date(value).toISOString())
		this.addFunction('year', (value: string) => {
			return new Date(value).getFullYear()
		})
		this.addFunction('month', (value: string) => {
			return new Date(value).getMonth()
		})
		this.addFunction('day', (value: string) => {
			return new Date(value).getDate()
		})
		this.addFunction('weekday', (value: string) => {
			return new Date(value).getDay()
		})
		this.addFunction('hours', (value: string) => {
			return new Date(value).getHours()
		})
		this.addFunction('minutes', (value: string) => {
			return new Date(value).getMinutes()
		})
		this.addFunction('seconds', (value: string) => {
			return new Date(value).getSeconds()
		})
		this.addFunction('addYear', (date: string, value: number) => {
			const _date = new Date(date)
			_date.setFullYear(_date.getFullYear() + value)
			return _date.toISOString()
		})
		this.addFunction('addMonth', (date: string, value: number) => {
			const _date = new Date(date)
			_date.setMonth(_date.getMonth() + value)
			return _date.toISOString()
		})
		this.addFunction('addDay', (date: string, value: number) => {
			const _date = new Date(date)
			_date.setDate(_date.getDate() + value)
			return _date.toISOString()
		})
		this.addFunction('addHours', (date: string, value: number) => {
			const _date = new Date(date)
			_date.setHours(_date.getHours() + value)
			return _date.toISOString()
		})
		this.addFunction('addMinutes', (date: string, value: number) => {
			const _date = new Date(date)
			_date.setMinutes(_date.getMinutes() + value)
			return _date.toISOString()
		})
		this.addFunction('addSeconds', (date: string, value: number) => {
			const _date = new Date(date)
			_date.setSeconds(_date.getSeconds() + value)
			return _date.toISOString()
		})
		this.addFunction('addTime', (date: string, time: string) => {
			const _time = new Date('2000-01-01T' + time)
			const _date = new Date(date)
			_date.setHours(_date.getHours() + _time.getHours())
			_date.setMinutes(_date.getMinutes() + _time.getMinutes())
			_date.setSeconds(_date.getSeconds() + _time.getSeconds())
			_date.setMilliseconds(_date.getSeconds() + _time.getMilliseconds())
			return _date.toISOString()
		})
		this.addFunction('dateDiff', (date1: string, date2: string) => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor((_date1.getTime() - _date2.getTime()) / (24 * 3600 * 1000))
		})
		this.addFunction('timeDiff', (date1: string, date2: string) => {
			const _date1 = new Date(date1)
			const _date2 = new Date(date2)
			return Math.floor((_date1.getTime() - _date2.getTime()) / (24 * 60))
		})
	}

	private initArrowFunctions () {
		this.addFunction('map', ArrayFunctions.map, OperatorType.arrow, Map)
		this.addFunction('foreach', ArrayFunctions.foreach, OperatorType.arrow, Foreach)
		this.addFunction('filter', ArrayFunctions.filter, OperatorType.arrow, Filter)
		this.addFunction('reverse', ArrayFunctions.reverse, OperatorType.arrow, Reverse)
		this.addFunction('first', ArrayFunctions.first, OperatorType.arrow, First)
		this.addFunction('last', ArrayFunctions.last, OperatorType.arrow, Last)
		this.addFunction('sort', ArrayFunctions.sort, OperatorType.arrow, Sort)
		this.addFunction('remove', ArrayFunctions.remove, OperatorType.arrow, Remove)
		this.addFunction('push', (list: any[], item: any): number => list.push(item), OperatorType.child)
		this.addFunction('pop', (list: any[]): number => list.pop(), OperatorType.child)
		this.addFunction('length', (list: any[]) => list.length, OperatorType.child)
		// this.addFunction('insert', ArrayFunctions.insert, OperatorType.arrow, Insert)
		// this.addFunction('update', ArrayFunctions.update, OperatorType.arrow, Update)
	}

	private convertFunctions () {
		this.addFunction('toString', Functions.toString)
		this.addFunction('toJson', Functions.toJson)
		this.addFunction('toNumber', Functions.toNumber)
	}
}

class Operators {
	static addition (a: number, b: number): number {
		return a + b
	}

	static subtraction (a: number, b: number): number {
		return a - b
	}

	static negative (a: number): number {
		return a * -1
	}

	static multiplication (a: number, b: number): number {
		return a * b
	}

	static division (a: number, b: number): number {
		return a / b
	}

	static exponentiation (a: number, b: number): number {
		return a ** b
	}

	static floorDivision (a: number, b: number): number {
		return Math.pow(a, 1 / b)
	}

	static mod (a: number, b: number): number {
		return a % b
	}

	static bitAnd (a: number, b: number): number {
		return a & b
	}

	static bitOr (a: number, b: number): number {
		return a | b
	}

	static bitXor (a: number, b: number): number {
		return a ^ b
	}

	static bitNot (a: number): number {
		return ~a
	}

	static leftShift (a: number, b: number): number {
		return a << b
	}

	static rightShift (a: number, b: number): number {
		return a >> b
	}

	static equal (a: any, b: any): boolean {
		return a === b
	}

	static notEqual (a: any, b: any): boolean {
		return a !== b
	}

	static greaterThan (a: any, b: any): boolean {
		return a > b
	}

	static lessThan (a: any, b: any): boolean {
		return a < b
	}

	static greaterThanOrEqual (a: any, b: any): boolean {
		return a >= b
	}

	static lessThanOrEqual (a: any, b: any): boolean {
		return a <= b
	}

	static and (a: boolean, b: boolean): boolean {
		return a && b
	}

	static or (a: boolean, b: boolean): boolean {
		return a || b
	}

	static not (a: boolean): boolean {
		return !a
	}

	static item (list: any[], index: any):any {
		return list[index]
	}

	static assigment (a:any, b:any):any {
		throw new Error('NotImplemented')
	}

	static assigmentAddition (a: number, b: number): number {
		throw new Error('NotImplemented')
	}

	static assigmentSubtraction (a: number, b: number): number {
		throw new Error('NotImplemented')
	}

	static assigmentMultiplication (a: number, b: number): number {
		throw new Error('NotImplemented')
	}

	static assigmentDivision (a: number, b: number): number {
		throw new Error('NotImplemented')
	}

	static assigmentExponentiation (a: number, b: number): number {
		throw new Error('NotImplemented')
	}

	static assigmentFloorDivision (a: number, b: number): number {
		throw new Error('NotImplemented')
	}

	static assigmentMod (a: number, b: number): number {
		throw new Error('NotImplemented')
	}

	static assigmentBitAnd (a: number, b: number): number {
		throw new Error('NotImplemented')
	}

	static assigmentBitOr (a: number, b: number): number {
		throw new Error('NotImplemented')
	}

	static assigmentBitXor (a: number, b: number): number {
		throw new Error('NotImplemented')
	}

	static assigmentLeftShift (a: number, b: number): number {
		throw new Error('NotImplemented')
	}

	static assigmentRightShift (a: number, b: number): number {
		throw new Error('NotImplemented')
	}
}
class And extends Operator {
	eval ():boolean {
		if (!this.children[0].eval() as boolean) return false
		return this.children[1].eval() as boolean
	}
}
class Or extends Operator {
	eval ():any {
		if (this.children[0].eval()) return true
		return this.children[1].eval()
	}
}

class Assigment extends Operator {
	eval (): any {
		const value = this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentAddition extends Operator {
	eval (): any {
		const value = this.children[0].eval() + this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentSubtraction extends Operator {
	eval (): any {
		const value = this.children[0].eval() - this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentMultiplication extends Operator {
	eval (): any {
		const value = this.children[0].eval() * this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentDivision extends Operator {
	eval (): any {
		const value = this.children[0].eval() / this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentExponentiation extends Operator {
	eval (): any {
		const value = this.children[0].eval() ** this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentFloorDivision extends Operator {
	eval (): any {
		const value = this.children[0].eval() // this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentMod extends Operator {
	eval (): any {
		const value = this.children[0].eval() % this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentBitAnd extends Operator {
	eval (): any {
		const value = this.children[0].eval() & this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentBitOr extends Operator {
	eval (): any {
		const value = this.children[0].eval() | this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentBitXor extends Operator {
	eval (): any {
		const value = this.children[0].eval() ^ this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentLeftShift extends Operator {
	eval (): any {
		const value = this.children[0].eval() << this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}
class AssigmentRightShift extends Operator {
	eval (): any {
		const value = this.children[0].eval() >> this.children[1].eval()
		this.children[0].set(value)
		return value
	}
}

class StringFunction {
	public static capitalize = function (str:string):string {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	public static initCap (str:string):string {
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
		return !Functions.isEmpty(value) ? value : _default
	}

	static nvl2 (value: any, a: any, b: any): any {
		return !Functions.isEmpty(value) ? a : b
	}

	static isNull (value: any): boolean {
		return value === null || value === undefined
	}

	static isNotNull (value: any): boolean {
		return !Functions.isNull(value)
	}

	static isEmpty (value: any): boolean {
		return value === null || value === undefined || value.toString().trim().length === 0
	}

	static async sleep (ms = 1000): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(resolve, ms)
		})
	}

	static between (value: any, from: any, to: any): boolean {
		return value >= from && value < to
	}

	static in (value: any, list: any[]): boolean {
		if (list && value) {
			return list.includes(value)
		} else {
			return false
		}
	}

	static toString (value: any): string {
		return Functions.isNull(value) ? '' : value.toString()
	}

	static toJson (value: string): any {
		return JSON.parse(value)
	}

	static toNumber (value: any): number {
		return Functions.isNull(value) ? 0 : parseFloat(value)
	}
}

class ArrayFunctions {
	static map (list: any[], method: Function): any[] { throw new Error('Empty') }
	static foreach (list: any[], method: Function): void { throw new Error('Empty') }
	static filter (list: any[], method: Function):any[] { throw new Error('Empty') }
	static reverse (list: any[], method: Function): any[] { throw new Error('Empty') }
	static first (list: any[], method: Function): any | null { throw new Error('Empty') }
	static last (list:any[], method:Function):any|null { throw new Error('Empty') }
	static sort (list: any[], method: Function):any[] { throw new Error('Empty') }
	static remove (list: any[], method: Function): number { throw new Error('Empty') }

	static insert (list:any[], item:any) { throw new Error('Empty') }
	static update (list:any[], item:any, method:Function) { throw new Error('Empty') }
}

class Map extends ArrowFunction {
	eval ():any {
		const rows = []
		const list:any[] = this.children[0].eval()
		for (let i = 0; i < list.length; i++) {
			const p = list[i]
			this.children[1].set(p)
			const row = this.children[2].eval()
			rows.push(row)
		}
		return rows
	}
}
class Foreach extends ArrowFunction {
	eval ():any {
		const list:any[] = this.children[0].eval()
		for (let i = 0; i < list.length; i++) {
			const p = list[i]
			this.children[1].set(p)
			this.children[2].eval()
		}
	}
}
class Filter extends ArrowFunction {
	eval ():any {
		const rows = []
		const list:any[] = this.children[0].eval()
		for (let i = 0; i < list.length; i++) {
			const p = list[i]
			this.children[1].set(p)
			if (this.children[2].eval()) {
				rows.push(p)
			}
		}
		return rows
	}
}
class Reverse extends ArrowFunction {
	eval ():any {
		const list: any[] = this.children[0].eval()
		if (this.children.length === 1) {
			return list.reverse()
		}
		const values = []
		for (let i = 0; i < list.length; i++) {
			const p = list[i]
			this.children[1].set(p)
			const value = this.children[2].eval()
			values.push({ value: value, p: p })
		}
		values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0)
		values.reverse()
		return values.map(p => p.p)
	}
}
class First extends ArrowFunction {
	eval ():any {
		const rows = []
		const list:any[] = this.children[0].eval()
		for (let i = 0; i < list.length; i++) {
			const p = list[i]
			this.children[1].set(p)
			if (this.children[2].eval()) {
				return p
			}
		}
		return null
	}
}
class Last extends ArrowFunction {
	eval ():any {
		const rows = []
		const list:any[] = this.children[0].eval()
		for (let i = list.length - 1; i >= 0; i--) {
			const p = list[i]
			this.children[1].set(p)
			if (this.children[2].eval()) {
				return p
			}
		}
		return null
	}
}
class Sort extends ArrowFunction {
	eval ():any {
		const values = []
		const list:any[] = this.children[0].eval()
		for (let i = 0; i < list.length; i++) {
			const p = list[i]
			this.children[1].set(p)
			const value = this.children[2].eval()
			values.push({ value: value, p: p })
		}
		values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0)
		return values.map(p => p.p)
	}
}
class Remove extends ArrowFunction {
	eval ():any {
		const rows = []
		const list:any[] = this.children[0].eval()
		for (let i = 0; i < list.length; i++) {
			const p = list[i]
			this.children[1].set(p)
			if (!this.children[2].eval()) {
				rows.push(p)
			}
		}
		return rows
	}
}

// class Insert extends ArrowFunction {
// eval ():any {
// throw new Error('NotImplemented')
// }
// }
// class Update extends ArrowFunction {
// eval ():any {
// throw new Error('NotImplemented')
// }
// }
// class Delete extends ArrowFunction {
// eval ():any {
// throw new Error('NotImplemented')
// }
// }
// class GroupBy extends ArrowFunction {
// eval ():any {
// throw new Error('NotImplemented')
// }
// }
// class Having extends ArrowFunction {
// eval ():any {
// throw new Error('NotImplemented')
// }
// }
