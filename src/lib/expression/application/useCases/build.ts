
import { Operand } from '../../../shared/domain'
import { helper } from '../../..'
import { IOperandBuilder, OperandBuildOptions } from '../../../operand/domain'
import { ICache, Autowired } from 'h3lp'

export class OperandBuild {
	@Autowired('exp.operand.cache')
	private cache!: ICache<string, Operand>

	@Autowired('exp.operand.builder')
	private builders!:any

	private getBuilder (key:string):IOperandBuilder {
		return this.builders[key] as IOperandBuilder
	}

	public build (expression: string, options:OperandBuildOptions): Operand {
		try {
			const builder = this.getBuilder(options.type)
			if (!options.cache) {
				return builder.build(expression)
			}
			const key = `${helper.utils.hashCode(expression)}-${options.type}`
			const value = this.cache.get(key)
			if (!value) {
				const operand = builder.build(expression)
				this.cache.set(key, operand)
				return operand
			} else {
				return value
			}
		} catch (error: any) {
			throw new Error('expression: ' + expression + ' error: ' + error.toString())
		}
	}
}
