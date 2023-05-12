import { ModelService, Library } from '../../model/domain'
import { Data, Operand, Context, Parameter, Format, ActionObserver } from '../../shared/domain'
import { OperatorMetadata, FunctionAdditionalInfo, OperatorAdditionalInfo, EvaluatorFactory, ConstBuilder, OperandFacade } from '../../operand/domain'
import { CoreLibrary } from './library'
import { ExpressionEvaluateImpl, ExpressionEvaluateObserveDecorator } from '../application'
import { IExpressions } from '../domain'
import { ExpressionConvert } from '../application/useCases/convert'
import { ModelServiceImpl } from '../../model/application'
import { ExpressionConvertFunction } from './convertFrom/convertFromFunction'
import { ExpressionConvertGraphql } from './convertFrom/convertFromGraphql'
import { OperandFacadeImpl } from '../../operand/infrastructure'

export class Expressions implements IExpressions {
	public model: ModelService

	private expressionConvert:ExpressionConvert
	private operandFacade:OperandFacade
	private expressionEvaluator:ExpressionEvaluateObserveDecorator
	constructor () {
		this.model = new ModelServiceImpl()
		this.operandFacade = new OperandFacadeImpl(this.model)
		this.expressionConvert = new ExpressionConvert()
			.add('function', new ExpressionConvertFunction(this.operandFacade.getBuilder('sync')))
			.add('graphql', new ExpressionConvertGraphql())
		new CoreLibrary(this.operandFacade.getBuilder('sync')).load(this.model)
		this.expressionEvaluator = new ExpressionEvaluateObserveDecorator(
			new ExpressionEvaluateImpl(this.operandFacade)
		)
	}

	public addLibrary (library:Library):IExpressions {
		library.load(this.model)
		return this
	}

	public get operators (): [string, OperatorMetadata][] {
		return this.model.operators
	}

	public get enums (): [string, [string, any][]][] {
		return this.model.enums
	}

	public get formats (): [string, Format][] {
		return this.model.formats
	}

	public get constants (): [string, any][] {
		return this.model.constants
	}

	public get functions (): [string, OperatorMetadata][] {
		return this.model.functions
	}

	public addOperator (sing:string, source:any, additionalInfo: OperatorAdditionalInfo):void {
		this.model.addOperator(source, sing, additionalInfo)
	}

	public addFunction (sing:string, source:any, additionalInfo?: FunctionAdditionalInfo):void {
		this.model.addFunction(sing, source, additionalInfo)
	}

	public addEnum (key:string, values:[string, any][] | any):void {
		this.model.addEnum(key, values)
	}

	public addFormat (key:string, pattern:string):void {
		this.model.addFormat(key, pattern)
	}

	public addConstant (key:string, value:any):void {
		this.model.addConstant(key, value)
	}

	public addOperatorAlias (alias:string, reference:string):void {
		this.model.addOperatorAlias(alias, reference)
	}

	public addFunctionAlias (alias:string, reference:string):void {
		this.model.addFunctionAlias(alias, reference)
	}

	public convert (source: any, from:string): [string, any] {
		return this.expressionConvert.convert(source, from)
	}

	public get constBuilder (): ConstBuilder {
		return this.operandFacade.constBuilder
	}

	public getEvaluatorFactory (key:string):EvaluatorFactory {
		return this.operandFacade.getBuilder(key).evaluatorFactory
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): Parameter[] {
		return this.operandFacade.parameters(expression)
	}

	/**
	 * Get type of expression
	 * @param expression  expression
	 * @returns Type of expression
	 */
	public type (expression: string): string {
		return this.operandFacade.type(expression)
	}

	public build (expression: string): Operand {
		return this.operandFacade.build(expression, 'sync')
	}

	public clone (source:Operand):Operand {
		return this.operandFacade.clone(source)
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluate expression
	 */
	public eval (expression: string, data?: any): any {
		const context = new Context(new Data(data))
		return this.expressionEvaluator.eval(expression, context)
	}

	public evalAsync (expression: string, data: any = {}): Promise<any> {
		const context = new Context(new Data(data))
		return this.expressionEvaluator.evalAsync(expression, context)
	}

	// Listeners and subscribers
	public subscribe (observer:ActionObserver):void {
		this.expressionEvaluator.subscribe(observer)
	}

	public unsubscribe (observer:ActionObserver): void {
		this.expressionEvaluator.unsubscribe(observer)
	}
}
