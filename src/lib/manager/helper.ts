import { Helper } from 'h3lp'

export class ExpHelper extends Helper {
	public isPositiveInteger (value:any) {
		if (typeof value !== 'string') {
			return false
		}
		const num = Number(value)
		return Number.isInteger(num) && num >= 0
	}
}
