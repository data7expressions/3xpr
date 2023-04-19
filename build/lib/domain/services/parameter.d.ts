import { Parameter, Operand } from '../entities';
export interface IParameterService {
    parameters(operand: Operand): Parameter[];
}
