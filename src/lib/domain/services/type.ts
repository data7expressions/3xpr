import { Type } from 'json-light'
import { Operand } from '../model'

export interface ITypeService {
	type (operand: Operand):Type
}
