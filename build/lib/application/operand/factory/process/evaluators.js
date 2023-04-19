"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrowProcessEvaluator = exports.CatchProcessEvaluator = exports.TryProcessEvaluator = exports.FuncProcessEvaluator = exports.SwitchProcessEvaluator = exports.ForInProcessEvaluator = exports.ForProcessEvaluator = exports.WhileProcessEvaluator = exports.IfProcessEvaluator = exports.BlockProcessEvaluator = exports.CallFuncProcessEvaluator = exports.ObjProcessEvaluator = exports.ListProcessEvaluator = exports.StackEvaluator = exports.ProcessEvaluator = exports.PropertyProcessEvaluator = void 0;
const h3lp_1 = require("h3lp");
const domain_1 = require("../../../../domain");
class PropertyProcessEvaluator extends domain_1.Evaluator {
    eval(context) {
        const value = this.operand.children[0].eval(context);
        if (value === undefined || value === null)
            return null;
        return h3lp_1.h3lp.obj.getValue(value, this.operand.name);
    }
}
exports.PropertyProcessEvaluator = PropertyProcessEvaluator;
class ProcessEvaluator {
    // eslint-disable-next-line no-useless-constructor
    constructor(operand) {
        this.operand = operand;
    }
    solveChildren(context, step) {
        for (let i = step.values.length - 1; i < this.operand.children.length; i++) {
            const value = this.operand.children[i].eval(context);
            if (context.token.isBreak) {
                return value;
            }
            step.values.push(value);
        }
        return step.values;
    }
}
exports.ProcessEvaluator = ProcessEvaluator;
class StackEvaluator extends domain_1.Evaluator {
    // eslint-disable-next-line no-useless-constructor
    constructor(operand, child) {
        super(operand);
        this.operand = operand;
        this.child = child;
    }
    eval(context) {
        if (this.operand.id === undefined) {
            throw new Error(`Operand ${this.operand.name} id undefined`);
        }
        let step = context.token.stack[this.operand.id];
        if (step === undefined) {
            step = new domain_1.Step(this.operand.name, this.operand.id);
            context.token.stack[this.operand.id] = step;
        }
        const result = this.child.eval(context, step);
        if (!context.token.isBreak) {
            // remove stack
            delete context.token.stack[this.operand.id];
        }
        return result;
    }
}
exports.StackEvaluator = StackEvaluator;
class ListProcessEvaluator extends ProcessEvaluator {
    eval(context, step) {
        return this.solveChildren(context, step);
    }
}
exports.ListProcessEvaluator = ListProcessEvaluator;
class ObjProcessEvaluator extends ProcessEvaluator {
    eval(context, step) {
        const result = this.solveChildren(context, step);
        if (context.token.isBreak) {
            return result;
        }
        const obj = {};
        for (let i = 0; i < result.length; i++) {
            obj[this.operand.children[i].name] = result;
        }
        return obj;
    }
}
exports.ObjProcessEvaluator = ObjProcessEvaluator;
class CallFuncProcessEvaluator extends ProcessEvaluator {
    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/ban-types
    constructor(operand, _function) {
        super(operand);
        this.operand = operand;
        this._function = _function;
    }
    eval(context, step) {
        const result = this.solveChildren(context, step);
        if (context.token.isBreak) {
            return result;
        }
        return this._function(...result);
    }
}
exports.CallFuncProcessEvaluator = CallFuncProcessEvaluator;
class BlockProcessEvaluator extends ProcessEvaluator {
    eval(context, step) {
        const result = this.solveChildren(context, step);
        if (context.token.isBreak) {
            return result;
        }
        if (result.length > 0) {
            return result[result.length - 1];
        }
        return null;
    }
}
exports.BlockProcessEvaluator = BlockProcessEvaluator;
class IfProcessEvaluator extends ProcessEvaluator {
    eval(context, step) {
        if (step.values.length === 0) {
            const condition = this.operand.children[0].eval(context);
            if (context.token.isBreak) {
                return condition;
            }
            step.values.push(condition);
        }
        if (step.values[0]) {
            // if condition is true evaluate block if
            const value = this.operand.children[1].eval(context);
            if (!context.token.isBreak) {
                step.values.push(value);
            }
            return value;
        }
        else if (this.operand.children.length > 2) {
            // if had else if or else , evaluate them
            let value;
            for (let i = step.values.length - 1; i < this.operand.children.length; i++) {
                if (this.operand.children[i].type === domain_1.OperandType.ElseIf) {
                    const elseIfCondition = this.operand.children[i].children[0].eval(context);
                    if (elseIfCondition) {
                        value = this.operand.children[i].children[1].eval(context);
                    }
                }
                else {
                    // else block
                    value = this.operand.children[i].eval(context);
                }
                if (context.token.isBreak) {
                    return value;
                }
                step.values.push(value);
            }
            return value;
        }
    }
}
exports.IfProcessEvaluator = IfProcessEvaluator;
class WhileProcessEvaluator extends ProcessEvaluator {
    eval(context, step) {
        const condition = this.operand.children[0];
        const block = this.operand.children[1];
        let blockResult = null;
        // evaluate condition
        if (step.values.length === 0) {
            const conditionResult = condition.eval(context);
            if (context.token.isBreak) {
                return conditionResult;
            }
            step.values.push(conditionResult);
        }
        while (step.values[0]) {
            // evaluate condition
            if (step.values.length === 1) {
                blockResult = block.eval(context);
                if (context.token.isBreak) {
                    return blockResult;
                }
                step.values.push(blockResult);
            }
            // clear values for next evaluations
            step.values = [];
            // evaluate condition
            const conditionResult = condition.eval(context);
            if (context.token.isBreak) {
                return conditionResult;
            }
            step.values.push(conditionResult);
        }
        return blockResult;
    }
}
exports.WhileProcessEvaluator = WhileProcessEvaluator;
class ForProcessEvaluator extends ProcessEvaluator {
    eval(context, step) {
        let lastValue = null;
        const initialize = this.operand.children[0];
        const condition = this.operand.children[1];
        const increment = this.operand.children[2];
        const block = this.operand.children[3];
        // evaluate initialize
        if (step.values.length === 0) {
            const initializeResult = initialize.eval(context);
            if (context.token.isBreak) {
                return initializeResult;
            }
            step.values.push(initializeResult);
        }
        // evaluate condition
        if (step.values.length === 1) {
            const conditionResult = condition.eval(context);
            if (context.token.isBreak) {
                return conditionResult;
            }
            step.values.push(conditionResult);
        }
        while (step.values[1]) {
            // evaluate block
            if (step.values.length === 2) {
                lastValue = block.eval(context);
                if (context.token.isBreak) {
                    return lastValue;
                }
                step.values.push(lastValue);
            }
            // evaluate increment
            if (step.values.length === 3) {
                const incrementResult = increment.eval(context);
                if (context.token.isBreak) {
                    return incrementResult;
                }
                step.values.push(incrementResult);
            }
            // clear values for next evaluations
            step.values = [step.values[0]];
            // evaluate condition
            const conditionResult = condition.eval(context);
            if (context.token.isBreak) {
                return conditionResult;
            }
            step.values.push(conditionResult);
        }
        return lastValue;
    }
}
exports.ForProcessEvaluator = ForProcessEvaluator;
class ForInProcessEvaluator extends ProcessEvaluator {
    eval(context, step) {
        let lastValue = null;
        const item = this.operand.children[0];
        const list = this.operand.children[1];
        const block = this.operand.children[2];
        let listResult = [];
        // evaluate list
        if (step.values.length === 0) {
            listResult = list.eval(context);
            if (context.token.isBreak) {
                return listResult;
            }
            step.values.push(listResult);
        }
        for (let i = step.values.length - 1; i < listResult.length; i++) {
            const value = listResult[i];
            if (context) {
                context.data.set(item.name, value);
            }
            lastValue = block.eval(context);
            if (context.token.isBreak) {
                return lastValue;
            }
            step.values.push(lastValue);
        }
        return lastValue;
    }
}
exports.ForInProcessEvaluator = ForInProcessEvaluator;
class SwitchProcessEvaluator extends ProcessEvaluator {
    eval(context, step) {
        // evaluate
        let value;
        if (step.values.length === 0) {
            value = this.operand.children[0].eval(context);
            if (context.token.isBreak) {
                return value;
            }
            step.values.push(value);
        }
        else {
            value = step.values[0];
        }
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
exports.SwitchProcessEvaluator = SwitchProcessEvaluator;
class FuncProcessEvaluator extends ProcessEvaluator {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.FuncProcessEvaluator = FuncProcessEvaluator;
class TryProcessEvaluator extends domain_1.Evaluator {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.TryProcessEvaluator = TryProcessEvaluator;
class CatchProcessEvaluator extends domain_1.Evaluator {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.CatchProcessEvaluator = CatchProcessEvaluator;
class ThrowProcessEvaluator extends domain_1.Evaluator {
    eval() {
        throw new Error('NotImplemented');
    }
}
exports.ThrowProcessEvaluator = ThrowProcessEvaluator;
//# sourceMappingURL=evaluators.js.map