import { Node } from './node'
import { ISerializer } from './../model'

export class NodeSerializer implements ISerializer<Node> {
	public serialize (value: Node): any {
		return this._serialize(value)
	}

	public deserialize (json: any): Node {
		return this._deserialize(json)
		// return this.setParent(node)
	}

	public clone (value: Node): Node {
		return this.deserialize(this.serialize(value))
	}

	private _serialize (node: Node): any {
		const children = []
		for (const child of node.children) {
			children.push(this._serialize(child))
		}
		if (children.length === 0) {
			return { n: node.name, t: node.type }
		}
		return { n: node.name, t: node.type, c: children }
	}

	private _deserialize (serialized: any): Node {
		const children = []
		if (serialized.c) {
			for (const p of serialized.c) {
				children.push(this._deserialize(p))
			}
		}
		return new Node(serialized.n, serialized.t, children)
	}

	// public setParent (node: Node, parent?: Node, index = 0) {
	// try {
	// if (parent) {
	// node.id = parent.id + '.' + index.toString()
	// // node.parent = parent
	// node.index = index
	// node.level = parent.level ? parent.level + 1 : 0
	// } else {
	// node.id = '0'
	// // node.parent = undefined
	// node.index = 0
	// node.level = 0
	// }
	// if (node.children.length > 0) {
	// for (let i = 0; i < node.children.length; i++) {
	// this.setParent(node.children[i], node, i)
	// }
	// }
	// } catch (error: any) {
	// throw new Error('set parent: ' + node.name + ' error: ' + error.toString())
	// }
	// return node
	// }
}
