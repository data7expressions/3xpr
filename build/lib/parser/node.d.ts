export declare class Node {
    name: any;
    type: string;
    children: Node[];
    id?: string;
    index?: number;
    level?: number;
    constructor(name: any, type: string, children?: Node[]);
}
