import { Helper } from '../manager'
import {
	Constant, Variable, KeyValue, List, Obj, Operator, FunctionRef, Block, ArrowFunction, ChildFunction,
	If, ElseIf, Else, While, For, ForIn, Switch, Break, Continue, Function, Return, Try, Catch, Throw, Case, Default,
	Template, Property
} from './operands'
import { ISerializer, IModelManager, OperandMetadata, Operand } from './../model'

export class OperandSerializer implements ISerializer<Operand> {
	private model: IModelManager
	constructor (model: IModelManager) {
		this.model = model
	}

	public clone (value: Operand): Operand {
		return this.deserialize(this.serialize(value))
	}

	public serialize (operand: Operand): string {
		return JSON.stringify(this._serialize(operand))
	}

	private _serialize (operand: Operand): OperandMetadata {
		const children = []
		for (const k in operand.children) {
			children.push(this._serialize(operand.children[k]))
		}
		if (operand instanceof KeyValue) {
			return { name: operand.name, classType: operand.constructor.name, children: children, type: Helper.type.serialize(operand.type), property: operand.property }
		} else if (operand instanceof Variable) {
			return { name: operand.name, classType: operand.constructor.name, children: children, type: Helper.type.serialize(operand.type), number: operand.number }
		} else {
			return { name: operand.name, classType: operand.constructor.name, children: children, type: Helper.type.serialize(operand.type) }
		}
	}

	public deserialize (value: string): Operand {
		return (this._deserialize(JSON.parse(value))) as Operand
	}

	private _deserialize (value: OperandMetadata): Operand {
		const children = []
		if (value.children) {
			for (const k in value.children) {
				children.push(this._deserialize(value.children[k]))
			}
		}
		switch (value.classType) {
		case 'ArrowFunction':
			return new ArrowFunction(value.name, children, this.model)
		case 'ChildFunction':
			return new ChildFunction(value.name, children, this.model)
		case 'FunctionRef':
			return new FunctionRef(value.name, children, this.model)
		case 'Operator':
			return new Operator(value.name, children, this.model)
		case 'List':
			return new List(value.name, children)
		case 'Obj':
			return new Obj(value.name, children)
		case 'KeyValue':
			return new KeyValue(value.name, children, value.property as string, Helper.type.deserialize(value.type))
		case 'Property':
			return new Property(value.name, children, Helper.type.deserialize(value.type))
		case 'Block':
			return new Block(value.name, children, Helper.type.deserialize(value.type))
		case 'If':
			return new If(value.name, children, Helper.type.deserialize(value.type))
		case 'ElseIf':
			return new ElseIf(value.name, children, Helper.type.deserialize(value.type))
		case 'Else':
			return new Else(value.name, children, Helper.type.deserialize(value.type))
		case 'While':
			return new While(value.name, children, Helper.type.deserialize(value.type))
		case 'For':
			return new For(value.name, children, Helper.type.deserialize(value.type))
		case 'ForIn':
			return new ForIn(value.name, children, Helper.type.deserialize(value.type))
		case 'Switch':
			return new Switch(value.name, children, Helper.type.deserialize(value.type))
		case 'Break':
			return new Break(value.name, children, Helper.type.deserialize(value.type))
		case 'Continue':
			return new Continue(value.name, children, Helper.type.deserialize(value.type))
		case 'Function':
			return new Function(value.name, children, Helper.type.deserialize(value.type))
		case 'Return':
			return new Return(value.name, children, Helper.type.deserialize(value.type))
		case 'Try':
			return new Try(value.name, children, Helper.type.deserialize(value.type))
		case 'Catch':
			return new Catch(value.name, children, Helper.type.deserialize(value.type))
		case 'Throw':
			return new Throw(value.name, children, Helper.type.deserialize(value.type))
		case 'Case':
			return new Case(value.name, children, Helper.type.deserialize(value.type))
		case 'Default':
			return new Default(value.name, children, Helper.type.deserialize(value.type))
		case 'Template':
			return new Template(value.name)
		case 'Constant':
			return new Constant(value.name)
		case 'Variable':
			// eslint-disable-next-line no-case-declarations
			const variable = new Variable(value.name, Helper.type.deserialize(value.type))
			variable.number = value.number
			return variable
		default:
			throw new Error(`Deserialize ${value.classType} not implemented`)
		}
	}
}
