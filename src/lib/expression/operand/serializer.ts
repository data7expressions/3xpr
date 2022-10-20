import { Operand, Type, OperandMetadata, ISerializer, IOperandFactory } from '../contract'
export class OperandSerializer implements ISerializer<Operand> {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly factory: IOperandFactory) { }

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
		return { name: operand.name, type: operand.type, children: children, returnType: Type.serialize(operand.returnType), number: operand.number }
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
		return this.factory.create(value.type, id, value.name, children)
	}
}
