
import { Autowired } from 'h3lp'
import { ExpressionConverter } from '../ports/converter'

export class ExpressionConvert {
	@Autowired('exp.expression.converter')
	private converts!:any

	private getConverter (key:string):ExpressionConverter {
		return this.converts[key] as ExpressionConverter
	}

	public convert (source:any, from:string): [string, any] {
		const converter = this.getConverter(from)
		if (converter === undefined) {
			throw new Error(`Converter ${from} not implemented`)
		}
		return converter.convert(source)
	}
}
