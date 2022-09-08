/* eslint-disable @typescript-eslint/ban-types */
import { Cache, Schema, Constraint, ConstraintType, PropertyType, ValidateResult, ValidateError, ConstraintEvaluateType } from '../model'
import { Helper, ExpressionsManager } from './'
import { ExpressionConfig } from '../parser'

export class SchemaBuilder {
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
			type: ConstraintType.type,
			evaluateType: ConstraintEvaluateType.function,
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
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any) => p > property.minimum && p < property.maximum
			}
		} else if (property.minimum && property.maximum && property.exclusiveMinimum && property.exclusiveMaximum) {
			return {
				message: `${property.name} outside the range form ${property.minimum} inclusive to ${property.maximum} inclusive`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any) => p >= property.minimum && p <= property.maximum
			}
		} else if (property.minimum && property.maximum && !property.exclusiveMinimum && property.exclusiveMaximum) {
			return {
				message: `${property.name} outside the range form ${property.minimum} to ${property.maximum} inclusive`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any) => p > property.minimum && p <= property.maximum
			}
		} else if (property.minimum && property.maximum && property.exclusiveMinimum && !property.exclusiveMaximum) {
			return {
				message: `${property.name} outside the range form ${property.minimum} inclusive to ${property.maximum}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any) => p >= property.minimum && p < property.maximum
			}
		} else if (property.minimum && !property.exclusiveMinimum) {
			return {
				message: `${property.name} is less or equal than ${property.minimum}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any) => p >= property.minimum
			}
		} else if (property.minimum && property.exclusiveMinimum) {
			return {
				message: `${property.name} is less than ${property.minimum}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any) => p > property.minimum
			}
		} else if (property.maximum && !property.exclusiveMaximum) {
			return {
				message: `${property.name} is greater or equal than ${property.maximum}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any) => p <= property.maximum
			}
		} else if (property.maximum && property.exclusiveMaximum) {
			return {
				message: `${property.name} is greater than ${property.maximum}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
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
			type: ConstraintType.range,
			evaluateType: ConstraintEvaluateType.function,
			func: (p:number) => p % property.multipleOf === 0
		}
	}

	protected createMinMaxLengthConstraint (property: Schema): Constraint {
		const min = property.minLength
		const max = property.maxLength
		if (min && max) {
			return {
				message: `${property.name} outside the range of ${min} to ${max}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:string) => p.length >= min && p.length <= max
				// expression: `${_propertyName} >= ${property.minimum} && ${_propertyName} <= ${property.maximum}`
			}
		} else if (min) {
			return {
				message: `${property.name} is less than ${min}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:string) => p.length >= min
				// expression: `${_propertyName} >= ${property.minimum}`
			}
		} else if (max) {
			return {
				message: `${property.name} is greater than ${max}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:string) => p.length <= max
				// expression: `${_propertyName} <= ${property.maximum}`
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
		// const values = _enum.values.map(p => p.value)
		// const values = _enum.values.map(p => typeof p.value === 'string' ? `"${p.value}"` : p.value).join(',')
		// const showValues = _enum.values.map(p => p.value).join(',')
		return {
			message: `${property.name}  not in [${showValues}]`,
			type: ConstraintType.enum,
			evaluateType: ConstraintEvaluateType.function,
			func: (p:string) => values.includes(p)
			// expression: `${propertyName}.in([${values}])`
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
			type: ConstraintType.format,
			evaluateType: ConstraintEvaluateType.function,
			func: (p:string) => format.regExp.test(p)
			// expression: `${propertyName}.test("${format.regExp}")`
		}
	}

	protected createPatternConstraint (property: Schema): Constraint {
		if (!property.pattern) {
			throw new Error(`Pattern not define in ${property.name}`)
		}
		const regExp = new RegExp(property.pattern)
		return {
			message: `${property.name} does not comply with the format ${property.pattern}`,
			type: ConstraintType.format,
			evaluateType: ConstraintEvaluateType.function,
			func: (p:string) => regExp.test(p)
		}
	}

	protected createRequiredConstraint (property: Schema): Constraint {
		return {
			message: `${property.name} does not comply with the format ${property.pattern}`,
			type: ConstraintType.format,
			evaluateType: ConstraintEvaluateType.function,
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
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any) => {
					const properties = Object.keys(p).length
					return properties >= min && properties <= max
				}
			}
		} else if (min) {
			return {
				message: `${property.name} is less or equal than ${min}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any) => Object.keys(p).length >= min
			}
		} else if (max) {
			return {
				message: `${property.name} is greater or equal than ${max}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
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
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any[]) => p.length >= min && p.length <= max
			}
		} else if (min) {
			return {
				message: `${property.name} is less or equal than ${min}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any[]) => p.length >= min
			}
		} else if (max) {
			return {
				message: `${property.name} is greater or equal than ${max}`,
				type: ConstraintType.range,
				evaluateType: ConstraintEvaluateType.function,
				func: (p:any[]) => p.length <= max
			}
		}
		throw new Error(`${property.name} constraint minItems or maxItems undefined`)
	}

	protected createUniqueItemsConstraint (property: Schema): Constraint {
		return {
			message: `Does not comply with the format ${property.uniqueItems}`,
			type: ConstraintType.range,
			evaluateType: ConstraintEvaluateType.function,
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
	private builder: SchemaBuilder
	constructor (cache:Cache, builder: SchemaBuilder) {
		this.cache = cache
		this.builder = builder
	}

	public add (source: Schema) : Schema {
		const schema = this.builder.build(source)
		if (!schema.$id) {
			throw Error('$id not defined in schema')
		}
		this.cache.set(schema.$id, schema)
		return schema
	}

	private async getExternal (uri: string) : Promise<Schema> {
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

	public getInternal (property: Schema, ref:string):Schema {
		if (!ref.startsWith('#')) {
			throw Error(`${ref} invalid internal ref`)
		}
		if (ref === '#') {
			return property
		} else if (ref.startsWith('#/')) {
			const parts = ref.replace('#/', '').split('/')
			let _current = property as any
			for (const part of parts) {
				_current = _current[part]
			}
			return _current as Schema
		} else {
			throw Error(`Invalid ${ref} ref`)
		}
	}

	public async get (uri: string) : Promise<Schema> {
		const parts = uri.split('#')
		let schema = this.cache.get(parts[0]) as Schema
		if (!schema) {
			schema = await this.getExternal(parts[0])
		}
		if (parts.length === 1) {
			return schema
		} else if (parts.length === 2) {
			return this.getInternal(schema, parts[1])
		} else {
			throw new Error(`${uri} invalid uri`)
		}
	}

	public async solve (schema: string|Schema) : Promise<Schema> {
		let _schema:Schema|undefined
		if (typeof schema === 'string') {
			_schema = await this.get(schema)
			if (_schema === undefined) {
				throw new Error(`Uri ${schema} not found`)
			}
		} else {
			_schema = schema as Schema
			if ((schema as Schema) === undefined) {
				throw new Error('Schema parameter invalid')
			}
			if (!schema.$id) {
				throw new Error('Identifier $id of schema is invalid')
			}
			// If the schema exists, use the existing one.
			_schema = await this.get(schema.$id)
			if (_schema === undefined) {
				_schema = this.add(schema)
			}
		}
		return _schema
	}
}

export class SchemaValidator {
	private schemas: SchemaCollection
	private expressions: ExpressionsManager
	constructor (schemas: SchemaCollection, expressions: ExpressionsManager) {
		this.schemas = schemas
		this.expressions = expressions
	}

	public async validate (schema:Schema, data: any): Promise<ValidateResult> {
		const result:ValidateResult = { errors: [], result: 'ok' }

		if (data === undefined || data === null) {
			result.errors.push({ message: 'data is empty', data: data })
		} else {
			const errors = await this.validateProperty(schema, schema, data)
			if (errors.length > 0) {
				result.errors.push(...errors)
			}
		}
		result.result = result.errors.length === 0 ? 'ok' : 'error'
		return result
	}

	protected async getByRef (root:Schema, parent: Schema, ref:string): Promise<Schema> {
		if (ref.startsWith('#')) {
			return this.schemas.getInternal(parent, ref)
		} else if (ref.startsWith('http')) {
			return await this.schemas.get(ref)
		} else if (ref.startsWith('/')) {
			if (!root.$id) {
				throw Error('$id not defined in schema')
			}
			const uri = new URL(root.$id, ref).href
			return await this.schemas.get(uri)
		} else {
			throw Error(`Ref: ${ref} is invalid`)
		}
	}

	protected async validateProperty (root: Schema, property: Schema, data: any): Promise<ValidateError[]> {
		const errors:ValidateError[] = []
		const propertyErrors = this.validateConstraints(property, data)
		if (propertyErrors.length) {
			errors.push(...propertyErrors)
		}
		if (property.type === PropertyType.object) {
			if (property.properties) {
				for (const childName in property.properties) {
					let child = property.properties[childName]
					const value = data[childName]
					if (value === undefined || value === null) {
						if (property.required && property.required.includes(childName)) {
							errors.push({ message: `${childName} is required`, data: data })
						}
					} else {
						if (child.$ref) {
							child = await this.getByRef(root, property, child.$ref)
						}
						const childErrors = await this.validateProperty(property, child, value)
						if (childErrors.length) {
							errors.push(...childErrors)
						}
					}
				}
			}
		} else if (property.type === PropertyType.array) {
			for (let i = 0; i < data.length; i++) {
				const item = data[i]
				if (item === null) {
					errors.push({ message: `item ${i + 1} is null` })
				} else {
					if (property.items) {
						const childErrors = await this.validateProperty(root, property.items, item)
						if (childErrors.length) {
							errors.push(...childErrors)
						}
					}
				}
			}
		}
		return errors
	}

	protected validateConstraints (source: Schema, data: any): ValidateError[] {
		const errors:ValidateError[] = []
		if (source.constraints) {
			for (const constraint of source.constraints) {
				try {
					if (constraint.evaluateType === ConstraintEvaluateType.function && constraint.func) {
						if (!constraint.func(data)) {
							errors.push({ message: constraint.message, data: data })
						}
					} else if (constraint.evaluateType === ConstraintEvaluateType.expression && constraint.expression) {
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
	private builder: SchemaBuilder
	private schemas: SchemaCollection
	private validator: SchemaValidator
	constructor (builder: SchemaBuilder, schemas: SchemaCollection, validator: SchemaValidator) {
		this.builder = builder
		this.validator = validator
		this.schemas = schemas
	}

	public complete (schema: Schema): void {
		this.builder.complete(schema)
	}

	public build (schema: Schema): Schema {
		return this.builder.build(schema)
	}

	public add (schema: Schema) : Schema {
		return this.schemas.add(schema)
	}

	public async get (uri: string) : Promise<Schema> {
		return this.schemas.get(uri)
	}

	public async validate (schema: string|Schema, data:any) : Promise<ValidateResult> {
		const _schema = await this.schemas.solve(schema)
		return this.validator.validate(_schema, data)
	}
}
