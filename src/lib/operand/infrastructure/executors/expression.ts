import { h3lp, IReplacer } from 'h3lp'
import { Context, OperandType, Operand, IEvaluator } from '../../../shared/domain'
import { Evaluator, EvaluatorBuilder, EvaluatorFactory } from '../../domain'
import { ModelService } from '../../../model/domain'
import { Primitive } from 'typ3s'
import { EvaluatorFactoryImpl } from '../../application'

export class ConstEvaluator extends Evaluator {
	public eval (): any {
		if (this.operand.returnType === undefined) {
			return this.operand.name
		}
		switch (this.operand.returnType.primitive) {
		case Primitive.string:
			return this.operand.name
		case Primitive.boolean:
			return Boolean(this.operand.name)
		case Primitive.integer:
		case Primitive.decimal:
			return parseFloat(this.operand.name)
		default:
			return this.operand.name
		}
	}

	public async evalAsync (): Promise<any> {
		return Promise.resolve(this.eval())
	}

	public isAsync (): boolean {
		return false
	}
}

class ConstEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ConstEvaluator(operand)
	}
}

export class VarEvaluator extends Evaluator {
	public eval (context: Context): any {
		return context.data.get(this.operand.name)
	}

	public async evalAsync (context: Context): Promise<any> {
		return Promise.resolve(this.eval(context))
	}

	public isAsync (): boolean {
		return false
	}
}

class VarEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new VarEvaluator(operand)
	}
}

class CallFuncEvaluator extends Evaluator {
	// eslint-disable-next-line no-useless-constructor, @typescript-eslint/ban-types
	public constructor (protected readonly operand: Operand, private readonly _function: Function, private readonly _isAsync: boolean) {
		super(operand)
	}

	public eval (context: Context): any {
		const args = []
		for (const child of this.operand.children) {
			args.push(child.eval(context))
		}
		return this._function(...args)
	}

	public async evalAsync (context: Context): Promise<any> {
		return Promise.resolve(this.eval(context))
	}

	public isAsync (): boolean {
		return this._isAsync
	}
}

class OperatorEvaluatorBuilder implements EvaluatorBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService) {}

	build (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getOperator(operand.name, operand.children.length)
		if (operatorMetadata.custom) {
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new CallFuncEvaluator(operand, operatorMetadata.function, operatorMetadata.async)
		} else {
			throw new Error(`Operator ${operand.name} not implemented`)
		}
	}
}

class FunctionEvaluatorBuilder implements EvaluatorBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService) {}

	build (operand:Operand): IEvaluator {
		const operatorMetadata = this.model.getFunction(operand.name)
		if (operatorMetadata.custom) {
			return operatorMetadata.custom.clone(operand)
		} else if (operatorMetadata.function !== undefined) {
			return new CallFuncEvaluator(operand, operatorMetadata.function, operatorMetadata.async)
		} else {
			throw new Error(`Function ${operand.name} not implemented`)
		}
	}
}

class ChildFuncEvaluatorBuilder extends FunctionEvaluatorBuilder {}
class ArrowEvaluatorBuilder extends FunctionEvaluatorBuilder {}

export class EnvEvaluator extends Evaluator {
	public eval (): any {
		return process.env[this.operand.name]
	}

	public async evalAsync (): Promise<any> {
		return Promise.resolve(this.eval())
	}

	public isAsync (): boolean {
		return false
	}
}

class EnvEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new EnvEvaluator(operand)
	}
}

class TemplateReplacer implements IReplacer {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly context: Context) { }

	replace (match: string): string | undefined {
		let value = process.env[match]
		if (value === undefined && this.context.data) {
			value = this.context.data.get(match)
		}
		return value === undefined ? match : value
	}
}

export class TemplateEvaluator extends Evaluator {
	public eval (context: Context): any {
		return h3lp.utils.template(this.operand.name.toString(), new TemplateReplacer(context))
	}

	public async evalAsync (context: Context): Promise<any> {
		return Promise.resolve(this.eval(context))
	}

	public isAsync (): boolean {
		return false
	}
}

class TemplateEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new TemplateEvaluator(operand)
	}
}

class PropertyEvaluator extends Evaluator {
	public eval (context: Context): any {
		const value = this.operand.children[0].eval(context)
		if (value === undefined || value === null) return null
		return h3lp.obj.getValue(value, this.operand.name)
	}

	public async evalAsync (context: Context): Promise<any> {
		const value = this.operand.children[0].evalAsync(context)
		if (value === undefined || value === null) return null
		return h3lp.obj.getValue(value, this.operand.name)
	}

	public isAsync (): boolean {
		return this.operand.children[0].isAsync()
	}
}

class PropertyEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new PropertyEvaluator(operand)
	}
}

