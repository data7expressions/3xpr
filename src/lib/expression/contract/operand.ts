import { Type, Context, Parameter } from '.'

export enum OperandType
{ Const = 'Const'
, Var = 'Var'
, Env = 'Env'
, Property = 'Property'
, Template = 'Template'
, KeyVal = 'KeyVal'
, List = 'List'
, Obj = 'Obj'
, Operator = 'Operator'
, CallFunc = 'CallFunc'
, Arrow = 'Arrow'
, ChildFunc = 'ChildFunc'
, Block = 'Block'
, If = 'If'
, ElseIf = 'ElseIf'
, Else = 'Else'
, While = 'While'
, For = 'For'
, ForIn = 'ForIn'
, Switch = 'Switch'
, Case = 'Case'
, Default = 'Default'
, Break = 'Break'
, Continue = 'Continue'
, Func = 'Func'
, Return = 'Return'
, Try = 'Try'
, Catch = 'Catch'
, Throw = 'Throw'
, Args = 'Args'
}
export class Node {
// eslint-disable-next-line no-useless-constructor
	public constructor (public readonly name:any, public readonly type:OperandType, public readonly children:Node[] = []) { }
}
export interface ParameterDoc {
	name: string
	description: string
}
export interface OperatorDoc {
	description: string
	params:ParameterDoc[]
}

export interface OperatorAdditionalInfo {
	priority: number
	doc?: OperatorDoc
}

export interface FunctionAdditionalInfo {
	deterministic?:boolean
	// multipleParams?:boolean
	doc?: OperatorDoc
}

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
		if (!this.evaluator) {
			throw new Error('Evaluator not implemented')
		}
		return this.evaluator.eval(context)
	}
}

export abstract class Evaluator implements IEvaluator {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected readonly operand: Operand) {}
	public abstract eval(context: Context): any
}

// https://www.sourcecodeexamples.net/2020/08/typescript-prototype-pattern-example.html
export abstract class PrototypeEvaluator implements IEvaluator {
	// eslint-disable-next-line no-useless-constructor
	public constructor (protected operand?: Operand) {}
	public abstract clone(operand: Operand):IEvaluator
	public abstract eval(context: Context): any
}

export interface OperandMetadata {
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
	doc?: OperatorDoc
	priority?:number
	// eslint-disable-next-line @typescript-eslint/ban-types
	function?: Function
	custom?: PrototypeEvaluator
}
