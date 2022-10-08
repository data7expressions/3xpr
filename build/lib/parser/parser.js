"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const node_1 = require("./node");
const __1 = require("./..");
class Parser {
    constructor(model, buffer) {
        this.model = model;
        this.buffer = [];
        this.buffer = buffer;
        this.length = this.buffer.length;
        this.index = 0;
        this.tripleOperators = [];
        this.doubleOperators = [];
        this.assignmentOperators = [];
        this.setOperators();
    }
    setOperators() {
        for (const p in this.model.operators) {
            const metadata = this.model.operators[p];
            if (metadata.operator.length === 2) {
                this.doubleOperators.push(metadata.operator);
            }
            else if (metadata.operator.length === 3) {
                this.tripleOperators.push(metadata.operator);
            }
            // if (metadata.category === 'assignment') {
            if (metadata.priority === 1) {
                this.assignmentOperators.push(metadata.operator);
            }
        }
    }
    get previous() {
        return this.buffer[this.index - 1];
    }
    get current() {
        return this.buffer[this.index];
    }
    get next() {
        return this.buffer[this.index + 1];
    }
    get end() {
        return this.index >= this.length;
    }
    nextIs(key) {
        const array = key.split('');
        for (let i = 0; i < array.length; i++) {
            if (this.buffer[this.index + i] !== array[i]) {
                return false;
            }
        }
        return true;
    }
    parse() {
        const nodes = [];
        while (!this.end) {
            const node = this.getExpression(undefined, undefined, ';');
            if (!node)
                break;
            nodes.push(node);
        }
        if (nodes.length === 1) {
            return nodes[0];
        }
        return new node_1.Node('block', __1.OperatorType.Block, nodes);
    }
    char(index) {
        return this.buffer[index];
    }
    offset(value = 0) {
        return this.buffer[this.index + value];
    }
    getExpression(operand1, operator, _break = '') {
        let expression;
        let operand2;
        let isBreak = false;
        while (!this.end) {
            if (!operand1 && !operator) {
                operand1 = this.getOperand();
                operator = this.getOperator();
                if (!operator || _break.includes(operator)) {
                    expression = operand1;
                    isBreak = true;
                    break;
                }
            }
            operand2 = this.getOperand();
            const nextOperator = this.getOperator();
            if (!nextOperator || _break.includes(nextOperator)) {
                expression = new node_1.Node(operator, __1.OperatorType.Operator, [operand1, operand2]);
                isBreak = true;
                break;
            }
            else if (this.model.priority(operator) >= this.model.priority(nextOperator)) {
                operand1 = new node_1.Node(operator, __1.OperatorType.Operator, [operand1, operand2]);
                operator = nextOperator;
            }
            else {
                operand2 = this.getExpression(operand2, nextOperator, _break);
                expression = new node_1.Node(operator, __1.OperatorType.Operator, [operand1, operand2]);
                isBreak = true;
                break;
            }
        }
        if (!isBreak)
            expression = new node_1.Node(operator, __1.OperatorType.Operator, [operand1, operand2]);
        return expression;
    }
    getOperand() {
        let isNegative = false;
        let isNot = false;
        let isBitNot = false;
        let operand = null;
        let char = this.current;
        if (char === '-') {
            isNegative = true;
            this.index += 1;
            char = this.current;
        }
        else if (char === '~') {
            isBitNot = true;
            this.index += 1;
            char = this.current;
        }
        else if (char === '!') {
            isNot = true;
            this.index += 1;
            char = this.current;
        }
        if (__1.Helper.validator.isAlphanumeric(char)) {
            let value = this.getValue();
            if (value === 'function' && this.current === '(') {
                this.index += 1;
                operand = this.getFunctionBlock();
            }
            else if (value === 'if' && this.current === '(') {
                this.index += 1;
                operand = this.getIfBlock();
            }
            else if (value === 'for' && this.current === '(') {
                this.index += 1;
                operand = this.getForBlock();
            }
            else if (value === 'while' && this.current === '(') {
                this.index += 1;
                operand = this.getWhileBlock();
            }
            else if (value === 'switch' && this.current === '(') {
                this.index += 1;
                operand = this.getSwitchBlock();
            }
            else if (!this.end && this.current === '(') {
                this.index += 1;
                if (value.includes('.')) {
                    const names = __1.Helper.obj.names(value);
                    const functionName = names.pop();
                    const variableName = names.join('.');
                    const variable = new node_1.Node(variableName, 'Var');
                    operand = this.getChildFunc(functionName, variable);
                }
                else {
                    const args = this.getArgs(')');
                    operand = new node_1.Node(value, __1.OperatorType.FuncRef, args);
                }
            }
            else if (value === 'try' && this.current === '{') {
                operand = this.getTryCatchBlock();
            }
            else if (value === 'throw') {
                operand = this.getThrow();
            }
            else if (value === 'return') {
                operand = this.getReturn();
            }
            else if (value === 'break') {
                operand = new node_1.Node('break', __1.OperatorType.Break);
            }
            else if (value === 'continue') {
                operand = new node_1.Node('continue', __1.OperatorType.Continue);
            }
            else if (!this.end && this.current === '[') {
                this.index += 1;
                operand = this.getIndexOperand(value);
            }
            else if (__1.Helper.validator.isIntegerFormat(value)) {
                if (isNegative) {
                    value = parseInt(value) * -1;
                    isNegative = false;
                }
                else if (isBitNot) {
                    value = ~parseInt(value);
                    isBitNot = false;
                }
                else {
                    value = parseInt(value);
                }
                operand = new node_1.Node(value, __1.OperatorType.Const);
            }
            else if (__1.Helper.validator.isDecimalFormat(value)) {
                if (isNegative) {
                    value = parseFloat(value) * -1;
                    isNegative = false;
                }
                else if (isBitNot) {
                    value = ~parseFloat(value);
                    isBitNot = false;
                }
                else {
                    value = parseFloat(value);
                }
                operand = new node_1.Node(value, __1.OperatorType.Const);
            }
            else if (this.model.isConstant(value)) {
                const constantValue = this.model.getConstantValue(value);
                operand = new node_1.Node(constantValue, __1.OperatorType.Const);
            }
            else if (this.model.isEnum(value)) {
                operand = this.getEnum(value);
            }
            else {
                operand = new node_1.Node(value, __1.OperatorType.Var);
            }
        }
        else if (char === '\'' || char === '"') {
            this.index += 1;
            const result = this.getString(char);
            operand = new node_1.Node(result, __1.OperatorType.Const);
        }
        else if (char === '`') {
            this.index += 1;
            const result = this.getTemplate();
            operand = new node_1.Node(result, __1.OperatorType.Template);
        }
        else if (char === '(') {
            this.index += 1;
            operand = this.getExpression(undefined, undefined, ')');
        }
        else if (char === '{') {
            this.index += 1;
            operand = this.getObject();
        }
        else if (char === '[') {
            this.index += 1;
            const elements = this.getArgs(']');
            operand = new node_1.Node('array', __1.OperatorType.List, elements);
        }
        else if (char === '$') {
            let variableName;
            if (this.next === '{') {
                this.index += 2;
                variableName = this.getValue();
                if (!this.end && this.nextIs('}')) {
                    this.index += 1;
                }
                else {
                    throw new Error(`Not found character "}" in Environment variable ${variableName}`);
                }
            }
            else {
                this.index += 1;
                variableName = this.getValue();
            }
            operand = new node_1.Node(variableName, __1.OperatorType.Env);
        }
        operand = this.solveChain(operand);
        if (isNegative)
            operand = new node_1.Node('-', __1.OperatorType.Operator, [operand]);
        if (isNot)
            operand = new node_1.Node('!', __1.OperatorType.Operator, [operand]);
        if (isBitNot)
            operand = new node_1.Node('~', __1.OperatorType.Operator, [operand]);
        return operand;
    }
    solveChain(operand) {
        if (this.end) {
            return operand;
        }
        if (this.current === '.') {
            this.index += 1;
            const name = this.getValue();
            if (this.current === '(') {
                this.index += 1;
                if (name.includes('.')) {
                    // .xxx.xxx(p=> p.xxx)
                    const names = __1.Helper.obj.names(name);
                    const propertyName = names.slice(0, -1).join('.');
                    const functionName = names.slice(-1)[0];
                    const property = new node_1.Node(propertyName, __1.OperatorType.Property, [operand]);
                    return this.solveChain(this.getChildFunc(functionName, property));
                }
                else {
                    // .xxx(p=> p.xxx)
                    return this.solveChain(this.getChildFunc(name, operand));
                }
            }
            else if (this.current === '[') {
                this.index += 1;
                if (name.includes('.')) {
                    // .xxx.xxx[x]
                    const property = new node_1.Node(name, __1.OperatorType.Property, [operand]);
                    const idx = this.getExpression(undefined, undefined, ']');
                    return new node_1.Node('[]', __1.OperatorType.Operator, [property, idx]);
                }
                else {
                    // .xxx[x]
                    const property = new node_1.Node(name, __1.OperatorType.Property, [operand]);
                    const idx = this.getExpression(undefined, undefined, ']');
                    return new node_1.Node('[]', __1.OperatorType.Operator, [property, idx]);
                }
            }
            else {
                // .xxx
                return new node_1.Node(name, __1.OperatorType.Property, [operand]);
            }
        }
        else if (this.current === '[') {
            // xxx[x][x] or xxx[x].xxx[x]
            this.index += 1;
            const idx = this.getExpression(undefined, undefined, ']');
            return new node_1.Node('[]', __1.OperatorType.Operator, [operand, idx]);
        }
        else {
            return operand;
        }
    }
    getValue(increment = true) {
        const buff = [];
        if (increment) {
            while (!this.end && __1.Helper.validator.isAlphanumeric(this.current)) {
                buff.push(this.current);
                this.index += 1;
            }
        }
        else {
            let index = this.index;
            while (!this.end && __1.Helper.validator.isAlphanumeric(this.buffer[index])) {
                buff.push(this.buffer[index]);
                index += 1;
            }
        }
        return buff.join('');
    }
    getOperator() {
        if (this.end)
            return null;
        let op = null;
        if (this.index + 2 < this.length) {
            const triple = this.current + this.next + this.buffer[this.index + 2];
            if (this.tripleOperators.includes(triple))
                op = triple;
        }
        if (op == null && this.index + 1 < this.length) {
            const double = this.current + this.next;
            if (this.doubleOperators.includes(double))
                op = double;
        }
        if (op == null)
            op = this.current;
        this.index += op.length;
        return op;
    }
    getString(char) {
        const buff = [];
        while (!this.end) {
            if (this.current === char) {
                if (!((this.index + 1 < this.length && this.next === char) || (this.previous === char))) {
                    break;
                }
            }
            buff.push(this.current);
            this.index += 1;
        }
        this.index += 1;
        return buff.join('');
    }
    getTemplate() {
        const buff = [];
        while (!this.end) {
            if (this.current === '`') {
                break;
            }
            buff.push(this.current);
            this.index += 1;
        }
        this.index += 1;
        return buff.join('');
    }
    getArgs(end = ')') {
        const args = [];
        while (true) {
            const arg = this.getExpression(undefined, undefined, ',' + end);
            if (arg != null)
                args.push(arg);
            if (this.previous === end)
                break;
        }
        return args;
    }
    getObject() {
        const attributes = [];
        while (true) {
            let name = null;
            if (this.current === '"' || this.current === '\'') {
                const char = this.current;
                this.index += 1;
                name = this.getString(char);
            }
            else {
                name = this.getValue();
            }
            if (this.current === ':')
                this.index += 1;
            else
                throw new Error('attribute ' + name + ' without value');
            const value = this.getExpression(undefined, undefined, ',}');
            const attribute = new node_1.Node(name, __1.OperatorType.KeyVal, [value]);
            attributes.push(attribute);
            if (this.previous === '}')
                break;
        }
        return new node_1.Node('obj', __1.OperatorType.Obj, attributes);
    }
    getBlock() {
        const lines = [];
        while (true) {
            const line = this.getExpression(undefined, undefined, ';}');
            if (line != null)
                lines.push(line);
            if (this.previous === '}')
                break;
        }
        return new node_1.Node('block', __1.OperatorType.Block, lines);
    }
    getControlBlock() {
        if (this.current === '{') {
            this.index += 1;
            return this.getBlock();
        }
        else {
            return this.getExpression(undefined, undefined, ';');
        }
    }
    getReturn() {
        const value = this.getExpression(undefined, undefined, ';');
        return new node_1.Node('return', __1.OperatorType.Return, [value]);
    }
    getTryCatchBlock() {
        const children = [];
        const tryBlock = this.getControlBlock();
        children.push(tryBlock);
        if (this.nextIs('catch')) {
            const catchChildren = [];
            this.index += 'catch'.length;
            if (this.current === '(') {
                this.index += 1;
                const variable = this.getExpression(undefined, undefined, ')');
                catchChildren.push(variable);
            }
            const catchBlock = this.getControlBlock();
            catchChildren.push(catchBlock);
            const catchNode = new node_1.Node('catch', __1.OperatorType.Catch, catchChildren);
            children.push(catchNode);
        }
        if (this.current === ';')
            this.index += 1;
        return new node_1.Node('try', __1.OperatorType.Try, children);
    }
    getThrow() {
        const exception = this.getExpression(undefined, undefined, ';');
        return new node_1.Node('throw', __1.OperatorType.Throw, [exception]);
    }
    getIfBlock() {
        const children = [];
        const condition = this.getExpression(undefined, undefined, ')');
        children.push(condition);
        const block = this.getControlBlock();
        children.push(block);
        while (this.nextIs('elseif(')) {
            this.index += 'elseif('.length;
            const condition = this.getExpression(undefined, undefined, ')');
            const elseIfBlock = this.getControlBlock();
            const elseIfNode = new node_1.Node('elseif', __1.OperatorType.ElseIf, [condition, elseIfBlock]);
            children.push(elseIfNode);
        }
        if (this.nextIs('else')) {
            this.index += 'else'.length;
            const elseBlock = this.getControlBlock();
            children.push(elseBlock);
        }
        return new node_1.Node('if', __1.OperatorType.If, children);
    }
    getSwitchBlock() {
        const children = [];
        const value = this.getExpression(undefined, undefined, ')');
        children.push(value);
        if (this.current === '{')
            this.index += 1;
        let next = this.nextIs('case') ? 'case' : this.nextIs('default:') ? 'default:' : '';
        while (next === 'case') {
            this.index += 'case'.length;
            let compare;
            if (this.current === '\'' || this.current === '"') {
                const char = this.current;
                this.index += 1;
                compare = this.getString(char);
            }
            else {
                compare = this.getValue();
            }
            if (this.current === ':')
                this.index += 1;
            const lines = [];
            while (true) {
                const line = this.getExpression(undefined, undefined, ';}');
                if (line !== undefined)
                    lines.push(line);
                if (this.nextIs('case')) {
                    next = 'case';
                    break;
                }
                else if (this.nextIs('default:')) {
                    next = 'default:';
                    break;
                }
                else if (this.current === '}' || this.previous === '}') {
                    next = 'end';
                    break;
                }
            }
            const block = new node_1.Node('block', __1.OperatorType.Block, lines);
            const caseNode = new node_1.Node(compare, __1.OperatorType.Case, [block]);
            children.push(caseNode);
        }
        if (next === 'default:') {
            this.index += 'default:'.length;
            const lines = [];
            while (true) {
                const line = this.getExpression(undefined, undefined, ';}');
                if (line !== undefined)
                    lines.push(line);
                if (this.current === '}' || this.previous === '}')
                    break;
            }
            const block = new node_1.Node('block', __1.OperatorType.Block, lines);
            const defaultNode = new node_1.Node('default', __1.OperatorType.Default, [block]);
            children.push(defaultNode);
        }
        if (this.current === '}')
            this.index += 1;
        return new node_1.Node('switch', __1.OperatorType.Switch, children);
    }
    getWhileBlock() {
        const condition = this.getExpression(undefined, undefined, ')');
        const block = this.getControlBlock();
        return new node_1.Node('while', __1.OperatorType.While, [condition, block]);
    }
    getForBlock() {
        const first = this.getExpression(undefined, undefined, '; ');
        if (this.previous === ';') {
            const condition = this.getExpression(undefined, undefined, ';');
            const increment = this.getExpression(undefined, undefined, ')');
            const block = this.getControlBlock();
            return new node_1.Node('for', __1.OperatorType.For, [first, condition, increment, block]);
        }
        else if (this.nextIs('in')) {
            this.index += 2;
            // si hay espacios luego del in debe eliminarlos
            while (this.current === ' ') {
                this.index += 1;
            }
            const list = this.getExpression(undefined, undefined, ')');
            const block = this.getControlBlock();
            return new node_1.Node('forIn', __1.OperatorType.ForIn, [first, list, block]);
        }
        throw new Error('expression for error');
    }
    getFunctionBlock() {
        const name = this.getValue();
        if (this.current === '(')
            this.index += 1;
        const args = this.getArgs();
        const block = this.getBlock();
        const argsNode = new node_1.Node('args', __1.OperatorType.Args, args);
        return new node_1.Node(name, __1.OperatorType.Func, [argsNode, block]);
    }
    getChildFunc(name, parent) {
        let isArrow = false;
        const variableName = this.getValue(false);
        if (variableName !== '') {
            // example: p => {name:p.name}
            // example: p -> {name:p.name}
            const i = this.index + variableName.length;
            if ((this.char(i) === '=' || this.char(i) === '-') && this.char(i + 1) === '>') {
                isArrow = true;
                this.index += (variableName.length + 2); // [VARIABLE+NAME] + [=>]
            }
        }
        else if (this.current + this.next === '()') {
            // example: ()=> {name:name}
            // example: ()-> {name:name}
            if ((this.offset(2) === '=' || this.offset(2) === '-') && this.offset(3) === '>') {
                isArrow = true;
                this.index += 4; // [()=>]
            }
        }
        else if (this.current + this.next === '=>' || this.current + this.next === '->') {
            // example: => {name:name}
            // example: -> {name:name}
            isArrow = true;
            this.index += 2; // [=>]
        }
        if (isArrow) {
            const variable = new node_1.Node(variableName, 'Var');
            const body = this.getExpression(undefined, undefined, ')');
            return new node_1.Node(name, __1.OperatorType.Arrow, [parent, variable, body]);
        }
        else {
            const args = this.getArgs(')');
            args.splice(0, 0, parent);
            return new node_1.Node(name, __1.OperatorType.ChildFunc, args);
        }
    }
    getIndexOperand(name) {
        const idx = this.getExpression(undefined, undefined, ']');
        const operand = new node_1.Node(name, __1.OperatorType.Var);
        return new node_1.Node('[]', __1.OperatorType.Operator, [operand, idx]);
    }
    getEnum(value) {
        if (value.includes('.') && this.model.isEnum(value)) {
            const names = value.split('.');
            const enumName = names[0];
            const enumOption = names[1];
            const enumValue = this.model.getEnumValue(enumName, enumOption);
            return new node_1.Node(enumValue, __1.OperatorType.Const);
        }
        else {
            const values = this.model.getEnum(value);
            const attributes = [];
            for (const name in values) {
                const _value = values[name];
                const attribute = new node_1.Node(name, 'KeyVal', [new node_1.Node(_value, __1.OperatorType.Const)]);
                attributes.push(attribute);
            }
            return new node_1.Node('obj', __1.OperatorType.Obj, attributes);
        }
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map