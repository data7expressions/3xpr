import { Context, Parameter, Position, IEvaluator, Operand, OperandType } from '../../shared/domain'

export interface ParameterDoc {
	name: string
	description: string
}
export interface OperatorDoc {
	description: string
	params?:ParameterDoc[]
}

export interface OperatorAdditionalInfo {
	priority: number
	description: string
	doc?: OperatorDoc
	async?: boolean
}

export interface FunctionAdditionalInfo {
	deterministic?:boolean
	description: string
	doc?: OperatorDoc
	async?: boolean
}

export abstract class Evaluator implements IEvaluator {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly operand: Operand) {}
	public abstract eval(context: Context): any
	public abstract evalAsync(context: Context): Promise<any>
	protected async evalAsyncChildren (context: Context): Promise<any> {
		const promises = []
		for (const child of this.operand.children) {
			promises.push(child.evalAsync(context))
		}
		return Promise.all(promises)
	}

	public isAsync (): boolean {
		for (const child of this.operand.children) {
			if (child.isAsync()) return true
		}
		return false
	}
}

export interface EvaluatorBuilder {
	build(operand:Operand):IEvaluator
}

// https://www.sourcecodeexamples.net/2020/08/typescript-prototype-pattern-example.html
export abstract class PrototypeEvaluator implements IEvaluator {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected operand?: Operand) {}
	public abstract clone(operand: Operand):IEvaluator
	public abstract eval(context: Context): any
	public abstract evalAsync(context: Context): Promise<any>
}

export interface OperandMetadata {
	pos:Position,
	type: OperandType,
	name: string,
	children?: OperandMetadata[],
	returnType?: string,
	number?: number
}
export interface OperatorMetadata {
	params: Parameter[]
	deterministic:boolean
	operands: number
	returnType:string
	doc: OperatorDoc
	priority?:number
	// eslint-disable-next-line @typescript-eslint/ban-types
	function?: Function
	custom?: PrototypeEvaluator
	async: boolean
}
