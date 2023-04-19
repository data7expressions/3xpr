"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandSerializer = void 0;
const domain_1 = require("../../domain");
const typ3s_1 = require("typ3s");
class OperandSerializer {
    clone(sentence) {
        const serialized = this.serialize(sentence);
        const deserialized = this.deserialize(serialized);
        return deserialized;
    }
    serialize(sentence) {
        return JSON.stringify(this._serialize(sentence));
    }
    deserialize(value) {
        return (this._deserialize(JSON.parse(value)));
    }
    _serialize(operand) {
        const children = [];
        for (const child of operand.children) {
            children.push(this._serialize(child));
        }
        return { pos: operand.pos, name: operand.name, children, number: operand.number, type: operand.type, returnType: typ3s_1.Type.stringify(operand.returnType) };
    }
    _deserialize(metadata) {
        const children = [];
        if (metadata.children) {
            for (const child of metadata.children) {
                const deserialized = this._deserialize(child);
                children.push(deserialized);
            }
        }
        // eslint-disable-next-line no-case-declarations
        const operand = new domain_1.Operand(metadata.pos, metadata.name, domain_1.OperandType[metadata.type], children, typ3s_1.Type.to(metadata.returnType));
        operand.number = metadata.number;
        return operand;
    }
}
exports.OperandSerializer = OperandSerializer;
//# sourceMappingURL=serializer.js.map