class ListEvaluator extends Evaluator {
	public eval (context: Context): any {
		const values = []
		for (let i = 0; i < this.operand.children.length; i++) {
			values.push(this.operand.children[i].eval(context))
		}
		return values
	}

	public async evalAsync (context: Context): Promise<any> {
		const result = await this.evalAsyncChildren(context)
		const obj: { [k: string]: any } = {}
		for (let i = 0; i < result.length; i++) {
			obj[this.operand.children[i].name] = result
		}
		return obj
	}
}

class ListEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ListEvaluator(operand)
	}
}

class ObjEvaluator extends Evaluator {
	public eval (context: Context): any {
		const obj: { [k: string]: any } = {}
		for (const child of this.operand.children) {
			obj[child.name] = child.children[0].eval(context)
		}
		return obj
	}

	public async evalAsync (context: Context): Promise<any> {
		const result = await this.evalAsyncChildren(context)
		const obj: { [k: string]: any } = {}
		for (let i = 0; i < result.length; i++) {
			obj[this.operand.children[i].name] = result
		}
		return obj
	}
}

class ObjEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ObjEvaluator(operand)
	}
}

class BlockEvaluator extends Evaluator {
	public eval (context: Context): any {
		let lastValue:any = null
		for (let i = 0; i < this.operand.children.length; i++) {
			lastValue = this.operand.children[i].eval(context)
		}
		return lastValue
	}

	public async evalAsync (context: Context): Promise<any> {
		return this.evalAsyncChildren(context)
	}
}

class BlockEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new BlockEvaluator(operand)
	}
}

class IfEvaluator extends Evaluator {
	public eval (context: Context): any {
		const condition = this.operand.children[0].eval(context)
		if (condition) {
			const ifBlock = this.operand.children[1]
			return ifBlock.eval(context)
		} else if (this.operand.children.length > 2) {
			for (let i = 2; i < this.operand.children.length; i++) {
				if (this.operand.children[i].type === OperandType.ElseIf) {
					const elseIfCondition = this.operand.children[i].children[0].eval(context)
					if (elseIfCondition) {
						const elseIfBlock = this.operand.children[i].children[1]
						return elseIfBlock.eval(context)
					}
				} else {
					const elseBlock = this.operand.children[i]
					return elseBlock.eval(context)
				}
			}
		}
	}

	public async evalAsync (context: Context): Promise<any> {
		const condition = await this.operand.children[0].evalAsync(context)
		if (condition) {
			const ifBlock = this.operand.children[1]
			return ifBlock.evalAsync(context)
		} else if (this.operand.children.length > 2) {
			for (let i = 2; i < this.operand.children.length; i++) {
				if (this.operand.children[i].type === OperandType.ElseIf) {
					const elseIfCondition = this.operand.children[i].children[0].eval(context)
					if (elseIfCondition) {
						const elseIfBlock = this.operand.children[i].children[1]
						return elseIfBlock.evalAsync(context)
					}
				} else {
					const elseBlock = this.operand.children[i]
					return elseBlock.evalAsync(context)
				}
			}
		}
	}
}

class IfEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new IfEvaluator(operand)
	}
}

class SwitchEvaluator extends Evaluator {
	public eval (context: Context): any {
		const value = this.operand.children[0].eval(context)
		for (let i = 1; i < this.operand.children.length; i++) {
			const option = this.operand.children[i]
			if (option.type === OperandType.Case) {
				if (option.name === value) {
					return option.children[0].eval(context)
				}
			} else if (option.type === OperandType.Default) {
				return option.children[0].eval(context)
			}
		}
	}

	public async evalAsync (context: Context): Promise<any> {
		const value = await this.operand.children[0].evalAsync(context)
		for (let i = 1; i < this.operand.children.length; i++) {
			const option = this.operand.children[i]
			if (option.type === OperandType.Case) {
				if (option.name === value) {
					return await option.children[0].evalAsync(context)
				}
			} else if (option.type === OperandType.Default) {
				return await option.children[0].evalAsync(context)
			}
		}
	}
}

class SwitchEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new SwitchEvaluator(operand)
	}
}

class WhileEvaluator extends Evaluator {
	public eval (context: Context): any {
		let lastValue:any = null
		const condition = this.operand.children[0]
		const block = this.operand.children[1]
		while (condition.eval(context)) {
			lastValue = block.eval(context)
		}
		return lastValue
	}

	public async evalAsync (context: Context): Promise<any> {
		let lastValue:any = null
		const condition = this.operand.children[0]
		const block = this.operand.children[1]
		while (await condition.evalAsync(context)) {
			lastValue = await block.evalAsync(context)
		}
		return lastValue
	}
}

class WhileEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new WhileEvaluator(operand)
	}
}

