import { h3lp } from 'h3lp'
import { ExpressionConverter } from '../../domain'

export class ExpressionConvertGraphql implements ExpressionConverter {
	public convert (source: any): [string, any ] {
		return new GraphqlParser(source).parse()
	}
}

class GraphqlParser {
	private buffer: string[]
	private length: number
	private index: number
	private expression: string[]
	private context:any
	constructor (source: string) {
		this.buffer = source.split('')
		this.length = this.buffer.length
		this.index = 0
		this.expression = []
		this.context = {}
	}

	private get end ():boolean {
		return this.index >= this.length
	}

	private get current (): any {
		return this.buffer[this.index]
	}

	public parse (): [string, any ] {
		this.read()
		return [this.expression.join(''), this.context]
	}

	private read (level = 0, _break = '', prefix = ''): void {
		while (!this.end) {
			const name = this.getName()
			this.expression.push(prefix + name)
			this.forwardSpaces()
			if (this.current === _break) {
				this.index += 1
				break
			} else if (this.current === '{') {
				this.index += 1
				this.expression.push(level === 0 ? '.map(p=> [' : '.include(p=> [')
				this.read(level + 1, '}', 'p.')
				this.expression.push('])')
			} else if (this.current === '(') {
				this.readArgs(')')
			}
			if (!this.end) {
				this.expression.push(',')
			}
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	private readArgs (_break = '') : void {
		// while (true) {
		// const name = this.getName()
		// this.forwardSpaces()
		// if (this.current === ':') this.index += 1
		// else throw new Error(`attribute ${name} without value`)
		// const value = this.read()
		// properties.push({ name, type })
		// this.forwardSpaces()
		// if (this.current === ',') {
		// this.index += 1
		// } else if (this.current === '}') {
		// this.index += 1
		// break
		// } else {
		// throw new Error('Object without end')
		// }
		// }
		// return { properties }
	}

	private getName (increment = true): string {
		const buff = []
		if (increment) {
			while (!this.end && h3lp.val.isAlphanumeric(this.current)) {
				buff.push(this.current)
				this.index += 1
			}
		} else {
			let index = this.index
			while (!this.end && h3lp.val.isAlphanumeric(this.buffer[index])) {
				buff.push(this.buffer[index])
				index += 1
			}
		}
		return buff.join('')
	}

	private forwardSpaces () {
		while (!this.end && this.buffer[this.index] === ' ') {
			this.index += 1
		}
	}
}
