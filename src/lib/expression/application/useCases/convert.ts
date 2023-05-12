
import { ExpressionConverter } from '../ports/converter'

export class ExpressionConvert {
	private converts:any = {}

	public add (key:string, converter:ExpressionConverter): ExpressionConvert {
		this.converts[key] = converter
		return this
	}

	public get (key:string):ExpressionConverter {
		return this.converts[key] as ExpressionConverter
	}

	public convert (source:any, from:string): [string, any] {
		const converter = this.get(from)
		if (converter === undefined) {
			throw new Error(`Converter ${from} not implemented`)
		}
		return converter.convert(source)
	}
}
