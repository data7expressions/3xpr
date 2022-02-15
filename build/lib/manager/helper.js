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
exports.Helper = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Helper {
    static replace(string, search, replace) {
        return string.split(search).join(replace);
        // con la siguiente opcion falla cuando se hace value=Helper.replace(value,"\\'","\\''")
        // return string.replace(new RegExp(search, 'g'), replace)
    }
    static getType(value) {
        if (Array.isArray(value))
            return 'array';
        if (typeof value === 'string') {
            // TODO determinar si es fecha.
            return 'string';
        }
        return typeof value;
    }
    static isObject(obj) {
        return obj && typeof obj === 'object' && obj.constructor === Object;
    }
    static isEmpty(value) {
        return value === null || value === undefined || value.toString().trim().length === 0;
    }
    static nvl(value, _default) {
        return !this.isEmpty(value) ? value : _default;
    }
    static tryParse(value) {
        try {
            return JSON.parse(value);
        }
        catch (_a) {
            return null;
        }
    }
    static exec(command, cwd = process.cwd()) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                (0, child_process_1.exec)(command, { cwd: cwd }, (error, stdout, stderr) => {
                    if (stdout)
                        return resolve(stdout);
                    if (stderr)
                        return resolve(stderr);
                    if (error)
                        return reject(error);
                    return resolve('');
                });
            });
        });
    }
    static existsPath(fullPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                fs_1.default.access(fullPath, (err) => {
                    if (err) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        });
    }
    static createIfNotExists(fullPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield Helper.existsPath(fullPath)) {
                return;
            }
            return new Promise((resolve, reject) => {
                fs_1.default.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve());
            });
        });
    }
    static readFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield Helper.existsPath(filePath))) {
                return null;
            }
            return new Promise((resolve, reject) => {
                fs_1.default.readFile(filePath, (err, data) => err ? reject(err) : resolve(data.toString('utf8')));
            });
        });
    }
    static removeFile(fullPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield Helper.existsPath(fullPath))) {
                return;
            }
            return new Promise((resolve, reject) => {
                fs_1.default.unlink(fullPath, err => err ? reject(err) : resolve());
            });
        });
    }
    static copyFile(src, dest) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield Helper.existsPath(src))) {
                throw new Error(`not exists ${src}`);
            }
            return new Promise((resolve, reject) => {
                fs_1.default.copyFile(src, dest, err => err ? reject(err) : resolve());
            });
        });
    }
    static writeFile(filePath, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const dir = path_1.default.dirname(filePath);
            if (!(yield Helper.existsPath(dir))) {
                yield Helper.mkdir(dir);
            }
            return new Promise((resolve, reject) => {
                fs_1.default.writeFile(filePath, content, { encoding: 'utf8' }, err => err ? reject(err) : resolve());
            });
        });
    }
    static mkdir(fullPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs_1.default.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve());
            });
        });
    }
    static lstat(fullPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs_1.default.lstat(fullPath, (err, stats) => err ? reject(err) : resolve(stats));
            });
        });
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map