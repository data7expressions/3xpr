"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = exports.Token = exports.Step = exports.Data = void 0;
const h3lp_1 = require("h3lp");
const crypto_1 = __importDefault(require("crypto"));
class Data {
    // eslint-disable-next-line no-useless-constructor
    constructor(data = {}, parent) {
        this.data = data;
        this.parent = parent;
    }
    newData() {
        return new Data({}, this);
    }
    getData(variable) {
        if (this.data[variable] !== undefined || this.parent == null)
            return this.data;
        const _context = this.parent.getData(variable);
        return _context || this.data;
    }
    contains(name) {
        const names = name.split('.');
        let value = this.getData(names[0]);
        for (const n in names) {
            if (value[n] === undefined)
                return false;
            value = value[n];
        }
        return true;
    }
    get(name) {
        const names = h3lp_1.h3lp.obj.names(name);
        const data = this.getData(names[0]);
        return h3lp_1.h3lp.obj.getValue(data, name);
    }
    set(name, value) {
        const names = h3lp_1.h3lp.obj.names(name);
        const data = this.getData(names[0]);
        return h3lp_1.h3lp.obj.setValue(data, name, value);
    }
    init(name, value) {
        this.data[name] = value;
    }
}
exports.Data = Data;
class Step {
    // eslint-disable-next-line no-useless-constructor
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.values = [];
    }
}
exports.Step = Step;
class Token {
    constructor() {
        this.id = crypto_1.default.randomUUID();
        this.stack = {};
        this.isBreak = false;
        this.listeners = [];
        this.signals = [];
    }
    addListener(value) {
        this.isBreak = true;
        this.listeners.push(value);
    }
    clearListeners() {
        this.isBreak = false;
        this.listeners = [];
    }
    addSignal(value) {
        this.signals.push(value);
    }
    clearSignals() {
        this.signals = [];
    }
}
exports.Token = Token;
class Context {
    constructor(data, token, parent) {
        this.data = data || new Data({});
        this.token = token || new Token();
        this.parent = parent;
    }
    newContext() {
        return new Context(this.data.newData(), this.token, this);
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map