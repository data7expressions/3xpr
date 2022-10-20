
export interface ISerializer<T> {
	serialize (value: T): any
	deserialize (value: any): T
	clone (value: T): T
}
export interface IBuilder<T> {
	build (): T
}
export interface ICache<T> {
	get(key:string): T
	set(key:string, value:T):void
	delete(key:string):void
}
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
export interface Parameter {
	name: string
	type?: string
	default?: any
	value?:any,
	multiple?:boolean
}
export interface Sing {
	name:string
	params:Parameter[]
	returnType:string
	async: boolean
}
export interface Format {
	name: string
	pattern: string
	regExp: RegExp
}
