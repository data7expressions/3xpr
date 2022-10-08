"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpHelper = void 0;
const h3lp_1 = require("h3lp");
const parser_1 = require("../parser");
const operand_1 = require("../operand");
class TypeHelper {
    constructor(validator) {
        this.validator = validator;
    }
    getType(value) {
        if (value === null || value === undefined) {
            return 'any';
        }
        else if (Array.isArray(value)) {
            if (value.length > 0) {
                return { items: this.getType(value[0]) };
            }
            return { items: 'any' };
        }
        else if (typeof value === 'object') {
            const properties = [];
            for (const entry of Object.entries(value)) {
                properties.push({ name: entry[0], type: this.getType(entry[1]) });
            }
            return { properties: properties };
        }
        else if (typeof value === 'string') {
            // TODO determinar si es fecha.
            return 'string';
        }
        else if (typeof value === 'number') {
            if (this.validator.isInteger(value)) {
                return 'integer';
            }
            return 'decimal';
        }
        else if (typeof value === 'boolean') {
            return 'boolean';
        }
        return 'any';
    }
    isPrimitive(type) {
        let value;
        if (typeof type === 'string') {
            value = type;
        }
        else {
            value = type.toString();
        }
        return ['string', 'integer', 'decimal', 'number', 'boolean', 'date', 'datetime', 'time'].includes(value);
    }
    isArrayType(type) {
        if (typeof type === 'string') {
            return type.startsWith('[') && type.endsWith(']');
        }
        return type.items !== undefined;
    }
    isObjectType(type) {
        if (typeof type === 'string') {
            return type.startsWith('{') && type.endsWith('}');
        }
        return type.properties !== undefined;
    }
    toString(type) {
        if (type === undefined) {
            return 'any';
        }
        if (this.isPrimitive(type)) {
            return type.toString();
        }
        if (this.isObjectType(type)) {
            const properties = [];
            const objectType = type;
            for (const propertyType of objectType.properties) {
                properties.push(`${propertyType.name}:${this.toString(propertyType.type)}`);
            }
            return `{${properties.join(',')}}`;
        }
        if (this.isArrayType(type)) {
            const arrayType = type;
            return `[${this.toString(arrayType.items)}]`;
        }
        return 'any';
    }
    serialize(type) {
        if (type === undefined || type === null) {
            return undefined;
        }
        return JSON.stringify(type);
    }
    deserialize(type) {
        if (type === undefined || type === null) {
            return undefined;
        }
        if (this.isPrimitive(type)) {
            return type;
        }
        return JSON.parse(type);
    }
}
class NodeHelper {
    constructor(validator) {
        this.validator = validator;
    }
    toExpression(node) {
        const list = [];
        // if (!node || !node.type) {
        // console.log(node)
        // }
        switch (node.type) {
            case 'Const':
            case 'Var':
                list.push(node.name);
                break;
            case 'List':
                list.push('[');
                for (let i = 0; i < node.children.length; i++) {
                    if (i > 0)
                        list.push(',');
                    list.push(this.toExpression(node.children[i]));
                }
                list.push(']');
                break;
            case 'KeyVal':
                list.push(node.name + ':');
                list.push(this.toExpression(node.children[0]));
                break;
            case 'Obj':
                list.push('{');
                for (let i = 0; i < node.children.length; i++) {
                    if (i > 0)
                        list.push(',');
                    list.push(this.toExpression(node.children[i]));
                }
                list.push('}');
                break;
            case 'Operator':
                if (node.children.length === 1) {
                    list.push(node.name);
                    list.push(this.toExpression(node.children[0]));
                }
                else if (node.children.length === 2) {
                    list.push('(');
                    list.push(this.toExpression(node.children[0]));
                    list.push(node.name);
                    list.push(this.toExpression(node.children[1]));
                    list.push(')');
                }
                break;
            case 'FuncRef':
                list.push(node.name);
                list.push('(');
                for (let i = 0; i < node.children.length; i++) {
                    if (i > 0)
                        list.push(',');
                    list.push(this.toExpression(node.children[i]));
                }
                list.push(')');
                break;
            case 'ChildFunc':
                list.push(this.toExpression(node.children[0]));
                list.push('.' + node.name);
                list.push('(');
                for (let i = 1; i < node.children.length; i++) {
                    if (i > 1)
                        list.push(',');
                    list.push(this.toExpression(node.children[i]));
                }
                list.push(')');
                break;
            case 'Arrow':
                list.push(this.toExpression(node.children[0]));
                list.push('.' + node.name);
                list.push('(');
                list.push(node.children[1].name);
                list.push('=>');
                list.push(this.toExpression(node.children[2]));
                list.push(')');
                break;
            default:
                throw new Error('node: ' + node.type + ' not supported');
        }
        return list.join('');
    }
    clear(node) {
        try {
            if (node.children.length > 0) {
                const toRemove = [];
                for (let i = 0; i < node.children.length; i++) {
                    if (node.children[i] === null) {
                        toRemove.push(i);
                    }
                }
                for (let i = 0; i < toRemove.length; i++) {
                    delete node.children[toRemove[i]];
                }
            }
        }
        catch (error) {
            throw new Error('crear: ' + node.name + ' error: ' + error.toString());
        }
        return node;
    }
    minify(expression) {
        let isString = false;
        let quotes = '';
        const buffer = expression.split('');
        const length = buffer.length;
        const result = [];
        let i = 0;
        while (i < length) {
            const p = buffer[i];
            if (isString && p === quotes) {
                isString = false;
            }
            else if (!isString && (p === '\'' || p === '"' || p === '`')) {
                isString = true;
                quotes = p;
            }
            if (isString) {
                result.push(p);
            }
            else if (p === ' ') {
                // Only leave spaces when it's between alphanumeric characters.
                // for example in the case of "} if" there should not be a space
                if (i + 1 < length && i - 1 >= 0 && this.validator.isAlphanumeric(buffer[i - 1]) && this.validator.isAlphanumeric(buffer[i + 1])) {
                    result.push(p);
                }
                // when there is a block that ends with "}" and then there is an enter , replace the enter with ";"
                // TODO: si estamos dentro de un objecto NO debería agregar ; luego de } sino rompe el obj
                // } else if (p === '\n' && result.length > 0 && result[result.length - 1] === '}') {
                // result.push(';')
            }
            else if (p !== '\n' && p !== '\r' && p !== '\t') {
                result.push(p);
            }
            i += 1;
        }
        if (result[result.length - 1] === ';') {
            result.splice(-1);
            return result;
        }
        return result;
    }
    clone(value) {
        return this.deserialize(this.serialize(value));
    }
    serialize(node) {
        const children = [];
        for (const child of node.children) {
            children.push(this.serialize(child));
        }
        if (children.length === 0) {
            return { n: node.name, t: node.type };
        }
        return { n: node.name, t: node.type, c: children };
    }
    deserialize(serialized) {
        const children = [];
        if (serialized.c) {
            for (const p of serialized.c) {
                children.push(this.deserialize(p));
            }
        }
        return new parser_1.Node(serialized.n, serialized.t, children);
    }
}
class OperandHelper {
    objectKey(obj) {
        const keys = Object.keys(obj).sort();
        const list = [];
        for (const key of keys) {
            list.push(key);
            list.push(obj[key].toString());
        }
        return list.join('|');
    }
    setParent(operand, index = 0, parent) {
        try {
            if (parent) {
                operand.id = parent.id + '.' + index;
                operand.index = index;
                operand.level = parent.level ? parent.level + 1 : 0;
            }
            else {
                operand.id = '0';
                // operand.parent = undefined
                operand.index = 0;
                operand.level = 0;
            }
            for (let i = 0; i < operand.children.length; i++) {
                const p = operand.children[i];
                this.setParent(p, i, operand);
            }
            return operand;
        }
        catch (error) {
            throw new Error('set parent: ' + operand.name + ' error: ' + error.toString());
        }
    }
    classTypeToType(classType) {
        const irregular = [
            ['Arrow', 'Arrow'],
            ['ChildFunc', 'ChildFunc'],
            ['FuncRef', 'FuncRef'],
            ['List', 'List']
        ];
        const found = irregular.find(p => p[0] === classType);
        return found ? found[1] : classType.toLowerCase();
    }
    getKeys(variable, fields, list, context) {
        const keys = [];
        // loop through the list and group by the grouper fields
        for (const item of list) {
            let key = '';
            const values = [];
            for (const keyValue of fields) {
                context.data.set(operand_1.Var.name, item);
                // variable.set(item)
                const value = keyValue.children[0].eval(context);
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
    haveAggregates(operand) {
        if (!(operand instanceof operand_1.Arrow) && operand instanceof operand_1.FuncRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
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
    findAggregates(operand) {
        if (!(operand instanceof operand_1.Arrow) && operand instanceof operand_1.FuncRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
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
    solveAggregates(list, variable, operand, context) {
        if (!(operand instanceof operand_1.Arrow) && operand instanceof operand_1.FuncRef && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
            let value;
            switch (operand.name) {
                case 'avg':
                    value = this.avg(list, variable, operand.children[0], context);
                    break;
                case 'count':
                    value = this.count(list, variable, operand.children[0], context);
                    break;
                case 'first':
                    value = this.first(list, variable, operand.children[0], context);
                    break;
                case 'last':
                    value = this.last(list, variable, operand.children[0], context);
                    break;
                case 'max':
                    value = this.max(list, variable, operand.children[0], context);
                    break;
                case 'min':
                    value = this.min(list, variable, operand.children[0], context);
                    break;
                case 'sum':
                    value = this.sum(list, variable, operand.children[0], context);
                    break;
            }
            return new operand_1.Const(value);
        }
        else if (operand.children && operand.children.length > 0) {
            for (let i = 0; i < operand.children.length; i++) {
                operand.children[i] = this.solveAggregates(list, variable, operand.children[i], context);
            }
        }
        return operand;
    }
    count(list, variable, aggregate, context) {
        let count = 0;
        for (const item of list) {
            // variable.set(item)
            context.data.set(variable.name, item);
            if (aggregate.eval(context)) {
                count++;
            }
        }
        return count;
    }
    first(list, variable, aggregate, context) {
        for (const item of list) {
            // variable.set(item)
            context.data.set(variable.name, item);
            if (aggregate.eval(context)) {
                return item;
            }
        }
        return null;
    }
    last(list, variable, aggregate, context) {
        for (let i = list.length - 1; i >= 0; i--) {
            const item = list[i];
            // variable.set(item)
            context.data.set(variable.name, item);
            if (aggregate.eval(context)) {
                return item;
            }
        }
        return null;
    }
    max(list, variable, aggregate, context) {
        let max;
        for (const item of list) {
            // variable.set(item)
            context.data.set(variable.name, item);
            const value = aggregate.eval(context);
            if (max === undefined || (value !== null && value > max)) {
                max = value;
            }
        }
        return max;
    }
    min(list, variable, aggregate, context) {
        let min;
        for (const item of list) {
            // variable.set(item)
            context.data.set(variable.name, item);
            const value = aggregate.eval(context);
            if (min === undefined || (value !== null && value < min)) {
                min = value;
            }
        }
        return min;
    }
    avg(list, variable, aggregate, context) {
        let sum = 0;
        for (const item of list) {
            // variable.set(item)
            context.data.set(variable.name, item);
            const value = aggregate.eval(context);
            if (value !== null) {
                sum = sum + value;
            }
        }
        return list.length > 0 ? sum / list.length : 0;
    }
    sum(list, variable, aggregate, context) {
        let sum = 0;
        for (const item of list) {
            // variable.set(item)
            context.data.set(variable.name, item);
            const value = aggregate.eval(context);
            if (value !== null) {
                sum = sum + value;
            }
        }
        return sum;
    }
}
class ExpHelper extends h3lp_1.H3lp {
    constructor() {
        super();
        this.type = new TypeHelper(this.validator);
        this.node = new NodeHelper(this.validator);
        this.operand = new OperandHelper();
    }
}
exports.ExpHelper = ExpHelper;
//# sourceMappingURL=helper.js.map