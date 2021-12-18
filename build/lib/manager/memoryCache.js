"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryCache = void 0;
class MemoryCache {
    constructor() {
        this.list = {};
    }
    get(key) {
        return this.list[key];
    }
    set(key, value) {
        this.list[key] = value;
    }
    del(key) {
        delete this.list[key];
    }
}
exports.MemoryCache = MemoryCache;
//# sourceMappingURL=memoryCache.js.map