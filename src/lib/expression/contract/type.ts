export type PrimitiveType = 'string' | 'integer' | 'decimal'| 'number'| 'boolean' | 'date' | 'datetime'| 'time'| 'any' | 'void'
// eslint-disable-next-line no-use-before-define
export type Type = PrimitiveType | ObjectType | ArrayType

export interface PropertyType {
	name:string
	type?: Type
}
export interface ObjectType {
	properties: PropertyType[]
}

export interface ArrayType {
	items:Type
}

// TODO: ver tuples
// https://www.tutorialsteacher.com/typescript/typescript-tuple

// export interface ObjectType {
// properties: PropertyType[]
// }

// export interface ArrayType {
// item?:Type
// }

// export interface Type {
// primitive?: 'string' | 'integer' | 'decimal'| 'number'| 'boolean' | 'date' | 'datetime'| 'time'| 'any'
// array?: ArrayType
// object?: ObjectType
// }
