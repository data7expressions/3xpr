/// <reference types="node" />
import fs from 'fs';
export declare class Helper {
    static getType(value: any): string;
    static exec(command: string, cwd?: string): Promise<any>;
    static replace(string: string, search: string, replace: string): string;
    static clone(obj: any): any;
    static cloneOperand(obj: any): any;
    static getNames(value: string): string[];
    static getValue(names: string[], source: any): any;
    static isObject(obj: any): boolean;
    static isEmpty(value: any): boolean;
    static nvl(value: any, _default: any): any;
    static existsPath(sourcePath: string): Promise<boolean>;
    static createIfNotExists(sourcePath: string): Promise<void>;
    static resolvePath(source: string): string;
    static readFile(filePath: string): Promise<string | null>;
    static removeFile(fullPath: string): Promise<void>;
    static copyFile(src: string, dest: string): Promise<void>;
    static writeFile(filePath: string, content: string): Promise<void>;
    static mkdir(fullPath: string): Promise<void>;
    static lstat(fullPath: string): Promise<fs.Stats>;
    static getEnvironmentVariable(text: string): string | undefined;
    static solveEnvironmentVariables(source: any): void;
    private static replaceEnvironmentVariable;
    static tryParse(value: string): any | null;
}
