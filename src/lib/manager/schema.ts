/* eslint-disable @typescript-eslint/ban-types */
import { Cache, Schema, Constraint, PropertyType, ValidateResult, ValidateError, BuildedSchema, BuildedPropertySchema } from '../model'
import { Helper, ExpressionsManager } from './'
import { ExpressionConfig } from '../parser'

export class SchemaBuilderOLD {
	private config: ExpressionConfig
	constructor (config: ExpressionConfig) {
		this.config = config
	}

	public build (source: Schema): Schema {
		if (!source) {
			throw new Error('source is empty')
		}
		const schema = Helper.clone(source)
		this.solveUndefined(schema)
		this.extend(schema)
		this.complete(schema)
		this.createConstraints(schema, schema)
		return schema
	}

	protected solveUndefined (schema: Schema) {
		if (!schema.$defs) {
			schema.$defs = {}
		}
		this.solvePropertyUndefined(schema)
	}

	protected solvePropertyUndefined (property:Schema) {
		if (!property.properties) {
			property.properties = {}
		} else {
			for (const p in property.properties) {
				const child = property.properties[p] as Schema
				this.solvePropertyUndefined(child)
			}
		}
	}

	protected extend (schema: Schema) {
		for (const def of Object.values(schema.$defs)) {
			this.extendDef(def as Schema, schema.$defs)
		}
	}

	protected extendDef (def: Schema, defs:any): void {
		if (def.$extends) {
			const base = defs[def.$extends] as Schema
			if (base === undefined) {
				throw new Error(`${def.$extends} not found`)
			}
			if (base.$extends) {
				this.extendDef(base, defs)
			}
			// extend
			Helper.extendObject(def, base)
		}
		// remove since it was already extended
		if (def.$extends) {
			delete def.$extends
		}
	}

	public complete (schema: Schema): void {
		this.completeProperty(schema)
		for (const def of Object.values(schema.$defs)) {
			this.completeProperty(def as Schema)
		}
	}

	protected completeProperty (property: Schema):void {
		if (property.type === undefined) {
			property.type = PropertyType.string
		}
		if (property.properties) {
			for (const p in property.properties) {
				const child = property.properties[p] as Schema
				this.completeProperty(child)
			}
		}
	}

	protected createConstraints (schema: Schema, property: Schema):void {
		if (!property.constraints) {
			property.constraints = []
		}
		const valueConstraint = this.createTypeConstraint(property)
		if (valueConstraint) {
			property.constraints.push(valueConstraint)
		}
		if ((property.minimum || property.maximum) && [PropertyType.integer, PropertyType.decimal, PropertyType.date, PropertyType.datetime, PropertyType.time].includes(property.type)) {
			property.constraints.push(this.createMinMaxConstraint(property))
		}
		if (property.enum && [PropertyType.integer, PropertyType.string].includes(property.type)) {
			property.constraints.push(this.createEnumConstraint(property))
		}
		if ([PropertyType.integer, PropertyType.decimal].includes(property.type)) {
			if ((property.minLength || property.maxLength)) {
				property.constraints.push(this.createMultipleOfConstraint(property))
			}
		} else if (PropertyType.string === property.type) {
			if ((property.minLength || property.maxLength)) {
				property.constraints.push(this.createMinMaxLengthConstraint(property))
			}
			if (property.format) {
				property.constraints.push(this.createFormatConstraint(property))
			}
			if (property.pattern) {
				property.constraints.push(this.createPatternConstraint(property))
			}
		} else if (PropertyType.object === property.type) {
			if (property.required) {
				property.constraints.push(this.createRequiredConstraint(property))
			}
			if ((property.minProperties || property.maxProperties)) {
				property.constraints.push(this.createMinMaxPropertiesConstraint(property))
			}
		} else if (PropertyType.array === property.type) {
			if ((property.minProperties || property.maxProperties)) {
				property.constraints.push(this.createMinMaxItemsConstraint(property))
			}
			if ((property.uniqueItems)) {
				property.constraints.push(this.createUniqueItemsConstraint(property))
			}
		}

		if (property.properties) {
			for (const p in property.properties) {
				const child = property.properties[p] as Schema
				this.createConstraints(schema, child)
			}
		}
	}

