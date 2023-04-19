"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
(async () => {
    const list = [
        'Product { name supplier { name contact phone } }',
        'Product(id:1){ name supplier { name contact phone } }'
    ];
    for (const p of list) {
        const result = lib_1.expressions.graphqlToExpression(p);
        console.log(`${p} => ${result}`);
    }
})();
//# sourceMappingURL=lab.js.map