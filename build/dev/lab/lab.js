"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
(async () => {
    // const list = [
    // 'Product { name supplier { name contact phone } }',
    // 'Product(id:1){ name supplier { name contact phone } }'
    // ]
    // for (const p of list) {
    // const result = exp.graphqlToExpression(p)
    // console.log(`${p} => ${result}`)
    // }
    const data = { a: [1, 2, 3], b: 0 };
    lib_1.expressions.eval('a.foreach(p=>b=b+p)', data);
    console.log(data.b);
})();
//# sourceMappingURL=lab.js.map