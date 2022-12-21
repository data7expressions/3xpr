/* eslint-disable no-case-declarations */
import { Context, Operand, OperandType, IOperandBuilder, IModelManager, IEvaluatorFactory } from '../contract'
import { Parser } from './parser'
import { ConstBuilder } from './factory'

export class OperandBuilder implements IOperandBuilder {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly model: IModelManager, protected readonly factory: IEvaluatorFactory) {}

	public build (expression: string): Operand {
		const operand = new Parser(this.model, expression).parse()
		const normalized = this.normalize(operand)
		this.complete(normalized)
		return this.reduce(normalized)
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

	protected normalize (operand: Operand): Operand {
		if (operand.type === OperandType.Var && operand.children.length === 0) {
			// Example: Products => Products.map(p=>p)
			const arrowVariable = new Operand(operand.pos, 'p', OperandType.Var)
			const allFields = new Operand(operand.pos, 'p', OperandType.Var)
			const map = new Operand(operand.pos, 'map', OperandType.Arrow, [operand, arrowVariable, allFields])
			this.normalizeOperand(map)
			return map
		} else {
			this.normalizeOperand(operand)
			return operand
		}
	}

	protected normalizeOperand (operand: Operand): void {
		if (operand.type === OperandType.Arrow || operand.type === OperandType.ChildFunc || operand.type === OperandType.CallFunc) {
			const alias = this.model.functionAlias.find(p => p[0] === operand.name)
			if (alias) {
				operand.name = alias[1]
			}
		} else if (operand.type === OperandType.Operator) {
			const alias = this.model.operatorAlias.find(p => p[0] === operand.name)
			if (alias) {
				operand.name = alias[1]
			}
		}
		for (const child of operand.children) {
			this.normalizeOperand(child)
		}
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

	protected reduce (operand: Operand): Operand {
		if (operand.type === OperandType.Operator) {
			return this.reduceOperand(operand)
		} else if (operand.type === OperandType.CallFunc) {
			// Example: .[0].states.filter() where function name is states.filter
			const names = operand.name.split('.')
			const funcName = names[names.length - 1]
			const funcMetadata = this.model.getFunction(funcName)
			if (funcMetadata && funcMetadata.deterministic) {
				return this.reduceOperand(operand)
			}
		}
		return operand
	}

	protected reduceOperand (operand: Operand): Operand {
		let allConstants = true
		for (const child of operand.children) {
			if (!(child.type === OperandType.Const)) {
				allConstants = false
				break
			}
		}
		if (allConstants) {
			const value = operand.eval(new Context())
			const constant = new ConstBuilder().build(operand.pos, value)
			constant.id = operand.id
			return constant
		} else {
			for (let i = 0; i < operand.children.length; i++) {
				const child = operand.children[i]
				operand.children[i] = this.reduce(child)
			}
		}
		return operand
	}
}
