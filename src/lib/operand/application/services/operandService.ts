import { IOperandBuilder, ITypeService, IOperandService } from '../../domain'
import { Operand } from '../../../commons/domain'
import { helper } from '../../..'
import { ICache, Autowired, Service } from 'h3lp'

@Service('exp.operand.service')
export class OperandService implements IOperandService {
	@Autowired('exp.operand.cache')
	private cache!: ICache<string, Operand>

	@Autowired('exp.service.type')
	private typeService!: ITypeService

	@Autowired('exp.operand.builder')
	private builders!:any

	private getBuilder (key:string):IOperandBuilder {
		return this.builders[key] as IOperandBuilder
	}

	public build (expression: string, type:string, useCache:boolean): Operand {
		try {
			const builder = this.getBuilder(type)
			if (!useCache) {
				return builder.build(expression)
			}
			const key = `${helper.utils.hashCode(expression)}-${type}`
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

	public typed (expression: string, type:string): Operand {
		const key = `${helper.utils.hashCode(expression)}-${type}`
		const value = this.cache.get(key) as Operand
		if (!value) {
			const builder = this.getBuilder(type)
			const operand = builder.build(expression)
			this.typeService.getType(operand)
			this.cache.set(key, operand)
			return operand
		} else if (value.returnType === undefined) {
			this.typeService.getType(value)
			this.cache.set(key, value)
			return value
		} else {
			return value
		}
	}

	public clone (operand: Operand, type:string): Operand {
		return this.getBuilder(type).clone(operand)
	}
}