class ForEvaluator extends Evaluator {
	public eval (context: Context): any {
		let lastValue:any = null
		const initialize = this.operand.children[0]
		const condition = this.operand.children[1]
		const increment = this.operand.children[2]
		const block = this.operand.children[3]
		for (initialize.eval(context); condition.eval(context); increment.eval(context)) {
			lastValue = block.eval(context)
		}
		return lastValue
	}

	public async evalAsync (context: Context): Promise<any> {
		let lastValue:any = null
		const initialize = this.operand.children[0]
		const condition = this.operand.children[1]
		const increment = this.operand.children[2]
		const block = this.operand.children[3]
		for (await initialize.evalAsync(context); await condition.evalAsync(context); await increment.evalAsync(context)) {
			lastValue = await block.evalAsync(context)
		}
		return lastValue
	}
}

class ForEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ForEvaluator(operand)
	}
}

class ForInEvaluator extends Evaluator {
	public eval (context: Context): any {
		let lastValue:any = null
		const item = this.operand.children[0]
		const list = this.operand.children[1].eval(context)
		const block = this.operand.children[2]
		for (let i = 0; i < list.length; i++) {
			const value = list[i]
			if (context) {
				context.data.set(item.name, value)
			}
			lastValue = block.eval(context)
		}
		return lastValue
	}

	public async evalAsync (context: Context): Promise<any> {
		let lastValue:any = null
		const item = this.operand.children[0]
		const list = await this.operand.children[1].evalAsync(context)
		const block = this.operand.children[2]
		for (let i = 0; i < list.length; i++) {
			const value = list[i]
			if (context) {
				context.data.set(item.name, value)
			}
			lastValue = await block.evalAsync(context)
		}
		return lastValue
	}
}

class ForInEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new ForInEvaluator(operand)
	}
}

export class NotImplementedEvaluator extends Evaluator {
	public eval (): any {
		throw new Error('NotImplemented')
	}

	public async evalAsync (): Promise<any> {
		throw new Error('NotImplemented')
	}

	public isAsync (): boolean {
		return false
	}
}

class BreakEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class ContinueEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class FuncEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class ReturnEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class TryEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class CatchEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class ThrowEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class DefaultEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class CaseEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class KeyValEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class ElseEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

class ElseIfEvaluatorBuilder implements EvaluatorBuilder {
	build (operand:Operand): IEvaluator {
		return new NotImplementedEvaluator(operand)
	}
}

export class ExpressionEvaluatorFactoryBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService) {}

	public build (): EvaluatorFactory {
		return new EvaluatorFactoryImpl()
			.add(OperandType.Const, new ConstEvaluatorBuilder())
			.add(OperandType.Var, new VarEvaluatorBuilder())
			.add(OperandType.Operator, new OperatorEvaluatorBuilder(this.model))
			.add(OperandType.CallFunc, new FunctionEvaluatorBuilder(this.model))
			.add(OperandType.ChildFunc, new ChildFuncEvaluatorBuilder(this.model))
			.add(OperandType.Arrow, new ArrowEvaluatorBuilder(this.model))
			.add(OperandType.Env, new EnvEvaluatorBuilder())
			.add(OperandType.Template, new TemplateEvaluatorBuilder())
			.add(OperandType.Property, new PropertyEvaluatorBuilder())
			.add(OperandType.List, new ListEvaluatorBuilder())
			.add(OperandType.Obj, new ObjEvaluatorBuilder())
			.add(OperandType.KeyVal, new KeyValEvaluatorBuilder())
			.add(OperandType.Block, new BlockEvaluatorBuilder())
			.add(OperandType.If, new IfEvaluatorBuilder())
			.add(OperandType.Else, new ElseEvaluatorBuilder())
			.add(OperandType.ElseIf, new ElseIfEvaluatorBuilder())
			.add(OperandType.Switch, new SwitchEvaluatorBuilder())
			.add(OperandType.While, new WhileEvaluatorBuilder())
			.add(OperandType.For, new ForEvaluatorBuilder())
			.add(OperandType.ForIn, new ForInEvaluatorBuilder())
			.add(OperandType.Break, new BreakEvaluatorBuilder())
			.add(OperandType.Continue, new ContinueEvaluatorBuilder())
			.add(OperandType.Func, new FuncEvaluatorBuilder())
			.add(OperandType.Return, new ReturnEvaluatorBuilder())
			.add(OperandType.Try, new TryEvaluatorBuilder())
			.add(OperandType.Catch, new CatchEvaluatorBuilder())
			.add(OperandType.Throw, new ThrowEvaluatorBuilder())
			.add(OperandType.Default, new DefaultEvaluatorBuilder())
			.add(OperandType.Case, new CaseEvaluatorBuilder())
	}
}
