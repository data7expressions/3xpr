
export interface ActionObserverArgs{
	expression:string
	data: any
	result?:any
	error?:any
}

export abstract class ActionObserver {
	// eslint-disable-next-line no-useless-constructor
	public constructor (public readonly condition?:string) {}
	public abstract before (args:ActionObserverArgs):void;
	public abstract after (args:ActionObserverArgs):void;
	public abstract error (args:ActionObserverArgs):void;
}
