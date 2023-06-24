export interface ISerializer<T> {
	serialize (value: T): any
	deserialize (value: any): T
	clone (value: T): T
}
export interface IBuilder<T> {
	build (): T
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
	isAsync: boolean
}
export interface Format {
	name: string
	pattern: string
	regExp: RegExp
}

export class Position {
	// eslint-disable-next-line no-useless-constructor
	public constructor (readonly ln: number, readonly col:number) {}
}
