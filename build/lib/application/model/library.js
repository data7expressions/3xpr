"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreLibrary = void 0;
const h3lp_1 = require("h3lp");
const domain_1 = require("../../domain");
const helper_1 = require("../helper");
class CoreLibrary {
    // eslint-disable-next-line no-useless-constructor
    constructor(model, builder) {
        this.model = model;
        this.builder = builder;
    }
    load() {
        this.constants();
        this.enums();
        this.formats();
        this.operators();
        this.generalFunctions();
        this.comparisonFunctions();
        this.nullFunctions();
        this.numberFunctions();
        this.stringFunctions();
        this.arrayFunctions();
        this.groupFunctions();
        this.dateTimeFunctions();
        this.conversionFunctions();
        this.setsFunctions();
    }
    constants() {
        this.model.addConstant('true', true);
        this.model.addConstant('false', false);
        this.model.addConstant('null', null);
    }
    enums() {
        this.model.addEnum('DayOfWeek', [['Sunday', 0], ['Monday', 1], ['Tuesday', 2], ['Wednesday', 3], ['Thursday', 4], ['Friday', 5], ['Saturday', 6]]);
    }
    formats() {
        this.model.addFormat('email', '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$');
        this.model.addFormat('integer', '^\\d+$');
        this.model.addFormat('decimal', '^\\d+\\.\\d+$');
        this.model.addFormat('string', '^[a-zA-Z0-9_.]+$');
        // https://stackoverflow.com/questions/3143070/javascript-regex-iso-dateTime
        this.model.addFormat('date', '^\\d{4}-\\d{2}-\\d{2}$');
        this.model.addFormat('dateTime', '\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+([+-][0-2]\\d:[0-5]\\d|Z)');
        this.model.addFormat('time', '\\[0-2]\\d:[0-5]\\d:[0-5]\\d');
    }
    operators() {
        this.model.addOperator('+(a:T,b:T):T', (a, b) => a + b, { priority: 5 });
        this.model.addOperator('-(a:number,b:number):number', (a, b) => a - b, { priority: 5 });
        this.model.addOperator('-(a:number):number', (a) => a * -1, { priority: 9 });
        this.model.addOperator('*(a:number,b:number):number', (a, b) => a * b, { priority: 6 });
        this.model.addOperator('/(a:number,b:number):number', (a, b) => a / b, { priority: 6 });
        this.model.addOperator('**(a:number,b:number):number', (a, b) => a ** b, { priority: 7 });
        this.model.addOperator('//(a:number,b:number):number', (a, b) => Math.pow(a, 1 / b), { priority: 7 });
        this.model.addOperator('%(a:number,b:number):number', (a, b) => a % b, { priority: 8 });
        this.model.addOperator('&(a:number,b:number):number', (a, b) => a & b, { priority: 5 });
        this.model.addOperator('|(a:number,b:number):number', (a, b) => a | b, { priority: 5 });
        this.model.addOperator('^(a:number,b:number):number', (a, b) => a ^ b, { priority: 5 });
        this.model.addOperator('~(a:number):number', (a) => ~a, { priority: 9 });
        this.model.addOperator('<<(a:number,b:number):number', (a, b) => a << b, { priority: 5 });
        this.model.addOperator('>>(a:number,b:number):number', (a, b) => a >> b, { priority: 5 });
        this.model.addOperator('==(a:T,b:T):boolean', (a, b) => a === b, { priority: 4 });
        this.model.addOperatorAlias('===', '==');
        this.model.addOperator('!=(a:T,b:T):boolean', (a, b) => a !== b, { priority: 4 });
        this.model.addOperatorAlias('!==', '!=');
        this.model.addOperatorAlias('<>', '!=');
        this.model.addOperator('>(a:T,b:T):boolean', (a, b) => a > b, { priority: 4 });
        this.model.addOperator('<(a:T,b:T):boolean', (a, b) => a < b, { priority: 4 });
        this.model.addOperator('>=(a:T,b:T):boolean', (a, b) => a >= b, { priority: 4 });
        this.model.addOperator('<=(a:T,b:T):boolean', (a, b) => a <= b, { priority: 3 });
        this.model.addOperator('&&(a:boolean,b:boolean):boolean', new And(), { priority: 3 });
        this.model.addOperator('||(a:boolean,b:boolean):boolean', new Or(), { priority: 3 });
        this.model.addOperator('!(a:boolean):boolean', (a) => !a, { priority: 5 });
        this.model.addOperator('[](list:T[],index:integer):T', (list, index) => list[index], { priority: 2 });
        this.model.addOperator('$(name:string):string', (name) => process.env[name], { priority: 9 });
        this.model.addOperator('=(a:T,b:T):T', new Assignment(), { priority: 1 });
        this.model.addOperator('+=(a:number,b:number):number', new AssignmentAddition(), { priority: 1 });
        this.model.addOperator('-=(a:number,b:number):number', new AssignmentSubtraction(), { priority: 1 });
        this.model.addOperator('*=(a:number,b:number):number', new AssignmentMultiplication(), { priority: 1 });
        this.model.addOperator('/=(a:number,b:number):number', new AssignmentDivision(), { priority: 1 });
        this.model.addOperator('**=(a:number,b:number):number', new AssignmentExponentiation(), { priority: 1 });
        this.model.addOperator('//=(a:number,b:number):number', new AssignmentFloorDivision(), { priority: 1 });
        this.model.addOperator('%=(a:number,b:number):number', new AssignmentMod(), { priority: 1 });
        this.model.addOperator('&=(a:number,b:number):number', new AssignmentBitAnd(), { priority: 1 });
        this.model.addOperator('|=(a:number,b:number):number', new AssignmentBitOr(), { priority: 1 });
        this.model.addOperator('^=(a:number,b:number):number', new AssignmentBitXor(), { priority: 1 });
        this.model.addOperator('<<=(a:number,b:number):number', new AssignmentLeftShift(), { priority: 1 });
        this.model.addOperator('>>=(a:number,b:number):number', new AssignmentRightShift(), { priority: 1 });
    }
    generalFunctions() {
        // this.model.addFunction('async sleep(ms?: number)', Functions.sleep)
        this.model.addFunction('console(value:any)', (value) => {
            console.log(typeof value === 'object' ? JSON.stringify(value) : value);
        });
    }
    nullFunctions() {
        this.model.addFunction('nvl(value:T, default:T):T', (value, _default) => h3lp_1.h3lp.utils.nvl(value, _default));
        this.model.addFunction('nvl2(value:any, a:T,b:T):T', (value, a, b) => h3lp_1.h3lp.utils.nvl2(value, a, b));
    }
    comparisonFunctions() {
        this.model.addFunction('between(value:T,from:T,to:T):boolean', (value, from, to) => h3lp_1.h3lp.val.between(value, from, to));
        this.model.addFunction('includes(source:string|T[],value:string|T):boolean', (source, value) => source && value ? source.includes(value) : false);
        this.model.addFunctionAlias('contains', 'includes');
        this.model.addFunction('in(source:T,...values:T):boolean', (source, ...values) => {
            if (source === undefined || values === undefined) {
                return false;
            }
            if (values.length === 1 && Array.isArray(values)) {
                return values[0].includes(source);
            }
            else {
                return values.includes(source);
            }
        });
        this.model.addFunction('isNull(value:any):boolean', (value) => h3lp_1.h3lp.val.isNull(value));
        this.model.addFunction('isNotNull(value:any):boolean', (value) => h3lp_1.h3lp.val.isNotNull(value));
        this.model.addFunction('isEmpty(value:string):boolean', (value) => h3lp_1.h3lp.val.isEmpty(value));
        this.model.addFunction('isNotEmpty(value:string):boolean', (value) => h3lp_1.h3lp.val.isNotEmpty(value));
        this.model.addFunction('isBoolean(value:any):boolean', (value) => h3lp_1.h3lp.val.isBoolean(value));
        this.model.addFunction('isNumber(value:any):boolean', (value) => h3lp_1.h3lp.val.isNumber(value));
        this.model.addFunction('isInteger(value:any):boolean', (value) => h3lp_1.h3lp.val.isInteger(value));
        this.model.addFunction('isDecimal(value:any):boolean', (value) => h3lp_1.h3lp.val.isDecimal(value));
        this.model.addFunction('isString(value:any):boolean', (value) => h3lp_1.h3lp.val.isString(value));
        this.model.addFunction('isDate(value:any):boolean', (value) => h3lp_1.h3lp.val.isDate(value));
        this.model.addFunction('isDateTime(value:any):boolean', (value) => h3lp_1.h3lp.val.isDateTime(value));
        this.model.addFunction('isTime(value:any):boolean', (value) => h3lp_1.h3lp.val.isTime(value));
        this.model.addFunction('isObject(value:any):boolean', (value) => h3lp_1.h3lp.val.isObject(value));
        this.model.addFunction('isArray(value:any):boolean', (value) => h3lp_1.h3lp.val.isArray(value));
        this.model.addFunction('isBooleanFormat(value:string):boolean', (value) => h3lp_1.h3lp.val.isBooleanFormat(value));
        this.model.addFunction('isNumberFormat(value:string):boolean', (value) => h3lp_1.h3lp.val.isNumberFormat(value));
        this.model.addFunction('isIntegerFormat(value:string):boolean', (value) => h3lp_1.h3lp.val.isIntegerFormat(value));
        this.model.addFunction('isDecimalFormat(value:string):boolean', (value) => h3lp_1.h3lp.val.isDecimalFormat(value));
        this.model.addFunction('isDateFormat(value:string):boolean', (value) => h3lp_1.h3lp.val.isDateFormat(value));
        this.model.addFunction('isDateTimeFormat(value:string):boolean', (value) => h3lp_1.h3lp.val.isDateTimeFormat(value));
        this.model.addFunction('isTimeFormat(value:string):boolean', (value) => h3lp_1.h3lp.val.isTimeFormat(value));
    }
    numberFunctions() {
        this.model.addFunction('abs(x:number):number', Math.abs);
        this.model.addFunction('acos(x:number):number', Math.acos);
        this.model.addFunction('asin(x:number):number', Math.asin);
        this.model.addFunction('atan(x:number):number', Math.atan);
        this.model.addFunction('atan2(x:number):number', Math.atan2);
        this.model.addFunction('ceil(x:number):number', Math.ceil);
        this.model.addFunction('cos(x:number):number', Math.cos);
        this.model.addFunction('cosh(x:number):number', Math.cosh);
        this.model.addFunction('exp(x:number):number', Math.exp);
        this.model.addFunction('floor(x:number):number', Math.floor);
        this.model.addFunction('ln(x:number):number', Math.log);
        this.model.addFunction('log10(x:number):number', Math.log10);
        this.model.addFunction('log(x:number):number', Math.log);
        this.model.addFunction('remainder(n1:number,n2:number):number', (n1, n2) => n1 % n2);
        this.model.addFunction('round(num:number,decimals=0):number', (num, decimals = 0) => decimals > 0 ? Number(num.toFixed(decimals)) : Math.round(num));
        this.model.addFunction('sign(x:number):number', Math.sign);
        this.model.addFunction('sin(x:number):number', Math.sin);
        this.model.addFunction('sinh(x:number):number', Math.sinh);
        this.model.addFunction('tan(x:number):number', Math.tan);
        this.model.addFunction('tanh(x:number):number', Math.tanh);
        this.model.addFunction('trunc(x:number):number', Math.trunc);
    }
    conversionFunctions() {
        this.model.addFunction('toString(value:any):string', (value) => h3lp_1.h3lp.str.toString(value));
        this.model.addFunction('toNumber(value:any):number', (value) => h3lp_1.h3lp.utils.toNumber(value));
        this.model.addFunction('dateToString(date:date):string', (date) => {
            if (typeof date === 'string') {
                return new Date(date).toISOString();
            }
            return date.toISOString();
        });
        this.model.addFunction('stringify(value:any):string', (value) => JSON.stringify(value));
        this.model.addFunction('parse(value:string):any', (value) => JSON.parse(value));
        this.model.addFunction('keys(obj: any):string[]', (obj) => typeof obj === 'object' ? Object.keys(obj) : []);
        this.model.addFunction('values(obj: any):any[]', (obj) => typeof obj === 'object' ? Object.values(obj) : []);
        this.model.addFunction('entries(obj: any):[string,any][]', (obj) => typeof obj === 'object' ? Object.entries(obj) : []);
        this.model.addFunction('fromEntries(entries: [string,any][]): any', (entries) => h3lp_1.h3lp.obj.fromEntries(entries));
    }
    stringFunctions() {
        this.model.addFunction('chr(ascii: number):string', (ascii) => String.fromCharCode(ascii));
        this.model.addFunction('capitalize(value:string):string', (value) => h3lp_1.h3lp.str.capitalize(value));
        this.model.addFunction('endsWith(value:string, sub:string, start:number):boolean', (value, sub, start) => value.endsWith(sub, start));
        this.model.addFunction('strCount(source: string, value: string):number', (source, value) => source.split(value).length - 1);
        this.model.addFunction('lower(value: string):string', (value) => value.toLowerCase());
        this.model.addFunction('lpad(value: string, len: number, pad: string):string', (value, len, pad) => value.padStart(len, pad));
        this.model.addFunction('ltrim(value: string):string', (value) => value.trimLeft());
        this.model.addFunction('indexOf(value:string, sub:string, start:number):number', (value, sub, start) => value.indexOf(sub, start));
        this.model.addFunction('join(values:string[],separator:string=","):string', (values, separator = ',') => values.join(separator));
        this.model.addFunction('replace(value: string, source: string, target: string):string', (value, source, target) => h3lp_1.h3lp.str.replace(value, source, target));
        this.model.addFunction('rpad(value: string, len: number, pad: string):string', (value, len, pad) => value.padEnd(len, pad));
        this.model.addFunction('rtrim(value: string):string', (value) => value.trimRight());
        this.model.addFunction('substring(value: string, from: number, count: number):string', (value, from, count) => value.substring(from, count));
        this.model.addFunctionAlias('substr', 'substring');
        this.model.addFunction('trim(value: string):string', (value) => value.trim());
        this.model.addFunction('upper(value: string):string', (value) => value.toUpperCase());
        this.model.addFunction('concat(...values:any):string', (...values) => h3lp_1.h3lp.str.concat(values));
        this.model.addFunctionAlias('concatenate', 'concat');
        this.model.addFunction('test(value: string, regexp: string):boolean', (value, regexp) => new RegExp(regexp).test(value));
        this.model.addFunction('title(value:string):string', (value) => h3lp_1.h3lp.str.initCap(value));
        this.model.addFunction('match(value: string, regexp: string):any', (value, regexp) => value ? value.match(regexp) : null);
        this.model.addFunction('mask(value: string):string', (value) => {
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
        this.model.addFunction('split(value:string,separator:string=","):string[]', (value, separator = ',') => value.split(separator));
        this.model.addFunction('startWith(value:string, sub:string, start:number):boolean', (value, sub, start) => value.startsWith(sub, start));
    }
    dateTimeFunctions() {
        this.model.addFunction('curTime():time', () => {
            const date = new Date();
            return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds();
        });
        this.model.addFunction('today():date', () => {
            const date = new Date();
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        });
        this.model.addFunction('now():dateTime', () => new Date().toISOString());
        this.model.addFunction('time(value: string):time', (value) => {
            const date = new Date(value);
            return date.getHours() + ':' + (date.getMinutes() + 1) + ':' + date.getSeconds();
        });
        this.model.addFunction('date(value: string):date', (value) => {
            const date = new Date(value);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        });
        this.model.addFunction('dateTime(value: string):dateTime', (value) => new Date(value).toISOString());
        this.model.addFunction('year(value: dateTime):integer', (value) => {
            return new Date(value).getFullYear();
        });
        this.model.addFunction('month(value: dateTime):integer', (value) => {
            return new Date(value).getMonth() + 1;
        });
        this.model.addFunction('day(value: dateTime):integer', (value) => {
            return new Date(value).getDate();
        });
        this.model.addFunction('weekday(value: dateTime):integer', (value) => {
            return new Date(value).getDay();
        });
        this.model.addFunction('hour(value: dateTime):integer', (value) => {
            return new Date(value).getHours();
        });
        this.model.addFunction('minute(value: dateTime):integer', (value) => {
            return new Date(value).getMinutes();
        });
        this.model.addFunction('second(value: dateTime):integer', (value) => {
            return new Date(value).getSeconds();
        });
        this.model.addFunction('millisecond(value: dateTime):integer', (value) => {
            return new Date(value).getMilliseconds();
        });
        this.model.addFunction('addYear(date: dateTime, value: number):dateTime', (date, value) => {
            const _date = new Date(date);
            _date.setFullYear(_date.getFullYear() + value);
            return _date.toISOString();
        });
        this.model.addFunction('addMonth(date: dateTime, value: number):dateTime', (date, value) => {
            const _date = new Date(date);
            _date.setMonth(_date.getMonth() + value);
            return _date.toISOString();
        });
        this.model.addFunction('addDay(date: dateTime, value: number):dateTime', (date, value) => {
            const _date = new Date(date);
            _date.setDate(_date.getDate() + value);
            return _date.toISOString();
        });
        this.model.addFunction('addHour(date: dateTime, value: number):dateTime', (date, value) => {
            const _date = new Date(date);
            _date.setHours(_date.getHours() + value);
            return _date.toISOString();
        });
        this.model.addFunction('addMinute(date: dateTime, value: number):dateTime', (date, value) => {
            const _date = new Date(date);
            _date.setMinutes(_date.getMinutes() + value);
            return _date.toISOString();
        });
        this.model.addFunction('addSecond(date: dateTime, value: number):dateTime', (date, value) => {
            const _date = new Date(date);
            _date.setSeconds(_date.getSeconds() + value);
            return _date.toISOString();
        });
        this.model.addFunction('addMillisecond(date: dateTime, value: number):dateTime', (date, value) => {
            const _date = new Date(date);
            _date.setMilliseconds(_date.getMilliseconds() + value);
            return _date.toISOString();
        });
        this.model.addFunction('addTime(date: dateTime, time: time):dateTime', (date, time) => {
            const _time = new Date('2000-01-01T' + time);
            const _date = new Date(date);
            _date.setHours(_date.getHours() + _time.getHours());
            _date.setMinutes(_date.getMinutes() + _time.getMinutes());
            _date.setSeconds(_date.getSeconds() + _time.getSeconds());
            _date.setMilliseconds(_date.getSeconds() + _time.getMilliseconds());
            return _date.toISOString();
        });
        this.model.addFunction('subtractTime(date: dateTime, time: time):dateTime', (date, time) => {
            const _time = new Date('2000-01-01T' + time);
            const _date = new Date(date);
            _date.setHours(_date.getHours() - _time.getHours());
            _date.setMinutes(_date.getMinutes() - _time.getMinutes());
            _date.setSeconds(_date.getSeconds() - _time.getSeconds());
            _date.setMilliseconds(_date.getSeconds() - _time.getMilliseconds());
            return _date.toISOString();
        });
        this.model.addFunction('yearDiff(date1: dateTime, date2: dateTime):integer', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.abs(_date2.getFullYear() - _date1.getFullYear());
        });
        this.model.addFunction('dayDiff(date1: dateTime, date2: dateTime):integer', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.floor((_date1.getTime() - _date2.getTime()) / (24 * 3600 * 1000));
        });
        this.model.addFunction('hourDiff(date1: dateTime, date2: dateTime):integer', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.floor((_date1.getTime() - _date2.getTime()) / (3600 * 1000));
        });
        this.model.addFunction('secondDiff(date1: dateTime, date2: dateTime):integer', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.floor((_date1.getTime() - _date2.getTime()) / (1000));
        });
        this.model.addFunction('millisecondDiff(date1: dateTime, date2: dateTime):integer', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.floor(_date1.getTime() - _date2.getTime());
        });
        this.model.addFunction('dayToDate(value: number):dateTime', (value) => {
            return new Date(value * 24 * 3600 * 1000).toISOString();
        });
        this.model.addFunction('hourToDate(value: number):dateTime', (value) => {
            return new Date(value * 3600 * 1000).toISOString();
        });
        this.model.addFunction('secondToDate(value: number):dateTime', (value) => {
            return new Date(value * 1000).toISOString();
        });
        this.model.addFunction('millisecondToDate(value: number):dateTime', (value) => {
            return new Date(value).toISOString();
        });
    }
    arrayFunctions() {
        this.model.addFunction('map(list: any[], predicate: T):T[]', new Map(this.builder));
        this.model.addFunctionAlias('select', 'map');
        this.model.addFunction('foreach(list: any[], predicate: any):void', new Foreach());
        this.model.addFunctionAlias('each', 'foreach');
        this.model.addFunction('filter(list: T[], predicate: boolean):T[]', new Filter());
        this.model.addFunctionAlias('where', 'filter');
        this.model.addFunction('reverse(list: T[], predicate: any):T[]', new Reverse());
        this.model.addFunction('sort(list: T[], predicate: any):T[]', new Sort());
        this.model.addFunctionAlias('order', 'sort');
        this.model.addFunction('remove(list: T[], predicate: boolean):T[]', new Remove());
        this.model.addFunctionAlias('delete', 'remove');
        this.model.addFunction('push(list: T[], value: T):T[]', (list, item) => {
            list.push(item);
            return list;
        });
        this.model.addFunctionAlias('insert', 'push');
        this.model.addFunction('bulkInsert(list: T[], value: T[]):T[]', (list, items) => {
            for (const item of items) {
                list.push(item);
            }
            return list;
        });
        this.model.addFunction('pop(list: T[]): T', (list) => list.pop());
        this.model.addFunction('length(source: any[]|string):number', (source) => source.length);
        this.model.addFunctionAlias('len', 'length');
        this.model.addFunction('slice(list: T[], from:integer, to:integer):T[]', (list, from, to) => list.slice(from, to));
        this.model.addFunction('page(list: T[], page:integer, records:integer):T[]', (list, page, records) => {
            let from = (page - 1) * records;
            if (from < 0) {
                from = 0;
            }
            let to = from + records;
            if (to > list.length) {
                to = list.length - 1;
            }
            return list.slice(from, to);
        });
        // this.addFunction('update', ArrayFunctions.update, OperatorType.arrow, Update)
    }
    groupFunctions() {
        this.model.addFunction('distinct(list: any[], predicate: any): any[]', new Distinct());
        this.model.addFunction('first(list: T[], predicate: boolean): T', new First());
        this.model.addFunction('last(list: T[], predicate: boolean): T', new Last());
        this.model.addFunction('count(list: T[], predicate: boolean): integer', new Count());
        this.model.addFunction('max(list: T[], predicate: boolean): T', new Max());
        this.model.addFunction('min(list: T[], predicate: boolean): T', new Min());
        this.model.addFunction('avg(list: T[], value: number): number', new Avg());
        this.model.addFunction('sum(list: T[], value: number): number', new Sum());
    }
    setsFunctions() {
        this.model.addFunction('union(a: T[], b: T[]): T[]', new Union());
        this.model.addFunction('intersection(a: T[], b: T[]): T[]', new Intersection());
        this.model.addFunction('difference(a: T[], b: T[]): T[]', new Difference());
        this.model.addFunction('symmetricDifference(a: T[], b: T[]): T[]', new SymmetricDifference());
    }
}
exports.CoreLibrary = CoreLibrary;
class And extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new And(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        if (!this.operand.children[0].eval(context))
            return false;
        return this.operand.children[1].eval(context);
    }
}
class Or extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Or(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        if (this.operand.children[0].eval(context))
            return true;
        return this.operand.children[1].eval(context);
    }
}
class Assignment extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Assignment(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentAddition extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentAddition(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[0].eval(context) + this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentSubtraction extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentSubtraction(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[0].eval(context) - this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentMultiplication extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentMultiplication(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[0].eval(context) * this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentDivision extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentDivision(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[0].eval(context) / this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentExponentiation extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentExponentiation(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[0].eval(context) ** this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentFloorDivision extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentFloorDivision(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = Math.floor(this.operand.children[0].eval(context) / this.operand.children[1].eval(context));
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentMod extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentMod(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[0].eval(context) % this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentBitAnd extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentBitAnd(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[0].eval(context) & this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentBitOr extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentBitOr(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[0].eval(context) | this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentBitXor extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentBitXor(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[0].eval(context) ^ this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentLeftShift extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentLeftShift(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[0].eval(context) << this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class AssignmentRightShift extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new AssignmentRightShift(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const value = this.operand.children[0].eval(context) >> this.operand.children[1].eval(context);
        context.data.set(this.operand.children[0].name, value);
        return value;
    }
}
class Map extends domain_1.PrototypeEvaluator {
    // eslint-disable-next-line no-useless-constructor
    constructor(builder, operand) {
        super(operand);
        this.builder = builder;
    }
    clone(operand) {
        return new Map(this.builder, operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const rows = [];
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (this.operand.children[2].type === domain_1.OperandType.Obj) {
            const groupers = [];
            const aggregates = [];
            for (const child of this.operand.children[2].children) {
                // In the case of being an object the value to return, find out if there are fields that are summarized
                const keyValue = child;
                if (keyValue) {
                    if (helper_1.operandHelper.haveAggregates(keyValue.children[0])) {
                        aggregates.push(keyValue);
                    }
                    else {
                        groupers.push(keyValue);
                    }
                }
            }
            if (aggregates.length > 0) {
                // case with aggregate functions
                const keys = helper_1.operandHelper.getKeys(this.operand.children[1], groupers, list, context);
                // once you got all the keys you have to calculate the aggregates fields
                const variable = this.operand.children[1];
                for (const key of keys) {
                    for (const keyValue of aggregates) {
                        const operandCloned = this.builder.clone(keyValue.children[0]);
                        const operandResolved = helper_1.operandHelper.solveAggregates(key.items, variable, operandCloned, context);
                        const value = operandResolved.eval(context);
                        key.summarizers.push({ name: keyValue.name, value });
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
        else if (this.operand.children[2].type === domain_1.OperandType.Var && !Array.isArray(list)) {
            // Example orders.0.number
            return list;
        }
        // simple case without aggregate functions
        const childContext = context.newContext();
        for (const item of list) {
            childContext.data.set(this.operand.children[1].name, item);
            const row = this.operand.children[2].eval(childContext);
            rows.push(row);
        }
        return rows;
    }
}
class Distinct extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Distinct(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const rows = [];
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (this.operand.children.length === 1) {
            // simple case
            for (const item of list) {
                if (rows.find((p) => p === item) === undefined) {
                    rows.push(item);
                }
            }
            return rows;
        }
        else if (this.operand.children[2].type === domain_1.OperandType.Obj) {
            // case with aggregate functions
            const keys = helper_1.operandHelper.getKeys(this.operand.children[1], this.operand.children[2].children, list, context.newContext());
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
        else if (this.operand.children[2].type === domain_1.OperandType.List) {
            throw new Error('Distinct not support Array result');
        }
        // simple case without aggregate functions
        const childContext = context.newContext();
        for (const item of list) {
            childContext.data.set(this.operand.children[1].name, item);
            const value = this.operand.children[2].eval(childContext);
            if (rows.find((p) => p === value) === undefined) {
                rows.push(value);
            }
        }
        return rows;
    }
}
class Foreach extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Foreach(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        const childContext = context.newContext();
        for (const item of list) {
            childContext.data.set(this.operand.children[1].name, item);
            this.operand.children[2].eval(childContext);
        }
        return list;
    }
}
class Filter extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Filter(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const rows = [];
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        const childContext = context.newContext();
        for (const item of list) {
            childContext.data.set(this.operand.children[1].name, item);
            if (this.operand.children[2].eval(childContext)) {
                rows.push(item);
            }
        }
        return rows;
    }
}
class Reverse extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Reverse(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (this.operand.children.length === 1) {
            return list.reverse();
        }
        const values = [];
        const childContext = context.newContext();
        for (const item of list) {
            childContext.data.set(this.operand.children[1].name, item);
            const value = this.operand.children[2].eval(childContext);
            values.push({ value, p: item });
        }
        values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0);
        values.reverse();
        return values.map(p => p.p);
    }
}
class Sort extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Sort(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const values = [];
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (this.operand.children.length === 1) {
            return list.sort();
        }
        const childContext = context.newContext();
        for (const item of list) {
            childContext.data.set(this.operand.children[1].name, item);
            const value = this.operand.children[2].eval(childContext);
            values.push({ value, p: item });
        }
        values.sort((a, b) => a.value > b.value ? 1 : a.value < b.value ? -1 : 0);
        return values.map(p => p.p);
    }
}
class Remove extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Remove(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const rows = [];
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        const childContext = context.newContext();
        for (const item of list) {
            childContext.data.set(this.operand.children[1].name, item);
            if (!this.operand.children[2].eval(childContext)) {
                rows.push(item);
            }
        }
        return rows;
    }
}
class First extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new First(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (this.operand.children.length === 1) {
            return list && list.length > 0 ? list[0] : null;
        }
        return helper_1.operandHelper.first(list, this.operand.children[1], this.operand.children[2], context.newContext());
    }
}
class Last extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Last(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (this.operand.children.length === 1) {
            return list && list.length > 0 ? list[list.length - 1] : null;
        }
        return helper_1.operandHelper.last(list, this.operand.children[1], this.operand.children[2], context.newContext());
    }
}
class Count extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Count(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (this.operand.children.length === 1) {
            return list.length;
        }
        return helper_1.operandHelper.count(list, this.operand.children[1], this.operand.children[2], context.newContext());
    }
}
class Max extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Max(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (this.operand.children.length === 1) {
            let max;
            for (const item of list) {
                if (max === undefined || (item !== null && item > max)) {
                    max = item;
                }
            }
            return max;
        }
        return helper_1.operandHelper.max(list, this.operand.children[1], this.operand.children[2], context.newContext());
    }
}
class Min extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Min(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (this.operand.children.length === 1) {
            let min;
            for (const item of list) {
                if (min === undefined || (item !== null && item < min)) {
                    min = item;
                }
            }
            return min;
        }
        return helper_1.operandHelper.min(list, this.operand.children[1], this.operand.children[2], context.newContext());
    }
}
class Avg extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Avg(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (this.operand.children.length === 1) {
            let sum = 0;
            for (const item of list) {
                if (item !== null) {
                    sum = sum + item;
                }
            }
            return list.length > 0 ? sum / list.length : 0;
        }
        return helper_1.operandHelper.avg(list, this.operand.children[1], this.operand.children[2], context.newContext());
    }
}
class Sum extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Sum(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const list = this.operand.children[0].eval(context);
        if (!list) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (this.operand.children.length === 1) {
            let sum = 0;
            for (const item of list) {
                if (item !== null) {
                    sum = sum + item;
                }
            }
            return sum;
        }
        return helper_1.operandHelper.sum(list, this.operand.children[1], this.operand.children[2], context.newContext());
    }
}
class Union extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Union(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const a = this.operand.children[0].eval(context);
        const b = this.operand.children[1].eval(context);
        if (!a) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (!b) {
            throw new Error(`Array ${this.operand.children[1].name} undefined`);
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
                const key = helper_1.operandHelper.objectKey(element);
                result.push({ key, value: element });
            }
            for (const element of b) {
                const key = helper_1.operandHelper.objectKey(element);
                if (!result.find((p) => p.key === key)) {
                    result.push({ key, value: element });
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
class Intersection extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Intersection(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const a = this.operand.children[0].eval(context);
        const b = this.operand.children[1].eval(context);
        if (!a) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (!b) {
            throw new Error(`Array ${this.operand.children[1].name} undefined`);
        }
        if (a.length === 0 || b.length === 0) {
            return [];
        }
        const result = [];
        if (Array.isArray(a[0]) || Array.isArray(b[0])) {
            throw new Error('Cannot union arrays of arrays');
        }
        else if (typeof a[0] === 'object') {
            const keys = a.map((p) => helper_1.operandHelper.objectKey(p));
            for (const element of b) {
                const key = helper_1.operandHelper.objectKey(element);
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
class Difference extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new Difference(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const a = this.operand.children[0].eval(context);
        const b = this.operand.children[1].eval(context);
        if (!a) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (!b) {
            throw new Error(`Array ${this.operand.children[1].name} undefined`);
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
            const keys = b.map((p) => helper_1.operandHelper.objectKey(p));
            for (const element of a) {
                const key = helper_1.operandHelper.objectKey(element);
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
class SymmetricDifference extends domain_1.PrototypeEvaluator {
    clone(operand) {
        return new SymmetricDifference(operand);
    }
    eval(context) {
        if (this.operand === undefined) {
            throw new Error('Operand undefined');
        }
        const a = this.operand.children[0].eval(context);
        const b = this.operand.children[1].eval(context);
        if (!a) {
            throw new Error(`Array ${this.operand.children[0].name} undefined`);
        }
        if (!b) {
            throw new Error(`Array ${this.operand.children[1].name} undefined`);
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
            const aKeys = a.map((p) => helper_1.operandHelper.objectKey(p));
            const bKeys = b.map((p) => helper_1.operandHelper.objectKey(p));
            for (const element of a) {
                const key = helper_1.operandHelper.objectKey(element);
                if (!bKeys.includes(key)) {
                    result.push(element);
                }
            }
            for (const element of b) {
                const key = helper_1.operandHelper.objectKey(element);
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
//# sourceMappingURL=library.js.map