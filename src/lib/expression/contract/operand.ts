import { Type, Context, Parameter, OperatorDoc, OperandType } from '.'

export interface IEvaluator {
	eval(context: Context): any
}

export class Operand {
	public evaluator?: IEvaluator
	public number?: number
	// public property?: string
	// eslint-disable-next-line no-useless-constructor
	public constructor (public readonly type:OperandType, public id: string, public readonly name: string, public readonly children: Operand[] = [], public returnType?:Type) { }
	public eval (context: Context): any {
		if (this.evaluator) {
			return this.evaluator.eval(context)
		}
		throw new Error('Evaluator not implemented')
	}
}

export abstract class Evaluator implements IEvaluator {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly operand: Operand) {}
	public abstract eval(context: Context): any
}

export interface OperatorMetadata {
	deterministic:boolean
	doc?: OperatorDoc
	operands: number
	priority?:number
	return:string
	params: Parameter[]
	function?: any
	custom?: any // Evaluator
}
