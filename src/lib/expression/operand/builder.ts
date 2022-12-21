/* eslint-disable no-case-declarations */
import { Operand, IOperandBuilder, IModelManager, IEvaluatorFactory, IOperandNormalizer, IOperandReducer } from '../contract'
import { Parser } from './parser'

export class OperandBuilder implements IOperandBuilder {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly model: IModelManager, protected readonly normalizer:IOperandNormalizer, protected readonly reducer:IOperandReducer, protected readonly factory: IEvaluatorFactory) {}

	public build (expression: string): Operand {
		const operand = new Parser(this.model, expression).parse()
		const normalized = this.normalizer.normalize(operand)
		this.complete(normalized)
		return this.reducer.reduce(normalized)
	}

	public clone (source: Operand): Operand {
		const children: Operand[] = []
		for (const child of source.children) {
			children.push(this.clone(child))
		}
		const target = new Operand(source.pos, source.name, source.type, children, source.returnType)
		target.id = source.id
		target.evaluator = this.factory.create(target)
		return target
	}

	protected complete (operand: Operand, index = 0, parentId?:string): void {
		const id = parentId ? parentId + '.' + index : index.toString()
		if (operand.children) {
			for (let i = 0; i < operand.children.length; i++) {
				const child = operand.children[i]
				this.complete(child, i, id)
			}
		}
		operand.id = id
		operand.evaluator = this.factory.create(operand)
	}
}
