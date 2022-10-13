export interface ICache {
	get(key:string): any
	set(key:string, value:any):any
	del(key:string):any
}
