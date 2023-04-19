import { Evaluator, Context, Operand } from '../../../../domain';
export declare class ConstEvaluator extends Evaluator {
    eval(): any;
}
export declare class VarEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare class EnvEvaluator extends Evaluator {
    eval(): any;
}
export declare class TemplateEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare class PropertyEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare class ListEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare class ObjEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare class CallFuncEvaluator extends Evaluator {
    protected readonly operand: Operand;
    private readonly _function;
    constructor(operand: Operand, _function: Function);
    eval(context: Context): any;
}
export declare class BlockEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare class IfEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare class WhileEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare class ForEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare class ForInEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare class SwitchEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare class BreakEvaluator extends Evaluator {
    eval(): any;
}
export declare class ContinueEvaluator extends Evaluator {
    eval(): any;
}
export declare class FuncEvaluator extends Evaluator {
    eval(): any;
}
export declare class ReturnEvaluator extends Evaluator {
    eval(): any;
}
export declare class TryEvaluator extends Evaluator {
    eval(): any;
}
export declare class CatchEvaluator extends Evaluator {
    eval(): any;
}
export declare class ThrowEvaluator extends Evaluator {
    eval(): any;
}
