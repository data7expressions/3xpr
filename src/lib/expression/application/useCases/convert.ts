import { ExpressionConvert, ExpressionConverter } from '../../domain'

// eslint-disable-next-line no-use-before-define
export class ExpressionConvertImp implements ExpressionConvert {
	private converts:any = {}

	public addConvert (key:string, converter:ExpressionConverter): ExpressionConvert {
		this.converts[key] = converter
		return this
	}

	public getConvert (key:string):ExpressionConverter {
		return this.converts[key] as ExpressionConverter
	}

	public convert (source:any, from:string): [string, any] {
		const converter = this.getConvert(from)
		if (converter === undefined) {
			throw new Error(`Converter ${from} not implemented`)
		}
		return converter.convert(source)
	}
}
