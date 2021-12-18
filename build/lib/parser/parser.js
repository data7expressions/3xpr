"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const node_1 = require("./node");
class Parser {
    constructor(mgr, buffer) {
        this.mgr = mgr;
        // eslint-disable-next-line prefer-regex-literals
        this.reAlphanumeric = new RegExp('[a-zA-Z0-9_.]+$'); /// [a-zA-Z0-9_.]+$'/ //
        this.reInt = /^[0-9]+$/; // new RegExp('^d+$')
        this.reFloat = /^[0-9]*[.][0-9]+$/; // new RegExp('^d+(\.\d+)?$/')//'d+(\.\d+)?$'
        this.buffer = [];
        this.buffer = buffer;
        this.length = this.buffer.length;
        this.index = 0;
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
        return new node_1.Node('block', 'block', nodes);
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
        let isbreak = false;
        while (!this.end) {
            if (!operand1 && !operator) {
                operand1 = this.getOperand();
                operator = this.getOperator();
                if (!operator || _break.includes(operator)) {
                    expression = operand1;
                    isbreak = true;
                    break;
                }
            }
            operand2 = this.getOperand();
            const nextOperator = this.getOperator();
            if (!nextOperator || _break.includes(nextOperator)) {
                expression = new node_1.Node(operator, 'oper', [operand1, operand2]);
                isbreak = true;
                break;
            }
            else if (this.mgr.priority(operator) > this.mgr.priority(nextOperator)) {
                operand1 = new node_1.Node(operator, 'oper', [operand1, operand2]);
                operator = nextOperator;
            }
            else {
                operand2 = this.getExpression(operand2, nextOperator, _break);
                expression = new node_1.Node(operator, 'oper', [operand1, operand2]);
                isbreak = true;
                break;
            }
        }
        if (!isbreak)
            expression = new node_1.Node(operator, 'oper', [operand1, operand2]);
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
        if (this.reAlphanumeric.test(char)) {
            let value = this.getValue();
            if (value === 'if' && this.current === '(') {
                this.index += 1;
                operand = this.getIfBlock();
            }
            else if (value === 'while' && this.current === '(') {
                this.index += 1;
                operand = this.getWhileBlock();
            }
            else if (!this.end && this.current === '(') {
                this.index += 1;
                if (value.includes('.')) {
                    const names = value.split('.');
                    const name = names.pop();
                    const variableName = names.join('.');
                    const variable = new node_1.Node(variableName, 'var');
                    operand = this.getChildFunction(name, variable);
                }
                else {
                    const args = this.getArgs(')');
                    operand = new node_1.Node(value, 'funcRef', args);
                }
            }
            else if (!this.end && this.current === '[') {
                this.index += 1;
                operand = this.getIndexOperand(value);
            }
            else if (this.reInt.test(value)) {
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
                operand = new node_1.Node(value, 'const');
            }
            else if (this.reFloat.test(value)) {
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
                operand = new node_1.Node(value, 'const');
            }
            else if (value === 'true') {
                operand = new node_1.Node(true, 'const');
            }
            else if (value === 'false') {
                operand = new node_1.Node(false, 'const');
            }
            else if (this.mgr.isEnum(value)) {
                operand = this.getEnum(value);
            }
            else {
                operand = new node_1.Node(value, 'var');
            }
        }
        else if (char === '\'' || char === '"') {
            this.index += 1;
            const result = this.getString(char);
            operand = new node_1.Node(result, 'const');
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
            operand = new node_1.Node('array', 'array', elements);
        }
        operand = this.solveChain(operand);
        if (isNegative)
            operand = new node_1.Node('-', 'oper', [operand]);
        if (isNot)
            operand = new node_1.Node('!', 'oper', [operand]);
        if (isBitNot)
            operand = new node_1.Node('~', 'oper', [operand]);
        return operand;
    }
    solveChain(operand) {
        if (!this.end && this.current === '.') {
            this.index += 1;
            const name = this.getValue();
            if (this.current === '(')
                this.index += 1;
            return this.solveChain(this.getChildFunction(name, operand));
        }
        else {
            return operand;
        }
    }
    getValue(increment = true) {
        const buff = [];
        if (increment) {
            while (!this.end && this.reAlphanumeric.test(this.current)) {
                buff.push(this.current);
                this.index += 1;
            }
        }
        else {
            let index = this.index;
            while (!this.end && this.reAlphanumeric.test(this.buffer[index])) {
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
            if (this.mgr.tripleOperators.includes(triple))
                op = triple;
        }
        if (op == null && this.index + 1 < this.length) {
            const double = this.current + this.next;
            if (this.mgr.doubleOperators.includes(double))
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
            const attribute = new node_1.Node(name, 'keyVal', [value]);
            attributes.push(attribute);
            if (this.previous === '}')
                break;
        }
        return new node_1.Node('obj', 'obj', attributes);
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
        return new node_1.Node('block', 'block', lines);
    }
    getIfBlock() {
        let block = null;
        const condition = this.getExpression(undefined, undefined, ')');
        if (this.current === '{') {
            this.index += 1;
            block = this.getBlock();
        }
        else {
            block = this.getExpression(undefined, undefined, ';');
        }
        const nextValue = this.getValue(false);
        let elseblock = null;
        if (nextValue === 'else') {
            this.index += nextValue.length;
            if (this.current === '{') {
                this.index += 1;
                elseblock = this.getBlock();
            }
            else {
                elseblock = this.getExpression(undefined, undefined, ';');
            }
        }
        return new node_1.Node('if', 'if', [condition, block, elseblock]);
    }
    getWhileBlock() {
        let block = null;
        const condition = this.getExpression(undefined, undefined, ')');
        if (this.current === '{') {
            this.index += 1;
            block = this.getBlock();
        }
        else {
            block = this.getExpression(undefined, undefined, ';');
        }
        return new node_1.Node('while', 'while', [condition, block]);
    }
    getChildFunction(name, parent) {
        let isArrow = false;
        const variableName = this.getValue(false);
        if (variableName !== '') {
            // example: p => {name:p.name}
            const i = this.index + variableName.length;
            if (this.char(i) === '=' && this.char(i + 1) === '>') {
                isArrow = true;
                this.index += (variableName.length + 2); // [VARIABLE+NAME] + [=>]
            }
        }
        else if (this.current + this.next === '()') {
            // example: ()=> {name:name}
            if (this.offset(2) === '=' && this.offset(3) === '>') {
                isArrow = true;
                this.index += 4; // [()=>]
            }
        }
        else if (this.current + this.next === '=>') {
            // example: => {name:name}
            isArrow = true;
            this.index += 2; // [=>]
        }
        if (isArrow) {
            const variable = new node_1.Node(variableName, 'var');
            const body = this.getExpression(undefined, undefined, ')');
            return new node_1.Node(name, 'arrow', [parent, variable, body]);
        }
        else {
            const args = this.getArgs(')');
            args.splice(0, 0, parent);
            return new node_1.Node(name, 'childFunc', args);
        }
        // if( this.mgr.arrowFunction.includes(name)){
        //      let variableName= this.getValue()
        //      if(variableName=='' && this.current==')'){
        //          this.index+=1
        //          return new Node(name,'arrow',[parent])
        //      }
        //      else{
        //          if(this.current=='=' && this.next == '>')this.index+=2
        //          else throw 'map without body'
        //          let variable= new Node(variableName,'var')
        //          let body= this.getExpression(null,null,')')
        //          return new Node(name,'arrow',[parent,variable,body])
        //      }
        //  }else{
        //      let args=  this.getArgs(')')
        //      args.splice(0,0,parent)
        //      return  new Node(name,'childFunc',args)
        //  }
    }
    getIndexOperand(name) {
        const idx = this.getExpression(undefined, undefined, ']');
        const operand = new node_1.Node(name, 'var');
        return new node_1.Node('[]', 'oper', [operand, idx]);
    }
    getEnum(value) {
        if (value.includes('.') && this.mgr.isEnum(value)) {
            const names = value.split('.');
            const enumName = names[0];
            const enumOption = names[1];
            const enumValue = this.mgr.getEnumValue(enumName, enumOption);
            return new node_1.Node(enumValue, 'const');
        }
        else {
            const values = this.mgr.getEnum(value);
            const attributes = [];
            for (const name in values) {
                const _value = values[name];
                const attribute = new node_1.Node(name, 'keyVal', [new node_1.Node(_value, 'const')]);
                attributes.push(attribute);
            }
            return new node_1.Node('obj', 'obj', attributes);
        }
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map