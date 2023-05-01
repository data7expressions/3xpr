import { Factory } from 'h3lp'
import { OperandBuilder } from '../application'
Factory.add('exp.operand.builder.basic', new OperandBuilder('basic'))
Factory.add('exp.operand.builder.process', new OperandBuilder('process'))
export * from './expressions'
export * from './helper'
