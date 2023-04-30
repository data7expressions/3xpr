import { Factory } from 'h3lp'
import { BasicOperandBuilder } from './basic/builder'
import { ProcessOperandBuilder } from './process/builder'
Factory.add('exp.operand.builder.basic', new BasicOperandBuilder())
Factory.add('exp.operand.builder.process', new ProcessOperandBuilder())
export * from './helper'
export * from './constBuilder'
