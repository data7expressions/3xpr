"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const h3lp_1 = require("h3lp");
const path_1 = __importDefault(require("path"));
const template = {
    header: `/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../'
`,
    cases: [{
            name: 'lab',
            template: '\t\texpect(exp.eval(${test}, context)).toStrictEqual(${result})\n'
        }]
};
const templateParameter = {
    header: `/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'
`,
    cases: [{
            name: 'lab',
            template: '\t\texpect(exp.parameters(${test})).toStrictEqual(${result})\n'
        }]
};
const templateType = {
    header: `/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'
`,
    cases: [{
            name: 'lab',
            template: '\t\texpect(exp.type(${test})).toStrictEqual(${result})\n'
        }]
};
(async () => {
    const root = '~/develop/expressions/expressions-test-suite/tests/v1';
    await h3lp_1.h3lp.test
        .createBuilder()
        .add({ source: path_1.default.join(root, 'access.json'), template })
        .add({ source: path_1.default.join(root, 'arithmetic.json'), template })
        .add({ source: path_1.default.join(root, 'array.json'), template })
        .add({ source: path_1.default.join(root, 'arrow.json'), template })
        .add({ source: path_1.default.join(root, 'assignment.json'), template })
        .add({ source: path_1.default.join(root, 'bitwise.json'), template })
        .add({ source: path_1.default.join(root, 'comparison.json'), template })
        .add({ source: path_1.default.join(root, 'constants.json'), template })
        .add({ source: path_1.default.join(root, 'conversion.json'), template })
        .add({ source: path_1.default.join(root, 'dateTime.json'), template })
        .add({ source: path_1.default.join(root, 'flows.json'), template })
        .add({ source: path_1.default.join(root, 'groups.json'), template })
        .add({ source: path_1.default.join(root, 'groups.json'), template })
        .add({ source: path_1.default.join(root, 'nullable.json'), template })
        .add({ source: path_1.default.join(root, 'numeric.json'), template })
        .add({ source: path_1.default.join(root, 'parameters.json'), template: templateParameter })
        .add({ source: path_1.default.join(root, 'quick.json'), template })
        .add({ source: path_1.default.join(root, 'sets.json'), template })
        .add({ source: path_1.default.join(root, 'string.json'), template })
        .add({ source: path_1.default.join(root, 'type.json'), template: templateType })
        .build('./src/lib/__tests__/auto');
})();
//# sourceMappingURL=buildTest.js.map