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
        const names = manager_1.Helper.obj.getNames(name);
        const value = this.getData(names[0]);
        return manager_1.Helper.obj.getValue(names, value);
    }
    set(name, value) {
        const names = name.split('.');
        const level = names.length - 1;
        let list = this.getData(names[0]);
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            // if is an array and name is a positive integer
            if (Array.isArray(list) && manager_1.Helper.validator.isPositiveInteger(name)) {
                const index = Number(name);
                // If the index exceeds the length of the array, nothing assigns it.
                if (index >= list.length) {
                    return;
                }
                if (i === level) {
                    list[index] = value;
                }
                else {
                    list = list[index];
                }
            }
            else {
                if (i === level) {
                    list[name] = value;
                }
                else {
                    list = list[name];
                }
            }
        }
    }
    init(name, value) {
        this.data[name] = value;
    }
}
exports.Data = Data;
//# sourceMappingURL=data.js.map