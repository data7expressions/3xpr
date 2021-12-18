export declare class Data {
    data: any;
    parent: any;
    constructor(data: any, parent?: Data);
    newData(): Data;
    getData(variable: string): any;
    contains(name: string): boolean;
    get(name: string): any;
    set(name: string, value: any): void;
    init(name: string, value: any): void;
}
