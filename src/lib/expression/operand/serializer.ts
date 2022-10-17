import { Operand, OperandMetadata, ISerializer, OperandFactory } from '../contract'
import { Var, KeyVal } from './operands'
import { typeHelper } from '..'
export class OperandSerializer implements ISerializer<Operand> {
	private factory: OperandFactory
	constructor (factory: OperandFactory) {
		this.factory = factory
	}

	public clone (operand: Operand): Operand {
		return this.deserialize(this.serialize(operand))
	}

	public serialize (operand: Operand): string {
		return JSON.stringify(this._serialize(operand))
	}

	private _serialize (operand: Operand): OperandMetadata {
		const children = []
		for (const k in operand.children) {
			children.push(this._serialize(operand.children[k]))
		}
		if (operand instanceof KeyVal) {
			return { name: operand.name, classType: operand.constructor.name, children: children, type: typeHelper.serialize(operand.type), property: operand.property }
		} else if (operand instanceof Var) {
			return { name: operand.name, classType: operand.constructor.name, children: children, type: typeHelper.serialize(operand.type), number: operand.number }
		} else {
			return { name: operand.name, classType: operand.constructor.name, children: children, type: typeHelper.serialize(operand.type) }
		}
	}

	public deserialize (value: string): Operand {
		return (this._deserialize(JSON.parse(value), 1)) as Operand
	}

	private _deserialize (value: OperandMetadata, index:number, parentId?:string): Operand {
		const id = parentId ? parentId + '.' + index : index.toString()
		const children = []
		if (value.children) {
			for (let i = 0; i < value.children.length; i++) {
				children.push(this._deserialize(value.children[i], i + 1, id))
			}
		}
		return this.factory.create(id, value.name, value.classType, children)
	}
}
