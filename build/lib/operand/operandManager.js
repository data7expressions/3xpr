"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandManager = void 0;
const model_1 = require("../model");
const operands_1 = require("./operands");
const manager_1 = require("lib/manager");
class OperandManager {
    constructor(expressionConfig, typeManager) {
        this.expressionConfig = expressionConfig;
        this.typeManager = typeManager;
    }
    build(node) {
        const operand = this.nodeToOperand(node);
        const reduced = this.reduce(operand);
        this.typeManager.solve(reduced);
        return reduced;
        // return this.setParent(reduced)
    }
    parameters(operand) {
        const parameters = [];
        if (operand instanceof operands_1.Variable) {
            parameters.push({ name: operand.name, type: manager_1.Helper.type.serialize(operand.type) });
        }
        for (const child of operand.children) {
            const childParameters = this.parameters(child);
            const newParameters = childParameters.filter((p) => !parameters.map((p) => p.name).includes(p.name));
            if (newParameters.length > 0) {
                parameters.push(...newParameters);
            }
        }
        return parameters;
    }
    reduce(operand) {
        if (operand instanceof operands_1.Operator) {
            return this.reduceOperand(operand);
        }
        else if (operand instanceof operands_1.FunctionRef) {
            // Example: .[0].states.filter() where function name is states.filter
            const names = operand.name.split('.');
            const funcName = names[names.length - 1];
            const funcMetadata = this.expressionConfig.getFunction(funcName);
            if (funcMetadata && funcMetadata.deterministic) {
                return this.reduceOperand(operand);
            }
        }
        return operand;
    }
    reduceOperand(operand) {
        let allConstants = true;
        for (const k in operand.children) {
            const p = operand.children[k];
            if (!(p instanceof operands_1.Constant)) {
                allConstants = false;
                break;
            }
        }
        if (allConstants) {
            const value = operand.eval(new model_1.Context());
            const constant = new operands_1.Constant(value);
            constant.index = operand.index;
            return constant;
        }
        else {
            for (let i = 0; i < operand.children.length; i++) {
                const p = operand.children[i];
                operand.children[i] = this.reduce(p);
            }
        }
        return operand;
    }
    // private setParent (operand: Operand, index = 0, parent?: Operand) {
    // try {
    // if (parent) {
    // operand.id = parent.id + '.' + index
    // operand.index = index
    // operand.level = parent.level ? parent.level + 1 : 0
    // } else {
    // operand.id = '0'
    // // operand.parent = undefined
    // operand.index = 0
    // operand.level = 0
    // }
    // for (let i = 0; i < operand.children.length; i++) {
    // const p = operand.children[i]
    // this.setParent(p, i, operand)
    // }
    // return operand
    // } catch (error: any) {
    // throw new Error('set parent: ' + operand.name + ' error: ' + error.toString())
    // }
    // }
    nodeToOperand(node) {
        const children = [];
        if (node.children) {
            for (const i in node.children) {
                const p = node.children[i];
                const child = this.nodeToOperand(p);
                children.push(child);
            }
        }
        const operand = this.createOperand(node, children);
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            // child.parent = operand
            child.index = i;
        }
        return operand;
    }
    createOperand(node, children) {
        switch (node.type) {
            case 'const':
                return new operands_1.Constant(node.name);
            case 'var':
                return new operands_1.Variable(node.name);
            case 'env':
                return new operands_1.EnvironmentVariable(node.name);
            case 'property':
                return new operands_1.Property(node.name, children);
            case 'template':
                return new operands_1.Template(node.name);
            case 'keyVal':
                return new operands_1.KeyValue(node.name, children, node.name);
            case 'array':
                return new operands_1.List(node.name, children);
            case 'obj':
                return new operands_1.Obj(node.name, children);
            case 'operator':
                return new operands_1.Operator(node.name, children, this.expressionConfig);
            case 'funcRef':
                return new operands_1.FunctionRef(node.name, children, this.expressionConfig);
            case 'arrow':
                return new operands_1.ArrowFunction(node.name, children, this.expressionConfig);
            case 'childFunc':
                return new operands_1.ChildFunction(node.name, children, this.expressionConfig);
            case 'block':
                return new operands_1.Block(node.name, children);
            case 'if':
                return new operands_1.If(node.name, children);
            case 'elseIf':
                return new operands_1.ElseIf(node.name, children);
            case 'else':
                return new operands_1.Else(node.name, children);
            case 'while':
                return new operands_1.While(node.name, children);
            case 'for':
                return new operands_1.For(node.name, children);
            case 'forIn':
                return new operands_1.ForIn(node.name, children);
            case 'switch':
                return new operands_1.Switch(node.name, children);
            case 'case':
                return new operands_1.Case(node.name, children);
            case 'default':
                return new operands_1.Default(node.name, children);
            case 'break':
                return new operands_1.Break(node.name, children);
            case 'continue':
                return new operands_1.Continue(node.name, children);
            case 'function':
                return new operands_1.Function(node.name, children);
            case 'return':
                return new operands_1.Return(node.name, children);
            case 'try':
                return new operands_1.Try(node.name, children);
            case 'catch':
                return new operands_1.Catch(node.name, children);
            case 'throw':
                return new operands_1.Throw(node.name, children);
            default:
                throw new Error('node name: ' + node.name + ' type: ' + node.type + ' not supported');
        }
    }
}
exports.OperandManager = OperandManager;
//# sourceMappingURL=operandManager.js.map