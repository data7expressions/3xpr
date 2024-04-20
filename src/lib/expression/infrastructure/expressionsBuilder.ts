import { CoreLibrary } from './library'
import { ExecutorImpl, ExecutorObserveDecorator, ExpressionsImpl } from '../application'
import { Expressions } from '../domain'
import { ExpressionConvertImp } from '../application/useCases/convert'
import { ModelServiceImpl } from '../../model/application'
import { ExpressionConvertFunction } from './convertFrom/convertFromFunction'
import { ExpressionConvertGraphql } from './convertFrom/convertFromGraphql'
import { OperandFacadeBuilder } from '../../operand/infrastructure'
import { ExprH3lp } from '../../shared/infrastructure'

export class ExpressionsBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper:ExprH3lp) {}

	public build (): Expressions {
		const model = new ModelServiceImpl()
		const operandFacade = new OperandFacadeBuilder(model, this.helper).build()
		const expressionConvert = new ExpressionConvertImp()
			.addConvert('function', new ExpressionConvertFunction(operandFacade.getBuilder('expression'), this.helper))
			.addConvert('graphql', new ExpressionConvertGraphql())
		new CoreLibrary(operandFacade.getBuilder('expression'), operandFacade, this.helper).load(model)
		const expressionEvaluator = new ExecutorObserveDecorator(
			new ExecutorImpl(operandFacade)
		)
		return new ExpressionsImpl(model, expressionConvert, operandFacade, expressionEvaluator, expressionEvaluator)
	}
}
