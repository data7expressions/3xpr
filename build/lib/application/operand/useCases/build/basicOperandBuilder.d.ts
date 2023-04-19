import { IModelService } from '../../../../domain';
import { OperandBuilder } from './operandBuilder';
export declare class BasicOperandBuilder extends OperandBuilder {
    constructor(model: IModelService);
    get key(): string;
}
