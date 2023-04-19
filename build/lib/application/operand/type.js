"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeService = void 0;
// import { Const, Var, Template, Operator, CallFunc, Arrow, List, Obj, Property } from './operands'
const domain_1 = require("../../domain");
const typ3s_1 = require("typ3s");
class TypeService {
    // eslint-disable-next-line no-useless-constructor
    constructor(model) {
        this.model = model;
    }
    // Example
    // {
    // users:[{name:string,age:integer}],
    // tuple: [integer,string]
    // entries:[string,any]
    // }
    // Primitives: integer, decimal, string, boolean, dateTime, date, time
    // array: [<<type>>]
    // object {key:<<type>>}
    // predicate:  c + b < a
    // indeterminate: any
    type(operand) {
        this.solveType(operand);
        this.solveTemplate(operand);
        this.setUndefinedAsAny(operand);
        return operand.returnType || typ3s_1.Type.any;
    }
    solveType(operand) {
        if (operand.type === domain_1.OperandType.Const || operand.type === domain_1.OperandType.Var || operand.type === domain_1.OperandType.Template) {
            return;
        }
        if (operand.type === domain_1.OperandType.List) {
            this.solveArray(operand);
        }
        else if (operand.type === domain_1.OperandType.Obj) {
            this.solveObject(operand);
        }
        else if (operand.type === domain_1.OperandType.Arrow) {
            this.solveArrow(operand);
        }
        else if (operand.type === domain_1.OperandType.Operator || operand.type === domain_1.OperandType.ChildFunc || operand.type === domain_1.OperandType.CallFunc) {
            this.solveOperator(operand);
        }
        else if (operand.type === domain_1.OperandType.Property) {
            this.solveProperty(operand);
        }
        else {
            throw new Error(`${operand.type} ${operand.name}  not supported`);
        }
    }
    solveTemplate(operand) {
        if (operand.type === domain_1.OperandType.Const || operand.type === domain_1.OperandType.Var || operand.type === domain_1.OperandType.Template) {
            return;
        }
        if (operand.type === domain_1.OperandType.List) {
            this.solveTemplateArray(operand);
        }
        else if (operand.type === domain_1.OperandType.Obj) {
            this.solveTemplateObject(operand);
        }
        else if (operand.type === domain_1.OperandType.Operator || operand.type === domain_1.OperandType.Arrow || operand.type === domain_1.OperandType.ChildFunc || operand.type === domain_1.OperandType.CallFunc) {
            const metadata = this.metadata(operand);
            if (this.hadTemplate(metadata) && this.undefinedTypes(operand)) {
                this.solveTemplateOperator(operand, metadata);
            }
            for (const child of operand.children) {
                this.solveTemplate(child);
            }
        }
        else if (operand.type === domain_1.OperandType.Property) {
            this.solveTemplateProperty(operand);
        }
        else {
            throw new Error(`${operand.type} ${operand.name} not supported`);
        }
    }
    setUndefinedAsAny(operand) {
        if (operand.returnType === undefined) {
            operand.returnType = typ3s_1.Type.any;
        }
        for (const child of operand.children) {
            this.setUndefinedAsAny(child);
        }
    }
    solveObject(obj) {
        const properties = [];
        for (const keyVal of obj.children) {
            this.solveType(keyVal.children[0]);
            keyVal.returnType = keyVal.children[0].returnType;
            properties.push({ name: keyVal.name, type: keyVal.children[0].returnType });
        }
        obj.returnType = typ3s_1.Type.Obj(properties);
    }
    solveProperty(property) {
        this.solveType(property.children[0]);
        if (property.children[0].returnType === undefined) {
            property.children[0].returnType = typ3s_1.Type.List(typ3s_1.Type.Obj([{ name: property.name }]));
        }
        else if (typ3s_1.Type.isList(property.children[0].returnType)) {
            const listType = property.children[0].returnType.list;
            if (listType.items && typ3s_1.Type.isObj(listType.items)) {
                const objectType = listType.items.obj;
                const propertyType = objectType.properties.find(p => p.name === property.name);
                if (propertyType && propertyType.type) {
                    property.returnType = propertyType.type;
                }
            }
        }
    }
    solveArray(array) {
        this.solveType(array.children[0]);
        // si se resolvió el tipo del elemento, el tipo del array sera [<<TYPE>>]
        if (array.children[0].returnType !== undefined) {
            array.returnType = typ3s_1.Type.List(array.children[0].returnType);
        }
    }
    solveArrow(arrow) {
        const metadata = this.model.getFunction(arrow.name);
        const array = arrow.children[0];
        const variable = arrow.children.length > 1 ? arrow.children[1] : undefined;
        const predicate = arrow.children.length > 2 ? arrow.children[2] : undefined;
        this.solveArray(array);
        const elementType = this.getElementType(array);
        if (elementType && array.returnType && variable) {
            variable.returnType = elementType;
            if (predicate) {
                this.setVariableType(variable.name, elementType, predicate);
            }
        }
        if (!this.isIndeterminateType(metadata.returnType)) {
            // TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
            arrow.returnType = typ3s_1.Type.to(metadata.returnType);
        }
        if (array.returnType === undefined && metadata.params[0].type && !this.isIndeterminateType(metadata.params[0].type)) {
            // TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
            array.returnType = typ3s_1.Type.to(metadata.params[0].type);
        }
        if (predicate && metadata.params[1].type && !this.isIndeterminateType(metadata.params[1].type)) {
            // TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
            predicate.returnType = typ3s_1.Type.to(metadata.params[1].type);
        }
        if (predicate) {
            this.solveType(predicate);
        }
        if (this.hadTemplate(metadata)) {
            this.solveTemplateOperator(arrow, metadata);
        }
    }
    solveOperator(operator) {
        const metadata = this.metadata(operator);
        // intenta resolver el return type por metadata
        if (!this.isIndeterminateType(metadata.returnType)) {
            const returnType = this.trySolveFromMetadata(metadata.returnType);
            if (returnType) {
                operator.returnType = returnType;
            }
        }
        // tries to resolve the types of the operands
        for (let i = 0; i < metadata.params.length; i++) {
            const paramInfo = metadata.params[i];
            const operand = operator.children[i];
            if (operand === undefined) {
                break;
            }
            if (this.isIndeterminateType(paramInfo.type)) {
                continue;
            }
            // intenta resolver el tipo del operand por metadata
            const paramType = this.trySolveFromMetadata(paramInfo.type);
            if (paramType) {
                operand.returnType = paramType;
            }
        }
        for (const child of operator.children) {
            this.solveType(child);
        }
        if (this.hadTemplate(metadata)) {
            this.solveTemplateOperator(operator, metadata);
        }
    }
    trySolveFromMetadata(type) {
        // si de acuerdo a la metadata el tipo es primitivo, asigna el tipo
        if (type === undefined) {
            return undefined;
        }
        if (typ3s_1.Type.isPrimitive(type)) {
            return typ3s_1.Type.to(type);
        }
        // si de acuerdo a la metadata el tipo es un array de primitivo, asigna el tipo, example: string[]
        if (type.endsWith('[]')) {
            const elementType = type.substring(0, type.length - 2);
            if (typ3s_1.Type.isPrimitive(elementType)) {
                return typ3s_1.Type.List(typ3s_1.Type.get(elementType));
            }
        }
        return undefined;
    }
    solveTemplateArray(array) {
        const beforeType = array.children[0].returnType;
        this.solveTemplate(array.children[0]);
        if (array.children[0].returnType && array.children[0].returnType !== beforeType) {
            array.returnType = typ3s_1.Type.List(array.children[0].returnType);
        }
    }
    solveTemplateProperty(property) {
        const beforeType = property.children[0].returnType;
        this.solveTemplate(property.children[0]);
        if (property.children[0].returnType !== undefined && property.children[0].returnType !== beforeType && typ3s_1.Type.isList(property.children[0].returnType)) {
            const arrayType = property.children[0].returnType.list;
            if (typ3s_1.Type.isObj(arrayType.items)) {
                const objectType = arrayType.items.obj;
                const propertyType = objectType.properties.find(p => p.name === property.name);
                if (propertyType && propertyType.type) {
                    property.returnType = propertyType.type;
                }
            }
        }
    }
    solveTemplateObject(obj) {
        let changed = false;
        for (const child of obj.children) {
            const value = child.children[0];
            const beforeType = value.returnType;
            this.solveTemplate(value);
            if (value.returnType !== beforeType) {
                changed = true;
            }
        }
        if (changed) {
            const properties = [];
            for (const child of obj.children) {
                properties.push({ name: child.name, type: child.children[0].returnType });
            }
            obj.returnType = typ3s_1.Type.Obj(properties);
        }
    }
    solveTemplateOperator(operator, metadata) {
        let templateType;
        // intenta resolver T por return
        if (operator.returnType) {
            if (metadata.returnType === 'T') {
                templateType = operator.returnType;
            }
            else if (metadata.returnType === 'T[]' && typ3s_1.Type.isList(operator.returnType)) {
                templateType = operator.returnType.list.items;
            }
        }
        // intenta resolver T por alguno de los parámetros
        if (templateType === undefined) {
            for (let i = 0; i < metadata.params.length; i++) {
                const paramMetadata = metadata.params[i];
                if (paramMetadata.type !== 'T' && paramMetadata.type !== 'T[]') {
                    continue;
                }
                const child = operator.children[i];
                if (child === undefined) {
                    break;
                }
                if (child.returnType) {
                    if (paramMetadata.type === 'T') {
                        templateType = child.returnType;
                        break;
                    }
                    else if (paramMetadata.type === 'T[]' && typ3s_1.Type.isList(child.returnType)) {
                        templateType = child.returnType.list.items;
                        break;
                    }
                }
            }
        }
        // si pudo resolver el T, resuelve donde se utiliza
        if (templateType !== undefined) {
            if (operator.returnType === undefined) {
                if (metadata.returnType === 'T') {
                    operator.returnType = templateType;
                }
                else if (metadata.returnType === 'T[]') {
                    operator.returnType = typ3s_1.Type.List(templateType);
                }
            }
            for (let i = 0; i < metadata.params.length; i++) {
                const paramMetadata = metadata.params[i];
                if (paramMetadata.type !== 'T' && paramMetadata.type !== 'T[]') {
                    continue;
                }
                const child = operator.children[i];
                if (child === undefined) {
                    break;
                }
                if (child.returnType === undefined) {
                    if (paramMetadata.type === 'T') {
                        child.returnType = templateType;
                    }
                    else if (paramMetadata.type === 'T[]') {
                        child.returnType = typ3s_1.Type.List(templateType);
                    }
                }
            }
        }
    }
    getElementType(array) {
        return array.returnType ? array.returnType.list.items : undefined;
    }
    setVariableType(name, type, operand) {
        if (operand.type === domain_1.OperandType.Var && operand.name === name) {
            operand.returnType = type;
        }
        for (const child of operand.children) {
            // es por si se da el caso  xxx.filter( p=> p.filter( p => p + 1 ) )
            if (!(child.type === domain_1.OperandType.Arrow && child.children[1].name === name)) {
                this.setVariableType(name, type, child);
            }
        }
    }
    isIndeterminateType(type) {
        if (type === undefined) {
            return true;
        }
        return ['T', 'T[]', 'any', 'any[]'].includes(type);
    }
    hadTemplate(metadata) {
        return metadata.returnType === 'T' || metadata.returnType === 'T[]' || metadata.params.find(p => p.type === 'T' || p.type === 'T[]') !== undefined;
    }
    undefinedTypes(operator) {
        return operator.returnType === undefined || operator.children.find(p => p.returnType === undefined) !== undefined;
    }
    /**
     * get metadata of operand
     * @param operator
     * @returns
     */
    metadata(operator) {
        return operator.type === domain_1.OperandType.Operator
            ? this.model.getOperator(operator.name, operator.children.length)
            : this.model.getFunction(operator.name);
    }
}
exports.TypeService = TypeService;
//# sourceMappingURL=type.js.map