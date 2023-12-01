"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
(async () => {
    lib_1.expressions.addFunction('orm.execute(expression:string):any', (expression) => {
        return lib_1.expressions.eval(expression);
    });
    const result = lib_1.expressions.eval('orm.execute("1+1")');
    console.log(result);
})();
//# sourceMappingURL=lab.js.map