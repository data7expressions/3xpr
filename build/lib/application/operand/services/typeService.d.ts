import { Operand, IModelService, ITypeService, OperatorMetadata } from '../../../domain';
import { Type } from 'typ3s';
export declare class TypeService implements ITypeService {
    protected readonly model: IModelService;
    constructor(model: IModelService);
    getType(operand: Operand): Type;
    protected solveType(operand: Operand): void;
    protected solveTemplate(operand: Operand): void;
    protected setUndefinedAsAny(operand: Operand): void;
    protected solveObject(obj: Operand): void;
    protected solveProperty(property: Operand): void;
    protected solveArray(array: Operand): void;
    protected solveArrow(arrow: Operand): void;
    protected solveOperator(operator: Operand): void;
    protected trySolveFromMetadata(type?: string): Type | undefined;
    protected solveTemplateArray(array: Operand): void;
    protected solveTemplateProperty(property: Operand): void;
    protected solveTemplateObject(obj: Operand): void;
    protected solveTemplateOperator(operator: Operand, metadata: OperatorMetadata): void;
    protected getElementType(array: Operand): Type | undefined;
    protected setVariableType(name: string, type: Type, operand: Operand): void;
    protected isIndeterminateType(type?: string): boolean;
    protected hadTemplate(metadata: OperatorMetadata): boolean;
    protected undefinedTypes(operator: Operand): boolean;
    /**
     * get metadata of operand
     * @param operator
     * @returns
     */
    protected metadata(operator: Operand): OperatorMetadata;
}
