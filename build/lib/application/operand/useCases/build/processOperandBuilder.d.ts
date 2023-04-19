import { IModelService } from '../../../../domain';
import { OperandBuilder } from './operandBuilder';
export declare class ProcessOperandBuilder extends OperandBuilder {
    constructor(model: IModelService);
    get key(): string;
}