	protected createTypeConstraint (property: Schema): Constraint | null {
		let func:Function| undefined
		switch (property.type) {
		case PropertyType.null:
			func = (p:any) => p === null; break
		case PropertyType.boolean:
			func = (p:any) => typeof p === 'boolean'; break
		case PropertyType.string:
			func = (p:any) => typeof p === 'string'; break
		case PropertyType.integer:
			func = (p:any) => Number.isInteger(p); break
		case PropertyType.decimal:
			func = (p:any) => !isNaN(p); break
		case PropertyType.date:
			func = this.formatDatetime('date'); break
		case PropertyType.datetime:
			func = this.formatDatetime('datetime'); break
		case PropertyType.time:
			func = this.formatDatetime('time'); break
		case PropertyType.object:
			func = (p:any) => typeof p === 'object' && !Array.isArray(p); break
		case PropertyType.array:
			func = (p:any) => Array.isArray(p); break
		}
		if (func === undefined) {
			return null
		}
		return {
			message: `invalid type ${property.name}`,
			func: func
		}
	}

	protected formatDatetime (format:string): Function {
		const datetimeFormat = this.config.getFormat(format)
		if (!datetimeFormat) {
			throw new Error(`Format ${format} not found`)
		}
		return (p:any) => {
			if (typeof p === 'string') {
				return datetimeFormat.regExp.test(p)
			} else {
				return typeof p.getMonth === 'function'
			}
		}
	}

	protected createMinMaxConstraint (property: Schema): Constraint {
		if (property.minimum && property.maximum && !property.exclusiveMinimum && !property.exclusiveMaximum) {
			return {
				message: `${property.name} outside the range form ${property.minimum} to ${property.maximum}`,
				func: (p:any) => p > property.minimum && p < property.maximum
			}
		} else if (property.minimum && property.maximum && property.exclusiveMinimum && property.exclusiveMaximum) {
			return {
				message: `${property.name} outside the range form ${property.minimum} inclusive to ${property.maximum} inclusive`,
				func: (p:any) => p >= property.minimum && p <= property.maximum
			}
		} else if (property.minimum && property.maximum && !property.exclusiveMinimum && property.exclusiveMaximum) {
			return {
				message: `${property.name} outside the range form ${property.minimum} to ${property.maximum} inclusive`,
				func: (p:any) => p > property.minimum && p <= property.maximum
			}
		} else if (property.minimum && property.maximum && property.exclusiveMinimum && !property.exclusiveMaximum) {
			return {
				message: `${property.name} outside the range form ${property.minimum} inclusive to ${property.maximum}`,
				func: (p:any) => p >= property.minimum && p < property.maximum
			}
		} else if (property.minimum && !property.exclusiveMinimum) {
			return {
				message: `${property.name} is less or equal than ${property.minimum}`,
				func: (p:any) => p >= property.minimum
			}
		} else if (property.minimum && property.exclusiveMinimum) {
			return {
				message: `${property.name} is less than ${property.minimum}`,
				func: (p:any) => p > property.minimum
			}
		} else if (property.maximum && !property.exclusiveMaximum) {
			return {
				message: `${property.name} is greater or equal than ${property.maximum}`,
				func: (p:any) => p <= property.maximum
			}
		} else if (property.maximum && property.exclusiveMaximum) {
			return {
				message: `${property.name} is greater than ${property.maximum}`,
				func: (p:any) => p <= property.maximum
			}
		}
		throw new Error(`${property.name} constraint minimum or maximum undefined`)
	}

	protected createMultipleOfConstraint (property: Schema): Constraint {
		if (!property.multipleOf) {
			throw new Error(`Enum not define in ${property.name}`)
		}
		return {
			message: `${property.name}  is not multiple of ${property.multipleOf}`,
			func: (p:number) => p % property.multipleOf === 0
		}
	}

