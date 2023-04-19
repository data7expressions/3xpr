"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrototypeEvaluator = exports.Evaluator = exports.Operand = exports.OperandType = void 0;
var OperandType;
(function (OperandType) {
    OperandType["Const"] = "Const";
    OperandType["Var"] = "Var";
    OperandType["Env"] = "Env";
    OperandType["Property"] = "Property";
    OperandType["Template"] = "Template";
    OperandType["KeyVal"] = "KeyVal";
    OperandType["List"] = "List";
    OperandType["Obj"] = "Obj";
    OperandType["Operator"] = "Operator";
    OperandType["CallFunc"] = "CallFunc";
    OperandType["Arrow"] = "Arrow";
    OperandType["ChildFunc"] = "ChildFunc";
    OperandType["Block"] = "Block";
    OperandType["If"] = "If";
    OperandType["ElseIf"] = "ElseIf";
    OperandType["Else"] = "Else";
    OperandType["While"] = "While";
    OperandType["For"] = "For";
    OperandType["ForIn"] = "ForIn";
    OperandType["Switch"] = "Switch";
    OperandType["Case"] = "Case";
    OperandType["Default"] = "Default";
    OperandType["Break"] = "Break";
    OperandType["Continue"] = "Continue";
    OperandType["Func"] = "Func";
    OperandType["Return"] = "Return";
    OperandType["Try"] = "Try";
    OperandType["Catch"] = "Catch";
    OperandType["Throw"] = "Throw";
    OperandType["Args"] = "Args";
})(OperandType = exports.OperandType || (exports.OperandType = {}));
class Operand {
    // eslint-disable-next-line no-useless-constructor
    constructor(pos, name, type, children = [], returnType) {
        this.pos = pos;
        this.name = name;
        this.type = type;
        this.children = children;
        this.returnType = returnType;
    }
    eval(context) {
        if (!this.evaluator) {
            throw new Error('Evaluator not implemented');
        }
        return this.evaluator.eval(context);
    }
}
exports.Operand = Operand;
class Evaluator {
    // eslint-disable-next-line no-useless-constructor
    constructor(operand) {
        this.operand = operand;
    }
}
exports.Evaluator = Evaluator;
// https://www.sourcecodeexamples.net/2020/08/typescript-prototype-pattern-example.html
class PrototypeEvaluator {
    // eslint-disable-next-line no-useless-constructor
    constructor(operand) {
        this.operand = operand;
    }
}
exports.PrototypeEvaluator = PrototypeEvaluator;
//# sourceMappingURL=operand.js.map