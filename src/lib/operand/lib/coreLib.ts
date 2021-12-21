/* eslint-disable @typescript-eslint/no-unused-vars */
import { Library } from '../library'
import { Operator, ArrowFunction } from '../operands'

export class CoreLib extends Library {
	constructor () {
		super('core')
		this.initEnums()
		this.initOperators()
		this.numericFunctions()
		this.stringFunctions()
		this.initArrowFunctions()
		this.datetimeFunctions()
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
	}

	private numericFunctions () {
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
		this.addFunction('chr', (ascii:number) => String.fromCharCode(ascii))
		this.addFunction('initcap', StringFunction.initCap)
		this.addFunction('lower', (str:string) => str.toLowerCase())
		this.addFunction('lpad', (str:string, len:number, pad:string) => str.padStart(len, pad))
		this.addFunction('ltrim', (str:string) => str.trimLeft())
		this.addFunction('replace', (str:string, source:string, target:string) => str.replace(source, target))
		this.addFunction('rpad', (str:string, len:number, pad:string) => str.padEnd(len, pad))
		this.addFunction('rtrim', (str:string) => str.trimRight())
		this.addFunction('substr', (str:string, from:number, count:number) => str.substring(from, count))
		this.addFunction('trim', (str:string) => str.trim())
		this.addFunction('upper', (str:string) => str.toUpperCase())
		this.addFunction('concat', (...strings:string[]) => ''.concat(...strings))
	}

	private datetimeFunctions () {
		this.addFunction('curtime', () => Date.now())
		this.addFunction('today', () => new Date())
		this.addFunction('now', () => Date.now())
		this.addFunction('time', (value:string) => new Date(value).getTime())
		this.addFunction('date', (value:string) => Date.parse(value))
		this.addFunction('datetime', (value:string) => new Date(value))
		this.addFunction('year', (value:Date) => value.getFullYear())
		this.addFunction('month', (value:Date) => value.getMonth())
		this.addFunction('day', (value:Date) => value.getDate())
		this.addFunction('weekday', (value:Date) => value.getDay())
		this.addFunction('hours', (value:Date) => value.getHours())
		this.addFunction('minutes', (value:Date) => value.getMinutes())
		this.addFunction('seconds', (value:Date) => value.getSeconds())
		this.addFunction('addYear', (date: Date, value: number) => {
			date.setFullYear(date.getFullYear() + value)
			return date
		})
		this.addFunction('addMonth', (date: Date, value: number) => {
			date.setMonth(date.getMonth() + value)
			return date
		})
		this.addFunction('addDay', (date: Date, value: number) => {
			date.setDate(date.getDate() + value)
			return date
		})
		this.addFunction('addHours', (date: Date, value: number) => {
			date.setHours(date.getHours() + value)
			return date
		})
		this.addFunction('addMinutes', (date: Date, value: number) => {
			date.setMinutes(date.getMinutes() + value)
			return date
		})
		this.addFunction('addSeconds', (date: Date, value: number) => {
			date.setSeconds(date.getSeconds() + value)
			return date
		})
		this.addFunction('addTime', (date: Date, value: number) => {
			date.setTime(date.getTime() + value)
			return date
		})
		this.addFunction('dateDiff', (date1: Date, date2: Date) => {
			return Math.floor((date1.getTime() - date2.getTime()) / (24 * 3600 * 1000))
		})
		this.addFunction('timeDiff', (date1: Date, date2: Date) => {
			return Math.floor((date1.getTime() - date2.getTime()) / (24 * 60))
		})
	}

	private initArrowFunctions () {
		this.addFunction('map', ArrowFunctions.map, Map, true)
		this.addFunction('insert', ArrowFunctions.insert, Insert, true)
		this.addFunction('update', ArrowFunctions.update, Update, true)
		this.addFunction('delete', ArrowFunctions.delete, Delete, true)
		this.addFunction('filter', ArrowFunctions.filter, Filter, true)
		this.addFunction('groupBy', ArrowFunctions.groupBy, GroupBy, true)
		this.addFunction('having', ArrowFunctions.having, Having, true)
		this.addFunction('sort', ArrowFunctions.sort, Sort, true)
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
			arr.push(StringFunction.capitalize(StringFunction.initCap(newStr[i])))
		}
		return arr.join(' ')
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

	static item (list: any[], index: any) {
		return list[index]
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

class ArrowFunctions {
	static map (list:any, item:any, method:any) { throw new Error('Empty') }
	static insert (list:any, item:any, method:any) { throw new Error('Empty') }
	static update (list:any, item:any, method:any) { throw new Error('Empty') }
	static delete (list:any, item:any, method:any) { throw new Error('Empty') }
	static filter (list:any, item:any, method:any) { throw new Error('Empty') }
	static groupBy (list:any, item:any, method:any) { throw new Error('Empty') }
	static having (list:any, item:any, method:any) { throw new Error('Empty') }
	static sort (list:any, item:any, method:any) { throw new Error('Empty') }
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
class Insert extends ArrowFunction {
	eval ():any {
		throw new Error('NotImplemented')
	}
}
class Update extends ArrowFunction {
	eval ():any {
		throw new Error('NotImplemented')
	}
}
class Delete extends ArrowFunction {
	eval ():any {
		throw new Error('NotImplemented')
	}
}
class Filter extends ArrowFunction {
	eval ():any {
		throw new Error('NotImplemented')
	}
}
class GroupBy extends ArrowFunction {
	eval ():any {
		throw new Error('NotImplemented')
	}
}
class Having extends ArrowFunction {
	eval ():any {
		throw new Error('NotImplemented')
	}
}
class Sort extends ArrowFunction {
	eval ():any {
		throw new Error('NotImplemented')
	}
}