	protected createMinMaxLengthConstraint (property: Schema): Constraint {
		const min = property.minLength
		const max = property.maxLength
		if (min && max) {
			return {
				message: `${property.name} outside the range of ${min} to ${max}`,
				func: (p:string) => p.length >= min && p.length <= max
			}
		} else if (min) {
			return {
				message: `${property.name} is less than ${min}`,
				func: (p:string) => p.length >= min
			}
		} else if (max) {
			return {
				message: `${property.name} is greater than ${max}`,
				func: (p:string) => p.length <= max
			}
		}
		throw new Error(`${property.name} constraint minLength or maxLength undefined`)
	}

	protected createEnumConstraint (property: Schema): Constraint {
		if (!property.enum) {
			throw new Error(`Enum not define in ${property.name}`)
		}
		let values:any[]
		if (Array.isArray(property.enum)) {
			values = property.enum
		} else if (typeof property.enum === 'string') {
			const _enum = this.config.getEnum(property.enum)
			if (!_enum) {
				throw new Error(`Enum ${property.enum} define in ${property.name} not found`)
			}
			values = Object.values(_enum.values)
		} else {
			throw new Error(`Invalid enum define in ${property.name}`)
		}
		const showValues = values.join(',')
		return {
			message: `${property.name}  not in [${showValues}]`,
			func: (p:string) => values.includes(p)
		}
	}

	protected createFormatConstraint (property: Schema): Constraint {
		if (!property.format) {
			throw new Error(`Format not define in ${property.name}`)
		}
		const format = this.config.getFormat(property.format)
		if (!format) {
			throw new Error(`Format ${property.format} define in ${property.name} not found`)
		}
		return {
			message: `${property.name} does not comply with the format ${property.format}`,
			func: (p:string) => format.regExp.test(p)
		}
	}

	protected createPatternConstraint (property: Schema): Constraint {
		if (!property.pattern) {
			throw new Error(`Pattern not define in ${property.name}`)
		}
		const regExp = new RegExp(property.pattern)
		return {
			message: `${property.name} does not comply with the format ${property.pattern}`,
			func: (p:string) => regExp.test(p)
		}
	}

	protected createRequiredConstraint (property: Schema): Constraint {
		return {
			message: `${property.name} does not comply with the format ${property.pattern}`,
			func: (p:string) => {
				if (!property.required) {
					return false
				}
				for (const entry of Object.entries(p)) {
					if (!property.required.includes(entry[0]) || entry[1] === null) {
						return false
					}
				}
			}
		}
	}

	protected createMinMaxPropertiesConstraint (property: Schema): Constraint {
		const min = property.minProperties
		const max = property.maxProperties
		if (min && max) {
			return {
				message: `${property.name} outside the range from ${min} inclusive to ${max} inclusive properties`,
				func: (p:any) => {
					const properties = Object.keys(p).length
					return properties >= min && properties <= max
				}
			}
		} else if (min) {
			return {
				message: `${property.name} is less or equal than ${min}`,
				func: (p:any) => Object.keys(p).length >= min
			}
		} else if (max) {
			return {
				message: `${property.name} is greater or equal than ${max}`,
				func: (p:any) => Object.keys(p).length <= max
			}
		}
		throw new Error(`${property.name} constraint minProperties or maxProperties undefined`)
	}

	protected createMinMaxItemsConstraint (property: Schema): Constraint {
		const min = property.minItems
		const max = property.maxItems
		if (min && max) {
			return {
				message: `${property.name} outside the range from ${min} inclusive to ${max} inclusive items`,
				func: (p:any[]) => p.length >= min && p.length <= max
			}
		} else if (min) {
			return {
				message: `${property.name} is less or equal than ${min}`,
				func: (p:any[]) => p.length >= min
			}
		} else if (max) {
			return {
				message: `${property.name} is greater or equal than ${max}`,
				func: (p:any[]) => p.length <= max
			}
		}
		throw new Error(`${property.name} constraint minItems or maxItems undefined`)
	}

	protected createUniqueItemsConstraint (property: Schema): Constraint {
		return {
			message: `Does not comply with the format ${property.uniqueItems}`,
			func: (p:any[]) => {
				const unique = (value:any, index:number, self:any) => {
					return self.indexOf(value) !== index
				}
				return p.filter(unique).length > 0
			}
		}
	}
}

