"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    constructor(name, type, children = []) {
        this.name = name;
        this.type = type;
        this.children = children;
        // this.parent = undefined
        this.index = undefined;
    }
}
exports.Node = Node;
//# sourceMappingURL=node.js.map