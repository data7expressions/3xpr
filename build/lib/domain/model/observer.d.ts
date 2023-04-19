import { Context } from '..';
export interface ActionObserverArgs {
    expression: string;
    context: Context;
    result?: any;
    error?: any;
}
export declare abstract class ActionObserver {
    readonly condition?: string | undefined;
    constructor(condition?: string | undefined);
    abstract before(args: ActionObserverArgs): void;
    abstract after(args: ActionObserverArgs): void;
    abstract error(args: ActionObserverArgs): void;
}
