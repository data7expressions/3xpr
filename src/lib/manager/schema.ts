import { Schema, Entity, Constraint, ConstraintType, PropertyType, Enum, EnumValue, EntityProperty, ValidateResult, ValidateError } from '../model'
import { Helper, ExpressionsManager } from './'

export class SchemaExtender {
	public extend (source: Schema): Schema {
		if (!source) {
			throw new Error('source is empty')
		}
		const schema = Helper.clone(source)
		this.SecureArrays(schema)
		this._extend(schema)
		this.complete(schema)
		this.createConstraints(schema)
		return schema
	}

	protected SecureArrays (schema: Schema) {
		if (!schema.enums) {
			schema.enums = []
		}
		if (!schema.formats) {
			schema.formats = []
		}
		if (!schema.entities) {
			schema.entities = []
		}
		if (!schema.models) {
			schema.models = []
		}
		for (const _enum of schema.enums) {
			if (!_enum.values) {
				_enum.values = []
			}
		}
		for (const entity of schema.entities) {
			if (!entity.properties) {
				entity.properties = []
			}
			if (!entity.constraints) {
				entity.constraints = []
			}
		}
		for (const model of schema.models) {
			if (!model.constraints) {
				model.constraints = []
			}
		}
	}

	protected _extend (schema: Schema) {
		for (const entity of schema.entities) {
			this.extendEntity(entity, schema.entities)
		}
		for (const model of schema.models) {
			this.extendProperty(model, schema.entities)
		}
	}

	protected extendEntity (entity: Entity, entities: Entity[]): void {
		if (entity.extends) {
			const base = entities.find(p => p.name === entity.extends)
			if (base === undefined) {
				throw new Error(`${entity.extends} not found`)
			}
			if (base.extends) {
				this.extendEntity(base, entities)
			}
			// extend properties
			if (base.properties !== undefined && base.properties.length > 0) {
				this.extendObject(entity.properties, base.properties)
			}
			// extend constraints
			if (base.constraints !== undefined && base.constraints.length > 0) {
				if (entity.constraints === undefined) {
					entity.constraints = []
				}
				this.extendObject(entity.constraints, base.constraints)
			}
		}
		for (const property of entity.properties) {
			this.extendProperty(property, entities)
		}
		// elimina dado que ya fue extendido
		if (entity.extends) {
			delete entity.extends
		}
	}

	protected extendProperty (property: EntityProperty, entities: Entity[]): void {
		if (property.extends) {
			const base = entities.find(p => p.name === property.extends)
			if (base === undefined) {
				throw new Error(`${property.extends} not found`)
			}
			if (base.extends) {
				this.extendEntity(base, entities)
			}
			// extend properties
			if (base.properties !== undefined && base.properties.length > 0 && property.properties === undefined) {
				property.properties = []
			}
			this.extendObject(property, base)
		}
		if (property.properties && property.properties.length > 0) {
			for (const child of property.properties) {
				this.extendProperty(child, entities)
			}
		}
		// elimina dado que ya fue extendido
		if (property.extends) {
			delete property.extends
		}
	}

	protected extendObject (obj: any, base: any) {
		if (Array.isArray(base)) {
			for (const baseChild of base) {
				const objChild = obj.find((p: any) => p.name === baseChild.name)
				if (objChild === undefined) {
					obj.push(Helper.clone(baseChild))
				} else {
					this.extendObject(objChild, baseChild)
				}
			}
		} else if (typeof base === 'object') {
			for (const k in base) {
				if (obj[k] === undefined) {
					obj[k] = Helper.clone(base[k])
				} else if (typeof obj[k] === 'object') {
					this.extendObject(obj[k], base[k])
				}
			}
		}
		return obj
	}

	public complete (schema: Schema): void {
		for (const _enum of schema.enums) {
			this.completeEnum(_enum)
		}
		for (const entity of schema.entities) {
			for (const property of entity.properties) {
				this.completeProperty(property)
			}
		}
		for (const model of schema.models) {
			this.completeProperty(model)
		}
	}

	protected completeEnum (_enum: Enum):void {
		for (const value of _enum.values) {
			if (!value.value) {
				value.value = value.name
			}
		}
	}

	protected completeProperty (property: EntityProperty):void {
		if (property.type === undefined) {
			property.type = PropertyType.string
		}
		if (property.required === undefined) {
			property.required = true
		}
		if (property.properties && property.properties.length > 0) {
			for (const child of property.properties) {
				this.completeProperty(child)
			}
		}
	}

