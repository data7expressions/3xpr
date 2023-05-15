import { CoreLibrary } from './library'
import { ExpressionEvaluateImpl, ExpressionEvaluateObserveDecorator, ExpressionsImpl } from '../application'
import { Expressions } from '../domain'
import { ExpressionConvertImp } from '../application/useCases/convert'
import { ModelServiceImpl } from '../../model/application'
import { ExpressionConvertFunction } from './convertFrom/convertFromFunction'
import { ExpressionConvertGraphql } from './convertFrom/convertFromGraphql'
import { OperandFacadeBuilder } from '../../operand/infrastructure'

export class ExpressionsBuilder {
	public build (): Expressions {
		const model = new ModelServiceImpl()
		const operandFacade = new OperandFacadeBuilder().build(model)
		const expressionConvert = new ExpressionConvertImp()
			.addConvert('function', new ExpressionConvertFunction(operandFacade.getBuilder('sync')))
			.addConvert('graphql', new ExpressionConvertGraphql())
		new CoreLibrary(operandFacade.getBuilder('sync')).load(model)
		const expressionEvaluator = new ExpressionEvaluateObserveDecorator(
			new ExpressionEvaluateImpl(operandFacade)
		)
		return new ExpressionsImpl(model, expressionConvert, operandFacade, expressionEvaluator, expressionEvaluator)
	}
}
