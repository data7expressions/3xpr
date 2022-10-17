import { h3lp, Validator } from 'h3lp'
import { Context, Operand, StackEvaluator, Type, ArrayType, ObjectType, PropertyType, IEvaluator } from '../contract'
import { Const, Var, KeyVal, CallFunc, Arrow } from '../operand'

export class TypeHelper {
	private validator:Validator
	constructor (validator:Validator) {
		this.validator = validator
	}

	public getType (value: any): Type {
		if (value === null || value === undefined) {
			return 'any'
		} else if (Array.isArray(value)) {
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
			if (this.validator.isInteger(value)) {
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

	public toString (type?: Type): string {
		if (type === undefined) {
			return 'any'
		}
		if (this.isPrimitive(type)) {
			return type.toString()
		}
		if (this.isObjectType(type)) {
			const properties:string[] = []
			const objectType = type as ObjectType
			for (const propertyType of objectType.properties) {
				properties.push(`${propertyType.name}:${this.toString(propertyType.type)}`)
			}
			return `{${properties.join(',')}}`
		}
		if (this.isArrayType(type)) {
			const arrayType = type as ArrayType
			return `[${this.toString(arrayType.items)}]`
		}
		return 'any'
	}

	public serialize (type?: Type):string| undefined {
		if (type === undefined || type === null) {
			return undefined
		}
		return JSON.stringify(type)
	}

	public deserialize (type?: string):Type | undefined {
		if (type === undefined || type === null) {
			return undefined
		}
		if (this.isPrimitive(type)) {
			return type as Type
		}
		return JSON.parse(type) as Type
	}
}

export class OperandHelper {
	public objectKey (obj:any) : any {
		const keys = Object.keys(obj).sort()
		const list:string[] = []
		for (const key of keys) {
			list.push(key)
			list.push(obj[key].toString())
		}
		return list.join('|')
	}

	public setStackAble (operand: Operand, index = 0, parent?: StackEvaluator): void {
		try {
			const id = parent ? parent.id + '.' + index : '0'
			const _index = parent ? index : 0
			const level = parent && parent.level ? parent.level + 1 : 0
			const stackEvaluator = new StackEvaluator(id, _index, level, operand.evaluator as IEvaluator, operand)
			operand.evaluator = stackEvaluator
			for (let i = 0; i < operand.children.length; i++) {
				this.setStackAble(operand.children[i], i, stackEvaluator)
			}
		} catch (error: any) {
			throw new Error('set stackAble: ' + operand.name + ' error: ' + error.toString())
		}
	}

	public getKeys (variable:Var, fields: KeyVal[], list: any[], context: Context): any[] {
		const keys:any[] = []
		// loop through the list and group by the grouper fields
		for (const item of list) {
			let key = ''
			const values = []
			for (const keyValue of fields) {
				context.data.set(Var.name, item)
				// variable.set(item)
				const value = keyValue.children[0].eval(context)
				if (typeof value === 'object') {
					throw new Error(`Property value ${keyValue.name} is an object, so it cannot be grouped`)
				}
				key = key === '' ? value : `${key}-${value}`
				values.push({ name: keyValue.name, value: value })
			}
			// find if the key already exists in the list of keys
			const keyItem = keys.find((p:any) => p.key === key)
			if (keyItem) {
				// if the key exists add the item
				keyItem.items.push(item)
			} else {
				// if the key does not exist add the key, the values and the item
				keys.push({ key: key, values: values, items: [item], summarizers: [] })
			}
		}
		return keys
	}

	public haveAggregates (operand: Operand): boolean {
		if (!(operand instanceof Arrow) && operand instanceof CallFunc && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			return true
		} else if (operand.children && operand.children.length > 0) {
			for (const child of operand.children) {
				if (this.haveAggregates(child)) {
					return true
				}
			}
		}
		return false
	}

	public findAggregates (operand: Operand): CallFunc[] {
		if (!(operand instanceof Arrow) && operand instanceof CallFunc && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			return [operand]
		} else if (operand.children && operand.children.length > 0) {
			let aggregates:CallFunc[] = []
			for (const child of operand.children) {
				const childAggregates = this.findAggregates(child)
				if (childAggregates.length > 0) {
					aggregates = aggregates.concat(childAggregates)
				}
			}
			return aggregates
		}
		return []
	}

	public solveAggregates (list: any[], variable: Var, operand: Operand, context: Context): Operand {
		if (!(operand instanceof Arrow) && operand instanceof CallFunc && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			let value:any
			switch (operand.name) {
			case 'avg':
				value = this.avg(list, variable, operand.children[0], context)
				break
			case 'count':
				value = this.count(list, variable, operand.children[0], context)
				break
			case 'first':
				value = this.first(list, variable, operand.children[0], context)
				break
			case 'last':
				value = this.last(list, variable, operand.children[0], context)
				break
			case 'max':
				value = this.max(list, variable, operand.children[0], context)
				break
			case 'min':
				value = this.min(list, variable, operand.children[0], context)
				break
			case 'sum':
				value = this.sum(list, variable, operand.children[0], context)
				break
			}
			return new Const('0', value)
		} else if (operand.children && operand.children.length > 0) {
			for (let i = 0; i < operand.children.length; i++) {
				operand.children[i] = this.solveAggregates(list, variable, operand.children[i], context)
			}
		}
		return operand
	}

	public count (list: any[], variable: Var, aggregate: Operand, context: Context): number {
		let count = 0
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			if (aggregate.eval(context)) {
				count++
			}
		}
		return count
	}

	public first (list: any[], variable: Var, aggregate: Operand, context: Context): any {
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			if (aggregate.eval(context)) {
				return item
			}
		}
		return null
	}

	public last (list: any[], variable: Var, aggregate: Operand, context: Context): any {
		for (let i = list.length - 1; i >= 0; i--) {
			const item = list[i]
			// variable.set(item)
			context.data.set(variable.name, item)
			if (aggregate.eval(context)) {
				return item
			}
		}
		return null
	}

	public max (list: any[], variable: Var, aggregate: Operand, context: Context): any {
		let max:any
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (max === undefined || (value !== null && value > max)) {
				max = value
			}
		}
		return max
	}

	public min (list: any[], variable: Var, aggregate: Operand, context: Context): any {
		let min:any
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (min === undefined || (value !== null && value < min)) {
				min = value
			}
		}
		return min
	}

	public avg (list: any[], variable: Var, aggregate: Operand, context: Context): number {
		let sum = 0
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (value !== null) {
				sum = sum + value
			}
		}
		return list.length > 0 ? sum / list.length : 0
	}

	public sum (list: any[], variable: Var, aggregate: Operand, context: Context): number {
		let sum = 0
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			const value = aggregate.eval(context)
			if (value !== null) {
				sum = sum + value
			}
		}
		return sum
	}
}

export const typeHelper = new TypeHelper(h3lp.validator)
export const operandHelper = new OperandHelper()
