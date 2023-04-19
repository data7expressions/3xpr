export declare class Data {
    data: any;
    parent?: Data | undefined;
    constructor(data?: any, parent?: Data | undefined);
    newData(): Data;
    getData(variable: string): any;
    contains(name: string): boolean;
    get(name: string): any;
    set(name: string, value: any): boolean;
    init(name: string, value: any): void;
}
export declare class Step {
    readonly name: string;
    readonly id: string;
    values: any[];
    constructor(name: string, id: string);
}
export declare class Token {
    id: string;
    stack: any;
    isBreak: boolean;
    listeners: string[];
    signals: string[];
    constructor();
    addListener(value: string): void;
    clearListeners(): void;
    addSignal(value: string): void;
    clearSignals(): void;
}
export declare class Context {
    data: Data;
    token: Token;
    parent?: Context;
    constructor(data?: Data, token?: Token, parent?: Context);
    newContext(): Context;
}
