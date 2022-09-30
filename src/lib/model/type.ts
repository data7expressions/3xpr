export type PrimitiveType = 'string' | 'integer' | 'decimal'| 'number'| 'boolean' | 'date' | 'datetime'| 'time'| 'any'
export interface PropertyType {
	name:string
	// eslint-disable-next-line no-use-before-define
	type?: Type
}
export interface ObjectType {
	properties: PropertyType[]
}

export interface ArrayType {
	// eslint-disable-next-line no-use-before-define
	ElementType?:Type
}

export type Type = PrimitiveType | ObjectType | ArrayType
