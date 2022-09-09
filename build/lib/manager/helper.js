"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
// import url from 'url'
class Helper {
    static async get(uri) {
        // https://www.geeksforgeeks.org/node-js-https-request-function/
        return new Promise((resolve, reject) => {
            let data = '';
            // https://www.geeksforgeeks.org/node-js-url-method/
            // const _url = new url.URL(uri)
            // const options = {
            // hostname: _url.hostname,
            // port: _url.protocol === 'https' ? 443 : 80,
            // path: _url.pathname,
            // method: 'GET'
            // // https://levelup.gitconnected.com/how-to-resolve-certificate-errors-in-nodejs-app-involving-ssl-calls-781ce48daded
            // // https://levelup.gitconnected.com/how-to-resolve-certificate-errors-in-nodejs-app-involving-ssl-calls-781ce48daded
            // // NO FUNCIONO
            // // rejectUnauthorized: false
            // }
            const req = https_1.default.request(uri, res => {
                res.on('data', chunk => {
                    data = data + chunk.toString();
                });
                res.on('end', () => {
                    resolve(data);
                });
            });
            req.on('error', error => {
                reject(error);
            });
            req.end();
        });
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
    static replace(string, search, replace) {
        return string.split(search).join(replace);
    }
    static clone(obj) {
        return obj && typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
    }
    static extendObject(obj, base) {
        if (Array.isArray(base)) {
            for (const baseChild of base) {
                const objChild = obj.find((p) => p.name === baseChild.name);
                if (objChild === undefined) {
                    obj.push(Helper.clone(baseChild));
                }
                else {
                    Helper.extendObject(objChild, baseChild);
                }
            }
        }
        else if (typeof base === 'object') {
            for (const k in base) {
                if (obj[k] === undefined) {
                    obj[k] = Helper.clone(base[k]);
                }
                else if (typeof obj[k] === 'object') {
                    Helper.extendObject(obj[k], base[k]);
                }
            }
        }
        return obj;
    }
    static getNames(value) {
        if (value === '.') {
            // in case "".[0].name" where var is "."
            return [value];
        }
        else if (value.startsWith('..')) {
            // in case ".name.filter"
            return ['.'].concat(value.substring(2).split('.'));
        }
        else if (value.startsWith('.')) {
            // in case ".name.filter"
            return ['.'].concat(value.substring(1).split('.'));
        }
        else {
            return value.split('.');
        }
    }
    static getValue(names, source) {
        let value = source;
        for (const name of names) {
            if (Array.isArray(value)) {
                let result = [];
                for (const item of value) {
                    if (item[name] !== undefined) {
                        if (Array.isArray(item[name])) {
                            result = result.concat(item[name]);
                        }
                        else {
                            result.push(item[name]);
                        }
                    }
                }
                value = result;
            }
            else {
                if (value[name] === undefined)
                    return null;
                value = value[name];
            }
        }
        return value;
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
    static async existsPath(sourcePath) {
        const fullPath = Helper.resolvePath(sourcePath);
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
    static async createIfNotExists(sourcePath) {
        const fullPath = Helper.resolvePath(sourcePath);
        if (await Helper.existsPath(fullPath)) {
            return;
        }
        return new Promise((resolve, reject) => {
            fs_1.default.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve());
        });
    }
    static resolvePath(source) {
        const _source = source.trim();
        if (_source.startsWith('.')) {
            return path_1.default.join(process.cwd(), source);
        }
        if (_source.startsWith('~')) {
            return _source.replace('~', process.env.HOME);
        }
        return source;
    }
    static async readFile(filePath) {
        const fullPath = Helper.resolvePath(filePath);
        if (!await Helper.existsPath(fullPath)) {
            return null;
        }
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(fullPath, (err, data) => err ? reject(err) : resolve(data.toString('utf8')));
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
            fs_1.default.lstat(fullPath, (err, stats) => err
                ? reject(err)
                : resolve(stats));
        });
    }
    static getEnvironmentVariable(text) {
        const startIndex = text.indexOf('${');
        if (startIndex < 0) {
            return undefined;
        }
        const endIndex = text.indexOf('}', startIndex + 2);
        if (endIndex < 0) {
            throw new Error(`Environment variable not found end character "?" in ${text}`);
        }
        return text.substring(startIndex + 2, endIndex);
    }
    static solveEnvironmentVariables(source) {
        if (typeof source !== 'object') {
            return;
        }
        for (const name in source) {
            const child = source[name];
            if (typeof child === 'string' && child.indexOf('${') >= 0) {
                source[name] = Helper.replaceEnvironmentVariable(child);
            }
            else if (typeof child === 'object') {
                Helper.solveEnvironmentVariables(child);
            }
        }
    }
    static replaceEnvironmentVariable(text) {
        // there can be more than one environment variable in text
        while (text.indexOf('${') >= 0) {
            const environmentVariable = Helper.getEnvironmentVariable(text);
            if (!environmentVariable) {
                continue;
            }
            const environmentVariableValue = process.env[environmentVariable];
            if (environmentVariableValue === undefined || environmentVariableValue === null) {
                text = Helper.replace(text, '${' + environmentVariable + '}', '');
            }
            else {
                const objValue = Helper.tryParse(environmentVariableValue);
                const value = objValue ? JSON.stringify(objValue) : environmentVariableValue;
                text = Helper.replace(text, '${' + environmentVariable + '}', value);
            }
        }
        return text;
    }
    static tryParse(value) {
        try {
            return JSON.parse(value);
        }
        catch (_a) {
            return null;
        }
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map