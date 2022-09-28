
import { Node } from './../parser'

export interface IParserManager {
	refresh () :void
	priority (name: string, cardinality?:number): number
	isEnum (name: string):boolean
	getEnumValue (name: string, option: any):any
	getEnum (name: string):any
	parse (expression: string): Node
	toExpression (node: Node): string
	minify (expression: string): string
}
