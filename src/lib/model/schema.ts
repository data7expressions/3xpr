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

export enum ConstraintType {
	value = 'value',
	enum = 'enum',
	format = 'format',
	range = 'range',
	custom = 'custom',
}
export interface Constraint {
	message: string
	condition: string
	type: ConstraintType
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
	extends?: string
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
	name: string
	enums: Enum[]
	formats: Format[]
	entities: Entity[]
	models: Model[]
}

export interface ValidateError {
	message:string
	condition?:string
	data:any
}
export interface ValidateResult {
	errors:ValidateError[]
	result: 'ok' | 'error'
}
