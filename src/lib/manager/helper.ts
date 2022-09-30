import { H3lp } from 'h3lp'
import { Type, PropertyType } from './../model'

export class ExpHelper extends H3lp {
	public getType (value: any): Type {
		if (Array.isArray(value)) {
			if (value.length > 0) {
				return { ElementType: this.getType(value[0]) }
			}
			return { ElementType: 'any' }
		} else if (typeof value === 'object') {
			const properties: PropertyType[] = []
			for (const entry of Object.entries(value)) {
				properties.push({ name: entry[0], type: this.getType(entry[1]) })
			}
			return { properties: properties }
		} else if (typeof value === 'string') {
			// TODO determinar si es fecha.
			return 'string'
		} else if (typeof value === 'number') {
			if (this.validator.isInteger(value)) {
				return 'integer'
			}
			return 'decimal'
		} else if (typeof value === 'boolean') {
			return 'boolean'
		}
		return 'any'
	}
}
