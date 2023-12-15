import { Operand } from '../../../shared/domain'
import { OperandBuilder } from '../../domain'

export class OperandBuild {
	private builders:any
	constructor () {
		this.builders = {}
	}

	public add (key:string, builder:OperandBuilder): OperandBuild {
		this.builders[key] = builder
		return this
	}

	public get (key:string):OperandBuilder {
		return this.builders[key] as OperandBuilder
	}

	public build (expression: string, key = 'expression'): Operand {
		try {
			return this.get(key).build(expression)
		} catch (error: any) {
			throw new Error(`${key} ${expression} expression  error: ${error}`)
		}
	}
}
