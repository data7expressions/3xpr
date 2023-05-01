// import { IOperandService, OperandBuildOptions } from '../domain'
// import { Operand } from '../../shared/domain'
// import { Service } from 'h3lp'
// import { OperandBuild } from './useCases/build'
// import { OperandNormalize } from './useCases/normalize'
// import { OperandReduce } from './useCases/reduce'
// import { OperandClone } from './useCases/clone'

// @Service('exp.operand.service')
// export class OperandService implements IOperandService {
// private _operandBuild?:OperandBuild
// private get operandBuild ():OperandBuild {
// if (this._operandBuild === undefined) {
// this._operandBuild = new OperandBuild()
// }
// return this._operandBuild
// }

// private _operandClone?:OperandClone
// private get operandClone ():OperandClone {
// if (this._operandClone === undefined) {
// this._operandClone = new OperandClone()
// }
// return this._operandClone
// }

// private _operandNormalize?:OperandNormalize
// private get operandNormalize ():OperandNormalize {
// if (this._operandNormalize === undefined) {
// this._operandNormalize = new OperandNormalize()
// }
// return this._operandNormalize
// }

// private _operandReduce?:OperandReduce
// private get operandReduce ():OperandReduce {
// if (this._operandReduce === undefined) {
// this._operandReduce = new OperandReduce()
// }
// return this._operandReduce
// }

// public build (expression: string, options: OperandBuildOptions): Operand {
// return this.operandBuild.build(expression, options)
// }

// public normalize (operan: Operand): Operand {
// return this.operandNormalize.normalize(operan)
// }

// public reduce (operan: Operand): Operand {
// return this.operandReduce.reduce(operan)
// }

// public clone (operand: Operand, type: string): Operand {
// return this.operandClone.clone(operand, type)
// }
// }