export class SchemaCompleter {
	public complete (source: Schema): Schema {
		if (!source) {
			throw new Error('source is empty')
		}
		const schema = Helper.clone(source)
		this.solveUndefined(schema)
		this.extend(schema)
		this._complete(schema)
		return schema
	}

	protected solveUndefined (schema: Schema) {
		if (!schema.$defs) {
			schema.$defs = {}
		}
		this.solvePropertyUndefined(schema)
	}

	protected solvePropertyUndefined (property:Schema) {
		if (!property.properties) {
			property.properties = {}
		} else {
			for (const p in property.properties) {
				const child = property.properties[p] as Schema
				this.solvePropertyUndefined(child)
			}
		}
	}

	protected extend (schema: Schema) {
		for (const def of Object.values(schema.$defs)) {
			this.extendDef(def as Schema, schema.$defs)
		}
	}

	protected extendDef (def: Schema, defs:any): void {
		if (def.$extends) {
			const base = defs[def.$extends] as Schema
			if (base === undefined) {
				throw new Error(`${def.$extends} not found`)
			}
			if (base.$extends) {
				this.extendDef(base, defs)
			}
			// extend
			Helper.extendObject(def, base)
		}
		// remove since it was already extended
		if (def.$extends) {
			delete def.$extends
		}
	}

	protected _complete (schema: Schema): void {
		this.completeProperty(schema)
		for (const def of Object.values(schema.$defs)) {
			this.completeProperty(def as Schema)
		}
	}

	protected completeProperty (property: Schema):void {
		if (property.type === undefined) {
			property.type = PropertyType.string
		}
		if (property.properties) {
			for (const p in property.properties) {
				const child = property.properties[p] as Schema
				this.completeProperty(child)
			}
		}
	}
}

export class SchemaBuilder {
	private config: ExpressionConfig
	constructor (config: ExpressionConfig) {
		this.config = config
	}

	public build (schema: Schema): BuildedSchema {
		if (!schema) {
			throw new Error('schema is empty')
		}
		const builded = this.create(schema)
		this.createConstraints(builded, schema, schema)
		return builded
	}

	protected create (source: Schema):BuildedSchema {
		return { $id: source.$id, type: source.type, constraints: [], properties: [] }
	}

	protected createConstraints (builded:BuildedSchema, schema: Schema, property: Schema):void {
		const valueConstraint = this.createTypeConstraint(property)
		if (valueConstraint) {
			builded.constraints.push(valueConstraint)
		}
		if ((property.minimum || property.maximum) && [PropertyType.integer, PropertyType.decimal, PropertyType.date, PropertyType.datetime, PropertyType.time].includes(property.type)) {
			builded.constraints.push(this.createMinMaxConstraint(property))
		}
		if (property.enum && [PropertyType.integer, PropertyType.string].includes(property.type)) {
			builded.constraints.push(this.createEnumConstraint(property))
		}
		if ([PropertyType.integer, PropertyType.decimal].includes(property.type)) {
			if ((property.minLength || property.maxLength)) {
				builded.constraints.push(this.createMultipleOfConstraint(property))
			}
		} else if (property.type === PropertyType.string) {
			if ((property.minLength || property.maxLength)) {
				builded.constraints.push(this.createMinMaxLengthConstraint(property))
			}
			if (property.format) {
				builded.constraints.push(this.createFormatConstraint(property))
			}
			if (property.pattern) {
				builded.constraints.push(this.createPatternConstraint(property))
			}
		} else if (property.type === PropertyType.object) {
			if (property.required) {
				builded.constraints.push(this.createRequiredConstraint(property))
			}
			if ((property.minProperties || property.maxProperties)) {
				builded.constraints.push(this.createMinMaxPropertiesConstraint(property))
			}
			// iterate through the child properties
			if (property.properties) {
				for (const name in property.properties) {
					const child = property.properties[name] as Schema
					const buildedChild = this.create(child)
					this.createConstraints(buildedChild, schema, child)
					builded.properties.push({ name: name, ref: child.$ref, schema: buildedChild })
				}
			}
		} else if (property.type === PropertyType.array) {
			if ((property.minProperties || property.maxProperties)) {
				builded.constraints.push(this.createMinMaxItemsConstraint(property))
			}
			if ((property.uniqueItems)) {
				builded.constraints.push(this.createUniqueItemsConstraint(property))
			}
			// iterate through the items properties
			if (property.items) {
				const buildedItems = this.create(property.items)
				this.createConstraints(buildedItems, schema, property.items)
				builded.properties.push({ name: 'items', ref: property.items.$ref, schema: buildedItems })
			}
		}
	}

