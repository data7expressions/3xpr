
export interface ActionObserverArgs{
	expression:string
	data: any
	result?:any
	error?:any
}

export abstract class ActionObserver {
	public condition?:string
	constructor (condition?:string) {
		this.condition = condition
	}

	public abstract before (args:ActionObserverArgs):void;
	public abstract after (args:ActionObserverArgs):void;
	public abstract error (args:ActionObserverArgs):void;
}
