import { Operand, Parameter, IParameterService } from '../../domain';
export declare class ParameterService implements IParameterService {
    parameters(operand: Operand): Parameter[];
}
