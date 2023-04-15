import { Parameter, Operand } from '../model'

export interface IParameterService {
	parameters (operand: Operand): Parameter[]
}
