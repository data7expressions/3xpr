import { Evaluator, Context, Step, Operand } from '../../../../domain';
export declare class PropertyProcessEvaluator extends Evaluator {
    eval(context: Context): any;
}
export declare abstract class ProcessEvaluator {
    protected readonly operand: Operand;
    constructor(operand: Operand);
    abstract eval(context: Context, step: Step): any;
    protected solveChildren(context: Context, step: Step): any;
}
export declare class StackEvaluator extends Evaluator {
    protected readonly operand: Operand;
    private readonly child;
    constructor(operand: Operand, child: ProcessEvaluator);
    eval(context: Context): any;
}
export declare class ListProcessEvaluator extends ProcessEvaluator {
    eval(context: Context, step: Step): any;
}
export declare class ObjProcessEvaluator extends ProcessEvaluator {
    eval(context: Context, step: Step): any;
}
export declare class CallFuncProcessEvaluator extends ProcessEvaluator {
    protected readonly operand: Operand;
    private readonly _function;
    constructor(operand: Operand, _function: Function);
    eval(context: Context, step: Step): any;
}
export declare class BlockProcessEvaluator extends ProcessEvaluator {
    eval(context: Context, step: Step): any;
}
export declare class IfProcessEvaluator extends ProcessEvaluator {
    eval(context: Context, step: Step): any;
}
export declare class WhileProcessEvaluator extends ProcessEvaluator {
    eval(context: Context, step: Step): any;
}
export declare class ForProcessEvaluator extends ProcessEvaluator {
    eval(context: Context, step: Step): any;
}
export declare class ForInProcessEvaluator extends ProcessEvaluator {
    eval(context: Context, step: Step): any;
}
export declare class SwitchProcessEvaluator extends ProcessEvaluator {
    eval(context: Context, step: Step): any;
}
export declare class FuncProcessEvaluator extends ProcessEvaluator {
    eval(): any;
}
export declare class TryProcessEvaluator extends Evaluator {
    eval(): any;
}
export declare class CatchProcessEvaluator extends Evaluator {
    eval(): any;
}
export declare class ThrowProcessEvaluator extends Evaluator {
    eval(): any;
}
