import { helper } from '../../'
import { IOperandService } from '../../operand/domain'
import { OperandType } from '../../commons/domain'

export class ExpressionConvertFromFunction {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly operandService:IOperandService) {}
	/**
	 * Convert a lambda expression to a query expression
	 * @param lambda lambda expression
	 * @returns Expression manager
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression (func: Function): string {
		if (!func) {
			throw new Error('empty lambda function}')
		}
		const expression = helper.expression.clearLambda(func)
		const operand = this.operandService.build(expression, 'basic', true)
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
				return result
			}
		}
		// Example: Products.map(p=>p) =>  Products.map(p=>p)
		// Example: Orders.details.map(p=>p) =>  Orders.details.map(p=>p)
		return expression
	}
}
