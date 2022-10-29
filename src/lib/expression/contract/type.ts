// export type PrimitiveType = 'string' | 'integer' | 'decimal'| 'number'| 'boolean' | 'date' | 'dateTime'| 'time'| 'any' | 'void'
// // eslint-disable-next-line no-use-before-define
// export type Type = PrimitiveType | ObjectType | ArrayType

// export interface PropertyType {
// name:string
// type?: Type
// }
// export interface ObjectType {
// properties: PropertyType[]
// }

// export interface ArrayType {
// items:Type
// }

export enum Kind
{ any = 'any'
, string = 'string'
, integer = 'integer'
, decimal = 'decimal'
, number = 'number'
, boolean = 'boolean'
, date = 'date'
, dateTime = 'dateTime'
, time = 'time'
, void = 'void'
, obj = 'obj'
, list = 'list'
}

export interface PropertyType {
	name:string
	// eslint-disable-next-line no-use-before-define
	type?: Type
}
export interface ObjType {
	properties: PropertyType[]
}

export interface ListType {
	// eslint-disable-next-line no-use-before-define
	items:Type
}
export class Type {
	// eslint-disable-next-line no-useless-constructor
	public constructor (public readonly kind:Kind, public spec?: ObjType | ListType) { }

	public static get any ():Type {
		return new Type(Kind.any)
	}

	public static get string ():Type {
		return new Type(Kind.string)
	}

	public static get integer ():Type {
		return new Type(Kind.integer)
	}

	public static get decimal ():Type {
		return new Type(Kind.decimal)
	}

	public static get number ():Type {
		return new Type(Kind.number)
	}

	public static get boolean ():Type {
		return new Type(Kind.boolean)
	}

	public static get date ():Type {
		return new Type(Kind.date)
	}

	public static get dateTime ():Type {
		return new Type(Kind.dateTime)
	}

	public static get time ():Type {
		return new Type(Kind.time)
	}

	public static get void ():Type {
		return new Type(Kind.void)
	}

	// eslint-disable-next-line no-use-before-define,
	public static obj (properties: PropertyType[] = []):Type {
		return new Type(Kind.obj, { properties: properties })
	}

	public static list (items:Type):Type {
		return new Type(Kind.list, { items: items })
	}

	public static isPrimitive (type:Type | string): boolean {
		let value:string
		if (typeof type === 'string') {
			value = type
		} else if (type !== undefined && type.kind !== undefined) {
			value = type.kind.toString()
		} else {
			return false
		}
		return ['string', 'integer', 'decimal', 'number', 'boolean', 'date', 'dateTime', 'time'].includes(value)
	}

	public static to (kind:Kind | string): Type {
		if (typeof kind === 'string') {
			const kindKey = kind as keyof typeof Kind
			return new Type(Kind[kindKey])
		}
		return new Type(kind)
	}

	public static get (value: any): Type {
		if (value === null || value === undefined) {
			return Type.any
		} else if (Array.isArray(value)) {
			if (value.length > 0) {
				return Type.list(this.get(value[0]))
			}
			return Type.any
		} else if (typeof value === 'object') {
			const properties: PropertyType[] = []
			for (const entry of Object.entries(value)) {
				properties.push({ name: entry[0], type: this.get(entry[1]) })
			}
			return Type.obj(properties)
		} else if (typeof value === 'string') {
			// TODO determinar si es fecha.
			return Type.string
		} else if (typeof value === 'number') {
			if (Number.isInteger(value)) {
				return Type.integer
			}
			return Type.decimal
		} else if (typeof value === 'boolean') {
			return Type.boolean
		}
		return Type.any
	}

	public static isList (type:Type| string) : boolean {
		if (typeof type === 'string') {
			return type.startsWith('[') && type.endsWith(']')
		}
		return type.kind === Kind.list
	}

	public static isObj (type:Type|string) : boolean {
		if (typeof type === 'string') {
			return type.startsWith('{') && type.endsWith('}')
		}
		return type.kind === Kind.obj
	}

	public static toString (type?: Type): string {
		if (type === undefined) {
			return 'any'
		}
		if (this.isPrimitive(type)) {
			return type.kind.toString()
		}
		if (this.isObj(type)) {
			const properties:string[] = []
			const objectType = type.spec as ObjType
			for (const propertyType of objectType.properties) {
				properties.push(`${propertyType.name}:${this.toString(propertyType.type)}`)
			}
			return `{${properties.join(',')}}`
		}
		if (this.isList(type)) {
			const arrayType = type.spec as ListType
			return `[${this.toString(arrayType.items)}]`
		}
		return 'any'
	}

	public static serialize (type?: Type):string | undefined {
		if (type === undefined || type === null) {
			return undefined
		}
		return JSON.stringify(type)
	}

	public static deserialize (type?: string):Type | undefined {
		if (type === undefined || type === null || type.trim() === '') {
			return undefined
		}
		return JSON.parse(type) as Type
	}
}

// TODO: ver tuples
// https://www.tutorialsteacher.com/typescript/typescript-tuple
