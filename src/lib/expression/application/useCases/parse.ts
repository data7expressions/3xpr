import { Operand } from '../../../shared/domain'
import { IModelService } from '../../../model/domain'
import { Parser } from '../../../expression/application/services/parser'
import { Autowired } from 'h3lp'

export class ExpressionParse {
	@Autowired('exp.model.service')
	private model!: IModelService

	public parse (expression: [string, number, number][]): Operand {
		return new Parser(this.model, expression).parse()
	}
}
