import { ModelService, Library } from '../../model/domain'
import { Data, Operand, Context, Parameter, Format, ActionObserver } from '../../shared/domain'
import { OperatorMetadata, FunctionAdditionalInfo, OperatorAdditionalInfo, ConstBuilder, OperandFacade, OperandBuilder } from '../../operand/domain'
import { ExpressionConvert, ExpressionConverter, Executor, ExpressionListener, Expressions } from '../domain'

export class ExpressionsImpl implements Expressions {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService,
		private readonly expressionConvert:ExpressionConvert,
		private readonly operandFacade:OperandFacade,
		private readonly executor:Executor,
		private readonly listener:ExpressionListener) {}

	get operatorAlias (): [string, any][] {
		return this.model.operatorAlias
	}

	get functionAlias (): [string, any][] {
		return this.model.functionAlias
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

	public addFunction (sing:string, source:any, additionalInfo: FunctionAdditionalInfo):void {
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

	public addLibrary (library:Library):void {
		this.model.addLibrary(library)
	}

	public getConstantValue (name:string): any | undefined {
		return this.model.getConstantValue(name)
	}

	public getEnumValue (name:string, option:string):any {
		return this.model.getEnumValue(name, option)
	}

	public getEnum (name:string):any {
		return this.model.getEnum(name)
	}

	public getFormat (name:string): Format | undefined {
		return this.model.getFormat(name)
	}

	public getOperator (operator:string, operands?:number): OperatorMetadata {
		return this.model.getOperator(operator, operands)
	}

	public getFunction (name: string): OperatorMetadata {
		return this.model.getFunction(name)
	}

	public priority (name: string, cardinality?:number): number {
		return this.model.priority(name, cardinality)
	}

	public isEnum (name:string):boolean {
		return this.model.isEnum(name)
	}

	public isConstant (name:string):boolean {
		return this.model.isConstant(name)
	}

	public isOperator (name:string, operands?:number):boolean {
		return this.model.isOperator(name, operands)
	}

	public isFunction (name:string):boolean {
		return this.model.isFunction(name)
	}

	public get constBuilder (): ConstBuilder {
		return this.operandFacade.constBuilder
	}

	public getBuilder (key:string):OperandBuilder {
		return this.operandFacade.getBuilder(key)
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

	public build (expression: string, key?:string): Operand {
		return this.operandFacade.build(expression, key)
	}

	public clone (source:Operand, key?:string):Operand {
		return this.operandFacade.clone(source, key)
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluate expression
	 */
	public eval (expression: string, data?: any): any {
		const context = new Context(new Data(data))
		return this.executor.eval(expression, context)
	}

	public evalAsync (expression: string, data: any = {}): Promise<any> {
		const context = new Context(new Data(data))
		return this.executor.evalAsync(expression, context)
	}

	public execute (task: string, data: any = {}): Promise<any> {
		const context = new Context(new Data(data))
		return this.executor.execute(task, context)
	}

	public addConvert (key: string, converter: ExpressionConverter): ExpressionConvert {
		this.expressionConvert.addConvert(key, converter)
		return this
	}

	public getConvert (key: string): ExpressionConverter {
		return this.expressionConvert.getConvert(key)
	}

	public convert (source: any, from:string): [string, any] {
		return this.expressionConvert.convert(source, from)
	}

	// Listeners and subscribers
	public subscribe (observer:ActionObserver):void {
		this.listener.subscribe(observer)
	}

	public unsubscribe (observer:ActionObserver): void {
		this.listener.unsubscribe(observer)
	}
}
