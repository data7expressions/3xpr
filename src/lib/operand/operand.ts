
import { Parser } from '../parser/index'
import { Operand, IOperandManager, IOperandBuilder, IModelManager, ISerializer } from '../model'
import { OperandBuilder, OperandSerializer } from './'
import { Helper } from '../manager'

export class OperandManager implements IOperandManager {
	private model: IModelManager
	private builder: IOperandBuilder
	private serializer: ISerializer<Operand>
	constructor (model: IModelManager) {
		this.model = model
		this.builder = new OperandBuilder(this.model)
		this.serializer = new OperandSerializer(this.builder)
	}

	public build (expression: string[]): Operand {
		const parser = new Parser(this.model, expression)
		const node = parser.parse()
		Helper.node.clear(node)
		const operand = this.builder.build(node)
		return operand
	}

	public clone (operand: Operand): Operand {
		return this.serializer.clone(operand)
	}

	public serialize (operand: Operand): string {
		return this.serializer.serialize(operand)
	}

	public deserialize (value: string): Operand {
		return this.serializer.deserialize(value)
	}
}
