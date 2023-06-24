import { Operand, OperandType } from '../../../shared/domain'
import { OperandMetadata, OperandSerializer } from '../../domain'
import { Type } from 'typ3s'

export class OperandSerializerImpl implements OperandSerializer {
	public clone (sentence: Operand): Operand {
		const serialized = this.serialize(sentence)
		const deserialized = this.deserialize(serialized)
		return deserialized
	}

	public serialize (sentence: Operand): string {
		return JSON.stringify(this._serialize(sentence))
	}

	public deserialize (value: string): Operand {
		return (this._deserialize(JSON.parse(value)))
	}

	private _serialize (operand: Operand): OperandMetadata {
		const children:OperandMetadata[] = []
		for (const child of operand.children) {
			children.push(this._serialize(child))
		}
		return { pos: operand.pos, name: operand.name, children, number: operand.number, type: operand.type, returnType: operand.returnType !== undefined ? Type.stringify(operand.returnType) : undefined }
	}

	private _deserialize (metadata: OperandMetadata): Operand {
		const children:Operand[] = []
		if (metadata.children) {
			for (const child of metadata.children) {
				const deserialized = this._deserialize(child)
				children.push(deserialized)
			}
		}
		// eslint-disable-next-line no-case-declarations
		const operand = new Operand(metadata.pos, metadata.name, OperandType[metadata.type], children, metadata.returnType !== undefined ? Type.to(metadata.returnType as string) : undefined)
		operand.number = metadata.number
		return operand
	}
}
