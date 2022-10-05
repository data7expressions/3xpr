"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Throw = exports.Catch = exports.Try = exports.Return = exports.Function = exports.Continue = exports.Break = exports.Default = exports.Case = exports.Switch = exports.ForIn = exports.For = exports.While = exports.Else = exports.ElseIf = exports.If = exports.Block = exports.ArrowFunction = exports.ChildFunction = exports.FunctionRef = exports.Operator = exports.Obj = exports.List = exports.KeyValue = exports.Property = exports.Template = exports.EnvironmentVariable = exports.Variable = exports.Constant = void 0;
const model_1 = require("../model");
const manager_1 = require("../manager");
class Constant extends model_1.Operand {
    constructor(name) {
        super(name, [], manager_1.Helper.type.getType(name));
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
// export class Variable extends Operand implements IOperandData
class Variable extends model_1.Operand {
    constructor(name, type) {
        super(name, [], type);
    }
    eval(context) {
        return context.data.get(this.name);
    }
}
exports.Variable = Variable;
class EnvironmentVariable extends model_1.Operand {
    constructor(name) {
        super(name, [], 'string');
    }
    eval() {
        return process.env[this.name];
    }
}
exports.EnvironmentVariable = EnvironmentVariable;
class Template extends model_1.Operand {
    constructor(name) {
        super(name, [], 'string');
    }
    eval(context) {
        // info https://www.tutorialstonight.com/javascript-string-format.php
        const result = this.name.replace(/\$([a-zA-Z0-9_]+)/g, (match, field) => {
            const value = process.env[field];
            return typeof value === 'undefined' ? match : value;
        });
        return result.replace(/\${([a-zA-Z0-9_.]+)}/g, (match, field) => {
            if (context.data) {
                const value = context.data.get(field);
                return typeof value === 'undefined' ? match : value;
            }
        });
    }
}
exports.Template = Template;
class Property extends model_1.Operand {
    eval(context) {
        const value = this.children[0].eval(context);
        if (value === undefined || value === null)
            return null;
        const names = manager_1.Helper.obj.names(this.name);
        return manager_1.Helper.obj.getValue(names, value);
    }
}
exports.Property = Property;
class KeyValue extends model_1.Operand {
    constructor(name, children = [], property, type) {
        super(name, children, type);
        this.property = property;
    }
    eval(context) {
        return this.children[0].eval(context);
    }
}
exports.KeyValue = KeyValue;
class List extends model_1.Operand {
    constructor(name, children = []) {
        super(name, children);
    }
    eval(context) {
        const values = [];
        for (let i = 0; i < this.children.length; i++) {
            values.push(this.children[i].eval(context));
        }
        return values;
    }
}
exports.List = List;
class Obj extends model_1.Operand {
    constructor(name, children = []) {
        super(name, children);
    }
    eval(context) {
        const obj = {};
        for (const child of this.children) {
            obj[child.name] = child.eval(context);
        }
        return obj;
    }
}
exports.Obj = Obj;
class Operator extends model_1.Operand {
    constructor(name, children = [], model) {
        super(name, children);
        this.model = model;
    }
    eval(context) {
        if (this.model) {
            const operatorMetadata = this.model.getOperator(this.name, this.children.length);
            if (operatorMetadata.custom) {
                // eslint-disable-next-line new-cap
                return new operatorMetadata.custom(this.name, this.children).eval(context);
            }
            else {
                const args = [];
                for (const child of this.children) {
                    args.push(child.eval(context));
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
class FunctionRef extends model_1.Operand {
    constructor(name, children = [], model) {
        super(name, children);
        this.model = model;
    }
    eval(context) {
        if (this.model) {
            const funcMetadata = this.model.getFunction(this.name);
            if (funcMetadata.custom) {
                // eslint-disable-next-line new-cap
                return new funcMetadata.custom(this.name, this.children).eval(context);
            }
            else if (funcMetadata.function) {
                const args = [];
                for (let i = 0; i < this.children.length; i++) {
                    args.push(this.children[i].eval(context));
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
class Block extends model_1.Operand {
    eval(context) {
        let lastValue = null;
        for (let i = 0; i < this.children.length; i++) {
            lastValue = this.children[i].eval(context);
        }
        return lastValue;
    }
}
exports.Block = Block;
class If extends model_1.Operand {
    eval(context) {
        const condition = this.children[0].eval(context);
        if (condition) {
            const ifBlock = this.children[1];
            return ifBlock.eval(context);
        }
        else if (this.children.length > 2) {
            for (let i = 2; i < this.children.length; i++) {
                if (this.children[i] instanceof ElseIf) {
                    const elseIfCondition = this.children[i].children[0].eval(context);
                    if (elseIfCondition) {
                        const elseIfBlock = this.children[i].children[1];
                        return elseIfBlock.eval(context);
                    }
                }
                else {
                    const elseBlock = this.children[i];
                    return elseBlock.eval(context);
                }
            }
        }
    }
}
exports.If = If;
class ElseIf extends model_1.Operand {
    eval() {
        throw new Error('NotUsed');
    }
}
exports.ElseIf = ElseIf;
class Else extends model_1.Operand {
    eval() {
        throw new Error('NotUsed');
    }
}
exports.Else = Else;
class While extends model_1.Operand {
    eval(context) {
        let lastValue = null;
        const condition = this.children[0];
        const block = this.children[1];
        while (condition.eval(context)) {
            lastValue = block.eval(context);
        }
        return lastValue;
    }
}
exports.While = While;
class For extends model_1.Operand {
    eval(context) {
        let lastValue = null;
        const initialize = this.children[0];
        const condition = this.children[1];
        const increment = this.children[2];
        const block = this.children[3];
        for (initialize.eval(context); condition.eval(context); increment.eval(context)) {
            lastValue = block.eval(context);
        }
        return lastValue;
    }
}
exports.For = For;
class ForIn extends model_1.Operand {
    eval(context) {
        let lastValue = null;
        const item = this.children[0];
        const list = this.children[1].eval(context);
        const block = this.children[2];
        for (let i = 0; i < list.length; i++) {
            const value = list[i];
            if (context) {
                context.data.set(item.name, value);
            }
            // item.set(value)
            lastValue = block.eval(context);
        }
        return lastValue;
    }
}
exports.ForIn = ForIn;
class Switch extends model_1.Operand {
    eval(context) {
        const value = this.children[0].eval(context);
        for (let i = 1; i < this.children.length; i++) {
            const option = this.children[i];
            if (option instanceof Case) {
                if (option.name === value) {
                    const caseBlock = option.children[0];
                    return caseBlock.eval(context);
                }
            }
            else if (option instanceof Default) {
                const defaultBlock = option.children[0];
                return defaultBlock.eval(context);
            }
        }
    }
}
exports.Switch = Switch;
class Case extends model_1.Operand {
    eval() {
        throw new Error('NotUsed');
    }
}
exports.Case = Case;
class Default extends model_1.Operand {
    eval() {
        throw new Error('NotUsed');
    }
}
exports.Default = Default;
class Break extends model_1.Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Break = Break;
class Continue extends model_1.Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Continue = Continue;
class Function extends model_1.Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Function = Function;
class Return extends model_1.Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Return = Return;
class Try extends model_1.Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Try = Try;
class Catch extends model_1.Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Catch = Catch;
class Throw extends model_1.Operand {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.Throw = Throw;
//# sourceMappingURL=operands.js.map