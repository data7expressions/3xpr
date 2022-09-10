"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreLib = void 0;
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
const library_1 = require("../library");
const model_1 = require("./../../model");
const operands_1 = require("../operands");
const index_1 = require("../../index");
const manager_1 = require("../../manager");
class CoreLib extends library_1.Library {
    constructor() {
        super('core');
        this.initEnums();
        this.initOperators();
        this.generalFunctions();
        this.comparisonFunctions();
        this.nullFunctions();
        this.numberFunctions();
        this.stringFunctions();
        this.initArrayFunctions();
        this.initArrayGroupFunctions();
        this.dateTimeFunctions();
        this.conversionFunctions();
        this.initSetsFunctions();
    }
    initEnums() {
        // empty
    }
    initOperators() {
        this.addOperator('+', Operators.addition);
        this.addOperator('-', Operators.subtraction);
        this.addOperator('-', Operators.negative);
        this.addOperator('*', Operators.multiplication);
        this.addOperator('/', Operators.division);
        this.addOperator('**', Operators.exponentiation);
        this.addOperator('//', Operators.floorDivision);
        this.addOperator('%', Operators.mod);
        this.addOperator('&', Operators.bitAnd);
        this.addOperator('|', Operators.bitOr);
        this.addOperator('^', Operators.bitXor);
        this.addOperator('~', Operators.bitNot);
        this.addOperator('<<', Operators.leftShift);
        this.addOperator('>>', Operators.rightShift);
        this.addOperator('==', Operators.equal);
        this.addOperator('===', Operators.equal);
        this.addOperator('!=', Operators.notEqual);
        this.addOperator('!==', Operators.notEqual);
        this.addOperator('<>', Operators.notEqual);
        this.addOperator('>', Operators.greaterThan);
        this.addOperator('<', Operators.lessThan);
        this.addOperator('>=', Operators.greaterThanOrEqual);
        this.addOperator('<=', Operators.lessThanOrEqual);
        this.addOperator('&&', Operators.and, And);
        this.addOperator('||', Operators.or, Or);
        this.addOperator('!', Operators.not);
        this.addOperator('[]', Operators.item);
        this.addOperator('=', Operators.assignment, Assignment);
        this.addOperator('+=', Operators.assignmentAddition, AssignmentAddition);
        this.addOperator('-=', Operators.assignmentSubtraction, AssignmentSubtraction);
        this.addOperator('*=', Operators.assignmentMultiplication, AssignmentMultiplication);
        this.addOperator('/=', Operators.assignmentDivision, AssignmentDivision);
        this.addOperator('**=', Operators.assignmentExponentiation, AssignmentExponentiation);
        this.addOperator('//=', Operators.assignmentFloorDivision, AssignmentFloorDivision);
        this.addOperator('%=', Operators.assignmentMod, AssignmentMod);
        this.addOperator('&=', Operators.assignmentBitAnd, AssignmentBitAnd);
        this.addOperator('|=', Operators.assignmentBitOr, AssignmentBitOr);
        this.addOperator('^=', Operators.assignmentBitXor, AssignmentBitXor);
        this.addOperator('<<=', Operators.assignmentLeftShift, AssignmentLeftShift);
        this.addOperator('>>=', Operators.assignmentRightShift, AssignmentRightShift);
    }
    generalFunctions() {
        this.addFunction('sleep', Functions.sleep);
        this.addFunction('console', (value) => {
            console.log(typeof value === 'object' ? JSON.stringify(value) : value);
        });
    }
    comparisonFunctions() {
        this.addFunction('between', Functions.between);
        this.addFunction('includes', Functions.includes);
        this.addFunction('in', Functions.includes);
        this.addFunction('isNull', Functions.isNull);
        this.addFunction('isNotNull', Functions.isNotNull);
        this.addFunction('isEmpty', Functions.isEmpty);
        this.addFunction('isNotEmpty', Functions.isNotEmpty);
        this.addFunction('isBoolean', Functions.isBoolean);
        this.addFunction('isNumber', Functions.isNumber);
        this.addFunction('isInteger', Functions.isInteger);
        this.addFunction('isDecimal', Functions.isDecimal);
        this.addFunction('isString', Functions.isString);
        this.addFunction('isDate', Functions.isDate);
        this.addFunction('isDatetime', Functions.isDatetime);
        this.addFunction('isTime', Functions.isTime);
        this.addFunction('isObject', Functions.isObject);
        this.addFunction('isArray', Functions.isArray);
        this.addFunction('isBooleanFormat', Functions.isBooleanFormat);
        this.addFunction('isNumberFormat', Functions.isNumberFormat);
        this.addFunction('isIntegerFormat', Functions.isIntegerFormat);
        this.addFunction('isDecimalFormat', Functions.isDecimalFormat);
        this.addFunction('isDateFormat', Functions.isDateFormat);
        this.addFunction('isDatetimeFormat', Functions.isDatetimeFormat);
        this.addFunction('isTimeFormat', Functions.isTimeFormat);
    }
    nullFunctions() {
        this.addFunction('nvl', Functions.nvl);
        this.addFunction('nvl2', Functions.nvl2);
    }
    numberFunctions() {
        this.addFunction('abs', Math.abs);
        this.addFunction('acos', Math.acos);
        this.addFunction('asin', Math.asin);
        this.addFunction('atan', Math.atan);
        this.addFunction('atan2', Math.atan2);
        this.addFunction('ceil', Math.ceil);
        this.addFunction('cos', Math.cos);
        this.addFunction('cosh', Math.cosh);
        this.addFunction('exp', Math.exp);
        this.addFunction('floor', Math.floor);
        this.addFunction('ln', Math.log);
        this.addFunction('log10', Math.log10);
        this.addFunction('log', Math.log);
        this.addFunction('remainder', (n1, n2) => n1 % n2);
        this.addFunction('round', (num, decimals = 0) => decimals > 0 ? Number(num.toFixed(decimals)) : Math.round(num));
        this.addFunction('sign', Math.sign);
        this.addFunction('sin', Math.sin);
        this.addFunction('sinh', Math.sinh);
        this.addFunction('tan', Math.tan);
        this.addFunction('tanh', Math.tanh);
        this.addFunction('trunc', Math.trunc);
    }
    conversionFunctions() {
        this.addFunction('toString', Functions.toString);
        this.addFunction('toNumber', Functions.toNumber);
        this.addFunction('dateToString', (date) => {
            if (typeof date === 'string') {
                return new Date(date).toISOString();
            }
            return date.toISOString();
        });
        this.addFunction('stringify', (value) => JSON.stringify(value));
        this.addFunction('parse', (value) => JSON.parse(value));
        this.addFunction('keys', (obj) => typeof obj === 'object' ? Object.keys(obj) : []);
        this.addFunction('values', (obj) => typeof obj === 'object' ? Object.values(obj) : []);
        this.addFunction('entries', (obj) => typeof obj === 'object' ? Object.entries(obj) : []);
        this.addFunction('fromEntries', (array) => {
            if (!Array.isArray(array)) {
                return {};
            }
            const obj = {};
            for (const element of array) {
                if (!Array.isArray(element) || element.length !== 2) {
                    continue;
                }
                obj[element[0]] = element[1];
            }
            return obj;
        });
    }
    stringFunctions() {
        this.addFunction('chr', (ascii) => String.fromCharCode(ascii));
        this.addFunction('capitalize', StringFunction.capitalize);
        this.addFunction('initcap', StringFunction.initCap);
        this.addFunction('strCount', (source, value) => source.split(value).length - 1);
        this.addFunction('lower', (str) => str.toLowerCase());
        this.addFunction('lpad', (str, len, pad) => str.padStart(len, pad));
        this.addFunction('ltrim', (str) => str.trimLeft());
        this.addFunction('replace', (str, source, target) => manager_1.Helper.replace(str, source, target));
        this.addFunction('rpad', (str, len, pad) => str.padEnd(len, pad));
        this.addFunction('rtrim', (str) => str.trimRight());
        this.addFunction('substr', (str, from, count) => str.substring(from, count));
        this.addFunction('substring', (str, from, count) => str.substring(from, count));
        this.addFunction('trim', (str) => str.trim());
        this.addFunction('upper', (str) => str.toUpperCase());
        this.addFunction('concat', Functions.concat);
        this.addFunction('concatenate', Functions.concat);
        this.addFunction('test', (value, regexp) => {
            const _regexp = new RegExp(regexp);
            return _regexp.test(value);
        });
        this.addFunction('match', (value, regexp) => {
            return value ? value.match(regexp) : null;
        });
        this.addFunction('mask', (value) => {
            if (!value)
                return value;
            if (value.length > 8) {
                return value.substring(0, 3) + '*****' + value.substring(value.length - 3, value.length);
            }
            else if (value.length > 5) {
                return value.substring(0, 1) + '*****' + value.substring(value.length - 1, value.length);
            }
            else {
                return '*';
            }
        });
        this.addFunction('startWith', (value, stringSearched, position) => value.startsWith(stringSearched, position));
    }
    dateTimeFunctions() {
        this.addFunction('curTime', () => {
            const date = new Date();
            return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds();
        });
        this.addFunction('today', () => {
            const date = new Date();
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        });
        this.addFunction('now', () => new Date().toISOString());
        this.addFunction('time', (value) => {
            const date = new Date(value);
            return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds();
        });
        this.addFunction('date', (value) => {
            const date = new Date(value);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        });
        this.addFunction('datetime', (value) => new Date(value).toISOString());
        this.addFunction('year', (value) => {
            return new Date(value).getFullYear();
        });
        this.addFunction('month', (value) => {
            return new Date(value).getMonth() + 1;
        });
        this.addFunction('day', (value) => {
            return new Date(value).getDate();
        });
        this.addFunction('weekday', (value) => {
            return new Date(value).getDay();
        });
        this.addFunction('hour', (value) => {
            return new Date(value).getHours();
        });
        this.addFunction('minute', (value) => {
            return new Date(value).getMinutes();
        });
        this.addFunction('second', (value) => {
            return new Date(value).getSeconds();
        });
        this.addFunction('millisecond', (value) => {
            return new Date(value).getMilliseconds();
        });
        this.addFunction('addYear', (date, value) => {
            const _date = new Date(date);
            _date.setFullYear(_date.getFullYear() + value);
            return _date.toISOString();
        });
        this.addFunction('addMonth', (date, value) => {
            const _date = new Date(date);
            _date.setMonth(_date.getMonth() + value);
            return _date.toISOString();
        });
        this.addFunction('addDay', (date, value) => {
            const _date = new Date(date);
            _date.setDate(_date.getDate() + value);
            return _date.toISOString();
        });
        this.addFunction('addHour', (date, value) => {
            const _date = new Date(date);
            _date.setHours(_date.getHours() + value);
            return _date.toISOString();
        });
        this.addFunction('addMinute', (date, value) => {
            const _date = new Date(date);
            _date.setMinutes(_date.getMinutes() + value);
            return _date.toISOString();
        });
        this.addFunction('addSecond', (date, value) => {
            const _date = new Date(date);
            _date.setSeconds(_date.getSeconds() + value);
            return _date.toISOString();
        });
        this.addFunction('addMillisecond', (date, value) => {
            const _date = new Date(date);
            _date.setMilliseconds(_date.getMilliseconds() + value);
            return _date.toISOString();
        });
        this.addFunction('addTime', (date, time) => {
            const _time = new Date('2000-01-01T' + time);
            const _date = new Date(date);
            _date.setHours(_date.getHours() + _time.getHours());
            _date.setMinutes(_date.getMinutes() + _time.getMinutes());
            _date.setSeconds(_date.getSeconds() + _time.getSeconds());
            _date.setMilliseconds(_date.getSeconds() + _time.getMilliseconds());
            return _date.toISOString();
        });
        this.addFunction('subtractTime', (date, time) => {
            const _time = new Date('2000-01-01T' + time);
            const _date = new Date(date);
            _date.setHours(_date.getHours() - _time.getHours());
            _date.setMinutes(_date.getMinutes() - _time.getMinutes());
            _date.setSeconds(_date.getSeconds() - _time.getSeconds());
            _date.setMilliseconds(_date.getSeconds() - _time.getMilliseconds());
            return _date.toISOString();
        });
        this.addFunction('yearDiff', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.abs(_date2.getFullYear() - _date1.getFullYear());
        });
        this.addFunction('dayDiff', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.floor((_date1.getTime() - _date2.getTime()) / (24 * 3600 * 1000));
        });
        this.addFunction('hourDiff', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.floor((_date1.getTime() - _date2.getTime()) / (3600 * 1000));
        });
        this.addFunction('secondDiff', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.floor((_date1.getTime() - _date2.getTime()) / (1000));
        });
        this.addFunction('millisecondDiff', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.floor(_date1.getTime() - _date2.getTime());
        });
        this.addFunction('dayToDate', (value) => {
            return new Date(value * 24 * 3600 * 1000).toISOString();
        });
        this.addFunction('hourToDate', (value) => {
            return new Date(value * 3600 * 1000).toISOString();
        });
        this.addFunction('secondToDate', (value) => {
            return new Date(value * 1000).toISOString();
        });
        this.addFunction('millisecondToDate', (value) => {
            return new Date(value).toISOString();
        });
    }
    initArrayFunctions() {
        this.addFunction('map', ArrayFunctions.map, model_1.OperatorType.arrow, Map);
        this.addFunction('select', ArrayFunctions.map, model_1.OperatorType.arrow, Map);
        this.addFunction('foreach', ArrayFunctions.foreach, model_1.OperatorType.arrow, Foreach);
        this.addFunction('each', ArrayFunctions.foreach, model_1.OperatorType.arrow, Foreach);
        this.addFunction('filter', ArrayFunctions.filter, model_1.OperatorType.arrow, Filter);
        this.addFunction('where', ArrayFunctions.filter, model_1.OperatorType.arrow, Filter);
        this.addFunction('reverse', ArrayFunctions.reverse, model_1.OperatorType.arrow, Reverse);
        this.addFunction('sort', ArrayFunctions.sort, model_1.OperatorType.arrow, Sort);
        this.addFunction('order', ArrayFunctions.sort, model_1.OperatorType.arrow, Sort);
        this.addFunction('remove', ArrayFunctions.remove, model_1.OperatorType.arrow, Remove);
        this.addFunction('delete', ArrayFunctions.remove, model_1.OperatorType.arrow, Remove);
        this.addFunction('push', (list, item) => {
            list.push(item);
            return list;
        }, model_1.OperatorType.child);
        this.addFunction('insert', (list, item) => {
            list.push(item);
            return list;
        }, model_1.OperatorType.child);
        this.addFunction('pop', (list) => list.pop(), model_1.OperatorType.child);
        this.addFunction('length', (list) => list.length, model_1.OperatorType.child);
        this.addFunction('len', (list) => list.length, model_1.OperatorType.child);
        this.addFunction('slice', (list, from, to) => list.slice(from, to), model_1.OperatorType.child);
        this.addFunction('page', (list, page, records) => {
            let from = (page - 1) * records;
            if (from < 0) {
                from = 0;
            }
            let to = from + records;
            if (to > list.length) {
                to = list.length - 1;
            }
            return list.slice(from, to);
        }, model_1.OperatorType.child);
        // this.addFunction('insert', ArrayFunctions.insert, OperatorType.arrow, Insert)
        // this.addFunction('update', ArrayFunctions.update, OperatorType.arrow, Update)
    }
    initArrayGroupFunctions() {
        this.addFunction('distinct', ArrayFunctions.distinct, model_1.OperatorType.arrow, Distinct);
        this.addFunction('first', ArrayFunctions.first, model_1.OperatorType.arrow, First);
        this.addFunction('last', ArrayFunctions.last, model_1.OperatorType.arrow, Last);
        this.addFunction('count', ArrayFunctions.count, model_1.OperatorType.arrow, Count);
        this.addFunction('max', ArrayFunctions.count, model_1.OperatorType.arrow, Max);
        this.addFunction('min', ArrayFunctions.count, model_1.OperatorType.arrow, Min);
        this.addFunction('avg', ArrayFunctions.count, model_1.OperatorType.arrow, Avg);
        this.addFunction('sum', ArrayFunctions.count, model_1.OperatorType.arrow, Sum);
    }
    initSetsFunctions() {
        this.addFunction('union', SetsFunctions.union, model_1.OperatorType.child, Union);
        this.addFunction('intersection', SetsFunctions.intersection, model_1.OperatorType.child, Intersection);
        this.addFunction('difference', SetsFunctions.difference, model_1.OperatorType.child, Difference);
        this.addFunction('symmetricDifference', SetsFunctions.symmetricDifference, model_1.OperatorType.child, SymmetricDifference);
    }
}
exports.CoreLib = CoreLib;
class CoreHelper {
    static objectKey(obj) {
        const keys = Object.keys(obj).sort();
        const list = [];
        for (const key of keys) {
            list.push(key);
            list.push(obj[key].toString());
        }
        return list.join('|');
    }
    static getKeys(variable, fields, list) {
        const keys = [];
        // loop through the list and group by the grouper fields
        for (const item of list) {
            let key = '';
            const values = [];
            for (const keyValue of fields) {
                variable.set(item);
                const value = keyValue.children[0].eval();
                if (typeof value === 'object') {
                    throw new Error(`Property value ${keyValue.name} is an object, so it cannot be grouped`);
                }
                key = key === '' ? value : `${key}-${value}`;
                values.push({ name: keyValue.name, value: value });
            }
            // find if the key already exists in the list of keys
            const keyItem = keys.find((p) => p.key === key);
            if (keyItem) {
                // if the key exists add the item
                keyItem.items.push(item);
            }
            else {
                // if the key does not exist add the key, the values and the item
                keys.push({ key: key, values: values, items: [item], summarizers: [] });
            }
        }
        return keys;
    }
    static haveAggregates(operand) {
        if (!(operand instanceof operands_1.ArrowFunction) && operand instanceof operands_1.FunctionRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
            return true;
        }
        else if (operand.children && operand.children.length > 0) {
            for (const child of operand.children) {
                if (this.haveAggregates(child)) {
                    return true;
                }
            }
        }
        return false;
    }
    static findAggregates(operand) {
        if (!(operand instanceof operands_1.ArrowFunction) && operand instanceof operands_1.FunctionRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
            return [operand];
        }
        else if (operand.children && operand.children.length > 0) {
            let aggregates = [];
            for (const child of operand.children) {
                const childAggregates = this.findAggregates(child);
                if (childAggregates.length > 0) {
                    aggregates = aggregates.concat(childAggregates);
                }
            }
            return aggregates;
        }
        return [];
    }
    static solveAggregates(list, variable, operand) {
        if (!(operand instanceof operands_1.ArrowFunction) && operand instanceof operands_1.FunctionRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
            let value;
            switch (operand.name) {
                case 'avg':
                    value = this.avg(list, variable, operand.children[0]);
                    break;
                case 'count':
                    value = this.count(list, variable, operand.children[0]);
                    break;
                case 'first':
                    value = this.first(list, variable, operand.children[0]);
                    break;
                case 'last':
                    value = this.last(list, variable, operand.children[0]);
                    break;
                case 'max':
                    value = this.max(list, variable, operand.children[0]);
                    break;
                case 'min':
                    value = this.min(list, variable, operand.children[0]);
                    break;
                case 'sum':
                    value = this.sum(list, variable, operand.children[0]);
                    break;
            }
            return new operands_1.Constant(value);
        }
        else if (operand.children && operand.children.length > 0) {
            for (let i = 0; i < operand.children.length; i++) {
                operand.children[i] = this.solveAggregates(list, variable, operand.children[i]);
            }
        }
        return operand;
    }
    static count(list, variable, aggregate) {
        let count = 0;
        for (const item of list) {
            variable.set(item);
            if (aggregate.eval()) {
                count++;
            }
        }
        return count;
    }
    static first(list, variable, aggregate) {
        for (const item of list) {
            variable.set(item);
            if (aggregate.eval()) {
                return item;
            }
        }
        return null;
    }
    static last(list, variable, aggregate) {
        for (let i = list.length - 1; i >= 0; i--) {
            const item = list[i];
            variable.set(item);
            if (aggregate.eval()) {
                return item;
            }
        }
        return null;
    }
    static max(list, variable, aggregate) {
        let max;
        for (const item of list) {
            variable.set(item);
            const value = aggregate.eval();
            if (max === undefined || (value !== null && value > max)) {
                max = value;
            }
        }
        return max;
    }
    static min(list, variable, aggregate) {
        let min;
        for (const item of list) {
            variable.set(item);
            const value = aggregate.eval();
            if (min === undefined || (value !== null && value < min)) {
                min = value;
            }
        }
        return min;
    }
    static avg(list, variable, aggregate) {
        let sum = 0;
        for (const item of list) {
            variable.set(item);
            const value = aggregate.eval();
            if (value !== null) {
                sum = sum + value;
            }
        }
        return list.length > 0 ? sum / list.length : 0;
    }
    static sum(list, variable, aggregate) {
        let sum = 0;
        for (const item of list) {
            variable.set(item);
            const value = aggregate.eval();
            if (value !== null) {
                sum = sum + value;
            }
        }
        return sum;
    }
}
class Operators {
    static addition(a, b) {
        return a + b;
    }
    static subtraction(a, b) {
        return a - b;
    }
    static negative(a) {
        return a * -1;
    }
    static multiplication(a, b) {
        return a * b;
    }
    static division(a, b) {
        return a / b;
    }
    static exponentiation(a, b) {
        return a ** b;
    }
    static floorDivision(a, b) {
        return Math.pow(a, 1 / b);
    }
    static mod(a, b) {
        return a % b;
    }
    static bitAnd(a, b) {
        return a & b;
    }
    static bitOr(a, b) {
        return a | b;
    }
    static bitXor(a, b) {
        return a ^ b;
    }
    static bitNot(a) {
        return ~a;
    }
    static leftShift(a, b) {
        return a << b;
    }
    static rightShift(a, b) {
        return a >> b;
    }
    static equal(a, b) {
        return a === b;
    }
    static notEqual(a, b) {
        return a !== b;
    }
    static greaterThan(a, b) {
        return a > b;
    }
    static lessThan(a, b) {
        return a < b;
    }
    static greaterThanOrEqual(a, b) {
        return a >= b;
    }
    static lessThanOrEqual(a, b) {
        return a <= b;
    }
    static and(a, b) {
        return a && b;
    }
    static or(a, b) {
        return a || b;
    }
    static not(a) {
        return !a;
    }
    static item(list, index) {
        return list[index];
    }
    static assignment(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentAddition(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentSubtraction(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentMultiplication(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentDivision(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentExponentiation(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentFloorDivision(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentMod(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentBitAnd(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentBitOr(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentBitXor(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentLeftShift(a, b) {
        throw new Error('NotImplemented');
    }
    static assignmentRightShift(a, b) {
        throw new Error('NotImplemented');
    }
}
class And extends operands_1.Operator {
    eval() {
        if (!this.children[0].eval())
            return false;
        return this.children[1].eval();
    }
}
class Or extends operands_1.Operator {
    eval() {
        if (this.children[0].eval())
            return true;
        return this.children[1].eval();
    }
}
class Assignment extends operands_1.Operator {
    eval() {
        const value = this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssignmentAddition extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() + this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssignmentSubtraction extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() - this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssignmentMultiplication extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() * this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssignmentDivision extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() / this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssignmentExponentiation extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() ** this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssignmentFloorDivision extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval(); // this.children[1].eval()
        this.children[0].set(value);
        return value;
    }
}
class AssignmentMod extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() % this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssignmentBitAnd extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() & this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssignmentBitOr extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() | this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssignmentBitXor extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() ^ this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssignmentLeftShift extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() << this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssignmentRightShift extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() >> this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class StringFunction {
    static initCap(str) {
        const newStr = str.split(' ');
        let i;
        const arr = [];
        for (i = 0; i < newStr.length; i++) {
            arr.push(StringFunction.capitalize(newStr[i]));
        }
        return arr.join(' ');
    }
}
StringFunction.capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
class Functions {
    static nvl(value, _default) {
        return Functions.isNotNull(value) ? value : _default;
    }
    static nvl2(value, a, b) {
        return Functions.isNotNull(value) ? a : b;
    }
    static isNull(value) {
        return value === undefined || value === null;
    }
    static isNotNull(value) {
        return !Functions.isNull(value);
    }
    static isEmpty(value) {
        return value === null || value === undefined || value.toString().trim().length === 0;
    }
    static isNotEmpty(value) {
        return !Functions.isEmpty(value);
    }
    static isBoolean(value) {
        return typeof value === 'boolean';
    }
    static isNumber(value) {
        return Functions.isDecimal(value);
    }
    static isInteger(value) {
        return Number.isInteger(value);
    }
    static isDecimal(value) {
        return !isNaN(value);
    }
    static isString(value) {
        return typeof value === 'string';
    }
    static isDate(value) {
        if (typeof value === 'string') {
            return Functions.isDateFormat(value);
        }
        else {
            return typeof value.getMonth === 'function';
        }
    }
    static isDatetime(value) {
        if (typeof value === 'string') {
            return Functions.isDatetimeFormat(value);
        }
        else {
            return typeof value.getMonth === 'function';
        }
    }
    static isObject(value) {
        return typeof value === 'object' && !Array.isArray(value);
    }
    static isArray(value) {
        return Array.isArray(value);
    }
    static isTime(value) {
        if (typeof value === 'string') {
            return Functions.isTimeFormat(value);
        }
        else {
            return typeof value.getMonth === 'function';
        }
    }
    static isBooleanFormat(value) {
        return ['true', 'false'].includes(value);
    }
    static isNumberFormat(value) {
        return Functions.isDecimalFormat(value);
    }
    static isIntegerFormat(value) {
        const regex = /^\d+$/;
        return value.match(regex) !== null;
    }
    static isDecimalFormat(value) {
        const regex = /^\d+\.\d+$/;
        return value.match(regex) !== null;
    }
    static isStringFormat(value) {
        const regex = /[a-zA-Z0-9_.]+$/;
        return value.match(regex) !== null;
    }
    static isDateFormat(value) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return value.match(regex) !== null;
    }
    static isDatetimeFormat(value) {
        const regex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
        return value.match(regex) !== null;
    }
    static isTimeFormat(value) {
        // https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
        const regex = /\[0-2]\d:[0-5]\d:[0-5]\d/;
        return value.match(regex) !== null;
    }
    static async sleep(ms = 1000) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    static between(value, from, to) {
        return value >= from && value < to;
    }
    static includes(list, value) {
        if (list && value) {
            return list.includes(value);
        }
        else {
            return false;
        }
    }
    static toString(value) {
        return Functions.isNull(value) ? '' : value.toString();
    }
    static toNumber(value) {
        return Functions.isNull(value) ? 0 : parseFloat(value);
    }
    static concat(...values) {
        if (!values || values.length === 0) {
            return '';
        }
        if (typeof values[0] === 'string') {
            return ''.concat(...values);
        }
        else if (Array.isArray(values[0])) {
            return [].concat(...values);
        }
        else {
            const list = [];
            for (const value of values) {
                list.push(value);
            }
            return list;
        }
    }
}
class ArrayFunctions {
    static map(list, method) { throw new Error('Empty'); }
    static distinct(list, method) { throw new Error('Empty'); }
    static foreach(list, method) { throw new Error('Empty'); }
    static filter(list, method) { throw new Error('Empty'); }
    static reverse(list, method) { throw new Error('Empty'); }
    static sort(list, method) { throw new Error('Empty'); }
    static remove(list, method) { throw new Error('Empty'); }
    static first(list, method) { throw new Error('Empty'); }
    static last(list, method) { throw new Error('Empty'); }
    static count(list, method) { throw new Error('Empty'); }
    static max(list, method) { throw new Error('Empty'); }
    static min(list, method) { throw new Error('Empty'); }
    static avg(list, method) { throw new Error('Empty'); }
    static sum(list, method) { throw new Error('Empty'); }
    static insert(list, item) { throw new Error('Empty'); }
    static update(list, item, method) { throw new Error('Empty'); }
}
class SetsFunctions {
    static union(a, b) { throw new Error('Empty'); }
    static intersection(a, b) { throw new Error('Empty'); }
    static difference(a, b) { throw new Error('Empty'); }
    static symmetricDifference(a, b) { throw new Error('Empty'); }
}
class Map extends operands_1.ArrowFunction {
    eval() {
        const rows = [];
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (this.children[2] instanceof operands_1.Obj) {
            const groupers = [];
            const aggregates = [];
            for (const child of this.children[2].children) {
                // In the case of being an object the value to return, find out if there are fields that are summarized
                const keyValue = child;
                if (keyValue) {
                    if (CoreHelper.haveAggregates(keyValue.children[0])) {
                        aggregates.push(keyValue);
                    }
                    else {
                        groupers.push(keyValue);
                    }
                }
            }
            if (aggregates.length > 0) {
                // case with aggregate functions
                const keys = CoreHelper.getKeys(this.children[1], groupers, list);
                // once you got all the keys you have to calculate the aggregates fields
                const variable = this.children[1];
                const mainData = index_1.expressions.operand.getMainData(variable);
                for (const key of keys) {
                    for (const keyValue of aggregates) {
                        const operandCloned = index_1.expressions.operand.clone(keyValue.children[0]);
                        index_1.expressions.operand.initialize(operandCloned, mainData);
                        const operandResolved = CoreHelper.solveAggregates(key.items, variable, operandCloned);
                        const value = operandResolved.eval();
                        // const value = operandResolved.eval()
                        key.summarizers.push({ name: keyValue.name, value: value });
                    }
                }
                // build the list of results
                for (const key of keys) {
                    const row = {};
                    for (const value of key.values) {
                        row[value.name] = value.value;
                    }
                    for (const summarizer of key.summarizers) {
                        row[summarizer.name] = summarizer.value;
                    }
                    rows.push(row);
                }
                return rows;
            }
        }
        // simple case without aggregate functions
        for (const item of list) {
            this.children[1].set(item);
            const row = this.children[2].eval();
            rows.push(row);
        }
        return rows;
    }
}
class Distinct extends operands_1.ArrowFunction {
    eval() {
        const rows = [];
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (this.children.length === 1) {
            // simple case
            for (const item of list) {
                if (rows.find((p) => p === item) === undefined) {
                    rows.push(item);
                }
            }
            return rows;
        }
        else if (this.children[2] instanceof operands_1.Obj) {
            // case with aggregate functions
            const keys = CoreHelper.getKeys(this.children[1], this.children[2].children, list);
            // build the list of results
            for (const key of keys) {
                const row = {};
                for (const value of key.values) {
                    row[value.name] = value.value;
                }
                rows.push(row);
            }
            return rows;
        }
        else if (this.children[2] instanceof operands_1.List) {
            throw new Error('Distinct not support Array result');
        }
        // simple case without aggregate functions
        for (const item of list) {
            this.children[1].set(item);
            const value = this.children[2].eval();
            if (rows.find((p) => p === value) === undefined) {
                rows.push(value);
            }
        }
        return rows;
    }
}
class Foreach extends operands_1.ArrowFunction {
    eval() {
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        for (let i = 0; i < list.length; i++) {
            const p = list[i];
            this.children[1].set(p);
            this.children[2].eval();
        }
        return list;
    }
}
class Filter extends operands_1.ArrowFunction {
    eval() {
        const rows = [];
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        for (let i = 0; i < list.length; i++) {
            const p = list[i];
            this.children[1].set(p);
            if (this.children[2].eval()) {
                rows.push(p);
            }
        }
        return rows;
    }
}
class Reverse extends operands_1.ArrowFunction {
    eval() {
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (this.children.length === 1) {
            return list.reverse();
        }
        const values = [];
        for (let i = 0; i < list.length; i++) {
            const p = list[i];
            this.children[1].set(p);
            const value = this.children[2].eval();
            values.push({ value: value, p: p });
        }
        values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0);
        values.reverse();
        return values.map(p => p.p);
    }
}
class Sort extends operands_1.ArrowFunction {
    eval() {
        const values = [];
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (this.children.length === 1) {
            return list.sort();
        }
        for (let i = 0; i < list.length; i++) {
            const p = list[i];
            this.children[1].set(p);
            const value = this.children[2].eval();
            values.push({ value: value, p: p });
        }
        values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0);
        return values.map(p => p.p);
    }
}
class Remove extends operands_1.ArrowFunction {
    eval() {
        const rows = [];
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        for (let i = 0; i < list.length; i++) {
            const p = list[i];
            this.children[1].set(p);
            if (!this.children[2].eval()) {
                rows.push(p);
            }
        }
        return rows;
    }
}
class First extends operands_1.ArrowFunction {
    eval() {
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (this.children.length === 1) {
            return list && list.length > 0 ? list[0] : null;
        }
        return CoreHelper.first(list, this.children[1], this.children[2]);
    }
}
class Last extends operands_1.ArrowFunction {
    eval() {
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (this.children.length === 1) {
            return list && list.length > 0 ? list[list.length - 1] : null;
        }
        return CoreHelper.last(list, this.children[1], this.children[2]);
    }
}
class Count extends operands_1.ArrowFunction {
    eval() {
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (this.children.length === 1) {
            return list.length;
        }
        return CoreHelper.count(list, this.children[1], this.children[2]);
    }
}
class Max extends operands_1.ArrowFunction {
    eval() {
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (this.children.length === 1) {
            let max;
            for (const item of list) {
                if (max === undefined || (item !== null && item > max)) {
                    max = item;
                }
            }
            return max;
        }
        return CoreHelper.max(list, this.children[1], this.children[2]);
    }
}
class Min extends operands_1.ArrowFunction {
    eval() {
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (this.children.length === 1) {
            let min;
            for (const item of list) {
                if (min === undefined || (item !== null && item < min)) {
                    min = item;
                }
            }
            return min;
        }
        return CoreHelper.min(list, this.children[1], this.children[2]);
    }
}
class Avg extends operands_1.ArrowFunction {
    eval() {
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (this.children.length === 1) {
            let sum = 0;
            for (const item of list) {
                if (item !== null) {
                    sum = sum + item;
                }
            }
            return list.length > 0 ? sum / list.length : 0;
        }
        return CoreHelper.avg(list, this.children[1], this.children[2]);
    }
}
class Sum extends operands_1.ArrowFunction {
    eval() {
        const list = this.children[0].eval();
        if (!list) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (this.children.length === 1) {
            let sum = 0;
            for (const item of list) {
                if (item !== null) {
                    sum = sum + item;
                }
            }
            return sum;
        }
        return CoreHelper.sum(list, this.children[1], this.children[2]);
    }
}
class Union extends operands_1.ChildFunction {
    eval() {
        const a = this.children[0].eval();
        const b = this.children[1].eval();
        if (!a) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (!b) {
            throw new Error(`Array ${this.children[1].name} undefined`);
        }
        if (a.length === 0) {
            return b;
        }
        if (b.length === 0) {
            return a;
        }
        let result = [];
        if (Array.isArray(a[0]) || Array.isArray(b[0])) {
            throw new Error('Cannot union arrays of arrays');
        }
        else if (typeof a[0] === 'object') {
            for (const element of a) {
                const key = CoreHelper.objectKey(element);
                result.push({ key: key, value: element });
            }
            for (const element of b) {
                const key = CoreHelper.objectKey(element);
                if (!result.find((p) => p.key === key)) {
                    result.push({ key: key, value: element });
                }
            }
            return result.map((p) => p.value);
        }
        result = result.concat(a);
        for (const element of b) {
            if (!result.includes(element)) {
                result.push(element);
            }
        }
        return result;
    }
}
class Intersection extends operands_1.ChildFunction {
    eval() {
        const a = this.children[0].eval();
        const b = this.children[1].eval();
        if (!a) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (!b) {
            throw new Error(`Array ${this.children[1].name} undefined`);
        }
        if (a.length === 0 || b.length === 0) {
            return [];
        }
        const result = [];
        if (Array.isArray(a[0]) || Array.isArray(b[0])) {
            throw new Error('Cannot union arrays of arrays');
        }
        else if (typeof a[0] === 'object') {
            const keys = a.map((p) => CoreHelper.objectKey(p));
            for (const element of b) {
                const key = CoreHelper.objectKey(element);
                if (keys.includes(key)) {
                    result.push(element);
                }
            }
            return result;
        }
        else {
            for (const element of b) {
                if (a.includes(element)) {
                    result.push(element);
                }
            }
            return result;
        }
    }
}
class Difference extends operands_1.ChildFunction {
    eval() {
        const a = this.children[0].eval();
        const b = this.children[1].eval();
        if (!a) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (!b) {
            throw new Error(`Array ${this.children[1].name} undefined`);
        }
        if (a.length === 0) {
            return [];
        }
        if (b.length === 0) {
            return a;
        }
        const result = [];
        if (Array.isArray(a[0]) || Array.isArray(b[0])) {
            throw new Error('Cannot union arrays of arrays');
        }
        else if (typeof a[0] === 'object') {
            const keys = b.map((p) => CoreHelper.objectKey(p));
            for (const element of a) {
                const key = CoreHelper.objectKey(element);
                if (!keys.includes(key)) {
                    result.push(element);
                }
            }
            return result;
        }
        else {
            for (const element of a) {
                if (!b.includes(element)) {
                    result.push(element);
                }
            }
            return result;
        }
    }
}
class SymmetricDifference extends operands_1.ChildFunction {
    eval() {
        const a = this.children[0].eval();
        const b = this.children[1].eval();
        if (!a) {
            throw new Error(`Array ${this.children[0].name} undefined`);
        }
        if (!b) {
            throw new Error(`Array ${this.children[1].name} undefined`);
        }
        if (a.length === 0) {
            return b;
        }
        if (b.length === 0) {
            return a;
        }
        const result = [];
        if (Array.isArray(a[0]) || Array.isArray(b[0])) {
            throw new Error('Cannot union arrays of arrays');
        }
        else if (typeof a[0] === 'object') {
            const aKeys = a.map((p) => CoreHelper.objectKey(p));
            const bKeys = b.map((p) => CoreHelper.objectKey(p));
            for (const element of a) {
                const key = CoreHelper.objectKey(element);
                if (!bKeys.includes(key)) {
                    result.push(element);
                }
            }
            for (const element of b) {
                const key = CoreHelper.objectKey(element);
                if (!aKeys.includes(key)) {
                    result.push(element);
                }
            }
            return result;
        }
        else {
            for (const element of a) {
                if (!b.includes(element)) {
                    result.push(element);
                }
            }
            for (const element of b) {
                if (!a.includes(element)) {
                    result.push(element);
                }
            }
            return result;
        }
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
//# sourceMappingURL=coreLib.js.map