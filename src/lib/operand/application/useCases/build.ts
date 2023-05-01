// import { IOperandBuilder, OperandBuildOptions } from '../../domain'
// import { Operand } from '../../../shared/domain'
// import { helper } from '../../..'
// import { TypeService } from '../services/typeService'
// import { ICache, Autowired } from 'h3lp'

// export class OperandBuild {
// private typeService:TypeService
// constructor () {
// this.typeService = new TypeService()
// }

// @Autowired('exp.operand.cache')
// private cache!: ICache<string, Operand>

// @Autowired('exp.operand.builder')
// private builders!:any

// private getBuilder (key:string):IOperandBuilder {
// return this.builders[key] as IOperandBuilder
// }

// public build (expression: string, options:OperandBuildOptions): Operand {
// try {
// const builder = this.getBuilder(options.type)
// if (!options.cache) {
// return builder.build(expression)
// }
// const key = `${helper.utils.hashCode(expression)}-${options.type}`
// const value = this.cache.get(key)
// if (!value) {
// const operand = builder.build(expression)
// this.typeService.solve(operand)
// this.cache.set(key, operand)
// return operand
// } else {
// return value
// }
// } catch (error: any) {
// throw new Error('expression: ' + expression + ' error: ' + error.toString())
// }
// }

// public clone (operand: Operand, type:string): Operand {
// return this.getBuilder(type).clone(operand)
// }
// }