	protected createTypeConstraint (property: Schema): Constraint | null {
		let func:Function| undefined
		switch (property.type) {
		case PropertyType.null:
			func = (p:any) => p === null; break
		case PropertyType.boolean:
			func = (p:any) => typeof p === 'boolean'; break
		case PropertyType.string:
			func = (p:any) => typeof p === 'string'; break
		case PropertyType.integer:
			func = (p:any) => Number.isInteger(p); break
		case PropertyType.decimal:
			func = (p:any) => !isNaN(p); break
		case PropertyType.date:
			func = this.formatDatetime('date'); break
		case PropertyType.datetime:
			func = this.formatDatetime('datetime'); break
		case PropertyType.time:
			func = this.formatDatetime('time'); break
		case PropertyType.object:
			func = (p:any) => typeof p === 'object' && !Array.isArray(p); break
		case PropertyType.array:
			func = (p:any) => Array.isArray(p); break
		}
		if (func === undefined) {
			return null
		}
		return {
			message: `invalid type ${property.name}`,
			func: func
		}
	}

	protected formatDatetime (format:string): Function {
		const datetimeFormat = this.config.getFormat(format)
		if (!datetimeFormat) {
			throw new Error(`Format ${format} not found`)
		}
		return (p:any) => {
			if (typeof p === 'string') {
				return datetimeFormat.regExp.test(p)
			} else {
				return typeof p.getMonth === 'function'
			}
		}
	}

	protected createMinMaxConstraint (property: Schema): Constraint {
		if (property.minimum && property.maximum && !property.exclusiveMinimum && !property.exclusiveMaximum) {
			return {
				message: `${property.name} outside the range form ${property.minimum} to ${property.maximum}`,
				func: (p:any) => p > property.minimum && p < property.maximum
			}
		} else if (property.minimum && property.maximum && property.exclusiveMinimum && property.exclusiveMaximum) {
			return {
				message: `${property.name} outside the range form ${property.minimum} inclusive to ${property.maximum} inclusive`,
				func: (p:any) => p >= property.minimum && p <= property.maximum
			}
		} else if (property.minimum && property.maximum && !property.exclusiveMinimum && property.exclusiveMaximum) {
			return {
				message: `${property.name} outside the range form ${property.minimum} to ${property.maximum} inclusive`,
				func: (p:any) => p > property.minimum && p <= property.maximum
			}
		} else if (property.minimum && property.maximum && property.exclusiveMinimum && !property.exclusiveMaximum) {
			return {
				message: `${property.name} outside the range form ${property.minimum} inclusive to ${property.maximum}`,
				func: (p:any) => p >= property.minimum && p < property.maximum
			}
		} else if (property.minimum && !property.exclusiveMinimum) {
			return {
				message: `${property.name} is less or equal than ${property.minimum}`,
				func: (p:any) => p >= property.minimum
			}
		} else if (property.minimum && property.exclusiveMinimum) {
			return {
				message: `${property.name} is less than ${property.minimum}`,
				func: (p:any) => p > property.minimum
			}
		} else if (property.maximum && !property.exclusiveMaximum) {
			return {
				message: `${property.name} is greater or equal than ${property.maximum}`,
				func: (p:any) => p <= property.maximum
			}
		} else if (property.maximum && property.exclusiveMaximum) {
			return {
				message: `${property.name} is greater than ${property.maximum}`,
				func: (p:any) => p <= property.maximum
			}
		}
		throw new Error(`${property.name} constraint minimum or maximum undefined`)
	}

