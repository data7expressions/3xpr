"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const manager_1 = require("./../manager");
class Data {
    constructor(data, parent) {
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
        const names = manager_1.Helper.getNames(name);
        const value = this.getData(names[0]);
        return manager_1.Helper.getValue(names, value);
    }
    set(name, value) {
        const names = name.split('.');
        const level = names.length - 1;
        let list = this.getData(names[0]);
        for (let i = 0; i < names.length; i++) {
            const p = names[i];
            if (i === level) {
                list[p] = value;
            }
            else {
                list = list[p];
            }
        }
    }
    init(name, value) {
        this.data[name] = value;
    }
}
exports.Data = Data;
//# sourceMappingURL=data.js.map