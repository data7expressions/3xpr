"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluatorFactory = exports.ConstBuilder = void 0;
const domain_1 = require("../../../../domain");
const typ3s_1 = require("typ3s");
const evaluators_1 = require("./evaluators");
class ConstBuilder {
    build(pos, value) {
        const operand = new domain_1.Operand(pos, value, domain_1.OperandType.Const, [], typ3s_1.Type.get(value));
        operand.evaluator = new evaluators_1.ConstEvaluator(operand);
        return operand;
    }
}
exports.ConstBuilder = ConstBuilder;
class EvaluatorFactory {
    // eslint-disable-next-line no-useless-constructor
    constructor(model) {
        this.model = model;
    }
    createOperator(operand) {
        const operatorMetadata = this.model.getOperator(operand.name, operand.children.length);
        if (operatorMetadata.custom) {
            return operatorMetadata.custom.clone(operand);
        }
        else if (operatorMetadata.function !== undefined) {
            return new evaluators_1.CallFuncEvaluator(operand, operatorMetadata.function);
        }
        else {
            throw new Error(`Operator ${operand.name} not implemented`);
        }
    }
    createFunction(operand) {
        const operatorMetadata = this.model.getFunction(operand.name);
        if (operatorMetadata.custom) {
            return operatorMetadata.custom.clone(operand);
        }
        else if (operatorMetadata.function !== undefined) {
            return new evaluators_1.CallFuncEvaluator(operand, operatorMetadata.function);
        }
        else {
            throw new Error(`Function ${operand.name} not implemented`);
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
                evaluator = new evaluators_1.PropertyEvaluator(operand);
                break;
            case domain_1.OperandType.List:
                evaluator = new evaluators_1.ListEvaluator(operand);
                break;
            case domain_1.OperandType.Obj:
                evaluator = new evaluators_1.ObjEvaluator(operand);
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
                evaluator = new evaluators_1.BlockEvaluator(operand);
                break;
            case domain_1.OperandType.If:
                evaluator = new evaluators_1.IfEvaluator(operand);
                break;
            case domain_1.OperandType.While:
                evaluator = new evaluators_1.WhileEvaluator(operand);
                break;
            case domain_1.OperandType.For:
                evaluator = new evaluators_1.ForEvaluator(operand);
                break;
            case domain_1.OperandType.ForIn:
                evaluator = new evaluators_1.ForInEvaluator(operand);
                break;
            case domain_1.OperandType.Switch:
                evaluator = new evaluators_1.SwitchEvaluator(operand);
                break;
            case domain_1.OperandType.Break:
                evaluator = new evaluators_1.BreakEvaluator(operand);
                break;
            case domain_1.OperandType.Continue:
                evaluator = new evaluators_1.ContinueEvaluator(operand);
                break;
            case domain_1.OperandType.Func:
                evaluator = new evaluators_1.FuncEvaluator(operand);
                break;
            case domain_1.OperandType.Return:
                evaluator = new evaluators_1.ReturnEvaluator(operand);
                break;
            case domain_1.OperandType.Try:
                evaluator = new evaluators_1.TryEvaluator(operand);
                break;
            case domain_1.OperandType.Catch:
                evaluator = new evaluators_1.CatchEvaluator(operand);
                break;
            case domain_1.OperandType.Throw:
                evaluator = new evaluators_1.ThrowEvaluator(operand);
                break;
            case domain_1.OperandType.Default:
            case domain_1.OperandType.Case:
            case domain_1.OperandType.KeyVal:
            case domain_1.OperandType.ElseIf:
            case domain_1.OperandType.Else:
                break;
            default:
                throw new Error(`Evaluator for ${operand.type} ${operand.name} not found`);
        }
        return evaluator;
    }
}
exports.EvaluatorFactory = EvaluatorFactory;
//# sourceMappingURL=factory.js.map