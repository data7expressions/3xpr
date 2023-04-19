"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessEvaluatorFactory = void 0;
const domain_1 = require("../../../../../../domain");
const evaluators_1 = require("../basic/evaluators");
const evaluators_2 = require("./evaluators");
class ProcessEvaluatorFactory {
    // eslint-disable-next-line no-useless-constructor
    constructor(model) {
        this.model = model;
    }
    createOperator(operand) {
        const operatorMetadata = this.model.getOperator(operand.name, operand.children.length);
        if (operatorMetadata.custom) {
            // En el caso custom no sera posible acceder a la pila
            return operatorMetadata.custom.clone(operand);
        }
        else if (operatorMetadata.function !== undefined) {
            return new evaluators_2.StackEvaluator(operand, new evaluators_2.CallFuncProcessEvaluator(operand, operatorMetadata.function));
        }
        else {
            throw new Error(`Function ${name} not implemented`);
        }
    }
    createFunction(operand) {
        const operatorMetadata = this.model.getFunction(operand.name);
        if (operatorMetadata.custom) {
            // En el caso custom no sera posible acceder a la pila
            return operatorMetadata.custom.clone(operand);
        }
        else if (operatorMetadata.function !== undefined) {
            return new evaluators_2.StackEvaluator(operand, new evaluators_2.CallFuncProcessEvaluator(operand, operatorMetadata.function));
        }
        else {
            throw new Error(`Function ${name} not implemented`);
        }
    }
    create(operand) {
        let evaluator;
        switch (operand.type) {
            case domain_1.OperandType.Const:
                evaluator = new evaluators_1.ConstEvaluator(operand);
                break;
            case domain_1.OperandType.Var:
                evaluator = new evaluators_1.VarEvaluator(operand);
                break;
            case domain_1.OperandType.Env:
                evaluator = new evaluators_1.EnvEvaluator(operand);
                break;
            case domain_1.OperandType.Template:
                evaluator = new evaluators_1.TemplateEvaluator(operand);
                break;
            case domain_1.OperandType.Property:
                evaluator = new evaluators_2.PropertyProcessEvaluator(operand);
                break;
            case domain_1.OperandType.List:
                evaluator = new evaluators_2.StackEvaluator(operand, new evaluators_2.ListProcessEvaluator(operand));
                break;
            case domain_1.OperandType.Obj:
                evaluator = new evaluators_2.StackEvaluator(operand, new evaluators_2.ObjProcessEvaluator(operand));
                break;
            case domain_1.OperandType.Operator:
                evaluator = this.createOperator(operand);
                break;
            case domain_1.OperandType.CallFunc:
            case domain_1.OperandType.Arrow:
            case domain_1.OperandType.ChildFunc:
                evaluator = this.createFunction(operand);
                break;
            case domain_1.OperandType.Block:
                evaluator = new evaluators_2.StackEvaluator(operand, new evaluators_2.BlockProcessEvaluator(operand));
                break;
            case domain_1.OperandType.If:
                evaluator = new evaluators_2.StackEvaluator(operand, new evaluators_2.IfProcessEvaluator(operand));
                break;
            case domain_1.OperandType.While:
                evaluator = new evaluators_2.StackEvaluator(operand, new evaluators_2.WhileProcessEvaluator(operand));
                break;
            case domain_1.OperandType.For:
                evaluator = new evaluators_2.StackEvaluator(operand, new evaluators_2.ForProcessEvaluator(operand));
                break;
            case domain_1.OperandType.ForIn:
                evaluator = new evaluators_2.StackEvaluator(operand, new evaluators_2.ForInProcessEvaluator(operand));
                break;
            case domain_1.OperandType.Switch:
                evaluator = new evaluators_2.StackEvaluator(operand, new evaluators_2.SwitchProcessEvaluator(operand));
                break;
            case domain_1.OperandType.Break:
                evaluator = new evaluators_1.BreakEvaluator(operand);
                break;
            case domain_1.OperandType.Continue:
                evaluator = new evaluators_1.ContinueEvaluator(operand);
                break;
            case domain_1.OperandType.Func:
                evaluator = new evaluators_2.FuncProcessEvaluator(operand);
                break;
            case domain_1.OperandType.Return:
                evaluator = new evaluators_1.ReturnEvaluator(operand);
                break;
            case domain_1.OperandType.Try:
                evaluator = new evaluators_2.TryProcessEvaluator(operand);
                break;
            case domain_1.OperandType.Catch:
                evaluator = new evaluators_2.CatchProcessEvaluator(operand);
                break;
            case domain_1.OperandType.Throw:
                evaluator = new evaluators_2.ThrowProcessEvaluator(operand);
                break;
            case domain_1.OperandType.Default:
            case domain_1.OperandType.Case:
            case domain_1.OperandType.KeyVal:
            case domain_1.OperandType.ElseIf:
            case domain_1.OperandType.Else:
                break;
            default:
                throw new Error(`Process evaluator for ${operand.type} ${operand.name} not found`);
        }
        return evaluator;
    }
}
exports.ProcessEvaluatorFactory = ProcessEvaluatorFactory;
//# sourceMappingURL=factory.js.map