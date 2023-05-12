import { Operand, Position } from '../../shared/domain'

export interface ConstBuilder {
	build (pos:Position, value:any): Operand
}
