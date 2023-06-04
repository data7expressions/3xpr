import { EvaluatorFactory } from '../../domain'
import { Operand } from '../../../shared/domain'
export class OperandClone {
	private factories:any = {}

	private getFactory (key:string):EvaluatorFactory {
		return this.factories[key] as EvaluatorFactory
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
