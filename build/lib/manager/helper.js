"use strict";
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
        // con la siguiente opción falla cuando se hace value=Helper.replace(value,"\\'","\\''")
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
    static async exec(command, cwd = process.cwd()) {
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
    }
    static async existsPath(fullPath) {
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
    }
    static async createIfNotExists(fullPath) {
        if (await Helper.existsPath(fullPath)) {
            return;
        }
        return new Promise((resolve, reject) => {
            fs_1.default.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve());
        });
    }
    static async readFile(filePath) {
        if (!await Helper.existsPath(filePath)) {
            return null;
        }
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(filePath, (err, data) => err ? reject(err) : resolve(data.toString('utf8')));
        });
    }
    static async removeFile(fullPath) {
        if (!await Helper.existsPath(fullPath)) {
            return;
        }
        return new Promise((resolve, reject) => {
            fs_1.default.unlink(fullPath, err => err ? reject(err) : resolve());
        });
    }
    static async copyFile(src, dest) {
        if (!await Helper.existsPath(src)) {
            throw new Error(`not exists ${src}`);
        }
        return new Promise((resolve, reject) => {
            fs_1.default.copyFile(src, dest, err => err ? reject(err) : resolve());
        });
    }
    static async writeFile(filePath, content) {
        const dir = path_1.default.dirname(filePath);
        if (!await Helper.existsPath(dir)) {
            await Helper.mkdir(dir);
        }
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(filePath, content, { encoding: 'utf8' }, err => err ? reject(err) : resolve());
        });
    }
    static async mkdir(fullPath) {
        return new Promise((resolve, reject) => {
            fs_1.default.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve());
        });
    }
    static async lstat(fullPath) {
        return new Promise((resolve, reject) => {
            fs_1.default.lstat(fullPath, (err, stats) => err ? reject(err) : resolve(stats));
        });
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map