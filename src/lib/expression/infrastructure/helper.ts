import { IStringHelper } from 'h3lp'

export class ExpressionHelper {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly str:IStringHelper) {}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public clearLambda (func:Function):string {
		let str = func.toString().trim()
		let index = str.indexOf('=>') + 2
		str = str.substring(index, str.length).trim()
		index = str.indexOf('(')
		if (index > -1) {
			// Example: xxx.Products.map()
			const form = str.substring(0, index).trim()
			const parts = form.split('.')
			if (parts.length > 2) {
				return this.str.replace(str, parts[0] + '.', '')
			}
		} else {
			// Example: xxx.Products
			const parts = str.split('.')
			if (parts.length > 1) {
				return this.str.replace(str, parts[0] + '.', '')
			}
		}
		return str
	}
}
