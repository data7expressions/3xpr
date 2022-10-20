import { ICache } from '../contract'

export class MemoryCache<T> implements ICache<T> {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly list:any = {}) { }

	public get (key:string):T {
		return this.list[key]
	}

	public set (key:string, value:T):void {
		this.list[key] = value
	}

	public delete (key:string):void {
		delete this.list[key]
	}
}
