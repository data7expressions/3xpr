"use strict";
// /* eslint-disable @typescript-eslint/ban-types */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Library } from '../library'
// import { OperatorType, Operand, Context, Data } from './../../model'
// import { Operator, ArrowFunction, ChildFunction, Obj, KeyValue, Constant, Variable, List, FunctionRef } from '../operands'
// import { expressions as exp } from '../../index'
// import { Helper } from '../../manager'
// export class CoreLib extends Library {
// constructor () {
// super('core')
// this.initEnums()
// this.initOperators()
// this.generalFunctions()
// this.comparisonFunctions()
// this.nullFunctions()
// this.numberFunctions()
// this.stringFunctions()
// this.initArrayFunctions()
// this.initArrayGroupFunctions()
// this.dateTimeFunctions()
// this.conversionFunctions()
// this.initSetsFunctions()
// }
// private initEnums () {
// // empty
// }
// private initOperators () {
// this.addOperator('+', Operators.addition)
// this.addOperator('-', Operators.subtraction)
// this.addOperator('-', Operators.negative)
// this.addOperator('*', Operators.multiplication)
// this.addOperator('/', Operators.division)
// this.addOperator('**', Operators.exponentiation)
// this.addOperator('//', Operators.floorDivision)
// this.addOperator('%', Operators.mod)
// this.addOperator('&', Operators.bitAnd)
// this.addOperator('|', Operators.bitOr)
// this.addOperator('^', Operators.bitXor)
// this.addOperator('~', Operators.bitNot)
// this.addOperator('<<', Operators.leftShift)
// this.addOperator('>>', Operators.rightShift)
// this.addOperator('==', Operators.equal)
// this.addOperator('===', Operators.equal)
// this.addOperator('!=', Operators.notEqual)
// this.addOperator('!==', Operators.notEqual)
// this.addOperator('<>', Operators.notEqual)
// this.addOperator('>', Operators.greaterThan)
// this.addOperator('<', Operators.lessThan)
// this.addOperator('>=', Operators.greaterThanOrEqual)
// this.addOperator('<=', Operators.lessThanOrEqual)
// this.addOperator('&&', Operators.and, And)
// this.addOperator('||', Operators.or, Or)
// this.addOperator('!', Operators.not)
// this.addOperator('[]', Operators.item)
// this.addOperator('=', Operators.assignment, Assignment)
// this.addOperator('+=', Operators.assignmentAddition, AssignmentAddition)
// this.addOperator('-=', Operators.assignmentSubtraction, AssignmentSubtraction)
// this.addOperator('*=', Operators.assignmentMultiplication, AssignmentMultiplication)
// this.addOperator('/=', Operators.assignmentDivision, AssignmentDivision)
// this.addOperator('**=', Operators.assignmentExponentiation, AssignmentExponentiation)
// this.addOperator('//=', Operators.assignmentFloorDivision, AssignmentFloorDivision)
// this.addOperator('%=', Operators.assignmentMod, AssignmentMod)
// this.addOperator('&=', Operators.assignmentBitAnd, AssignmentBitAnd)
// this.addOperator('|=', Operators.assignmentBitOr, AssignmentBitOr)
// this.addOperator('^=', Operators.assignmentBitXor, AssignmentBitXor)
// this.addOperator('<<=', Operators.assignmentLeftShift, AssignmentLeftShift)
// this.addOperator('>>=', Operators.assignmentRightShift, AssignmentRightShift)
// }
// private generalFunctions () {
// this.addFunction('sleep', Functions.sleep)
// this.addFunction('console', (value: any) => {
// console.log(typeof value === 'object' ? JSON.stringify(value) : value)
// })
// }
// private comparisonFunctions () {
// this.addFunction('between', Functions.between)
// this.addFunction('includes', Functions.includes)
// this.addFunction('in', Functions.includes)
// this.addFunction('isNull', Functions.isNull)
// this.addFunction('isNotNull', Functions.isNotNull)
// this.addFunction('isEmpty', Functions.isEmpty)
// this.addFunction('isNotEmpty', Functions.isNotEmpty)
// this.addFunction('isBoolean', Functions.isBoolean)
// this.addFunction('isNumber', Functions.isNumber)
// this.addFunction('isInteger', Functions.isInteger)
// this.addFunction('isDecimal', Functions.isDecimal)
// this.addFunction('isString', Functions.isString)
// this.addFunction('isDate', Functions.isDate)
// this.addFunction('isDatetime', Functions.isDatetime)
// this.addFunction('isTime', Functions.isTime)
// this.addFunction('isObject', Functions.isObject)
// this.addFunction('isArray', Functions.isArray)
// this.addFunction('isBooleanFormat', Functions.isBooleanFormat)
// this.addFunction('isNumberFormat', Functions.isNumberFormat)
// this.addFunction('isIntegerFormat', Functions.isIntegerFormat)
// this.addFunction('isDecimalFormat', Functions.isDecimalFormat)
// this.addFunction('isDateFormat', Functions.isDateFormat)
// this.addFunction('isDatetimeFormat', Functions.isDatetimeFormat)
// this.addFunction('isTimeFormat', Functions.isTimeFormat)
// }
// private nullFunctions () {
// this.addFunction('nvl', Functions.nvl)
// this.addFunction('nvl2', Functions.nvl2)
// }
// private numberFunctions () {
// this.addFunction('abs', Math.abs)
// this.addFunction('acos', Math.acos)
// this.addFunction('asin', Math.asin)
// this.addFunction('atan', Math.atan)
// this.addFunction('atan2', Math.atan2)
// this.addFunction('ceil', Math.ceil)
// this.addFunction('cos', Math.cos)
// this.addFunction('cosh', Math.cosh)
// this.addFunction('exp', Math.exp)
// this.addFunction('floor', Math.floor)
// this.addFunction('ln', Math.log)
// this.addFunction('log10', Math.log10)
// this.addFunction('log', Math.log)
// this.addFunction('remainder', (n1: number, n2: number) => n1 % n2)
// this.addFunction('round', (num: number, decimals = 0) =>
// decimals > 0 ? Number(num.toFixed(decimals)) : Math.round(num)
// )
// this.addFunction('sign', Math.sign)
// this.addFunction('sin', Math.sin)
// this.addFunction('sinh', Math.sinh)
// this.addFunction('tan', Math.tan)
// this.addFunction('tanh', Math.tanh)
// this.addFunction('trunc', Math.trunc)
// }
// private conversionFunctions () {
// this.addFunction('toString', Functions.toString)
// this.addFunction('toNumber', Functions.toNumber)
// this.addFunction('dateToString', (date:Date) => {
// if (typeof date === 'string') {
// return new Date(date).toISOString()
// }
// return date.toISOString()
// })
// this.addFunction('stringify', (value: any): string => JSON.stringify(value))
// this.addFunction('parse', (value: string): any => JSON.parse(value))
// this.addFunction('keys', (obj: any): any[] => typeof obj === 'object' ? Object.keys(obj) : [])
// this.addFunction('values', (obj: any): any[] => typeof obj === 'object' ? Object.values(obj) : [])
// this.addFunction('entries', (obj: any): any[] => typeof obj === 'object' ? Object.entries(obj) : [])
// this.addFunction('fromEntries', (array: any[]): any => Helper.obj.fromEntries(array))
// }
// private stringFunctions () {
// this.addFunction('chr', (ascii: number) => String.fromCharCode(ascii))
// this.addFunction('capitalize', StringFunction.capitalize)
// this.addFunction('initcap', StringFunction.initCap)
// this.addFunction('strCount', (source: string, value: string) => source.split(value).length - 1)
// this.addFunction('lower', (str: string) => str.toLowerCase())
// this.addFunction('lpad', (str: string, len: number, pad: string) => str.padStart(len, pad))
// this.addFunction('ltrim', (str: string) => str.trimLeft())
// this.addFunction('replace', (str: string, source: string, target: string) => Helper.string.replace(str, source, target))
// this.addFunction('rpad', (str: string, len: number, pad: string) => str.padEnd(len, pad))
// this.addFunction('rtrim', (str: string) => str.trimRight())
// this.addFunction('substr', (str: string, from: number, count: number) => str.substring(from, count))
// this.addFunction('substring', (str: string, from: number, count: number) => str.substring(from, count))
// this.addFunction('trim', (str: string) => str.trim())
// this.addFunction('upper', (str: string) => str.toUpperCase())
// this.addFunction('concat', Functions.concat)
// this.addFunction('concatenate', Functions.concat)
// this.addFunction('test', (value: any, regexp: string) => {
// const _regexp = new RegExp(regexp)
// return _regexp.test(value)
// })
// this.addFunction('match', (value: string, regexp: string) => {
// return value ? value.match(regexp) : null
// })
// this.addFunction('mask', (value: string) => {
// if (!value) return value
// if (value.length > 8) {
// return value.substring(0, 3) + '*****' + value.substring(value.length - 3, value.length)
// } else if (value.length > 5) {
// return value.substring(0, 1) + '*****' + value.substring(value.length - 1, value.length)
// } else {
// return '*'
// }
// })
// this.addFunction('startWith', (value:string, stringSearched:string, position:number) => value.startsWith(stringSearched, position))
// }
// private dateTimeFunctions () {
// this.addFunction('curTime', () => {
// const date = new Date()
// return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds()
// })
// this.addFunction('today', () => {
// const date = new Date()
// return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
// })
// this.addFunction('now', () => new Date().toISOString())
// this.addFunction('time', (value: string) => {
// const date = new Date(value)
// return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds()
// })
// this.addFunction('date', (value: string) => {
// const date = new Date(value)
// return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
// })
// this.addFunction('datetime', (value: string) => new Date(value).toISOString())
// this.addFunction('year', (value: string) => {
// return new Date(value).getFullYear()
// })
// this.addFunction('month', (value: string) => {
// return new Date(value).getMonth() + 1
// })
// this.addFunction('day', (value: string) => {
// return new Date(value).getDate()
// })
// this.addFunction('weekday', (value: string) => {
// return new Date(value).getDay()
// })
// this.addFunction('hour', (value: string) => {
// return new Date(value).getHours()
// })
// this.addFunction('minute', (value: string) => {
// return new Date(value).getMinutes()
// })
// this.addFunction('second', (value: string) => {
// return new Date(value).getSeconds()
// })
// this.addFunction('millisecond', (value: string) => {
// return new Date(value).getMilliseconds()
// })
// this.addFunction('addYear', (date: string, value: number) => {
// const _date = new Date(date)
// _date.setFullYear(_date.getFullYear() + value)
// return _date.toISOString()
// })
// this.addFunction('addMonth', (date: string, value: number) => {
// const _date = new Date(date)
// _date.setMonth(_date.getMonth() + value)
// return _date.toISOString()
// })
// this.addFunction('addDay', (date: string, value: number) => {
// const _date = new Date(date)
// _date.setDate(_date.getDate() + value)
// return _date.toISOString()
// })
// this.addFunction('addHour', (date: string, value: number) => {
// const _date = new Date(date)
// _date.setHours(_date.getHours() + value)
// return _date.toISOString()
// })
// this.addFunction('addMinute', (date: string, value: number) => {
// const _date = new Date(date)
// _date.setMinutes(_date.getMinutes() + value)
// return _date.toISOString()
// })
// this.addFunction('addSecond', (date: string, value: number) => {
// const _date = new Date(date)
// _date.setSeconds(_date.getSeconds() + value)
// return _date.toISOString()
// })
// this.addFunction('addMillisecond', (date: string, value: number) => {
// const _date = new Date(date)
// _date.setMilliseconds(_date.getMilliseconds() + value)
// return _date.toISOString()
// })
// this.addFunction('addTime', (date: string, time: string) => {
// const _time = new Date('2000-01-01T' + time)
// const _date = new Date(date)
// _date.setHours(_date.getHours() + _time.getHours())
// _date.setMinutes(_date.getMinutes() + _time.getMinutes())
// _date.setSeconds(_date.getSeconds() + _time.getSeconds())
// _date.setMilliseconds(_date.getSeconds() + _time.getMilliseconds())
// return _date.toISOString()
// })
// this.addFunction('subtractTime', (date: string, time: string) => {
// const _time = new Date('2000-01-01T' + time)
// const _date = new Date(date)
// _date.setHours(_date.getHours() - _time.getHours())
// _date.setMinutes(_date.getMinutes() - _time.getMinutes())
// _date.setSeconds(_date.getSeconds() - _time.getSeconds())
// _date.setMilliseconds(_date.getSeconds() - _time.getMilliseconds())
// return _date.toISOString()
// })
// this.addFunction('yearDiff', (date1: string, date2: string) => {
// const _date1 = new Date(date1)
// const _date2 = new Date(date2)
// return Math.abs(_date2.getFullYear() - _date1.getFullYear())
// })
// this.addFunction('dayDiff', (date1: string, date2: string) => {
// const _date1 = new Date(date1)
// const _date2 = new Date(date2)
// return Math.floor((_date1.getTime() - _date2.getTime()) / (24 * 3600 * 1000))
// })
// this.addFunction('hourDiff', (date1: string, date2: string) => {
// const _date1 = new Date(date1)
// const _date2 = new Date(date2)
// return Math.floor((_date1.getTime() - _date2.getTime()) / (3600 * 1000))
// })
// this.addFunction('secondDiff', (date1: string, date2: string) => {
// const _date1 = new Date(date1)
// const _date2 = new Date(date2)
// return Math.floor((_date1.getTime() - _date2.getTime()) / (1000))
// })
// this.addFunction('millisecondDiff', (date1: string, date2: string) => {
// const _date1 = new Date(date1)
// const _date2 = new Date(date2)
// return Math.floor(_date1.getTime() - _date2.getTime())
// })
// this.addFunction('dayToDate', (value: number) => {
// return new Date(value * 24 * 3600 * 1000).toISOString()
// })
// this.addFunction('hourToDate', (value: number) => {
// return new Date(value * 3600 * 1000).toISOString()
// })
// this.addFunction('secondToDate', (value: number) => {
// return new Date(value * 1000).toISOString()
// })
// this.addFunction('millisecondToDate', (value: number) => {
// return new Date(value).toISOString()
// })
// }
// private initArrayFunctions () {
// this.addFunction('map', ArrayFunctions.map, OperatorType.arrow, Map)
// this.addFunction('select', ArrayFunctions.map, OperatorType.arrow, Map)
// this.addFunction('foreach', ArrayFunctions.foreach, OperatorType.arrow, Foreach)
// this.addFunction('each', ArrayFunctions.foreach, OperatorType.arrow, Foreach)
// this.addFunction('filter', ArrayFunctions.filter, OperatorType.arrow, Filter)
// this.addFunction('where', ArrayFunctions.filter, OperatorType.arrow, Filter)
// this.addFunction('reverse', ArrayFunctions.reverse, OperatorType.arrow, Reverse)
// this.addFunction('sort', ArrayFunctions.sort, OperatorType.arrow, Sort)
// this.addFunction('order', ArrayFunctions.sort, OperatorType.arrow, Sort)
// this.addFunction('remove', ArrayFunctions.remove, OperatorType.arrow, Remove)
// this.addFunction('delete', ArrayFunctions.remove, OperatorType.arrow, Remove)
// this.addFunction('push', (list: any[], item: any): any => {
// list.push(item)
// return list
// }, OperatorType.child)
// this.addFunction('insert', (list: any[], item: any): any => {
// list.push(item)
// return list
// }, OperatorType.child)
// this.addFunction('pop', (list: any[]): any => list.pop(), OperatorType.child)
// this.addFunction('length', (list: any[]|string) => list.length, OperatorType.child)
// this.addFunction('len', (list: any[]|string) => list.length, OperatorType.child)
// this.addFunction('slice', (list: any[], from:number, to:number) => list.slice(from, to), OperatorType.child)
// this.addFunction('page', (list: any[], page:number, records:number) => {
// let from = (page - 1) * records
// if (from < 0) {
// from = 0
// }
// let to = from + records
// if (to > list.length) {
// to = list.length - 1
// }
// return list.slice(from, to)
// }, OperatorType.child)
// // this.addFunction('insert', ArrayFunctions.insert, OperatorType.arrow, Insert)
// // this.addFunction('update', ArrayFunctions.update, OperatorType.arrow, Update)
// }
// private initArrayGroupFunctions () {
// this.addFunction('distinct', ArrayFunctions.distinct, OperatorType.arrow, Distinct)
// this.addFunction('first', ArrayFunctions.first, OperatorType.arrow, First)
// this.addFunction('last', ArrayFunctions.last, OperatorType.arrow, Last)
// this.addFunction('count', ArrayFunctions.count, OperatorType.arrow, Count)
// this.addFunction('max', ArrayFunctions.count, OperatorType.arrow, Max)
// this.addFunction('min', ArrayFunctions.count, OperatorType.arrow, Min)
// this.addFunction('avg', ArrayFunctions.count, OperatorType.arrow, Avg)
// this.addFunction('sum', ArrayFunctions.count, OperatorType.arrow, Sum)
// }
// private initSetsFunctions () {
// this.addFunction('union', SetsFunctions.union, OperatorType.child, Union)
// this.addFunction('intersection', SetsFunctions.intersection, OperatorType.child, Intersection)
// this.addFunction('difference', SetsFunctions.difference, OperatorType.child, Difference)
// this.addFunction('symmetricDifference', SetsFunctions.symmetricDifference, OperatorType.child, SymmetricDifference)
// }
// }
// class CoreHelper {
// public static objectKey (obj:any) : any {
// const keys = Object.keys(obj).sort()
// const list:string[] = []
// for (const key of keys) {
// list.push(key)
// list.push(obj[key].toString())
// }
// return list.join('|')
// }
// public static getKeys (variable:Variable, fields: KeyValue[], list: any[], context: Context): any[] {
// const keys:any[] = []
// // loop through the list and group by the grouper fields
// for (const item of list) {
// let key = ''
// const values = []
// for (const keyValue of fields) {
// context.data.set(variable.name, item)
// // variable.set(item)
// const value = keyValue.children[0].eval(context)
// if (typeof value === 'object') {
// throw new Error(`Property value ${keyValue.name} is an object, so it cannot be grouped`)
// }
// key = key === '' ? value : `${key}-${value}`
// values.push({ name: keyValue.name, value: value })
// }
// // find if the key already exists in the list of keys
// const keyItem = keys.find((p:any) => p.key === key)
// if (keyItem) {
// // if the key exists add the item
// keyItem.items.push(item)
// } else {
// // if the key does not exist add the key, the values and the item
// keys.push({ key: key, values: values, items: [item], summarizers: [] })
// }
// }
// return keys
// }
// public static haveAggregates (operand: Operand): boolean {
// if (!(operand instanceof ArrowFunction) && operand instanceof FunctionRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
// return true
// } else if (operand.children && operand.children.length > 0) {
// for (const child of operand.children) {
// if (this.haveAggregates(child)) {
// return true
// }
// }
// }
// return false
// }
// public static findAggregates (operand: Operand): FunctionRef[] {
// if (!(operand instanceof ArrowFunction) && operand instanceof FunctionRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
// return [operand]
// } else if (operand.children && operand.children.length > 0) {
// let aggregates:FunctionRef[] = []
// for (const child of operand.children) {
// const childAggregates = this.findAggregates(child)
// if (childAggregates.length > 0) {
// aggregates = aggregates.concat(childAggregates)
// }
// }
// return aggregates
// }
// return []
// }
// public static solveAggregates (list: any[], variable: Variable, operand: Operand, context: Context): Operand {
// if (!(operand instanceof ArrowFunction) && operand instanceof FunctionRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
// let value:any
// switch (operand.name) {
// case 'avg':
// value = this.avg(list, variable, operand.children[0], context)
// break
// case 'count':
// value = this.count(list, variable, operand.children[0], context)
// break
// case 'first':
// value = this.first(list, variable, operand.children[0], context)
// break
// case 'last':
// value = this.last(list, variable, operand.children[0], context)
// break
// case 'max':
// value = this.max(list, variable, operand.children[0], context)
// break
// case 'min':
// value = this.min(list, variable, operand.children[0], context)
// break
// case 'sum':
// value = this.sum(list, variable, operand.children[0], context)
// break
// }
// return new Constant(value)
// } else if (operand.children && operand.children.length > 0) {
// for (let i = 0; i < operand.children.length; i++) {
// operand.children[i] = this.solveAggregates(list, variable, operand.children[i], context)
// }
// }
// return operand
// }
// public static count (list: any[], variable: Variable, aggregate: Operand, context: Context): number {
// let count = 0
// for (const item of list) {
// // variable.set(item)
// context.data.set(variable.name, item)
// if (aggregate.eval(context)) {
// count++
// }
// }
// return count
// }
// public static first (list: any[], variable: Variable, aggregate: Operand, context: Context): any {
// for (const item of list) {
// // variable.set(item)
// context.data.set(variable.name, item)
// if (aggregate.eval(context)) {
// return item
// }
// }
// return null
// }
// public static last (list: any[], variable: Variable, aggregate: Operand, context: Context): any {
// for (let i = list.length - 1; i >= 0; i--) {
// const item = list[i]
// // variable.set(item)
// context.data.set(variable.name, item)
// if (aggregate.eval(context)) {
// return item
// }
// }
// return null
// }
// public static max (list: any[], variable: Variable, aggregate: Operand, context: Context): any {
// let max:any
// for (const item of list) {
// // variable.set(item)
// context.data.set(variable.name, item)
// const value = aggregate.eval(context)
// if (max === undefined || (value !== null && value > max)) {
// max = value
// }
// }
// return max
// }
// public static min (list: any[], variable: Variable, aggregate: Operand, context: Context): any {
// let min:any
// for (const item of list) {
// // variable.set(item)
// context.data.set(variable.name, item)
// const value = aggregate.eval(context)
// if (min === undefined || (value !== null && value < min)) {
// min = value
// }
// }
// return min
// }
// public static avg (list: any[], variable: Variable, aggregate: Operand, context: Context): number {
// let sum = 0
// for (const item of list) {
// // variable.set(item)
// context.data.set(variable.name, item)
// const value = aggregate.eval(context)
// if (value !== null) {
// sum = sum + value
// }
// }
// return list.length > 0 ? sum / list.length : 0
// }
// public static sum (list: any[], variable: Variable, aggregate: Operand, context: Context): number {
// let sum = 0
// for (const item of list) {
// // variable.set(item)
// context.data.set(variable.name, item)
// const value = aggregate.eval(context)
// if (value !== null) {
// sum = sum + value
// }
// }
// return sum
// }
// }
// class Operators {
// static addition (a: number, b: number): number {
// return a + b
// }
// static subtraction (a: number, b: number): number {
// return a - b
// }
// static negative (a: number): number {
// return a * -1
// }
// static multiplication (a: number, b: number): number {
// return a * b
// }
// static division (a: number, b: number): number {
// return a / b
// }
// static exponentiation (a: number, b: number): number {
// return a ** b
// }
// static floorDivision (a: number, b: number): number {
// return Math.pow(a, 1 / b)
// }
// static mod (a: number, b: number): number {
// return a % b
// }
// static bitAnd (a: number, b: number): number {
// return a & b
// }
// static bitOr (a: number, b: number): number {
// return a | b
// }
// static bitXor (a: number, b: number): number {
// return a ^ b
// }
// static bitNot (a: number): number {
// return ~a
// }
// static leftShift (a: number, b: number): number {
// return a << b
// }
// static rightShift (a: number, b: number): number {
// return a >> b
// }
// static equal (a: any, b: any): boolean {
// return a === b
// }
// static notEqual (a: any, b: any): boolean {
// return a !== b
// }
// static greaterThan (a: any, b: any): boolean {
// return a > b
// }
// static lessThan (a: any, b: any): boolean {
// return a < b
// }
// static greaterThanOrEqual (a: any, b: any): boolean {
// return a >= b
// }
// static lessThanOrEqual (a: any, b: any): boolean {
// return a <= b
// }
// static and (a: boolean, b: boolean): boolean {
// return a && b
// }
// static or (a: boolean, b: boolean): boolean {
// return a || b
// }
// static not (a: boolean): boolean {
// return !a
// }
// static item (list: any[], index: any): any {
// return list[index]
// }
// static assignment (a: any, b: any): any {
// throw new Error('NotImplemented')
// }
// static assignmentAddition (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// static assignmentSubtraction (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// static assignmentMultiplication (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// static assignmentDivision (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// static assignmentExponentiation (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// static assignmentFloorDivision (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// static assignmentMod (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// static assignmentBitAnd (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// static assignmentBitOr (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// static assignmentBitXor (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// static assignmentLeftShift (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// static assignmentRightShift (a: number, b: number): number {
// throw new Error('NotImplemented')
// }
// }
// class And extends Operator {
// eval (context: Context): boolean {
// if (!this.children[0].eval(context) as boolean) return false
// return this.children[1].eval(context) as boolean
// }
// }
// class Or extends Operator {
// eval (context: Context): any {
// if (this.children[0].eval(context)) return true
// return this.children[1].eval(context)
// }
// }
// class Assignment extends Operator {
// eval (context: Context): any {
// const value = this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentAddition extends Operator {
// eval (context: Context): any {
// const value = this.children[0].eval(context) + this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentSubtraction extends Operator {
// eval (context: Context): any {
// const value = this.children[0].eval(context) - this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentMultiplication extends Operator {
// eval (context: Context): any {
// const value = this.children[0].eval(context) * this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentDivision extends Operator {
// eval (context: Context): any {
// const value = this.children[0].eval(context) / this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentExponentiation extends Operator {
// eval (context: Context): any {
// const value = this.children[0].eval(context) ** this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentFloorDivision extends Operator {
// eval (context: Context): any {
// const value = Math.floor(this.children[0].eval(context) / this.children[1].eval(context))
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentMod extends Operator {
// eval (context: Context): any {
// const value = this.children[0].eval(context) % this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentBitAnd extends Operator {
// eval (context: Context): any {
// const value = this.children[0].eval(context) & this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentBitOr extends Operator {
// eval (context: Context): any {
// const value = this.children[0].eval(context) | this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentBitXor extends Operator {
// eval (context: Context): any {
// const value = this.children[0].eval(context) ^ this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentLeftShift extends Operator {
// eval (context: Context): any {
// const value = this.children[0].eval(context) << this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class AssignmentRightShift extends Operator {
// eval (context: Context): any {
// const value = this.children[0].eval(context) >> this.children[1].eval(context)
// context.data.set(this.children[0].name, value)
// return value
// }
// }
// class StringFunction {
// public static capitalize = function (str: string): string {
// return str.charAt(0).toUpperCase() + str.slice(1)
// }
// public static initCap (str: string): string {
// const newStr = str.split(' ')
// let i
// const arr = []
// for (i = 0; i < newStr.length; i++) {
// arr.push(StringFunction.capitalize(newStr[i]))
// }
// return arr.join(' ')
// }
// }
// class Functions {
// static nvl (value: any, _default: any): any {
// return Functions.isNotNull(value) ? value : _default
// }
// static nvl2 (value: any, a: any, b: any): any {
// return Functions.isNotNull(value) ? a : b
// }
// static isNull (value: any): boolean {
// return value === undefined || value === null
// }
// static isNotNull (value: any): boolean {
// return !Functions.isNull(value)
// }
// static isEmpty (value: string): boolean {
// return value === null || value === undefined || value.toString().trim().length === 0
// }
// static isNotEmpty (value: string): boolean {
// return !Functions.isEmpty(value)
// }
// static isBoolean (value: any): boolean {
// return typeof value === 'boolean'
// }
// static isNumber (value: any): boolean {
// return Functions.isDecimal(value)
// }
// static isInteger (value: any): boolean {
// return Number.isInteger(value)
// }
// static isDecimal (value: any): boolean {
// return !isNaN(value)
// }
// static isString (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// return typeof value === 'string'
// }
// static isDate (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// if (typeof value === 'string') {
// return Functions.isDateFormat(value as string)
// } else {
// return typeof value.getMonth === 'function'
// }
// }
// static isDatetime (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// if (typeof value === 'string') {
// return Functions.isDatetimeFormat(value as string)
// } else {
// return typeof value.getMonth === 'function'
// }
// }
// static isObject (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// return typeof value === 'object' && !Array.isArray(value)
// }
// static isArray (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// return Array.isArray(value)
// }
// static isTime (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// if (typeof value === 'string') {
// return Functions.isTimeFormat(value as string)
// } else {
// return typeof value.getMonth === 'function'
// }
// }
// static isBooleanFormat (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// return ['true', 'false'].includes(value.toString())
// }
// static isNumberFormat (value: any): boolean {
// return Functions.isDecimalFormat(value)
// }
// static isIntegerFormat (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// const regex = /^\d+$/
// return value.toString().match(regex) !== null
// }
// static isDecimalFormat (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// const regex = /^\d+\.\d+$/
// return value.toString().match(regex) !== null
// }
// static isStringFormat (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// const regex = /[a-zA-Z0-9_.]+$/
// return value.toString().match(regex) !== null
// }
// static isDateFormat (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// const regex = /^\d{4}-\d{2}-\d{2}$/
// return value.toString().match(regex) !== null
// }
// static isDatetimeFormat (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// const regex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
// return value.toString().match(regex) !== null
// }
// static isTimeFormat (value: any): boolean {
// if (value === null || value === undefined) {
// return false
// }
// // https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
// const regex = /\[0-2]\d:[0-5]\d:[0-5]\d/
// return value.toString().match(regex) !== null
// }
// static async sleep (ms = 1000): Promise<void> {
// return new Promise((resolve) => {
// setTimeout(resolve, ms)
// })
// }
// static between (value: any, from: any, to: any): boolean {
// return value >= from && value < to
// }
// static includes (list: any[]|string, value: any): boolean {
// if (list && value) {
// return list.includes(value)
// } else {
// return false
// }
// }
// static toString (value: any): string {
// return Functions.isNull(value) ? '' : value.toString()
// }
// static toNumber (value: any): number {
// return Functions.isNull(value) ? 0 : parseFloat(value)
// }
// static concat (...values:any[]) :any {
// if (!values || values.length === 0) {
// return ''
// }
// if (typeof values[0] === 'string') {
// return ''.concat(...values)
// } else if (Array.isArray(values[0])) {
// return [].concat(...values)
// } else {
// const list:any[] = []
// for (const value of values) {
// list.push(value)
// }
// return list
// }
// }
// }
// class ArrayFunctions {
// static map (list: any[], method: Function): any[] { throw new Error('Empty') }
// static distinct (list: any[], method: Function): any[] { throw new Error('Empty') }
// static foreach (list: any[], method: Function): void { throw new Error('Empty') }
// static filter (list: any[], method: Function): any[] { throw new Error('Empty') }
// static reverse (list: any[], method: Function): any[] { throw new Error('Empty') }
// static sort (list: any[], method: Function): any[] { throw new Error('Empty') }
// static remove (list: any[], method: Function): number { throw new Error('Empty') }
// static first (list: any[], method: Function): any | null { throw new Error('Empty') }
// static last (list: any[], method: Function): any | null { throw new Error('Empty') }
// static count (list: any[], method: Function): any[] { throw new Error('Empty') }
// static max (list: any[], method: Function): any[] { throw new Error('Empty') }
// static min (list: any[], method: Function): any[] { throw new Error('Empty') }
// static avg (list: any[], method: Function): any[] { throw new Error('Empty') }
// static sum (list: any[], method: Function): any[] { throw new Error('Empty') }
// static insert (list: any[], item: any) { throw new Error('Empty') }
// static update (list: any[], item: any, method: Function) { throw new Error('Empty') }
// }
// class SetsFunctions {
// static union (a: any[], b: any[]): any[] { throw new Error('Empty') }
// static intersection (a: any[], b: any[]): any[] { throw new Error('Empty') }
// static difference (a: any[], b: any[]): any[] { throw new Error('Empty') }
// static symmetricDifference (a: any[], b: any[]): any[] { throw new Error('Empty') }
// }
// class Map extends ArrowFunction {
// eval (context: Context): any {
// const rows = []
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (this.children[2] instanceof Obj) {
// const groupers:KeyValue[] = []
// const aggregates:KeyValue[] = []
// for (const child of this.children[2].children) {
// // In the case of being an object the value to return, find out if there are fields that are summarized
// const keyValue = child as KeyValue
// if (keyValue) {
// if (CoreHelper.haveAggregates(keyValue.children[0])) {
// aggregates.push(keyValue)
// } else {
// groupers.push(keyValue)
// }
// }
// }
// if (aggregates.length > 0) {
// // case with aggregate functions
// const keys = CoreHelper.getKeys(this.children[1], groupers, list, context)
// // once you got all the keys you have to calculate the aggregates fields
// const variable = this.children[1] as Variable
// for (const key of keys) {
// for (const keyValue of aggregates) {
// const operandCloned = exp.clone(keyValue.children[0])
// const operandResolved = CoreHelper.solveAggregates(key.items, variable, operandCloned, context)
// const value = operandResolved.eval(context)
// key.summarizers.push({ name: keyValue.name, value: value })
// }
// }
// // build the list of results
// for (const key of keys) {
// const row:any = {}
// for (const value of key.values) {
// row[value.name] = value.value
// }
// for (const summarizer of key.summarizers) {
// row[summarizer.name] = summarizer.value
// }
// rows.push(row)
// }
// return rows
// }
// }
// // simple case without aggregate functions
// const childContext = context.newContext()
// for (const item of list) {
// childContext.data.set(this.children[1].name, item)
// const row = this.children[2].eval(childContext)
// rows.push(row)
// }
// return rows
// }
// }
// class Distinct extends ArrowFunction {
// eval (context: Context): any {
// const rows = []
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (this.children.length === 1) {
// // simple case
// for (const item of list) {
// if (rows.find((p:any) => p === item) === undefined) {
// rows.push(item)
// }
// }
// return rows
// } else if (this.children[2] instanceof Obj) {
// // case with aggregate functions
// const keys = CoreHelper.getKeys(this.children[1], this.children[2].children, list, context.newContext())
// // build the list of results
// for (const key of keys) {
// const row:any = {}
// for (const value of key.values) {
// row[value.name] = value.value
// }
// rows.push(row)
// }
// return rows
// } else if (this.children[2] instanceof List) {
// throw new Error('Distinct not support Array result')
// }
// // simple case without aggregate functions
// const childContext = context.newContext()
// for (const item of list) {
// childContext.data.set(this.children[1].name, item)
// const value = this.children[2].eval(childContext)
// if (rows.find((p:any) => p === value) === undefined) {
// rows.push(value)
// }
// }
// return rows
// }
// }
// class Foreach extends ArrowFunction {
// eval (context: Context): any {
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// const childContext = context.newContext()
// for (const item of list) {
// childContext.data.set(this.children[1].name, item)
// this.children[2].eval(childContext)
// }
// return list
// }
// }
// class Filter extends ArrowFunction {
// eval (context: Context): any {
// const rows = []
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// const childContext = context.newContext()
// for (const item of list) {
// childContext.data.set(this.children[1].name, item)
// if (this.children[2].eval(childContext)) {
// rows.push(item)
// }
// }
// return rows
// }
// }
// class Reverse extends ArrowFunction {
// eval (context: Context): any {
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (this.children.length === 1) {
// return list.reverse()
// }
// const values = []
// const childContext = context.newContext()
// for (const item of list) {
// childContext.data.set(this.children[1].name, item)
// const value = this.children[2].eval(childContext)
// values.push({ value: value, p: item })
// }
// values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0)
// values.reverse()
// return values.map(p => p.p)
// }
// }
// class Sort extends ArrowFunction {
// eval (context: Context): any {
// const values = []
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (this.children.length === 1) {
// return list.sort()
// }
// const childContext = context.newContext()
// for (const item of list) {
// childContext.data.set(this.children[1].name, item)
// const value = this.children[2].eval(childContext)
// values.push({ value: value, p: item })
// }
// values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0)
// return values.map(p => p.p)
// }
// }
// class Remove extends ArrowFunction {
// eval (context: Context): any {
// const rows = []
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// const childContext = context.newContext()
// for (const item of list) {
// childContext.data.set(this.children[1].name, item)
// if (!this.children[2].eval(childContext)) {
// rows.push(item)
// }
// }
// return rows
// }
// }
// class First extends ArrowFunction {
// eval (context: Context): any {
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (this.children.length === 1) {
// return list && list.length > 0 ? list[0] : null
// }
// return CoreHelper.first(list, this.children[1], this.children[2], context.newContext())
// }
// }
// class Last extends ArrowFunction {
// eval (context: Context): any {
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (this.children.length === 1) {
// return list && list.length > 0 ? list[list.length - 1] : null
// }
// return CoreHelper.last(list, this.children[1], this.children[2], context.newContext())
// }
// }
// class Count extends ArrowFunction {
// eval (context: Context): any {
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (this.children.length === 1) {
// return list.length
// }
// return CoreHelper.count(list, this.children[1], this.children[2], context.newContext())
// }
// }
// class Max extends ArrowFunction {
// eval (context: Context): any {
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (this.children.length === 1) {
// let max:any
// for (const item of list) {
// if (max === undefined || (item !== null && item > max)) {
// max = item
// }
// }
// return max
// }
// return CoreHelper.max(list, this.children[1], this.children[2], context.newContext())
// }
// }
// class Min extends ArrowFunction {
// eval (context: Context): any {
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (this.children.length === 1) {
// let min:any
// for (const item of list) {
// if (min === undefined || (item !== null && item < min)) {
// min = item
// }
// }
// return min
// }
// return CoreHelper.min(list, this.children[1], this.children[2], context.newContext())
// }
// }
// class Avg extends ArrowFunction {
// eval (context: Context): any {
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (this.children.length === 1) {
// let sum = 0
// for (const item of list) {
// if (item !== null) {
// sum = sum + item
// }
// }
// return list.length > 0 ? sum / list.length : 0
// }
// return CoreHelper.avg(list, this.children[1], this.children[2], context.newContext())
// }
// }
// class Sum extends ArrowFunction {
// eval (context: Context): any {
// const list: any[] = this.children[0].eval(context)
// if (!list) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (this.children.length === 1) {
// let sum = 0
// for (const item of list) {
// if (item !== null) {
// sum = sum + item
// }
// }
// return sum
// }
// return CoreHelper.sum(list, this.children[1], this.children[2], context.newContext())
// }
// }
// class Union extends ChildFunction {
// eval (context: Context): any {
// const a: any[] = this.children[0].eval(context)
// const b: any[] = this.children[1].eval(context)
// if (!a) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (!b) {
// throw new Error(`Array ${this.children[1].name} undefined`)
// }
// if (a.length === 0) {
// return b
// }
// if (b.length === 0) {
// return a
// }
// let result:any[] = []
// if (Array.isArray(a[0]) || Array.isArray(b[0])) {
// throw new Error('Cannot union arrays of arrays')
// } else if (typeof a[0] === 'object') {
// for (const element of a) {
// const key = CoreHelper.objectKey(element)
// result.push({ key: key, value: element })
// }
// for (const element of b) {
// const key = CoreHelper.objectKey(element)
// if (!result.find((p:any) => p.key === key)) {
// result.push({ key: key, value: element })
// }
// }
// return result.map((p:any) => p.value)
// }
// result = result.concat(a)
// for (const element of b) {
// if (!result.includes(element)) {
// result.push(element)
// }
// }
// return result
// }
// }
// class Intersection extends ChildFunction {
// eval (context: Context): any {
// const a: any[] = this.children[0].eval(context)
// const b: any[] = this.children[1].eval(context)
// if (!a) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (!b) {
// throw new Error(`Array ${this.children[1].name} undefined`)
// }
// if (a.length === 0 || b.length === 0) {
// return []
// }
// const result:any[] = []
// if (Array.isArray(a[0]) || Array.isArray(b[0])) {
// throw new Error('Cannot union arrays of arrays')
// } else if (typeof a[0] === 'object') {
// const keys = a.map((p:any) => CoreHelper.objectKey(p))
// for (const element of b) {
// const key = CoreHelper.objectKey(element)
// if (keys.includes(key)) {
// result.push(element)
// }
// }
// return result
// } else {
// for (const element of b) {
// if (a.includes(element)) {
// result.push(element)
// }
// }
// return result
// }
// }
// }
// class Difference extends ChildFunction {
// eval (context: Context): any {
// const a: any[] = this.children[0].eval(context)
// const b: any[] = this.children[1].eval(context)
// if (!a) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (!b) {
// throw new Error(`Array ${this.children[1].name} undefined`)
// }
// if (a.length === 0) {
// return []
// }
// if (b.length === 0) {
// return a
// }
// const result:any[] = []
// if (Array.isArray(a[0]) || Array.isArray(b[0])) {
// throw new Error('Cannot union arrays of arrays')
// } else if (typeof a[0] === 'object') {
// const keys = b.map((p:any) => CoreHelper.objectKey(p))
// for (const element of a) {
// const key = CoreHelper.objectKey(element)
// if (!keys.includes(key)) {
// result.push(element)
// }
// }
// return result
// } else {
// for (const element of a) {
// if (!b.includes(element)) {
// result.push(element)
// }
// }
// return result
// }
// }
// }
// class SymmetricDifference extends ChildFunction {
// eval (context: Context): any {
// const a: any[] = this.children[0].eval(context)
// const b: any[] = this.children[1].eval(context)
// if (!a) {
// throw new Error(`Array ${this.children[0].name} undefined`)
// }
// if (!b) {
// throw new Error(`Array ${this.children[1].name} undefined`)
// }
// if (a.length === 0) {
// return b
// }
// if (b.length === 0) {
// return a
// }
// const result:any[] = []
// if (Array.isArray(a[0]) || Array.isArray(b[0])) {
// throw new Error('Cannot union arrays of arrays')
// } else if (typeof a[0] === 'object') {
// const aKeys = a.map((p:any) => CoreHelper.objectKey(p))
// const bKeys = b.map((p:any) => CoreHelper.objectKey(p))
// for (const element of a) {
// const key = CoreHelper.objectKey(element)
// if (!bKeys.includes(key)) {
// result.push(element)
// }
// }
// for (const element of b) {
// const key = CoreHelper.objectKey(element)
// if (!aKeys.includes(key)) {
// result.push(element)
// }
// }
// return result
// } else {
// for (const element of a) {
// if (!b.includes(element)) {
// result.push(element)
// }
// }
// for (const element of b) {
// if (!a.includes(element)) {
// result.push(element)
// }
// }
// return result
// }
// }
// }
//# sourceMappingURL=coreLib.js.map