"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrowEvaluator = exports.CatchEvaluator = exports.TryEvaluator = exports.ReturnEvaluator = exports.FuncEvaluator = exports.ContinueEvaluator = exports.BreakEvaluator = exports.SwitchEvaluator = exports.ForInEvaluator = exports.ForEvaluator = exports.WhileEvaluator = exports.IfEvaluator = exports.BlockEvaluator = exports.CallFuncEvaluator = exports.ObjEvaluator = exports.ListEvaluator = exports.PropertyEvaluator = exports.TemplateEvaluator = exports.EnvEvaluator = exports.VarEvaluator = exports.ConstEvaluator = void 0;
const h3lp_1 = require("h3lp");
const domain_1 = require("../../../../../../domain");
const typ3s_1 = require("typ3s");
class ConstEvaluator extends domain_1.Evaluator {
    eval() {
        if (this.operand.returnType === undefined) {
            return this.operand.name;
        }
        switch (this.operand.returnType.primitive) {
            case typ3s_1.Primitive.string:
                return this.operand.name;
            case typ3s_1.Primitive.boolean:
                return Boolean(this.operand.name);
            case typ3s_1.Primitive.integer:
            case typ3s_1.Primitive.decimal:
                return parseFloat(this.operand.name);
            default:
                return this.operand.name;
        }
    }
}
exports.ConstEvaluator = ConstEvaluator;
class VarEvaluator extends domain_1.Evaluator {
    eval(context) {
        return context.data.get(this.operand.name);
    }
}
exports.VarEvaluator = VarEvaluator;
class EnvEvaluator extends domain_1.Evaluator {
    eval() {
        return process.env[this.operand.name];
    }
}
exports.EnvEvaluator = EnvEvaluator;
class TemplateReplacer {
    // eslint-disable-next-line no-useless-constructor
    constructor(context) {
        this.context = context;
    }
    replace(match) {
        let value = process.env[match];
        if (value === undefined && this.context.data) {
            value = this.context.data.get(match);
        }
        return value === undefined ? match : value;
    }
}
class TemplateEvaluator extends domain_1.Evaluator {
    eval(context) {
        return h3lp_1.h3lp.utils.template(this.operand.name.toString(), new TemplateReplacer(context));
    }
}
exports.TemplateEvaluator = TemplateEvaluator;
class PropertyEvaluator extends domain_1.Evaluator {
    eval(context) {
        const value = this.operand.children[0].eval(context);
        if (value === undefined || value === null)
            return null;
        return h3lp_1.h3lp.obj.getValue(value, this.operand.name);
    }
}
exports.PropertyEvaluator = PropertyEvaluator;
class ListEvaluator extends domain_1.Evaluator {
    eval(context) {
        const values = [];
        for (let i = 0; i < this.operand.children.length; i++) {
            values.push(this.operand.children[i].eval(context));
        }
        return values;
    }
}
exports.ListEvaluator = ListEvaluator;
class ObjEvaluator extends domain_1.Evaluator {
    eval(context) {
        const obj = {};
        for (const child of this.operand.children) {
            obj[child.name] = child.children[0].eval(context);
        }
        return obj;
    }
}
exports.ObjEvaluator = ObjEvaluator;
class CallFuncEvaluator extends domain_1.Evaluator {
    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/ban-types
    constructor(operand, _function) {
        super(operand);
        this.operand = operand;
        this._function = _function;
    }
    eval(context) {
        const args = [];
        for (const child of this.operand.children) {
            args.push(child.eval(context));
        }
        return this._function(...args);
    }
}
exports.CallFuncEvaluator = CallFuncEvaluator;
class BlockEvaluator extends domain_1.Evaluator {
    eval(context) {
        let lastValue = null;
        for (let i = 0; i < this.operand.children.length; i++) {
            lastValue = this.operand.children[i].eval(context);
        }
        return lastValue;
    }
}
exports.BlockEvaluator = BlockEvaluator;
class IfEvaluator extends domain_1.Evaluator {
    eval(context) {
        const condition = this.operand.children[0].eval(context);
        if (condition) {
            const ifBlock = this.operand.children[1];
            return ifBlock.eval(context);
        }
        else if (this.operand.children.length > 2) {
            for (let i = 2; i < this.operand.children.length; i++) {
                if (this.operand.children[i].type === domain_1.OperandType.ElseIf) {
                    const elseIfCondition = this.operand.children[i].children[0].eval(context);
                    if (elseIfCondition) {
                        const elseIfBlock = this.operand.children[i].children[1];
                        return elseIfBlock.eval(context);
                    }
                }
                else {
                    const elseBlock = this.operand.children[i];
                    return elseBlock.eval(context);
                }
            }
        }
    }
}
exports.IfEvaluator = IfEvaluator;
class WhileEvaluator extends domain_1.Evaluator {
    eval(context) {
        let lastValue = null;
        const condition = this.operand.children[0];
        const block = this.operand.children[1];
        while (condition.eval(context)) {
            lastValue = block.eval(context);
        }
        return lastValue;
    }
}
exports.WhileEvaluator = WhileEvaluator;
class ForEvaluator extends domain_1.Evaluator {
    eval(context) {
        let lastValue = null;
        const initialize = this.operand.children[0];
        const condition = this.operand.children[1];
        const increment = this.operand.children[2];
        const block = this.operand.children[3];
        for (initialize.eval(context); condition.eval(context); increment.eval(context)) {
            lastValue = block.eval(context);
        }
        return lastValue;
    }
}
exports.ForEvaluator = ForEvaluator;
class ForInEvaluator extends domain_1.Evaluator {
    eval(context) {
        let lastValue = null;
        const item = this.operand.children[0];
        const list = this.operand.children[1].eval(context);
        const block = this.operand.children[2];
        for (let i = 0; i < list.length; i++) {
            const value = list[i];
            if (context) {
                context.data.set(item.name, value);
            }
            lastValue = block.eval(context);
        }
        return lastValue;
    }
}
exports.ForInEvaluator = ForInEvaluator;
class SwitchEvaluator extends domain_1.Evaluator {
    eval(context) {
        const value = this.operand.children[0].eval(context);
        for (let i = 1; i < this.operand.children.length; i++) {
            const option = this.operand.children[i];
            if (option.type === domain_1.OperandType.Case) {
                if (option.name === value) {
                    return option.children[0].eval(context);
                }
            }
            else if (option.type === domain_1.OperandType.Default) {
                return option.children[0].eval(context);
            }
        }
    }
}
exports.SwitchEvaluator = SwitchEvaluator;
class BreakEvaluator extends domain_1.Evaluator {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.BreakEvaluator = BreakEvaluator;
class ContinueEvaluator extends domain_1.Evaluator {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.ContinueEvaluator = ContinueEvaluator;
class FuncEvaluator extends domain_1.Evaluator {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.FuncEvaluator = FuncEvaluator;
class ReturnEvaluator extends domain_1.Evaluator {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.ReturnEvaluator = ReturnEvaluator;
class TryEvaluator extends domain_1.Evaluator {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.TryEvaluator = TryEvaluator;
class CatchEvaluator extends domain_1.Evaluator {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.CatchEvaluator = CatchEvaluator;
class ThrowEvaluator extends domain_1.Evaluator {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.ThrowEvaluator = ThrowEvaluator;
//# sourceMappingURL=evaluators.js.map