import { OperandType } from '.'
export class Node {
	// eslint-disable-next-line no-useless-constructor
	public constructor (public readonly name:any, public readonly type:OperandType, public readonly children:Node[] = []) { }
}
