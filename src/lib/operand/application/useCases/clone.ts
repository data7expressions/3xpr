import { EvaluatorFactory, OperandCloner } from '../../domain'
import { Operand } from '../../../shared/domain'
export class OperandClone implements OperandCloner {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly factories:[string, EvaluatorFactory][]) {}

	private getFactory (key:string):EvaluatorFactory {
		const factory = this.factories.find(p => p[0] === key)?.[1]
		if (factory === undefined) {
			throw new Error(`Factory ${key} not found`)
		}
		return factory
	}

	public clone (operand: Operand, type:string): Operand {
		const factory = this.getFactory(type)
		return this._clone(operand, factory)
	}

	private _clone (source: Operand, factory:EvaluatorFactory): Operand {
		const children: Operand[] = []
		for (const child of source.children) {
			children.push(this._clone(child, factory))
		}
		const target = new Operand(source.pos, source.name, source.type, children, source.returnType)
		target.id = source.id
		target.evaluator = factory.create(target)
		return target
	}
}
