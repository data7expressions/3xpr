/* eslint-disable no-case-declarations */
import { 
	Operand, IOperandBuilder, IEvaluatorFactory, IOperandNormalizer, IOperandReducer,
	IExpressionNormalize, IExpressionParse
} from '../../../../domain'

export abstract class OperandBuilder implements IOperandBuilder {
	// eslint-disable-next-line no-useless-constructor
	public constructor (
		protected readonly expressionNormalize: IExpressionNormalize,
		protected readonly expressionParse: IExpressionParse,
		protected readonly normalizer:IOperandNormalizer,
		protected readonly reducer:IOperandReducer,
		protected readonly evaluatorfactory: IEvaluatorFactory
	) {}

	public abstract get key():string

	public build (expression: string): Operand {
		const expressionNormalized = this.expressionNormalize.normalize(expression)
		const operand = this.expressionParse.parse(expressionNormalized)
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
		target.evaluator = this.evaluatorfactory.create(target)
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
		operand.evaluator = this.evaluatorfactory.create(operand)
	}
}
