import { Type } from 'typ3s'
import { Operand } from '../entities'

export interface ITypeService {
	getType (operand: Operand):Type
}
