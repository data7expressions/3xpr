import { CoreLibrary } from './library'
import { ExpressionEvaluateImpl, ExpressionEvaluateObserveDecorator, Expressions } from '../application'
import { IExpressions } from '../domain'
import { ExpressionConvertImp } from '../application/useCases/convert'
import { ModelServiceImpl } from '../../model/application'
import { ExpressionConvertFunction } from './convertFrom/convertFromFunction'
import { ExpressionConvertGraphql } from './convertFrom/convertFromGraphql'
import { OperandFacadeBuilder } from '../../operand/infrastructure'

export class ExpressionsBuilder {
	public build (): IExpressions {
		const model = new ModelServiceImpl()
		const operandFacade = new OperandFacadeBuilder().build(model)
		const expressionConvert = new ExpressionConvertImp()
			.addConvert('function', new ExpressionConvertFunction(operandFacade.getBuilder('sync')))
			.addConvert('graphql', new ExpressionConvertGraphql())
		new CoreLibrary(operandFacade.getBuilder('sync')).load(model)
		const expressionEvaluator = new ExpressionEvaluateObserveDecorator(
			new ExpressionEvaluateImpl(operandFacade)
		)
		return new Expressions(model, expressionConvert, operandFacade, expressionEvaluator, expressionEvaluator)
	}
}
