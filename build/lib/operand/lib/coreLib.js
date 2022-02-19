"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreLib = void 0;
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
const library_1 = require("../library");
const model_1 = require("./../../model");
const operands_1 = require("../operands");
const manager_1 = require("../../manager");
class CoreLib extends library_1.Library {
    constructor() {
        super('core');
        this.initEnums();
        this.initOperators();
        this.generalFunctions();
        this.conditionFunctions();
        this.nullablesFunctions();
        this.mathFunctions();
        this.stringFunctions();
        this.initArrowFunctions();
        this.datetimeFunctions();
        this.convertFunctions();
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
        this.addOperator('!=', Operators.notEqual);
        this.addOperator('>', Operators.greaterThan);
        this.addOperator('<', Operators.lessThan);
        this.addOperator('>=', Operators.greaterThanOrEqual);
        this.addOperator('<=', Operators.lessThanOrEqual);
        this.addOperator('&&', Operators.and, And);
        this.addOperator('||', Operators.or, Or);
        this.addOperator('!', Operators.not);
        this.addOperator('[]', Operators.item);
        this.addOperator('=', Operators.assigment, Assigment);
        this.addOperator('+=', Operators.assigmentAddition, AssigmentAddition);
        this.addOperator('-=', Operators.assigmentSubtraction, AssigmentSubtraction);
        this.addOperator('*=', Operators.assigmentMultiplication, AssigmentMultiplication);
        this.addOperator('/=', Operators.assigmentDivision, AssigmentDivision);
        this.addOperator('**=', Operators.assigmentExponentiation, AssigmentExponentiation);
        this.addOperator('//=', Operators.assigmentFloorDivision, AssigmentFloorDivision);
        this.addOperator('%=', Operators.assigmentMod, AssigmentMod);
        this.addOperator('&=', Operators.assigmentBitAnd, AssigmentBitAnd);
        this.addOperator('|=', Operators.assigmentBitOr, AssigmentBitOr);
        this.addOperator('^=', Operators.assigmentBitXor, AssigmentBitXor);
        this.addOperator('<<=', Operators.assigmentLeftShift, AssigmentLeftShift);
        this.addOperator('>>=', Operators.assigmentRightShift, AssigmentRightShift);
    }
    generalFunctions() {
        this.addFunction('sleep', Functions.sleep);
    }
    conditionFunctions() {
        this.addFunction('between', Functions.between);
        this.addFunction('includes', Functions.includes);
    }
    nullablesFunctions() {
        this.addFunction('nvl', Functions.nvl);
        this.addFunction('nvl2', Functions.nvl2);
        this.addFunction('isNull', Functions.isNull);
        this.addFunction('isNotNull', Functions.isNotNull);
        this.addFunction('isEmpty', Functions.isEmpty);
    }
    mathFunctions() {
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
        // this.addFunction('ln',)
        this.addFunction('log10', Math.log10);
        this.addFunction('log', Math.log);
        this.addFunction('remainder', (n1, n2) => n1 % n2);
        this.addFunction('round', Math.round);
        this.addFunction('sign', Math.sign);
        this.addFunction('sin', Math.sin);
        this.addFunction('sinh', Math.sinh);
        this.addFunction('tan', Math.tan);
        this.addFunction('tanh', Math.tanh);
        this.addFunction('trunc', Math.trunc);
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
        this.addFunction('substring', (str, from, count) => str.substring(from, count));
        this.addFunction('trim', (str) => str.trim());
        this.addFunction('upper', (str) => str.toUpperCase());
        this.addFunction('concat', (...strings) => ''.concat(...strings));
        this.addFunction('test', (value, regexp) => {
            const _regexp = new RegExp(regexp);
            return _regexp.test(value);
        });
        this.addFunction('match', (value, regexp) => {
            return value ? value.match(regexp) : null;
        });
    }
    // TODO: trabajar todas las fechas como strign en formato ISO
    datetimeFunctions() {
        this.addFunction('curtime', () => {
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
            return new Date(value).getMonth();
        });
        this.addFunction('day', (value) => {
            return new Date(value).getDate();
        });
        this.addFunction('weekday', (value) => {
            return new Date(value).getDay();
        });
        this.addFunction('hours', (value) => {
            return new Date(value).getHours();
        });
        this.addFunction('minutes', (value) => {
            return new Date(value).getMinutes();
        });
        this.addFunction('seconds', (value) => {
            return new Date(value).getSeconds();
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
        this.addFunction('addHours', (date, value) => {
            const _date = new Date(date);
            _date.setHours(_date.getHours() + value);
            return _date.toISOString();
        });
        this.addFunction('addMinutes', (date, value) => {
            const _date = new Date(date);
            _date.setMinutes(_date.getMinutes() + value);
            return _date.toISOString();
        });
        this.addFunction('addSeconds', (date, value) => {
            const _date = new Date(date);
            _date.setSeconds(_date.getSeconds() + value);
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
        this.addFunction('dateDiff', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.floor((_date1.getTime() - _date2.getTime()) / (24 * 3600 * 1000));
        });
        this.addFunction('timeDiff', (date1, date2) => {
            const _date1 = new Date(date1);
            const _date2 = new Date(date2);
            return Math.floor((_date1.getTime() - _date2.getTime()) / (24 * 60));
        });
    }
    initArrowFunctions() {
        this.addFunction('map', ArrayFunctions.map, model_1.OperatorType.arrow, Map);
        this.addFunction('foreach', ArrayFunctions.foreach, model_1.OperatorType.arrow, Foreach);
        this.addFunction('filter', ArrayFunctions.filter, model_1.OperatorType.arrow, Filter);
        this.addFunction('reverse', ArrayFunctions.reverse, model_1.OperatorType.arrow, Reverse);
        this.addFunction('first', ArrayFunctions.first, model_1.OperatorType.arrow, First);
        this.addFunction('last', ArrayFunctions.last, model_1.OperatorType.arrow, Last);
        this.addFunction('sort', ArrayFunctions.sort, model_1.OperatorType.arrow, Sort);
        this.addFunction('remove', ArrayFunctions.remove, model_1.OperatorType.arrow, Remove);
        this.addFunction('push', (list, item) => list.push(item), model_1.OperatorType.child);
        this.addFunction('pop', (list) => list.pop(), model_1.OperatorType.child);
        this.addFunction('length', (list) => list.length, model_1.OperatorType.child);
        // this.addFunction('insert', ArrayFunctions.insert, OperatorType.arrow, Insert)
        // this.addFunction('update', ArrayFunctions.update, OperatorType.arrow, Update)
    }
    convertFunctions() {
        this.addFunction('toString', Functions.toString);
        this.addFunction('toJson', Functions.toJson);
        this.addFunction('toNumber', Functions.toNumber);
    }
}
exports.CoreLib = CoreLib;
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
        return Math.pow(a, b);
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
    static assigment(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentAddition(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentSubtraction(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentMultiplication(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentDivision(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentExponentiation(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentFloorDivision(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentMod(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentBitAnd(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentBitOr(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentBitXor(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentLeftShift(a, b) {
        throw new Error('NotImplemented');
    }
    static assigmentRightShift(a, b) {
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
class Assigment extends operands_1.Operator {
    eval() {
        const value = this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssigmentAddition extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() + this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssigmentSubtraction extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() - this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssigmentMultiplication extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() * this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssigmentDivision extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() / this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssigmentExponentiation extends operands_1.Operator {
    eval() {
        const value = Math.pow(this.children[0].eval(), this.children[1].eval());
        this.children[0].set(value);
        return value;
    }
}
class AssigmentFloorDivision extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval(); // this.children[1].eval()
        this.children[0].set(value);
        return value;
    }
}
class AssigmentMod extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() % this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssigmentBitAnd extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() & this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssigmentBitOr extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() | this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssigmentBitXor extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() ^ this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssigmentLeftShift extends operands_1.Operator {
    eval() {
        const value = this.children[0].eval() << this.children[1].eval();
        this.children[0].set(value);
        return value;
    }
}
class AssigmentRightShift extends operands_1.Operator {
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
        return !Functions.isEmpty(value) ? value : _default;
    }
    static nvl2(value, a, b) {
        return !Functions.isEmpty(value) ? a : b;
    }
    static isNull(value) {
        return value === null || value === undefined;
    }
    static isNotNull(value) {
        return !Functions.isNull(value);
    }
    static isEmpty(value) {
        return value === null || value === undefined || value.toString().trim().length === 0;
    }
    static sleep(ms = 1000) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
            });
        });
    }
    static between(value, from, to) {
        return value >= from && value < to;
    }
    static includes(value, list) {
        return list.includes(value);
    }
    static toString(value) {
        return Functions.isNull(value) ? '' : value.toString();
    }
    static toJson(value) {
        return JSON.parse(value);
    }
    static toNumber(value) {
        return Functions.isNull(value) ? 0 : parseFloat(value);
    }
}
class ArrayFunctions {
    static map(list, method) { throw new Error('Empty'); }
    static foreach(list, method) { throw new Error('Empty'); }
    static filter(list, method) { throw new Error('Empty'); }
    static reverse(list, method) { throw new Error('Empty'); }
    static first(list, method) { throw new Error('Empty'); }
    static last(list, method) { throw new Error('Empty'); }
    static sort(list, method) { throw new Error('Empty'); }
    static remove(list, method) { throw new Error('Empty'); }
    static insert(list, item) { throw new Error('Empty'); }
    static update(list, item, method) { throw new Error('Empty'); }
}
class Map extends operands_1.ArrowFunction {
    eval() {
        const rows = [];
        const list = this.children[0].eval();
        for (let i = 0; i < list.length; i++) {
            const p = list[i];
            this.children[1].set(p);
            const row = this.children[2].eval();
            rows.push(row);
        }
        return rows;
    }
}
class Foreach extends operands_1.ArrowFunction {
    eval() {
        const list = this.children[0].eval();
        for (let i = 0; i < list.length; i++) {
            const p = list[i];
            this.children[1].set(p);
            this.children[2].eval();
        }
    }
}
class Filter extends operands_1.ArrowFunction {
    eval() {
        const rows = [];
        const list = this.children[0].eval();
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
class First extends operands_1.ArrowFunction {
    eval() {
        const rows = [];
        const list = this.children[0].eval();
        for (let i = 0; i < list.length; i++) {
            const p = list[i];
            this.children[1].set(p);
            if (this.children[2].eval()) {
                return p;
            }
        }
        return null;
    }
}
class Last extends operands_1.ArrowFunction {
    eval() {
        const rows = [];
        const list = this.children[0].eval();
        for (let i = list.length - 1; i >= 0; i--) {
            const p = list[i];
            this.children[1].set(p);
            if (this.children[2].eval()) {
                return p;
            }
        }
        return null;
    }
}
class Sort extends operands_1.ArrowFunction {
    eval() {
        const values = [];
        const list = this.children[0].eval();
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