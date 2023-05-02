import { h3lp } from 'h3lp'

export class ExpressionNormalizer {
	public normalize (expression: string): [string, number, number][] {
		let isString = false
		let quotes = ''
		const buffer = expression.split('')
		const length = buffer.length
		const result:[string, number, number][] = []
		let line = 0
		let col = 0
		let i = 0
		while (i < length) {
			const p = buffer[i]
			if (isString && p === quotes) {
				isString = false
			} else if (!isString && (p === '\'' || p === '"' || p === '`')) {
				isString = true
				quotes = p
			}
			if (isString) {
				result.push([p, line, col])
			} else if (p === ' ') {
				// Only leave spaces when it's between alphanumeric characters.
				// for example in the case of "} if" there should not be a space
				if (i + 1 < length && i - 1 >= 0 && h3lp.val.isAlphanumeric(buffer[i - 1]) && h3lp.val.isAlphanumeric(buffer[i + 1])) {
					result.push([p, line, col])
				}
			// when there is a block that ends with "}" and then there is an enter , replace the enter with ";"
			// TODO: si estamos dentro de un objecto NO debería agregar ; luego de } sino rompe el obj
			// } else if (p === '\n' && result.length > 0 && result[result.length - 1] === '}') {
			// result.push(';')
			} else if (p === '\n') {
				line++
				col = 0
			} else if (p !== '\r' && p !== '\t') {
				result.push([p, line, col])
			}
			i++
			col++
		}
		if (result[result.length - 1][0] === ';') {
			result.splice(-1)
		}
		return result
	}
}
