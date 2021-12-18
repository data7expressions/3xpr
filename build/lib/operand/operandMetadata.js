"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandMetadata = void 0;
class OperandMetadata {
    constructor() {
        this.libraries = {};
        this.operators = {};
        this.functions = {};
    }
    addLibrary(library) {
        this.libraries[library.name] = library;
        for (const name in library.operators) {
            const operator = library.operators[name];
            for (const operands in operator) {
                const metadata = operator[operands];
                if (!this.operators[name])
                    this.operators[name] = {};
                this.operators[name][operands] = metadata;
            }
        }
        for (const name in library.functions) {
            const metadata = library.functions[name];
            this.functions[name] = metadata;
        }
    }
    getOperatorMetadata(name, operands) {
        try {
            if (this.operators[name]) {
                const operator = this.operators[name];
                if (operator[operands]) {
                    return operator[operands];
                }
            }
            return null;
        }
        catch (error) {
            throw new Error('error with operator: ' + name);
        }
    }
    getFunctionMetadata(name) {
        try {
            if (this.functions[name]) {
                return this.functions[name];
            }
            return null;
        }
        catch (error) {
            throw new Error('error with function: ' + name);
        }
    }
}
exports.OperandMetadata = OperandMetadata;
//# sourceMappingURL=operandMetadata.js.map