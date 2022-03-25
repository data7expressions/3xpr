
import { Node, ExpressionConfig } from '../parser/index'
import { Data, Parameter } from '../model'
import {
	Operand, Constant, Variable, KeyValue, List, Obj, Operator, FunctionRef, Block, ArrowFunction, ChildFunction, If, ElseIf, Else, While, For, ForIn
	, Switch, Break, Continue, Function, Return, Try, Catch, Throw, Case, Default, Template, Property
} from './operands'

export interface OperandMetadata
{
	classtype: string,
	name: string,
	children?: OperandMetadata[],
	type?: string,
	property?:string
	parameters?: Parameter[],
	clause?: string,
	alias?: string,
	number?:number
}
export class OperandManager {
	private expressionConfig:ExpressionConfig
	constructor (expressionConfig:ExpressionConfig) {
		this.expressionConfig = expressionConfig
	}

	public build (node:Node):Operand {
		try {
			const operand = this.nodeToOperand(node)
			const reduced = this.reduce(operand)
			return this.setParent(reduced)
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public clone (value:Operand): Operand {
		const metadata = this.serialize(value)
		const cloned = this.deserialize(metadata)
		return cloned
	}

	public serialize (operand:Operand):OperandMetadata {
		const children = []
		for (const k in operand.children) {
			children.push(this.serialize(operand.children[k]))
		}
		if (operand instanceof KeyValue) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, property: operand.property }
		} else if (operand instanceof Variable) {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type, number: operand.number }
		} else {
			return { name: operand.name, classtype: operand.constructor.name, children: children, type: operand.type }
		}
	}

	public deserialize (value:OperandMetadata):Operand {
		const children = []
		if (value.children) {
			for (const k in value.children) {
				children.push(this.deserialize(value.children[k]))
			}
		}
		switch (value.classtype) {
		case 'ArrowFunction':
			return new ArrowFunction(value.name, children)
		case 'ChildFunction':
			return new ChildFunction(value.name, children)
		case 'FunctionRef':
			return new FunctionRef(value.name, children)
		case 'Operator':
			return new Operator(value.name, children)
		case 'List':
			return new List(value.name, children)
		case 'Obj':
			return new Obj(value.name, children)
		case 'KeyValue':
			// eslint-disable-next-line no-case-declarations
			const keyValue = new KeyValue(value.name, children, value.type)
			keyValue.property = value.property
			return keyValue
		case 'Property':
			return new Property(value.name, children, value.type)
		case 'Block':
			return new Block(value.name, children, value.type)
		case 'If':
			return new If(value.name, children, value.type)
		case 'ElseIf':
			return new ElseIf(value.name, children, value.type)
		case 'Else':
			return new Else(value.name, children, value.type)
		case 'While':
			return new While(value.name, children, value.type)
		case 'For':
			return new For(value.name, children, value.type)
		case 'ForIn':
			return new ForIn(value.name, children, value.type)
		case 'Switch':
			return new Switch(value.name, children, value.type)
		case 'Break':
			return new Break(value.name, children, value.type)
		case 'Continue':
			return new Continue(value.name, children, value.type)
		case 'Function':
			return new Function(value.name, children, value.type)
		case 'Return':
			return new Return(value.name, children, value.type)
		case 'Try':
			return new Try(value.name, children, value.type)
		case 'Catch':
			return new Catch(value.name, children, value.type)
		case 'Throw':
			return new Throw(value.name, children, value.type)
		case 'Case':
			return new Case(value.name, children, value.type)
		case 'Default':
			return new Default(value.name, children, value.type)
		case 'Template':
			return new Template(value.name, value.type)
		case 'Constant':
			return new Constant(value.name)
		case 'Variable':
			// eslint-disable-next-line no-case-declarations
			const variable = new Variable(value.name, value.type)
			variable.number = value.number
			return variable
		default:
			throw new Error(`Deserialize ${value.classtype} not implemented`)
		}
	}

	public eval (operand:Operand, data:Data):any {
		this.initialize(operand, data)
		return operand.eval()
	}

	public parameters (operand: Operand): Parameter[] {
		const parameters:Parameter[] = []
		this.loadParameters(operand, parameters)
		return parameters
	}

	private loadParameters (operand:Operand, parameters:Parameter[]) {
		if (operand instanceof Variable) {
			if (parameters.find(p => p.name === operand.name) === undefined) {
				let type:string
				if (operand.type === '')type = 'any'
				else if (operand.type === 'T[]')type = 'array'
				else type = operand.type
				parameters.push({ name: operand.name, type: type })
			}
		}
		for (let i = 0; i < operand.children.length; i++) {
			this.loadParameters(operand.children[i], parameters)
		}
	}

	private initialize (operand:Operand, data:Data) {
		let current = data
		if (operand instanceof ArrowFunction) {
			const childData = current.newData()
			operand.data = childData
			operand.metadata = this.expressionConfig
			current = childData
		} else if (operand instanceof ChildFunction) {
			const childData = current.newData()
			operand.data = childData
			operand.metadata = this.expressionConfig
			current = childData
		} else if (operand instanceof FunctionRef) {
			operand.metadata = this.expressionConfig
		} else if (operand instanceof Operator) {
			operand.metadata = this.expressionConfig
		} else if (operand instanceof Variable || operand instanceof Template) {
			operand.data = current
		}
		for (const k in operand.children) {
			const p = operand.children[k]
			this.initialize(p, current)
		}
	}

	private reduce (operand:Operand):Operand {
		if (operand instanceof Operator) {
			return this.reduceOperand(operand)
		} else if (operand instanceof FunctionRef) {
			const funcMetadata = this.expressionConfig.getFunction(operand.name)
			if (funcMetadata && funcMetadata.deterministic) {
				return this.reduceOperand(operand)
			}
		}
		return operand
	}

	private reduceOperand (operand:Operand):Operand {
		let allConstants = true
		for (const k in operand.children) {
			const p = operand.children[k]
			if (!(p instanceof Constant)) {
				allConstants = false
				break
			}
		}
		if (allConstants) {
			const value = this.eval(operand, new Data({}))
			const constant = new Constant(value)
			constant.parent = operand.parent
			constant.index = operand.index
			return constant
		} else {
			for (let i = 0; i < operand.children.length; i++) {
				const p = operand.children[i]
				operand.children[i] = this.reduce(p)
			}
		}
		return operand
	}

	private setParent (operand:Operand, index = 0, parent?:Operand) {
		try {
			if (parent) {
				operand.id = parent.id + '.' + index
				operand.parent = parent
				operand.index = index
				operand.level = parent.level ? parent.level + 1 : 0
			} else {
				operand.id = '0'
				operand.parent = undefined
				operand.index = 0
				operand.level = 0
			}
			for (let i = 0; i < operand.children.length; i++) {
				const p = operand.children[i]
				this.setParent(p, i, operand)
			}
			return operand
		} catch (error:any) {
			throw new Error('set parent: ' + operand.name + ' error: ' + error.toString())
		}
	}

	private nodeToOperand (node:Node):Operand {
		const children:Operand[] = []
		if (node.children) {
			for (const i in node.children) {
				const p = node.children[i]
				const child = this.nodeToOperand(p)
				children.push(child)
			}
		}
		const operand = this.createOperand(node, children)
		for (let i = 0; i < children.length; i++) {
			const child = children[i]
			child.parent = operand
			child.index = i
		}
		return operand
	}

	private createOperand (node:Node, children:Operand[]):Operand {
		switch (node.type) {
		case 'const':
			return new Constant(node.name)
		case 'var':
			return new Variable(node.name)
		case 'property':
			return new Property(node.name, children)
		case 'template':
			return new Template(node.name)
		case 'keyVal':
			return new KeyValue(node.name, children)
		case 'array':
			return new List(node.name, children)
		case 'obj':
			return new Obj(node.name, children)
		case 'oper':
			return new Operator(node.name, children)
		case 'funcRef':
			return new FunctionRef(node.name, children)
		case 'arrow':
			return new ArrowFunction(node.name, children)
		case 'childFunc':
			return new ChildFunction(node.name, children)
		case 'block':
			return new Block(node.name, children)
		case 'if':
			return new If(node.name, children)
		case 'elseIf':
			return new ElseIf(node.name, children)
		case 'else':
			return new Else(node.name, children)
		case 'while':
			return new While(node.name, children)
		case 'for':
			return new For(node.name, children)
		case 'forIn':
			return new ForIn(node.name, children)
		case 'switch':
			return new Switch(node.name, children)
		case 'case':
			return new Case(node.name, children)
		case 'default':
			return new Default(node.name, children)
		case 'break':
			return new Break(node.name, children)
		case 'continue':
			return new Continue(node.name, children)
		case 'function':
			return new Function(node.name, children)
		case 'return':
			return new Return(node.name, children)
		case 'try':
			return new Try(node.name, children)
		case 'catch':
			return new Catch(node.name, children)
		case 'throw':
			return new Throw(node.name, children)
		default:
			throw new Error('node name: ' + node.name + ' type: ' + node.type + ' not supported')
		}
	}

	// TODO: determinar el tipo de la variable de acuerdo a la expression.
	// si se usa en un operador con que se esta comparando.
	// si se usa en una funcion que tipo corresponde de acuerdo en la posicion que esta ocupando.
	// let type = this.solveType(operand,childNumber)
	private solveTypes (operand:Operand):string {
		if (operand instanceof Constant || operand instanceof Variable) return operand.type
		if (!(operand instanceof ArrowFunction || operand instanceof ChildFunction) && (operand instanceof Operator || operand instanceof FunctionRef)) {
			let tType = 'any'
			// get metadata of operand
			const metadata = operand instanceof Operator
				? this.expressionConfig.getOperator(operand.name, operand.children.length)
				: this.expressionConfig.getFunction(operand.name)

			// recorre todos los parametros
			for (let i = 0; i < metadata.params.length; i++) {
				const param = metadata.params[i]
				const child = operand.children[i]
				if (param.type !== 'T' && param.type !== 'any' && child.type === 'any') {
					// en el caso que el pametro tenga un tipo defido y el hijo no, asigna al hijo el tipo del parametro
					child.type = param.type
				} else if (param.type === 'T' && child.type !== 'any') {
					// en el caso que el pametro sea T y el hijo tiene un tipo definido, determina que T es el tipo de hijo
					tType = child.type
				} else if (param.type === 'T' && child.type === 'any') {
					// en el caso que el pametro sea T y el hijo no tiene un tipo definido, intenta resolver el hijo
					// en caso de lograrlo determina que T es el tipo de hijo
					const childType = this.solveTypes(child)
					if (childType !== 'any') {
						tType = childType
						break
					}
				}
			}
			// en el caso que se haya podido resolver T
			if (tType !== 'any') {
				// en el caso que el operando sea T asigna el tipo correspondiente al operando
				if (metadata.return === 'T' && operand.type === 'any') { operand.type = tType }
				// busca los parametros que sea T y los hijos aun no fueron definidos para asignarle el tipo correspondiente
				for (let i = 0; i < metadata.params.length; i++) {
					const param = metadata.params[i]
					const child = operand.children[i]
					if (param.type === 'T' && child.type === 'any') {
						child.type = tType
					}
				}
			}
		}
		// recorre todos los hijos para resolver el tipo
		for (let i = 0; i < operand.children.length; i++) {
			this.solveTypes(operand.children[i])
		}

		return operand.type
	}
}
