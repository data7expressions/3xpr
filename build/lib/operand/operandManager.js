"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandManager = void 0;
const model_1 = require("../model");
const operands_1 = require("./operands");
class OperandManager {
    constructor(metadata, expressionConfig) {
        this.metadata = metadata;
        this.expressionConfig = expressionConfig;
    }
    build(node) {
        try {
            const operand = this.nodeToOperand(node);
            const reduced = this.reduce(operand);
            return this.setParent(reduced);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    serialize(operand) {
        const children = [];
        for (const k in operand.children) {
            children.push(this.serialize(operand.children[k]));
        }
        return { n: operand.name, t: operand.constructor.name, c: children };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deserialize(serialized) {
        throw new Error('NotImplemented');
    }
    eval(operand, data) {
        this.initialize(operand, data);
        return operand.eval();
    }
    initialize(operand, data) {
        let current = data;
        if (operand instanceof operands_1.ArrowFunction) {
            const childData = current.newData();
            operand.data = childData;
            operand.metadata = this.metadata;
            current = childData;
        }
        else if (operand instanceof operands_1.ChildFunction) {
            const childData = current.newData();
            operand.data = childData;
            operand.metadata = this.metadata;
            current = childData;
        }
        else if (operand instanceof operands_1.FunctionRef) {
            operand.metadata = this.metadata;
        }
        else if (operand instanceof operands_1.Operator) {
            operand.metadata = this.metadata;
        }
        else if (operand instanceof operands_1.Variable) {
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
            const funcMetadata = this.metadata.getFunctionMetadata(operand.name);
            if (funcMetadata && funcMetadata.metadata && funcMetadata.metadata.deterministic) {
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
            constant.parent = operand.parent;
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
                operand.parent = parent;
                operand.index = index;
                operand.level = parent.level ? parent.level + 1 : 0;
            }
            else {
                operand.id = '0';
                operand.parent = undefined;
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
            child.parent = operand;
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
            case 'keyVal':
                return new operands_1.KeyValue(node.name, children);
            case 'array':
                return new operands_1.List(node.name, children);
            case 'obj':
                return new operands_1.Obj(node.name, children);
            case 'oper':
                return new operands_1.Operator(node.name, children);
            case 'funcRef':
                return new operands_1.FunctionRef(node.name, children);
            case 'arrow':
                return new operands_1.ArrowFunction(node.name, children);
            case 'childFunc':
                return new operands_1.ChildFunction(node.name, children);
            case 'block':
                return new operands_1.Block(node.name, children);
            default:
                throw new Error('node name: ' + node.name + ' type: ' + node.type + ' not supported');
        }
    }
    // TODO: determinar el tipo de la variable de acuerdo a la expression.
    // si se usa en un operador con que se esta comparando.
    // si se usa en una funcion que tipo corresponde de acuerdo en la posicion que esta ocupando.
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
            // recorre todos los parametros
            for (let i = 0; i < metadata.params.length; i++) {
                const param = metadata.params[i];
                const child = operand.children[i];
                if (param.type !== 'T' && param.type !== 'any' && child.type === 'any') {
                    // en el caso que el pametro tenga un tipo defido y el hijo no, asigna al hijo el tipo del parametro
                    child.type = param.type;
                }
                else if (param.type === 'T' && child.type !== 'any') {
                    // en el caso que el pametro sea T y el hijo tiene un tipo definido, determina que T es el tipo de hijo
                    tType = child.type;
                }
                else if (param.type === 'T' && child.type === 'any') {
                    // en el caso que el pametro sea T y el hijo no tiene un tipo definido, intenta resolver el hijo
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
                // busca los parametros que sea T y los hijos aun no fueron definidos para asignarle el tipo correspondiente
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
}
exports.OperandManager = OperandManager;
//# sourceMappingURL=operandManager.js.map