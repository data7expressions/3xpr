export declare class Node {
    name: any;
    type: string;
    children: Node[];
    id?: string;
    parent?: Node;
    index?: number;
    level?: number;
    constructor(name: any, type: string, children?: Node[]);
}
