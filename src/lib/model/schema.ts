export enum PropertyType {
	any = 'any',
	boolean = 'boolean',
	integer = 'integer',
	decimal = 'decimal',
	string = 'string',
	date = 'date',
	time = 'time',
	datetime = 'datetime',
	object = 'object',
	array = 'array'
}
export interface Constraint {
	message: string
	condition: string
}
export interface Format {
	name: string
	regExp: string
}
export interface EnumValue {
	name: string
	value: any
}
export interface Enum {
	name: string
	values: EnumValue[]
}
export interface EntityProperty {
	name: string
	type: PropertyType
	enum?: string
	entity?:string
	properties?: EntityProperty[]
	min?: any
	max?: any
	format?: string
	required?: boolean
	default?: string
	readExp?: string
	writeExp?: string
}
export interface Entity {
	name: string
	extends?: string
	properties: EntityProperty[]
	constraints: Constraint[]
}
export interface Model extends EntityProperty {
	constraints: Constraint[]
}
export interface Schema {
	enums: Enum[]
	formats: Format[]
	entities: Entity[]
	models: Model[]
}