	protected createMultipleOfConstraint (property: Schema): Constraint {
		if (!property.multipleOf) {
			throw new Error(`Enum not define in ${property.name}`)
		}
		return {
			message: `${property.name}  is not multiple of ${property.multipleOf}`,
			func: (p:number) => p % property.multipleOf === 0
		}
	}

	protected createMinMaxLengthConstraint (property: Schema): Constraint {
		const min = property.minLength
		const max = property.maxLength
		if (min && max) {
			return {
				message: `${property.name} outside the range of ${min} to ${max}`,
				func: (p:string) => p.length >= min && p.length <= max
			}
		} else if (min) {
			return {
				message: `${property.name} is less than ${min}`,
				func: (p:string) => p.length >= min
			}
		} else if (max) {
			return {
				message: `${property.name} is greater than ${max}`,
				func: (p:string) => p.length <= max
			}
		}
		throw new Error(`${property.name} constraint minLength or maxLength undefined`)
	}

	protected createEnumConstraint (property: Schema): Constraint {
		if (!property.enum) {
			throw new Error(`Enum not define in ${property.name}`)
		}
		let values:any[]
		if (Array.isArray(property.enum)) {
			values = property.enum
		} else if (typeof property.enum === 'string') {
			const _enum = this.config.getEnum(property.enum)
			if (!_enum) {
				throw new Error(`Enum ${property.enum} define in ${property.name} not found`)
			}
			values = Object.values(_enum.values)
		} else {
			throw new Error(`Invalid enum define in ${property.name}`)
		}
		const showValues = values.join(',')
		return {
			message: `${property.name}  not in [${showValues}]`,
			func: (p:string) => values.includes(p)
		}
	}

	protected createFormatConstraint (property: Schema): Constraint {
		if (!property.format) {
			throw new Error(`Format not define in ${property.name}`)
		}
		const format = this.config.getFormat(property.format)
		if (!format) {
			throw new Error(`Format ${property.format} define in ${property.name} not found`)
		}
		return {
			message: `${property.name} does not comply with the format ${property.format}`,
			func: (p:string) => format.regExp.test(p)
		}
	}

	protected createPatternConstraint (property: Schema): Constraint {
		if (!property.pattern) {
			throw new Error(`Pattern not define in ${property.name}`)
		}
		const regExp = new RegExp(property.pattern)
		return {
			message: `${property.name} does not comply with the format ${property.pattern}`,
			func: (p:string) => regExp.test(p)
		}
	}

	protected createRequiredConstraint (property: Schema): Constraint {
		return {
			message: `${property.name} does not comply with the format ${property.pattern}`,
			func: (p:string) => {
				if (!property.required) {
					return false
				}
				for (const entry of Object.entries(p)) {
					if (!property.required.includes(entry[0]) || entry[1] === null) {
						return false
					}
				}
			}
		}
	}

	protected createMinMaxPropertiesConstraint (property: Schema): Constraint {
		const min = property.minProperties
		const max = property.maxProperties
		if (min && max) {
			return {
				message: `${property.name} outside the range from ${min} inclusive to ${max} inclusive properties`,
				func: (p:any) => {
					const properties = Object.keys(p).length
					return properties >= min && properties <= max
				}
			}
		} else if (min) {
			return {
				message: `${property.name} is less or equal than ${min}`,
				func: (p:any) => Object.keys(p).length >= min
			}
		} else if (max) {
			return {
				message: `${property.name} is greater or equal than ${max}`,
				func: (p:any) => Object.keys(p).length <= max
			}
		}
		throw new Error(`${property.name} constraint minProperties or maxProperties undefined`)
	}

	protected createMinMaxItemsConstraint (property: Schema): Constraint {
		const min = property.minItems
		const max = property.maxItems
		if (min && max) {
			return {
				message: `${property.name} outside the range from ${min} inclusive to ${max} inclusive items`,
				func: (p:any[]) => p.length >= min && p.length <= max
			}
		} else if (min) {
			return {
				message: `${property.name} is less or equal than ${min}`,
				func: (p:any[]) => p.length >= min
			}
		} else if (max) {
			return {
				message: `${property.name} is greater or equal than ${max}`,
				func: (p:any[]) => p.length <= max
			}
		}
		throw new Error(`${property.name} constraint minItems or maxItems undefined`)
	}

