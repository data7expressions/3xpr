/// <reference types="node" />
import fs from 'fs';
export declare class Helper {
    static getType(value: any): string;
    static isObject(obj: any): boolean;
    static isEmpty(value: any): boolean;
    static nvl(value: any, _default: any): any;
    static tryParse(value: string): any | null;
    static exec(command: string, cwd?: string): Promise<any>;
    static existsPath(fullPath: string): Promise<boolean>;
    static createIfNotExists(fullPath: string): Promise<void>;
    static readFile(filePath: string): Promise<string | null>;
    static removeFile(fullPath: string): Promise<void>;
    static copyFile(src: string, dest: string): Promise<void>;
    static writeFile(filePath: string, content: string): Promise<void>;
    static mkdir(fullPath: string): Promise<void>;
    static lstat(fullPath: string): Promise<fs.Stats>;
}
