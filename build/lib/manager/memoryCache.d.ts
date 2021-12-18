import { Cache } from '../model';
export declare class MemoryCache implements Cache {
    private list;
    constructor();
    get(key: string): any;
    set(key: string, value: any): void;
    del(key: string): void;
}
