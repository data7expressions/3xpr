"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Throw = exports.Catch = exports.Try = exports.Return = exports.Function = exports.Continue = exports.Break = exports.Default = exports.Case = exports.Switch = exports.ForIn = exports.For = exports.While = exports.Else = exports.ElseIf = exports.If = exports.Block = exports.ArrowFunction = exports.ChildFunction = exports.FunctionRef = exports.Operator = exports.Obj = exports.List = exports.KeyValue = exports.Property = exports.Template = exports.EnvironmentVariable = exports.Variable = exports.Constant = exports.Operand = void 0;
const helper_1 = require("../manager/helper");
class Operand {
    constructor(name, children = [], type = 'any') {
        this.name = name;
        this.children = children;
        this.type = type;
        this.id = undefined;
        this.parent = undefined;
        this.index = 0;
        this.level = 0;
    }
    clone() {
        throw new Error('NotImplemented');
        // // const obj = this
        // const children = []
        // if (this.children) {
        // for (const k in this.children) {
        // const p = this.children[k]
        // const child = p && typeof p === 'object' ? JSON.parse(JSON.stringify(p)) : p
        // children.push(child)
        // }
        // }
        // return new this.constructor(this.name, children)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    set(value) { throw new Error('NotImplemented'); }
}
exports.Operand = Operand;
class Constant extends Operand {
    constructor(name) {
        super(name, [], helper_1.Helper.getType(name));
    }
    eval() {
        switch (this.type) {
            case 'string':
                return this.name;
            case 'boolean':
                return Boolean(this.name);
            case 'number':
                return parseFloat(this.name);
            default:
                return this.name;
        }
    }
}
exports.Constant = Constant;
class Variable extends Operand {
    constructor(name, type = 'any') {
        super(name, [], type);
    }
    set(value) {
        if (this.data) {
            this.data.set(this.name, value);
        }
    }
    eval() {
        return this.data ? this.data.get(this.name) : null;
    }
}
exports.Variable = Variable;
class EnvironmentVariable extends Operand {
    eval() {
        return process.env[this.name];
    }
}
exports.EnvironmentVariable = EnvironmentVariable;
class Template extends Operand {
    constructor(name, type = 'any') {
        super(name, [], type);
    }
    eval() {
        // info https://www.tutorialstonight.com/javascript-string-format.php
        const result = this.name.replace(/\$([a-zA-Z0-9_]+)/g, (match, field) => {
            const value = process.env[field];
            return typeof value === 'undefined' ? match : value;
        });
        return result.replace(/\${([a-zA-Z0-9_.]+)}/g, (match, field) => {
            if (this.data) {
                const value = this.data.get(field);
                return typeof value === 'undefined' ? match : value;
            }
        });
    }
}
exports.Template = Template;
class Property extends Operand {
    eval() {
        const value = this.children[0].eval();
        if (value === undefined || value === null)
            return null;
        const names = helper_1.Helper.getNames(this.name);
        return helper_1.Helper.getValue(names, value);
    }
}
exports.Property = Property;
class KeyValue extends Operand {
    eval() {
        return this.children[0].eval();
    }
}
exports.KeyValue = KeyValue;
class List extends Operand {
    constructor(name, children = []) {
        super(name, children, 'array');
    }
    eval() {
        const values = [];
        for (let i = 0; i < this.children.length; i++) {
            values.push(this.children[i].eval());
        }
        return values;
    }
}
exports.List = List;
class Obj extends Operand {
    constructor(name, children = []) {
        super(name, children, 'object');
    }
    eval() {
        const obj = {};
        for (let i = 0; i < this.children.length; i++) {
            const value = this.children[i].eval();
            obj[this.children[i].name] = value;
        }
        return obj;
    }
}
exports.Obj = Obj;
class Operator extends Operand {
    eval() {
        if (this.metadata) {
            const operatorMetadata = this.metadata.getOperator(this.name, this.children.length);
            if (operatorMetadata.custom) {
                // eslint-disable-next-line new-cap
                return new operatorMetadata.custom(this.name, this.children).eval();
            }
            else {
                const args = [];
                for (let i = 0; i < this.children.length; i++) {
                    args.push(this.children[i].eval());
                }
                return operatorMetadata.function(...args);
            }
        }
        else {
            throw new Error(`Function ${this.name} not implemented`);
        }
    }
}
exports.Operator = Operator;
class FunctionRef extends Operand {
    eval() {
        if (this.metadata) {
            const funcMetadata = this.metadata.getFunction(this.name);
            if (funcMetadata.custom) {
                // eslint-disable-next-line new-cap
                return new funcMetadata.custom(this.name, this.children).eval();
            }
            else {
                const args = [];
                for (let i = 0; i < this.children.length; i++) {
                    args.push(this.children[i].eval());
                }
                return funcMetadata.function(...args);
            }
        }
        else {
            throw new Error(`Function ${this.name} not implemented`);
        }
    }
}
exports.FunctionRef = FunctionRef;
class ChildFunction extends FunctionRef {
}
exports.ChildFunction = ChildFunction;
class ArrowFunction extends FunctionRef {
}
exports.ArrowFunction = ArrowFunction;
class Block extends Operand {
    eval() {
        let lastValue = null;
        for (let i = 0; i < this.children.length; i++) {
            lastValue = this.children[i].eval();
        }
        return lastValue;
    }
}
exports.Block = Block;
class If extends Operand {
    eval() {
        const condition = this.children[0].eval();
        if (condition) {
            const ifBlock = this.children[1];
            return ifBlock.eval();
        }
        else if (this.children.length > 2) {
            for (let i = 2; i < this.children.length; i++) {
                if (this.children[i] instanceof ElseIf) {
                    const elseIfCondition = this.children[i].children[0].eval();
                    if (elseIfCondition) {
                        const elseIfBlock = this.children[i].children[1];
                        return elseIfBlock.eval();
                    }
                }
                else {
                    const elseBlock = this.children[i];
                    return elseBlock.eval();
                }
            }
        }
    }
}
exports.If = If;
class ElseIf extends Operand {
    eval() {
        throw new Error('NotUsed');
    }
}
exports.ElseIf = ElseIf;
class Else extends Operand {
    eval() {
        throw new Error('NotUsed');
    }
}
exports.Else = Else;
class While extends Operand {
    eval() {
        let lastValue = null;
        const condition = this.children[0];
        const block = this.children[1];
        while (condition.eval()) {
            lastValue = block.eval();
        }
        return lastValue;
    }
}
exports.While = While;
class For extends Operand {
    eval() {
        let lastValue = null;
        const initialize = this.children[0];
        const condition = this.children[1];
        const increment = this.children[2];
        const block = this.children[3];
        for (initialize.eval(); condition.eval(); increment.eval()) {
            lastValue = block.eval();
        }
        return lastValue;
    }
}
exports.For = For;
class ForIn extends Operand {
    eval() {
        let lastValue = null;
        const item = this.children[0];
        const list = this.children[1].eval();
        const block = this.children[2];
        for (let i = 0; i < list.length; i++) {
            const value = list[i];
            item.set(value);
            lastValue = block.eval();
        }
        return lastValue;
    }
}
exports.ForIn = ForIn;
class Switch extends Operand {
    eval() {
        const value = this.children[0].eval();
        for (let i = 1; i < this.children.length; i++) {
            const option = this.children[i];
            if (option instanceof Case) {
                if (option.name === value) {
                    const caseBlock = option.children[0];
                    return caseBlock.eval();
                }
            }
            else if (option instanceof Default) {
                const defaultBlock = option.children[0];
                return defaultBlock.eval();
            }
        }
    }
}
exports.Switch = Switch;
class Case extends Operand {
    eval() {
        throw new Error('NotUsed');
    }
}
exports.Case = Case;
class Default extends Operand {
    eval() {
        throw new Error('NotUsed');
    }
}
exports.Default = Default;
class Break extends Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Break = Break;
class Continue extends Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Continue = Continue;
class Function extends Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Function = Function;
class Return extends Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Return = Return;
class Try extends Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Try = Try;
class Catch extends Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Catch = Catch;
class Throw extends Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Throw = Throw;
//# sourceMappingURL=operands.js.map