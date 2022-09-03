import { Schema, Entity, Enum, EnumValue, Constraint, PropertyType, EntityProperty } from '../model'
import { Helper } from '../manager'

class SchemaExtender {
	public extend (source: Schema): Schema {
		if (source) {
			throw new Error('source is empty')
		}
		const schema = Helper.clone(source)
		this.extendEntities(schema)
		this.complete(schema)
		return schema
	}

	private extendEntities (schema: Schema) {
		if (schema.entities === undefined) {
			schema.entities = []
		}
		for (const entity of schema.entities) {
			this.entitySecureArrays(entity)
		}
		for (const entity of schema.entities) {
			if (entity && entity.extends) {
				this.extendEntity(entity, schema.entities)
			}
		}
	}

	private entitySecureArrays (entity:Entity) {
		if (entity.properties === undefined) {
			entity.properties = []
		}
		if (entity.constraints === undefined) {
			entity.constraints = []
		}
	}

	public complete (schema: Schema): void {
		if (schema) {
			if (schema.entities) {
				this.completeEntities(schema.entities)
			}
		}
	}

	private completeEntities (entities: Entity[]): void {
		if (entities && entities.length) {
			for (const entity of entities) {
				this.completeProperties(entity)
			}
		}
	}

	private completeProperties (entity: Entity):void {
		if (entity.properties !== undefined) {
			for (const property of entity.properties) {
				if (property.type === undefined) {
					property.type = PropertyType.string
				}
				if (property.required === undefined) {
					property.required = true
				}
			}
		}
	}

	private createConstraints (schema: Schema, properties: EntityProperty[], entity?:string, parent?:string): Constraint[] {
		const constraints:Constraint[] = []
		for (const property of properties) {
			const propertyName = parent ? `${parent}.${property.name}` : property.name
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
				const subConstraints = this.createConstraints(schema, property.properties, entity, propertyName)
				constraints.push(...subConstraints)
			}
		}
		return constraints
	}

	private createMinMaxConstraint (propertyRef:string, property: EntityProperty, propertyName:string): Constraint {
		const _propertyName = property.type === PropertyType.string ? `${propertyName}.length()` : propertyName
		if (property.min && property.max) {
			return { message: `${propertyRef} outside the range of ${property.min} to ${property.max}`, condition: `${_propertyName} <= ${property.min} && ${_propertyName} >= ${property.max}` }
		} else if (property.min) {
			return { message: `${propertyRef} is less than ${property.min}`, condition: `${_propertyName} <= ${property.min}` }
		} else if (property.max) {
			return { message: `${propertyRef} is greater than ${property.max}`, condition: `${_propertyName} >= ${property.max}` }
		}
		throw new Error(`${propertyRef} constraint min or max undefined`)
	}

	private createValueConstraint (propertyRef:string, property: EntityProperty, propertyName:string): Constraint | null {
		let condition:string
		let validTypeCondition:string|undefined
		switch (property.type) {
		case PropertyType.boolean:
			validTypeCondition = `${propertyName}.isBoolean()`; break
		case PropertyType.string:
			validTypeCondition = `${propertyName}.isString()`; break
		case PropertyType.integer:
			validTypeCondition = `${propertyName}.isInteger()`; break
		case PropertyType.decimal:
			validTypeCondition = `${propertyName}.isDecimal()`; break
		case PropertyType.date:
			validTypeCondition = `${propertyName}.isDate()`; break
		case PropertyType.datetime:
			validTypeCondition = `${propertyName}.isDatetime()`; break
		case PropertyType.time:
			validTypeCondition = `${propertyName}.isTime()`; break
		case PropertyType.object:
			validTypeCondition = `${propertyName}.isObject()`; break
		case PropertyType.array:
			validTypeCondition = `${propertyName}.isArray()`; break
		}
		if (property.required) {
			const requiredCondition = property.type === PropertyType.string ? `isNotEmpty(${propertyName})` : `isNotNull(${propertyName})`
			if (validTypeCondition !== undefined) {
				condition = `${requiredCondition} && ${validTypeCondition}`
			} else {
				condition = requiredCondition
			}
		} else if (validTypeCondition) {
			condition = validTypeCondition
		} else {
			return null
		}
		return { message: `${propertyRef} is required`, condition: condition }
	}

	private createEnumConstraint (schema: Schema, propertyRef:string, property: EntityProperty, propertyName:string): Constraint {
		if (!property.enum) {
			throw new Error(`Enum not define in ${propertyRef}`)
		}
		const _enum = schema.enums.find(p => p.name === property.enum)
		if (!_enum) {
			throw new Error(`Enum ${property.enum} define in ${propertyRef} not found`)
		}
		const values = _enum.values.map(p => p.value).join(',')
		return { message: `${propertyRef}  not in [${values}]`, condition: `${propertyName}.in(${values})` }
	}

	private createFormatConstraint (schema: Schema, propertyRef:string, property: EntityProperty, propertyName:string): Constraint {
		if (!property.format) {
			throw new Error(`Format not define in ${propertyRef}`)
		}
		const format = schema.formats.find(p => p.name === property.enum)
		if (!format) {
			throw new Error(`Format ${property.format} define in ${propertyRef} not found`)
		}
		return { message: `${propertyRef} does not comply with the format ${format.name}`, condition: `${propertyName}.test("${format.regExp}")` }
	}

	private extendEntity (entity: Entity, entities: Entity[]): void {
		const base = entities.find(p => p.name === entity.extends)
		if (base === undefined) {
			throw new Error(`${entity.extends} not found`)
		}
		if (base.extends) {
			this.extendEntity(base, entities)
		}

		// extend properties
		if (base.properties !== undefined && base.properties.length > 0) {
			if (entity.properties === undefined) {
				entity.properties = []
			}
			this.extendObject(entity.properties, base.properties)
		}
		// extend constraints
		if (base.constraints !== undefined && base.constraints.length > 0) {
			if (entity.constraints === undefined) {
				entity.constraints = []
			}
			this.extendObject(entity.constraints, base.constraints)
		}
		// elimina dado que ya fue extendido
		delete entity.extends
	}

	private extendObject (obj: any, base: any) {
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
}
