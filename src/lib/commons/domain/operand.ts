import { Context } from './context'
import { Position } from './base'
import { Type } from 'typ3s'

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

export interface IEvaluator {
	eval(context: Context): any
}

export class Operand {
	public evaluator?: IEvaluator
	public number?: number
	public id?: string
	// eslint-disable-next-line no-useless-constructor
	public constructor (public readonly pos:Position, public name:any, public readonly type:OperandType, public children:Operand[] = [], public returnType?:Type) { }
	public eval (context: Context): any {
		if (!this.evaluator) {
			throw new Error('Evaluator not implemented')
		}
		return this.evaluator.eval(context)
	}
}
