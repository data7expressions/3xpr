import { Operand } from '../../../commons/domain'
import { IModelService } from '../../../model/domain'
import { Parser } from '../../../expression/application/services/parser'

export class ExpressionParse {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly model: IModelService) {}

	public parse (expression: [string, number, number][]): Operand {
		return new Parser(this.model, expression).parse()
	}
}
