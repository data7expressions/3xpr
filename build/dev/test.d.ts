export declare const template: {
    template: string;
    cases: {
        name: string;
        template: string;
    }[];
};
export declare const templateParameter: {
    template: string;
    cases: {
        name: string;
        template: string;
    }[];
};
export declare const templateType: {
    template: string;
    cases: {
        name: string;
        template: string;
    }[];
};
interface TestSuiteRequest {
    name: string;
    context?: any;
    method?: string;
    func?: (expression: string, context?: any) => any;
    expressions: string[];
}
export declare class HelperTest {
    static buildSuite(request: TestSuiteRequest): Promise<void>;
    static show(list: string[], context: any, method?: string, func?: (expression: string, context?: any) => any): void;
    static test(expression: string, file: string): Promise<void>;
}
export {};
