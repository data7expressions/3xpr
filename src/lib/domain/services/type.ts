import { Type } from 'typ3s'
import { Operand } from '../model'

export interface ITypeService {
	type (operand: Operand):Type
}
