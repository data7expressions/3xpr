"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = exports.ArrowFunction = exports.ChildFunction = exports.FunctionRef = exports.Operator = exports.Obj = exports.List = exports.KeyValue = exports.Variable = exports.Constant = exports.Operand = void 0;
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
        this.data = undefined;
        this.number = undefined;
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
            const operMetadata = this.metadata.getOperatorMetadata(this.name, this.children.length);
            if (operMetadata.custom) {
                return operMetadata.custom(this.name, this.children, operMetadata.customFunction).eval();
            }
            else {
                const args = [];
                for (let i = 0; i < this.children.length; i++) {
                    args.push(this.children[i].eval());
                }
                return operMetadata.function(...args);
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
            const funcMetadata = this.metadata.getFunctionMetadata(this.name);
            // eslint-disable-next-line new-cap
            if (funcMetadata.custom) {
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
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].eval();
        }
    }
}
exports.Block = Block;
//# sourceMappingURL=operands.js.map