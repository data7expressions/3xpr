import { ExpressionConverter, helper } from '../../'
import { IOperandBuilder } from '../../operand/domain'
import { OperandType } from '../../shared/domain'
import { Autowired, Service } from 'h3lp'

@Service('exp.expression.converter.fromFunction')
export class ExpressionConvertFromFunction implements ExpressionConverter {
	@Autowired('exp.operand.builder.sync')
	private operandBuilder!:IOperandBuilder

	/**
	 * Convert a lambda expression to a query expression
	 * @param lambda lambda expression
	 * @returns Expression manager
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public convert (func: Function): [string, any] {
		if (!func) {
			throw new Error('empty lambda function}')
		}
		const expression = helper.expression.clearLambda(func)
		const operand = this.operandBuilder.build(expression)
		let aux = operand
		while (aux.type !== OperandType.Var) {
			if (aux.children.length > 0) {
				aux = aux.children[0]
			}
		}
		if (aux.name.includes('.')) {
			// Example: __model_1.Products.map(p=>p) =>  Products.map(p=>p)
			// Example: __model_1.Orders.details.map(p=>p) =>  Orders.details.map(p=>p)
			const names:string[] = aux.name.split('.')
			if (names[0].startsWith('__')) {
				// aux.name = names.slice(1).join('.')
				const result = expression.replace(names[0] + '.', '')
				return [result, undefined]
			}
		}
		// Example: Products.map(p=>p) =>  Products.map(p=>p)
		// Example: Orders.details.map(p=>p) =>  Orders.details.map(p=>p)
		return [expression, undefined]
	}
}
