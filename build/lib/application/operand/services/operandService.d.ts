import { IOperandBuilder, Operand, ITypeService, IOperandService } from '../../../domain';
import { ICache } from 'h3lp';
export declare class OperandService implements IOperandService {
    private readonly typeService;
    private readonly cache;
    private builders;
    constructor(typeService: ITypeService, cache: ICache<string, Operand>);
    addBuilder(builder: IOperandBuilder): void;
    private getBuilder;
    build(expression: string, type: string, useCache: boolean): Operand;
    typed(expression: string, type: string): Operand;
    clone(operand: Operand, type: string): Operand;
}