	protected createConstraints (schema: Schema): void {
		for (const entity of schema.entities) {
			for (const property of entity.properties) {
				for (const constraint of entity.constraints) {
					constraint.type = ConstraintType.custom
				}
				const constraints = this.createConstraintsProperty(schema, property, property.name, entity.name)
				entity.constraints.unshift(...constraints)
			}
		}
		for (const model of schema.models) {
			for (const constraint of model.constraints) {
				constraint.type = ConstraintType.custom
			}
			const constraints = this.createConstraintsProperty(schema, model, '.')
			model.constraints.unshift(...constraints)
		}
	}

	protected createConstraintsProperty (schema: Schema, property: EntityProperty, propertyName:string, entity?:string): Constraint[] {
		const constraints:Constraint[] = []
		// const propertyName = parent ? `${parent}.${property.name}` : property.name
		const propertyRef = entity ? `${entity}.${propertyName}` : propertyName
		const valueConstraint = this.createValueConstraint(propertyRef, property, propertyName)
		if (valueConstraint) {
			constraints.push(valueConstraint)
		}
		if ((property.min || property.max) && [PropertyType.integer, PropertyType.decimal, PropertyType.string, PropertyType.date, PropertyType.datetime, PropertyType.time].includes(property.type)) {
			constraints.push(this.createMinMaxConstraint(propertyRef, property, propertyName))
		}
		if (property.enum && [PropertyType.integer, PropertyType.decimal, PropertyType.string].includes(property.type)) {
			constraints.push(this.createEnumConstraint(schema, propertyRef, property, propertyName))
		}
		if (property.format && [PropertyType.string, PropertyType.date, PropertyType.datetime, PropertyType.time].includes(property.type)) {
			constraints.push(this.createFormatConstraint(schema, propertyRef, property, propertyName))
		}
		if (property.properties && property.properties.length > 0) {
			for (const child of property.properties) {
				const childConstraints = this.createConstraintsProperty(schema, child, `${propertyName}.${child.name}`, entity)
				constraints.push(...childConstraints)
			}
		}
		return constraints
	}

	protected createValueConstraint (propertyRef:string, property: EntityProperty, propertyName:string): Constraint | null {
		let condition:string|undefined
		switch (property.type) {
		case PropertyType.boolean:
			condition = `${propertyName}.isBoolean()`; break
		case PropertyType.string:
			condition = `${propertyName}.isString()`; break
		case PropertyType.integer:
			condition = `${propertyName}.isInteger()`; break
		case PropertyType.decimal:
			condition = `${propertyName}.isDecimal()`; break
		case PropertyType.date:
			condition = `${propertyName}.isDate()`; break
		case PropertyType.datetime:
			condition = `${propertyName}.isDatetime()`; break
		case PropertyType.time:
			condition = `${propertyName}.isTime()`; break
		case PropertyType.object:
			condition = `${propertyName}.isObject()`; break
		case PropertyType.array:
			condition = `${propertyName}.isArray()`; break
		}
		if (condition === undefined) {
			return null
		}
		return { message: `invalid ${propertyRef}`, condition: condition, type: ConstraintType.value }
	}

	protected createMinMaxConstraint (propertyRef:string, property: EntityProperty, propertyName:string): Constraint {
		const _propertyName = property.type === PropertyType.string ? `${propertyName}.length()` : propertyName
		if (property.min && property.max) {
			return { message: `${propertyRef} outside the range of ${property.min} to ${property.max}`, condition: `${_propertyName} >= ${property.min} && ${_propertyName} <= ${property.max}`, type: ConstraintType.range }
		} else if (property.min) {
			return { message: `${propertyRef} is less than ${property.min}`, condition: `${_propertyName} >= ${property.min}`, type: ConstraintType.range }
		} else if (property.max) {
			return { message: `${propertyRef} is greater than ${property.max}`, condition: `${_propertyName} <= ${property.max}`, type: ConstraintType.range }
		}
		throw new Error(`${propertyRef} constraint min or max undefined`)
	}

	protected createEnumConstraint (schema: Schema, propertyRef:string, property: EntityProperty, propertyName:string): Constraint {
		if (!property.enum) {
			throw new Error(`Enum not define in ${propertyRef}`)
		}
		const _enum = schema.enums.find(p => p.name === property.enum)
		if (!_enum) {
			throw new Error(`Enum ${property.enum} define in ${propertyRef} not found`)
		}
		const values = _enum.values.map(p => typeof p.value === 'string' ? `"${p.value}"` : p.value).join(',')
		const showValues = _enum.values.map(p => p.value).join(',')
		return { message: `${propertyRef}  not in [${showValues}]`, condition: `${propertyName}.in([${values}])`, type: ConstraintType.enum }
	}

