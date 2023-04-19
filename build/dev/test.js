"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperTest = exports.templateType = exports.templateParameter = exports.template = void 0;
/* eslint-disable no-template-curly-in-string */
const lib_1 = require("../lib");
exports.template = {
    template: '/* eslint-disable no-template-curly-in-string */\nimport { expressions as exp } from \'../../../lib\'\ndescribe(\'${name}\', () => {\n\tconst context = JSON.parse(\'${context}\')\n${cases}})\n',
    cases: [{
            name: 'lab',
            template: '\t\texpect(exp.eval(${test}, context)).toStrictEqual(${result})\n'
        }]
};
exports.templateParameter = {
    template: '/* eslint-disable no-template-curly-in-string */\nimport { expressions as exp } from \'../../../lib\'\ndescribe(\'${name}\', () => {\n\tconst context = JSON.parse(\'${context}\')\n${cases}})\n',
    cases: [{
            name: 'lab',
            template: '\t\texpect(exp.parameters(${test})).toStrictEqual(${result})\n'
        }]
};
exports.templateType = {
    template: '/* eslint-disable no-template-curly-in-string */\nimport { expressions as exp } from \'../../../lib\'\ndescribe(\'${name}\', () => {\n\tconst context = JSON.parse(\'${context}\')\n${cases}})\n',
    cases: [{
            name: 'lab',
            template: '\t\texpect(exp.type(${test})).toStrictEqual(${result})\n'
        }]
};
class HelperTest {
    static async buildSuite(request) {
        const func = request.func || ((expression, context) => lib_1.expressions.eval(expression, context));
        const context = request.context || {};
        const suite = { name: request.name, method: request.method || 'eval', context, cases: [] };
        for (const expression of request.expressions) {
            try {
                const result = func(expression, context);
                suite.cases.push({ expression, result });
            }
            catch (error) {
                console.log(error.stack);
                console.log(`exp: ${expression} error: ${error}`);
            }
        }
        await lib_1.helper.fs.write(`./src/dev/tests/${request.name}.json`, JSON.stringify(suite, null, 2));
    }
    static show(list, context, method = 'eval', func = (expression, context) => lib_1.expressions.eval(expression, context)) {
        const tests = [];
        const examples = [];
        for (const expression of list) {
            try {
                const result = func(expression, context);
                let expect;
                let testCompare = 'toBe';
                if (typeof result === 'string') {
                    expect = `'${result}'`;
                }
                else if (Array.isArray(result)) {
                    testCompare = 'toStrictEqual';
                    if (result.length === 0) {
                        expect = '[]';
                    }
                    else {
                        if (typeof result[0] === 'string') {
                            expect = '[' + result.map(p => `'${p}'`).join(',') + ']';
                        }
                        else if (typeof result[0] === 'object') {
                            expect = JSON.stringify(result);
                        }
                        else {
                            expect = '[' + result.join(',') + ']';
                        }
                    }
                }
                else if (typeof result === 'object') {
                    expect = JSON.stringify(result);
                }
                else if (result === null) {
                    expect = 'null';
                }
                else if (result === undefined) {
                    expect = 'undefined';
                }
                else {
                    expect = result;
                }
                if (expression.includes('\n')) {
                    tests.push(`expect(${expect}).${testCompare}(expressions.${method}(\`${expression}\`${method === 'eval' ? ', context' : ''}))`);
                    examples.push(`|\`${expression}\`|${expect}|`);
                }
                else {
                    tests.push(`expect(${expect}).${testCompare}(expressions.${method}('${expression}'${method === 'eval' ? ', context' : ''}))`);
                    examples.push(`|${expression}|${expect}|`);
                }
            }
            catch (error) {
                console.log(error.stack);
                console.log(`exp: ${expression} error: ${error}`);
            }
        }
        console.log(examples.join('\n'));
        console.log(tests.join('\n'));
    }
    static async test(expression, file) {
        try {
            const content = await lib_1.helper.fs.read(file);
            if (!content) {
                throw Error(`can not read file ${file}`);
            }
            const data = lib_1.helper.utils.tryParse(content);
            if (data === null || data === undefined) {
                throw Error(`can not parse content of ${file}`);
            }
            const result = lib_1.expressions.eval(expression, { '.': data });
            console.log(JSON.stringify(result, null, 2));
        }
        catch (error) {
            console.error(error.stack);
        }
    }
}
exports.HelperTest = HelperTest;
//# sourceMappingURL=test.js.map