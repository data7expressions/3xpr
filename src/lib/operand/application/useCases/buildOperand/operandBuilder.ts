/* eslint-disable no-case-declarations */
import { IOperandBuilder, IEvaluatorFactory } from '../../../domain'
import { IModelService} from '../../../../model/domain'
import { Operand} from '../../../../commons/domain'
import { OperandNormalize, OperandReduce} from '../../'
import { ExpressionNormalize, ExpressionParse } from '../../../../expression/application'
export abstract class OperandBuilder implements IOperandBuilder {
	protected expressionNormalize: ExpressionNormalize
	protected expressionParse: ExpressionParse
	protected normalize:OperandNormalize
	protected reduce:OperandReduce
	public constructor (protected readonly evaluatorFactory: IEvaluatorFactory,modelService:IModelService) {
		this.expressionNormalize = new ExpressionNormalize()
		this.expressionParse = new ExpressionParse(modelService)
		this.normalize = new OperandNormalize(modelService)
		this.reduce = new OperandReduce(modelService)
	}

	public abstract get key():string

	public build (expression: string): Operand {
		const expressionNormalized = this.expressionNormalize.normalize(expression)
		const operand = this.expressionParse.parse(expressionNormalized)
		const normalized = this.normalize.normalize(operand)
		this.complete(normalized)
		return this.reduce.reduce(normalized)
	}

	public clone (source: Operand): Operand {
		const children: Operand[] = []
		for (const child of source.children) {
			children.push(this.clone(child))
		}
		const target = new Operand(source.pos, source.name, source.type, children, source.returnType)
		target.id = source.id
		target.evaluator = this.evaluatorFactory.create(target)
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
		operand.evaluator = this.evaluatorFactory.create(operand)
	}
}
