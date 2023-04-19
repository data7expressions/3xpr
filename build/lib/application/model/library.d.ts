import { IModelService, IOperandBuilder } from '../../domain';
export declare class CoreLibrary {
    private readonly model;
    private readonly builder;
    constructor(model: IModelService, builder: IOperandBuilder);
    load(): void;
    private constants;
    private enums;
    private formats;
    private operators;
    private generalFunctions;
    private nullFunctions;
    private comparisonFunctions;
    private numberFunctions;
    private conversionFunctions;
    private stringFunctions;
    private dateTimeFunctions;
    private arrayFunctions;
    private groupFunctions;
    private setsFunctions;
}
