import { Context, Operand, OperandType } from '../../shared/domain'
import { ConstBuilder } from '../domain/constBuilder'

export class OperandHelper {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly constBuilder: ConstBuilder) {}

	public toExpression (operand: Operand): string {
		const list: string[] = []
		switch (operand.type) {
		case OperandType.Const:
		case OperandType.Var:
		case OperandType.Property:
			list.push(operand.name)
			break
		case OperandType.List:
			list.push('[')
			for (let i = 0; i < operand.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(operand.children[i]))
			}
			list.push(']')
			break
		case OperandType.KeyVal:
			list.push(operand.name + ':')
			list.push(this.toExpression(operand.children[0]))
			break
		case OperandType.Obj:
			list.push('{')
			for (let i = 0; i < operand.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(operand.children[i]))
			}
			list.push('}')
			break
		case OperandType.Operator:
			if (operand.children.length === 1) {
				list.push(operand.name)
				list.push(this.toExpression(operand.children[0]))
			} else if (operand.children.length === 2) {
				list.push('(')
				list.push(this.toExpression(operand.children[0]))
				list.push(operand.name)
				list.push(this.toExpression(operand.children[1]))
				list.push(')')
			}
			break
		case OperandType.CallFunc:
			list.push(operand.name)
			list.push('(')
			for (let i = 0; i < operand.children.length; i++) {
				if (i > 0) list.push(',')
				list.push(this.toExpression(operand.children[i]))
			}
			list.push(')')
			break
		case OperandType.ChildFunc:
			list.push(this.toExpression(operand.children[0]))
			list.push('.' + operand.name)
			list.push('(')
			for (let i = 1; i < operand.children.length; i++) {
				if (i > 1) list.push(',')
				list.push(this.toExpression(operand.children[i]))
			}
			list.push(')')
			break
		case OperandType.Arrow:
			list.push(this.toExpression(operand.children[0]))
			list.push('.' + operand.name)
			list.push('(')
			list.push(operand.children[1].name)
			list.push('=>')
			list.push(this.toExpression(operand.children[2]))
			list.push(')')
			break
		default:
			throw new Error('node: ' + operand.type + ' not supported')
		}
		return list.join('')
	}

	public objectKey (obj:any) : any {
		const keys = Object.keys(obj).sort()
		const list:string[] = []
		for (const key of keys) {
			list.push(key)
			list.push(obj[key].toString())
		}
		return list.join('|')
	}

	public getKeys (variable:Operand, fields: Operand[], list: any[], context: Context): any[] {
		const keys:any[] = []
		// loop through the list and group by the grouper fields
		for (const item of list) {
			let key = ''
			const values = []
			for (const keyValue of fields) {
				context.data.set(variable.name, item)
				// variable.set(item)
				const value = keyValue.children[0].eval(context)
				if (typeof value === 'object') {
					throw new Error(`Property value ${keyValue.name} is an object, so it cannot be grouped`)
				}
				key = key === '' ? value : `${key}-${value}`
				values.push({ name: keyValue.name, value })
			}
			// find if the key already exists in the list of keys
			const keyItem = keys.find((p:any) => p.key === key)
			if (keyItem) {
				// if the key exists add the item
				keyItem.items.push(item)
			} else {
				// if the key does not exist add the key, the values and the item
				keys.push({ key, values, items: [item], summarizers: [] })
			}
		}
		return keys
	}

	public haveAggregates (operand: Operand): boolean {
		if (!(operand.type === OperandType.Arrow) && operand.type === OperandType.CallFunc && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
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

	public findAggregates (operand: Operand): Operand[] {
		if (!(operand.type === OperandType.Arrow) && operand.type === OperandType.CallFunc && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
			return [operand]
		} else if (operand.children && operand.children.length > 0) {
			let aggregates:Operand[] = []
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

	public solveAggregates (list: any[], variable: Operand, operand: Operand, context: Context): Operand {
		if (!(operand.type === OperandType.Arrow) && operand.type === OperandType.CallFunc && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
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
			return this.constBuilder.build(operand.pos, value)
		} else if (operand.children && operand.children.length > 0) {
			for (let i = 0; i < operand.children.length; i++) {
				operand.children[i] = this.solveAggregates(list, variable, operand.children[i], context)
			}
		}
		return operand
	}

	public count (list: any[], variable: Operand, aggregate: Operand, context: Context): number {
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

	public first (list: any[], variable: Operand, aggregate: Operand, context: Context): any {
		for (const item of list) {
			// variable.set(item)
			context.data.set(variable.name, item)
			if (aggregate.eval(context)) {
				return item
			}
		}
		return null
	}

	public last (list: any[], variable: Operand, aggregate: Operand, context: Context): any {
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

	public max (list: any[], variable: Operand, aggregate: Operand, context: Context): any {
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

	public min (list: any[], variable: Operand, aggregate: Operand, context: Context): any {
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

	public avg (list: any[], variable: Operand, aggregate: Operand, context: Context): number {
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

	public sum (list: any[], variable: Operand, aggregate: Operand, context: Context): number {
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
