// /* eslint-disable no-case-declarations */
// import { IOperandBuilder, IEvaluatorFactory } from '../../domain'
// import { Operand } from '../../../shared/domain'
// import { OperandNormalize, OperandReduce } from '..'
// import { ExpressionNormalize, ExpressionParse } from '../../../expression/application'
// import { Autowired } from 'h3lp'
// export abstract class OperandBuilder implements IOperandBuilder {
// // eslint-disable-next-line no-useless-constructor
// constructor (protected readonly evaluatorFactory:IEvaluatorFactory) {}

// @Autowired('exp.expression.parse')
// protected expressionParse!: ExpressionParse

// @Autowired('exp.expression.normalize')
// protected expressionNormalize!: ExpressionNormalize

// @Autowired('exp.operand.normalize')
// protected normalize!: OperandNormalize

// @Autowired('exp.operand.reduce')
// protected reduce!:OperandReduce

// public solve (expression: string): Operand {
// const expressionNormalized = this.expressionNormalize.normalize(expression)
// const operand = this.expressionParse.parse(expressionNormalized)
// const normalized = this.normalize.normalize(operand)
// this.complete(normalized)
// return this.reduce.reduce(normalized)
// }

// public clone (source: Operand): Operand {
// const children: Operand[] = []
// for (const child of source.children) {
// children.push(this.clone(child))
// }
// const target = new Operand(source.pos, source.name, source.type, children, source.returnType)
// target.id = source.id
// target.evaluator = this.evaluatorFactory.create(target)
// return target
// }

// protected complete (operand: Operand, index = 0, parentId?:string): void {
// const id = parentId ? parentId + '.' + index : index.toString()
// if (operand.children) {
// for (let i = 0; i < operand.children.length; i++) {
// const child = operand.children[i]
// this.complete(child, i, id)
// }
// }
// operand.id = id
// operand.evaluator = this.evaluatorFactory.create(operand)
// }
// }
