import { Operand, Position } from '../../../shared/domain'

export interface IConstBuilder {
	build (pos:Position, value:any): Operand
}