	protected createFormatConstraint (schema: Schema, propertyRef:string, property: EntityProperty, propertyName:string): Constraint {
		if (!property.format) {
			throw new Error(`Format not define in ${propertyRef}`)
		}
		const format = schema.formats.find(p => p.name === property.format)
		if (!format) {
			throw new Error(`Format ${property.format} define in ${propertyRef} not found`)
		}
		return { message: `${propertyRef} does not comply with the format ${format.name}`, condition: `${propertyName}.test("${format.regExp}")`, type: ConstraintType.format }
	}
}

export class SchemaValidator {
	private expressionsManager: ExpressionsManager

	constructor (expressionsManager: ExpressionsManager) {
		this.expressionsManager = expressionsManager
	}

	public validate (data: any, schema:Schema, modelName:string): ValidateResult {
		const model = schema.models.find(p => p.name === modelName)
		if (model === undefined) {
			throw new Error(`${modelName} model not found`)
		}
		const result:ValidateResult = { errors: [], result: 'ok' }
		const errors = this.validateProperty(schema, model, '.', { '.': data })
		if (errors.length > 0) {
			result.errors.push(...errors)
		}
		const modelErrors = this.validateConstraint(model.constraints, { '.': data })
		if (modelErrors.length > 0) {
			result.errors.push(...modelErrors)
		}
		result.result = result.errors.length === 0 ? 'ok' : 'error'
		return result
	}

	protected validateProperty (schema: Schema, property: EntityProperty, propertyName:string, data: any):ValidateError[] {
		const errors:ValidateError[] = []
		if (property.entity) {
			const entity = schema.entities.find(p => p.name === property.entity)
			if (entity === undefined) {
				errors.push({ message: `${property.entity} entity not found`, data: data })
				return errors
			}
			const value = data[propertyName]
			if (value === undefined || value === null) {
				if (property.required) {
					errors.push({ message: `${property.name} is required`, data: data })
				}
				return errors
			}
			if (property.type === PropertyType.object) {
				const childErrors = this.validateConstraint(entity.constraints, value)
				if (childErrors.length) {
					errors.push(...childErrors)
				}
			} else if (property.type === PropertyType.array) {
				for (const item of value) {
					const childErrors = this.validateConstraint(entity.constraints, item)
					if (childErrors.length) {
						errors.push(...childErrors)
					}
				}
			}
		}
		return errors
	}

	protected validateConstraint (constraints: Constraint[], data: any): ValidateError[] {
		const errors:ValidateError[] = []
		for (const constraint of constraints) {
			try {
				if (!this.expressionsManager.eval(constraint.condition, data)) {
					errors.push({ message: constraint.message, condition: constraint.condition, data: data })
				}
			} catch (error: any) {
				errors.push({ message: error.message, condition: constraint.condition, data: data })
			}
		}
		return errors
	}
}

export class SchemaManager {
	private extender: SchemaExtender
	private validator: SchemaValidator
	private schemas:Schema[]

	constructor (extender: SchemaExtender, validator: SchemaValidator) {
		this.extender = extender
		this.validator = validator
		this.schemas = []
	}

	public complete (schema: Schema): void {
		this.extender.complete(schema)
	}

	public extend (schema: Schema): Schema {
		return this.extender.extend(schema)
	}

	public add (schema: Schema) : Schema {
		const _schema = this.extender.extend(schema)
		if (_schema.models.length === 0) {
			throw new Error(`Schema ${_schema.name} must have at least one model`)
		}
		this.schemas.push(_schema)
		return _schema
	}

	public get (schema: string|Schema) : Schema {
		let _schema:Schema|undefined
		if (typeof schema === 'string') {
			_schema = this.schemas.find(p => p.name === schema)
			if (_schema === undefined) {
				throw new Error(`${schema} schema not found`)
			}
		} else {
			_schema = schema as Schema
			if ((schema as Schema) === undefined) {
				throw new Error('Schema parameter invalid')
			}
			// If the schema exists, use the existing one.
			_schema = this.schemas.find(p => p.name === schema.name)
			if (_schema === undefined) {
				_schema = this.add(schema)
			}
		}
		return _schema
	}

	public validate (data:any, schema: string|Schema, model?:string) : ValidateResult {
		const _schema = this.get(schema)
		let modelName:string
		if (model === undefined) {
			modelName = _schema.models[0].name
		} else {
			if (_schema.models.find(p => p.name === model) === undefined) {
				throw new Error(`${model} model not found in ${_schema.name} schema`)
			}
			modelName = model
		}
		return this.validator.validate(data, _schema, modelName)
	}
}
