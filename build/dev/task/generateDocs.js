"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const helper_1 = require("./../../lib/manager/helper");
const ConfigExtends = require('schema-extends');
function writeFunctions(category, list) {
    return __awaiter(this, void 0, void 0, function* () {
        const lines = [];
        // lines.push(`# ${category} functions\n`)
        lines.push('|Function    |Description                                   |');
        lines.push('|------------|----------------------------------------------|');
        for (const p in list) {
            const item = list[p];
            lines.push(`|${item.name}|${item.desc}|`);
        }
        lines.push('');
        lines.push('## Definition\n');
        for (const p in list) {
            const item = list[p];
            lines.push(`### ${item.name}\n`);
            lines.push(`- description: ${item.desc}`);
            lines.push(`- deterministic: ${item.deterministic}`);
            lines.push(`- return: ${item.return}`);
            lines.push('- params:');
            for (const q in item.params) {
                const param = item.params[q];
                lines.push(`\t- ${param.name}: ${param.type}`);
            }
            lines.push('');
        }
        const content = lines.join('\n');
        const targetFolder = '.github/wiki';
        if (!(yield helper_1.Helper.existsPath(targetFolder))) {
            fs_1.default.mkdirSync(targetFolder, { recursive: true });
        }
        fs_1.default.writeFileSync(path_1.default.join(targetFolder, 'function_' + category.replace(' ', '_') + '.md'), content);
    });
}
function writeOperators(category, list) {
    return __awaiter(this, void 0, void 0, function* () {
        const lines = [];
        // lines.push(`# ${category} operators\n`)
        lines.push('|Operator    |Description                                   |');
        lines.push('|------------|----------------------------------------------|');
        for (const p in list) {
            const item = list[p];
            lines.push(`|${item.op}|${item.name}|`);
        }
        lines.push('');
        lines.push('## Definition\n');
        for (const p in list) {
            const item = list[p];
            lines.push(`### Operator ${item.op}\n`);
            lines.push(`- description: ${item.name}`);
            lines.push(`- return: ${item.return}`);
            lines.push('- params:');
            for (const q in item.params) {
                const param = item.params[q];
                lines.push(`\t- ${param.name}: ${param.type}`);
            }
            lines.push('');
        }
        const content = lines.join('\n');
        const targetFolder = '.github/wiki';
        if (!(yield helper_1.Helper.existsPath(targetFolder))) {
            fs_1.default.mkdirSync(targetFolder, { recursive: true });
        }
        fs_1.default.writeFileSync(path_1.default.join(targetFolder, 'operator_' + category.replace(' ', '_') + '.md'), content);
    });
}
function apply(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = yield ConfigExtends.apply(path_1.default.join('src/dev/schema/model.yaml'));
        const funcCategories = {};
        for (const p in model.functions) {
            const item = model.functions[p];
            item.name = p;
            if (funcCategories[item.category] === undefined) {
                funcCategories[item.category] = { list: [] };
            }
            funcCategories[item.category].list.push(item);
        }
        for (const p in funcCategories) {
            const category = funcCategories[p];
            yield writeFunctions(p, category.list);
        }
        const operCategories = {};
        for (const p in model.operators.unary) {
            const item = model.operators.unary[p];
            item.op = p;
            if (operCategories[item.category] === undefined) {
                operCategories[item.category] = { list: [] };
            }
            operCategories[item.category].list.push(item);
        }
        for (const p in model.operators.binary) {
            const item = model.operators.binary[p];
            item.op = p;
            if (operCategories[item.category] === undefined) {
                operCategories[item.category] = { list: [] };
            }
            operCategories[item.category].list.push(item);
        }
        for (const p in operCategories) {
            const category = operCategories[p];
            yield writeOperators(p, category.list);
        }
        callback();
    });
}
exports.apply = apply;
// apply(function () { console.log('end') })
//# sourceMappingURL=generateDocs.js.map