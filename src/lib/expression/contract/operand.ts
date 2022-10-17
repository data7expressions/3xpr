import { Type, Context, Step, Parameter, OperatorDoc } from '.'

export interface IEvaluator {
	eval(context: Context): any
}

export abstract class Operand {
	public id: string
	public name: string
	public type?: Type
	public children: Operand[]
	public evaluator?: IEvaluator
	constructor (id: string, name: string, children: Operand[] = [], type?:Type) {
		this.id = id
		this.name = name
		this.children = children
		this.type = type
	}

	public eval (context: Context): any {
		if (this.evaluator) {
			return this.evaluator.eval(context)
		}
		throw new Error('Evaluator not implemented')
	}
}

export abstract class Evaluator implements IEvaluator {
	public operand: Operand
	constructor (operand: Operand) {
		this.operand = operand
	}

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

export class StackEvaluator implements IEvaluator {
	public id: string
	public index: number
	public level: number
	public child: IEvaluator
	public operand: Operand
	constructor (id:string, index:number, level:number, child:IEvaluator, operand: Operand) {
		this.id = id
		this.index = index
		this.level = level
		this.child = child
		this.operand = operand
	}

	public eval (context: Context) {
		if (context.token.stack[this.id] === undefined) {
			context.token.stack[this.id] = new Step(this.operand.name, this.index, this.level)
		}
		const result = this.child.eval(context)
		if (!context.token.isBreak) {
			// remove stack
			delete context.token.stack[this.id]
		}
		return result
	}
}
