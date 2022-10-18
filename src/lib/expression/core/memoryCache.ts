import { ICache } from '../contract'

export class MemoryCache implements ICache {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly list:any = {}) { }

	public get (key:string) {
		return this.list[key]
	}

	public set (key:string, value:any) {
		this.list[key] = value
	}

	public del (key:string) {
		delete this.list[key]
	}
}