	protected createUniqueItemsConstraint (property: Schema): Constraint {
		return {
			message: `Does not comply with the format ${property.uniqueItems}`,
			func: (p:any[]) => {
				const unique = (value:any, index:number, self:any) => {
					return self.indexOf(value) !== index
				}
				return p.filter(unique).length > 0
			}
		}
	}
}

export class SchemaCollection {
	private cache: Cache
	private completer: SchemaCompleter
	private builder: SchemaBuilder
	constructor (cache:Cache, completer: SchemaCompleter, builder: SchemaBuilder) {
		this.cache = cache
		this.completer = completer
		this.builder = builder
	}

	public add (source: Schema) : BuildedSchema {
		if (!source.$id) {
			throw Error('$id not defined in schema')
		}
		const schema = this.completer.complete(source)
		const builded = this.builder.build(schema)
		this.cache.set(builded.$id as string, builded)
		return builded
	}

	public async get (uri: string) : Promise<BuildedSchema> {
		const parts = uri.split('#')
		let builded = this.cache.get(parts[0]) as BuildedSchema
		if (!builded) {
			builded = await this.getExternal(parts[0])
		}
		if (parts.length === 1) {
			return builded
		} else if (parts.length === 2) {
			return this.getInternal(builded, parts[1])
		} else {
			throw new Error(`${uri} invalid uri`)
		}
	}

	public async solve (schema: string|Schema) : Promise<BuildedSchema> {
		let builded:BuildedSchema|undefined
		if (typeof schema === 'string') {
			builded = await this.get(schema)
			if (builded === undefined) {
				throw new Error(`Uri ${schema} not found`)
			}
		} else {
			if ((schema as Schema) === undefined) {
				throw new Error('Schema parameter invalid')
			}
			if (!schema.$id) {
				throw new Error('Identifier $id of schema is invalid')
			}
			// If the schema exists, use the existing one.
			builded = await this.get(schema.$id)
			if (builded === undefined) {
				builded = this.add(schema)
			}
		}
		return builded
	}

	public async getByRef (root:BuildedSchema, parent: BuildedSchema, ref:string): Promise<BuildedSchema> {
		if (ref.startsWith('#')) {
			return this.getInternal(parent, ref)
		} else if (ref.startsWith('http')) {
			return await this.get(ref)
		} else if (ref.startsWith('/')) {
			if (!root.$id) {
				throw Error('$id not defined in schema')
			}
			const uri = new URL(root.$id, ref).href
			return await this.get(uri)
		} else {
			throw Error(`Ref: ${ref} is invalid`)
		}
	}

	private async getExternal (uri: string) : Promise<BuildedSchema> {
		const content = await Helper.get(uri)
		const schema = Helper.tryParse(content) as Schema
		if (!schema) {
			throw Error(`The schema with the uri ${uri} was not found`)
		}
		if (schema.$id !== uri) {
			throw Error(`Schema ${uri} not equal to ${schema.$id}`)
		}
		return this.add(schema)
	}

	private getInternal (property: BuildedSchema, ref:string):BuildedSchema {
		if (!ref.startsWith('#')) {
			throw Error(`${ref} invalid internal ref`)
		}
		if (ref === '#') {
			return property
		} else if (ref.startsWith('#/')) {
			const parts = ref.replace('#/', '').split('/')
			let _current = property
			for (let i = 0; i < parts.length; i++) {
				const part = parts[i]
				const buildProperty = _current.properties.find(p => p.name === part)
				if (buildProperty === undefined) {
					throw Error(`path ${parts.splice(0, i).join('.')} not fount in ${ref} ref`)
				}
				if (buildProperty.schema === undefined) {
					throw Error(`path ${parts.splice(0, i).join('.')} undefined schema`)
				}
				_current = buildProperty.schema
			}
			return _current
		} else {
			throw Error(`Invalid ${ref} ref`)
		}
	}
}

export class SchemaValidator {
	private schemas: SchemaCollection
	private expressions: ExpressionsManager
	constructor (schemas: SchemaCollection, expressions: ExpressionsManager) {
		this.schemas = schemas
		this.expressions = expressions
	}

