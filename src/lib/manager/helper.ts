import { H3lp } from 'h3lp'

export class ExpHelper extends H3lp {
	private reAlphanumeric:RegExp

	constructor () {
		super()
		// eslint-disable-next-line prefer-regex-literals
		this.reAlphanumeric = new RegExp('[a-zA-Z0-9_.]+$')
	}

	public isAlphanumeric (value:string):boolean {
		return this.reAlphanumeric.test(value)
	}
}
