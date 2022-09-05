"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandManager = void 0;
const model_1 = require("../model");
const operands_1 = require("./operands");
class OperandManager {
    constructor(expressionConfig) {
        this.expressionConfig = expressionConfig;
    }
    build(node) {
        const operand = this.nodeToOperand(node);
        const reduced = this.reduce(operand);
        return this.setParent(reduced);
    }
    clone(value) {
        return this.deserialize(this.serialize(value));
    }
    serialize(operand) {
        return JSON.stringify(this._serialize(operand));
    }
    _serialize(operand) {
        const children = [];
        for (const k in operand.children) {
            children.push(this._serialize(operand.children[k]));
        }
        if (operand instanceof operands_1.KeyValue) {
            return { name: operand.name, classType: operand.constructor.name, children: children, type: operand.type, property: operand.property };
        }
        else if (operand instanceof operands_1.Variable) {
            return { name: operand.name, classType: operand.constructor.name, children: children, type: operand.type, number: operand.number };
        }
        else {
            return { name: operand.name, classType: operand.constructor.name, children: children, type: operand.type };
        }
    }
    deserialize(value) {
        return (this._deserialize(JSON.parse(value)));
    }
    _deserialize(value) {
        const children = [];
        if (value.children) {
            for (const k in value.children) {
                children.push(this._deserialize(value.children[k]));
            }
        }
        switch (value.classType) {
            case 'ArrowFunction':
                return new operands_1.ArrowFunction(value.name, children);
            case 'ChildFunction':
                return new operands_1.ChildFunction(value.name, children);
            case 'FunctionRef':
                return new operands_1.FunctionRef(value.name, children);
            case 'Operator':
                return new operands_1.Operator(value.name, children);
            case 'List':
                return new operands_1.List(value.name, children);
            case 'Obj':
                return new operands_1.Obj(value.name, children);
            case 'KeyValue':
                // eslint-disable-next-line no-case-declarations
                const keyValue = new operands_1.KeyValue(value.name, children, value.type);
                keyValue.property = value.property;
                return keyValue;
            case 'Property':
                return new operands_1.Property(value.name, children, value.type);
            case 'Block':
                return new operands_1.Block(value.name, children, value.type);
            case 'If':
                return new operands_1.If(value.name, children, value.type);
            case 'ElseIf':
                return new operands_1.ElseIf(value.name, children, value.type);
            case 'Else':
                return new operands_1.Else(value.name, children, value.type);
            case 'While':
                return new operands_1.While(value.name, children, value.type);
            case 'For':
                return new operands_1.For(value.name, children, value.type);
            case 'ForIn':
                return new operands_1.ForIn(value.name, children, value.type);
            case 'Switch':
                return new operands_1.Switch(value.name, children, value.type);
            case 'Break':
                return new operands_1.Break(value.name, children, value.type);
            case 'Continue':
                return new operands_1.Continue(value.name, children, value.type);
            case 'Function':
                return new operands_1.Function(value.name, children, value.type);
            case 'Return':
                return new operands_1.Return(value.name, children, value.type);
            case 'Try':
                return new operands_1.Try(value.name, children, value.type);
            case 'Catch':
                return new operands_1.Catch(value.name, children, value.type);
            case 'Throw':
                return new operands_1.Throw(value.name, children, value.type);
            case 'Case':
                return new operands_1.Case(value.name, children, value.type);
            case 'Default':
                return new operands_1.Default(value.name, children, value.type);
            case 'Template':
                return new operands_1.Template(value.name, value.type);
            case 'Constant':
                return new operands_1.Constant(value.name);
            case 'Variable':
                // eslint-disable-next-line no-case-declarations
                const variable = new operands_1.Variable(value.name, value.type);
                variable.number = value.number;
                return variable;
            default:
                throw new Error(`Deserialize ${value.classType} not implemented`);
        }
    }
    eval(operand, data) {
        this.initialize(operand, data);
        return operand.eval();
    }
    parameters(operand) {
        const parameters = [];
        this.loadParameters(operand, parameters);
        return parameters;
    }
    loadParameters(operand, parameters) {
        if (operand instanceof operands_1.Variable) {
            if (parameters.find(p => p.name === operand.name) === undefined) {
                let type;
                if (operand.type === '')
                    type = 'any';
                else if (operand.type === 'T[]')
                    type = 'array';
                else
                    type = operand.type;
                parameters.push({ name: operand.name, type: type });
            }
        }
        for (let i = 0; i < operand.children.length; i++) {
            this.loadParameters(operand.children[i], parameters);
        }
    }
    initialize(operand, data) {
        let current = data;
        if (operand instanceof operands_1.ArrowFunction) {
            const childData = current.newData();
            operand.data = childData;
            operand.metadata = this.expressionConfig;
            current = childData;
        }
        else if (operand instanceof operands_1.ChildFunction) {
            const childData = current.newData();
            operand.data = childData;
            operand.metadata = this.expressionConfig;
            current = childData;
        }
        else if (operand instanceof operands_1.FunctionRef) {
            operand.metadata = this.expressionConfig;
        }
        else if (operand instanceof operands_1.Operator) {
            operand.metadata = this.expressionConfig;
        }
        else if (operand instanceof operands_1.Variable || operand instanceof operands_1.Template) {
            operand.data = current;
        }
        for (const k in operand.children) {
            const p = operand.children[k];
            this.initialize(p, current);
        }
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
            const value = this.eval(operand, new model_1.Data({}));
            const constant = new operands_1.Constant(value);
            // constant.parent = operand.parent
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
    setParent(operand, index = 0, parent) {
        try {
            if (parent) {
                operand.id = parent.id + '.' + index;
                // operand.parent = parent
                operand.index = index;
                operand.level = parent.level ? parent.level + 1 : 0;
            }
            else {
                operand.id = '0';
                // operand.parent = undefined
                operand.index = 0;
                operand.level = 0;
            }
            for (let i = 0; i < operand.children.length; i++) {
                const p = operand.children[i];
                this.setParent(p, i, operand);
            }
            return operand;
        }
        catch (error) {
            throw new Error('set parent: ' + operand.name + ' error: ' + error.toString());
        }
    }
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
                return new operands_1.KeyValue(node.name, children);
            case 'array':
                return new operands_1.List(node.name, children);
            case 'obj':
                return new operands_1.Obj(node.name, children);
            case 'operator':
                return new operands_1.Operator(node.name, children);
            case 'funcRef':
                return new operands_1.FunctionRef(node.name, children);
            case 'arrow':
                return new operands_1.ArrowFunction(node.name, children);
            case 'childFunc':
                return new operands_1.ChildFunction(node.name, children);
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
    // TODO: determinar el tipo de la variable de acuerdo a la expression.
    // si se usa en un operador con que se esta comparando.
    // si se usa en una función que tipo corresponde de acuerdo en la posición que esta ocupando.
    // let type = this.solveType(operand,childNumber)
    solveTypes(operand) {
        if (operand instanceof operands_1.Constant || operand instanceof operands_1.Variable)
            return operand.type;
        if (!(operand instanceof operands_1.ArrowFunction || operand instanceof operands_1.ChildFunction) && (operand instanceof operands_1.Operator || operand instanceof operands_1.FunctionRef)) {
            let tType = 'any';
            // get metadata of operand
            const metadata = operand instanceof operands_1.Operator
                ? this.expressionConfig.getOperator(operand.name, operand.children.length)
                : this.expressionConfig.getFunction(operand.name);
            // recorre todos los parámetros
            for (let i = 0; i < metadata.params.length; i++) {
                const param = metadata.params[i];
                const child = operand.children[i];
                if (param.type !== 'T' && param.type !== 'any' && child.type === 'any') {
                    // en el caso que el parámetro tenga un tipo definido y el hijo no, asigna al hijo el tipo del parámetro
                    child.type = param.type;
                }
                else if (param.type === 'T' && child.type !== 'any') {
                    // en el caso que el parámetro sea T y el hijo tiene un tipo definido, determina que T es el tipo de hijo
                    tType = child.type;
                }
                else if (param.type === 'T' && child.type === 'any') {
                    // en el caso que el parámetro sea T y el hijo no tiene un tipo definido, intenta resolver el hijo
                    // en caso de lograrlo determina que T es el tipo de hijo
                    const childType = this.solveTypes(child);
                    if (childType !== 'any') {
                        tType = childType;
                        break;
                    }
                }
            }
            // en el caso que se haya podido resolver T
            if (tType !== 'any') {
                // en el caso que el operando sea T asigna el tipo correspondiente al operando
                if (metadata.return === 'T' && operand.type === 'any') {
                    operand.type = tType;
                }
                // busca los parámetros que sea T y los hijos aun no fueron definidos para asignarle el tipo correspondiente
                for (let i = 0; i < metadata.params.length; i++) {
                    const param = metadata.params[i];
                    const child = operand.children[i];
                    if (param.type === 'T' && child.type === 'any') {
                        child.type = tType;
                    }
                }
            }
        }
        // recorre todos los hijos para resolver el tipo
        for (let i = 0; i < operand.children.length; i++) {
            this.solveTypes(operand.children[i]);
        }
        return operand.type;
    }
    getMainData(operand) {
        if (operand.data === undefined) {
            return new model_1.Data({});
        }
        let main = operand.data;
        let parent = operand.data.parent;
        while (parent !== undefined) {
            main = parent;
            parent = parent.parent;
        }
        return main;
    }
}
exports.OperandManager = OperandManager;
//# sourceMappingURL=operandManager.js.map