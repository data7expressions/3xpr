"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreLib = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const library_1 = require("../library");
const operands_1 = require("../operands");
class CoreLib extends library_1.Library {
    constructor() {
        super('core');
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
    }
    initArrowFunctions() {
        this.addFunction('map', ArrowFunctions.map, Map, true);
        this.addFunction('insert', ArrowFunctions.insert, Insert, true);
        this.addFunction('update', ArrowFunctions.update, Update, true);
        this.addFunction('delete', ArrowFunctions.delete, Delete, true);
        this.addFunction('filter', ArrowFunctions.filter, Filter, true);
        this.addFunction('groupBy', ArrowFunctions.groupBy, GroupBy, true);
        this.addFunction('having', ArrowFunctions.having, Having, true);
        this.addFunction('sort', ArrowFunctions.sort, Sort, true);
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
class ArrowFunctions {
    static map(list, item, method) { throw new Error('Empty'); }
    static insert(list, item, method) { throw new Error('Empty'); }
    static update(list, item, method) { throw new Error('Empty'); }
    static delete(list, item, method) { throw new Error('Empty'); }
    static filter(list, item, method) { throw new Error('Empty'); }
    static groupBy(list, item, method) { throw new Error('Empty'); }
    static having(list, item, method) { throw new Error('Empty'); }
    static sort(list, item, method) { throw new Error('Empty'); }
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
class Insert extends operands_1.ArrowFunction {
    eval() {
        throw new Error('NotImplemented');
    }
}
class Update extends operands_1.ArrowFunction {
    eval() {
        throw new Error('NotImplemented');
    }
}
class Delete extends operands_1.ArrowFunction {
    eval() {
        throw new Error('NotImplemented');
    }
}
class Filter extends operands_1.ArrowFunction {
    eval() {
        throw new Error('NotImplemented');
    }
}
class GroupBy extends operands_1.ArrowFunction {
    eval() {
        throw new Error('NotImplemented');
    }
}
class Having extends operands_1.ArrowFunction {
    eval() {
        throw new Error('NotImplemented');
    }
}
class Sort extends operands_1.ArrowFunction {
    eval() {
        throw new Error('NotImplemented');
    }
}
//# sourceMappingURL=coreLib.js.map