	public async validate (schema:BuildedSchema, data: any): Promise<ValidateResult> {
		const result:ValidateResult = { errors: [], result: 'ok' }
		if (data === undefined || data === null) {
			result.errors.push({ message: 'data is empty', data: data })
		} else {
			const errors = await this.validateProperty(schema, schema, data, '.')
			if (errors.length > 0) {
				result.errors.push(...errors)
			}
		}
		result.result = result.errors.length === 0 ? 'ok' : 'error'
		return result
	}

	protected async validateProperty (root: BuildedSchema, property: BuildedSchema, data: any, path:string): Promise<ValidateError[]> {
		const errors:ValidateError[] = []
		const propertyErrors = this.validateConstraints(property, data)
		if (propertyErrors.length) {
			errors.push(...propertyErrors)
		}
		if (property.type === PropertyType.object) {
			for (const childProperty of property.properties) {
				const childPath = `${path}.${childProperty.name}`
				const value = data[childProperty.name]
				if (value !== undefined && value !== null) {
					const child = await this.getFromProperty(root, property, childProperty)
					if (!child) {
						throw new Error(`Schema not found in ${childPath}`)
					}
					const childErrors = await this.validateProperty(property, child, value, childPath)
					if (childErrors.length) {
						errors.push(...childErrors)
					}
				}
			}
		} else if (property.type === PropertyType.array) {
			const itemsProperty = property.properties.find(p => p.name === 'items')
			if (!itemsProperty) {
				throw new Error(`Schema items not found in ${path}.items`)
			}
			const itemsSchema = await this.getFromProperty(root, property, itemsProperty)
			if (!itemsSchema) {
				throw new Error(`Schema not found in ${path}.items`)
			}
			for (let i = 0; i < data.length; i++) {
				const childPath = `${path}.${i}`
				const item = data[i]
				if (item === null) {
					errors.push({ message: `${childPath} is null` })
				} else {
					const childErrors = await this.validateProperty(root, itemsSchema, item, childPath)
					if (childErrors.length) {
						errors.push(...childErrors)
					}
				}
			}
		}
		return errors
	}

	protected async getFromProperty (root: BuildedSchema, parent: BuildedSchema, property:BuildedPropertySchema) : Promise<BuildedSchema|undefined> {
		if (property.ref) {
			return await this.schemas.getByRef(root, parent, property.ref)
		} else if (property.schema) {
			return property.schema
		} else {
			return undefined
		}
	}

	protected validateConstraints (source: BuildedSchema, data: any): ValidateError[] {
		const errors:ValidateError[] = []
		if (source.constraints) {
			for (const constraint of source.constraints) {
				try {
					if (constraint.func) {
						if (!constraint.func(data)) {
							errors.push({ message: constraint.message, data: data })
						}
					} else if (constraint.expression) {
						if (!this.expressions.eval(constraint.expression, { '.': data })) {
							errors.push({ message: constraint.message, data: data })
						}
					}
				} catch (error: any) {
					errors.push({ message: error.message, data: data })
				}
			}
		}
		return errors
	}
}

export class SchemaManager {
	private completer: SchemaCompleter
	private builder: SchemaBuilder
	private schemas: SchemaCollection
	private validator: SchemaValidator
	constructor (completer: SchemaCompleter, builder: SchemaBuilder, schemas: SchemaCollection, validator: SchemaValidator) {
		this.completer = completer
		this.builder = builder
		this.validator = validator
		this.schemas = schemas
	}

	public complete (schema: Schema): Schema {
		return this.completer.complete(schema)
	}

	public build (schema: Schema): BuildedSchema {
		return this.add(schema)
	}

	public add (schema: Schema) : BuildedSchema {
		return this.schemas.add(schema)
	}

	public async get (uri: string) : Promise<BuildedSchema> {
		return this.schemas.get(uri)
	}

	public async validate (schema: string|Schema, data:any) : Promise<ValidateResult> {
		const _schema = await this.schemas.solve(schema)
		return this.validator.validate(_schema, data)
	}
}
