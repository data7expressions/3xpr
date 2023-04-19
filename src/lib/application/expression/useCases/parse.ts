import { Operand, IModelService } from '../../../domain'
import { Parser } from '../services/parser'

export class ExpressionParse {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly model: IModelService) {}

	public parse (expression: [string, number, number][]): Operand {
		return new Parser(this.model, expression).parse()
	}
}
