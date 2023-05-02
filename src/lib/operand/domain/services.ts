import { Operand } from '../../shared/domain'

export interface IOperandBuilder {
	build (expression: string): Operand
}
export interface OperandBuildOptions {
	type:string
	cache?:boolean
}
