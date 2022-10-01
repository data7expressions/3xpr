import { H3lp } from 'h3lp'
import { Type, ArrayType, ObjectType, PropertyType } from './../model'

class TypeHelper {
	private help:H3lp
	constructor (help:H3lp) {
		this.help = help
	}

	public getType (value: any): Type {
		if (Array.isArray(value)) {
			if (value.length > 0) {
				return { items: this.getType(value[0]) }
			}
			return { items: 'any' }
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
			if (this.help.validator.isInteger(value)) {
				return 'integer'
			}
			return 'decimal'
		} else if (typeof value === 'boolean') {
			return 'boolean'
		}
		return 'any'
	}

	public isPrimitive (type:Type | string): boolean {
		let value:string
		if (typeof type === 'string') {
			value = type
		} else {
			value = type.toString()
		}
		return ['string', 'integer', 'decimal', 'number', 'boolean', 'date', 'datetime', 'time'].includes(value)
	}

	public isArrayType (type:Type| string) : boolean {
		if (typeof type === 'string') {
			return type.startsWith('[') && type.endsWith(']')
		}
		return (type as ArrayType).items !== undefined
	}

	public isObjectType (type:Type|string) : boolean {
		if (typeof type === 'string') {
			return type.startsWith('{') && type.endsWith('}')
		}
		return (type as ObjectType).properties !== undefined
	}

	public serialize (type?: Type):string {
		if (type === undefined || type === null) {
			return 'any'
		}
		return JSON.stringify(type)
	}

	public deserialize (type: string):Type {
		if (type === undefined || type === null) {
			return 'any'
		}
		return JSON.parse(type) as Type
	}
}

export class ExpHelper extends H3lp {
	public type:TypeHelper
	constructor () {
		super()
		this.type = new TypeHelper(this)
	}
}
