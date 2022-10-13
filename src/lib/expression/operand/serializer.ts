import { Operand, IOperandBuilder, OperandMetadata, ISerializer } from '../model'
import { Var, KeyVal } from './operands'
import { helper } from '..'
export class OperandSerializer implements ISerializer<Operand> {
	private builder: IOperandBuilder
	constructor (builder: IOperandBuilder) {
		this.builder = builder
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
			return { name: operand.name, classType: operand.constructor.name, children: children, type: helper.type.serialize(operand.type), property: operand.property }
		} else if (operand instanceof Var) {
			return { name: operand.name, classType: operand.constructor.name, children: children, type: helper.type.serialize(operand.type), number: operand.number }
		} else {
			return { name: operand.name, classType: operand.constructor.name, children: children, type: helper.type.serialize(operand.type) }
		}
	}

	public deserialize (value: string): Operand {
		return (this._deserialize(JSON.parse(value))) as Operand
	}

	private _deserialize (value: OperandMetadata): Operand {
		const children = []
		if (value.children) {
			for (const k in value.children) {
				children.push(this._deserialize(value.children[k]))
			}
		}
		return this.builder.createOperand(value.name, value.classType, children)
	}
}
