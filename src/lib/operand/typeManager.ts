
import { ExpressionConfig } from '../parser/index'
import { Constant, Variable, Operator, FunctionRef, ArrowFunction, List, Obj } from './operands'
import { Type, ObjectType, ArrayType, Operand, IOperandTypeManager, PropertyType } from './../model'

export class OperandTypeManager implements IOperandTypeManager {
	private expressionConfig: ExpressionConfig
	constructor (expressionConfig: ExpressionConfig) {
		this.expressionConfig = expressionConfig
	}

	// Example
	// {
	// users:[{name:string,age:integer}],
	// tuple: [integer,string]
	// entries:[string,any]
	// }
	// Primitives: integer, decimal, string, boolean, datetime, date, time
	// array: [<<type>>]
	// object {key:<<type>>}
	// predicate:  c + b < a
	// indeterminate: any

	public solve (operand: Operand): Type {
		this.solveType(operand)
		return operand.type || 'any'
	}

	private solveType (operand: Operand): Type | undefined {
		if (operand instanceof Constant || operand instanceof Variable) {
			return operand.type
		}
		if (operand instanceof List) {
			return this.solveArray(operand)
		} else if (operand instanceof Obj) {
			return this.solveObject(operand)
		} else if (operand instanceof ArrowFunction) {
			return this.solveArrow(operand)
		}
		// TODO: faltan resolver casos

		return undefined
	}

	/**
	 *
	 * @example { a:integer, b:string  }
	 * @param obj
	 */
	private solveObject (obj: Operand): ObjectType {
		const properties:PropertyType[] = []
		for (const child of obj.children) {
			properties.push({ name: child.name, type: this.solveType(child) })
		}
		return { properties: properties }
	}

	private solveArray (array: Operand): Type | undefined {
		// si el tipo del elemento no esta definido , intenta resolverlo
		if (array.children[0].type === undefined) {
			this.solveType(array.children[0])
		}
		// si se resolvió el tipo del elemento, el tipo del array sera [<<TYPE>>]
		if (array.children[0].type !== undefined) {
			array.type = { ElementType: array.children[0].type }
		} else {
			array.type = { ElementType: undefined }
		}
		return array.type
	}

	private getElementType (array: List) : Type | undefined {
		return array.type ? (array.type as ArrayType).ElementType : undefined
	}

	private solveArrow (arrow:Operand) : Type | undefined {
		const array = arrow.children[0]
		const variable = arrow.children[1]
		const predicate = arrow.children[2]
		this.solveArray(array)
		const elementType = this.getElementType(array)
		if (elementType && array.type) {
			variable.type = elementType
			this.setVariableType(variable.name, elementType, predicate)
			const metadata = this.expressionConfig.getFunction(arrow.name)
			if (metadata.return === 'T' || metadata.return === 'any') {
				arrow.type = elementType
			} else {
				arrow.type = array.type
			}
		}
		return arrow.type
	}

	private setVariableType (name:string, type:Type, operand: Operand) {
		if (operand instanceof Variable && operand.name === name) {
			operand.type = type
		}
		for (const child of operand.children) {
			// es por si se da el caso  xxx.filter( p=> p.filter( p => p + 1 ) )
			if (!(child instanceof ArrowFunction && child.children[1].name === name)) {
				this.setVariableType(name, type, child)
			}
		}
	}

	// TODO: determinar el tipo de la variable de acuerdo a la expression.
	// si se usa en un operador con que se esta comparando.
	// si se usa en una función que tipo corresponde de acuerdo en la posición que esta ocupando.
	// let type = this.solveType(operand,childNumber)
	// private solveTypes (operand: Operand): string {
	// if (operand instanceof Constant || operand instanceof Variable) return operand.type
	// if (operand instanceof ArrowFunction) {
	// this.solveArrowType(operand)
	// } else if (operand instanceof Operator || operand instanceof FunctionRef) {
	// // if (!(operand instanceof ArrowFunction || operand instanceof ChildFunction) && (operand instanceof Operator || operand instanceof FunctionRef)) {
	// let tType = 'any'
	// // get metadata of operand
	// const metadata = operand instanceof Operator
	// ? this.expressionConfig.getOperator(operand.name, operand.children.length)
	// : this.expressionConfig.getFunction(operand.name)

	// // recorre todos los parámetros
	// for (let i = 0; i < metadata.params.length; i++) {
	// const param = metadata.params[i]
	// const child = operand.children[i]
	// if (child === undefined) {
	// break
	// }
	// if (param.type !== 'T' && param.type !== 'any' && child.type === 'any') {
	// // en el caso que el parámetro tenga un tipo definido y el hijo no, asigna al hijo el tipo del parámetro
	// child.type = param.type
	// } else if (param.type === 'T' && child.type !== 'any') {
	// // en el caso que el parámetro sea T y el hijo tiene un tipo definido, determina que T es el tipo de hijo
	// tType = child.type
	// } else if (param.type === 'T[]' && child.type === 'any[]') {
	// this.solveArrayType(child)
	// if (child.type !== 'any[]') {
	// tType = child.type
	// break
	// }
	// } else if (param.type === 'T' && child.type === 'any') {
	// // en el caso que el parámetro sea T y el hijo no tiene un tipo definido, intenta resolver el hijo
	// // en caso de lograrlo determina que T es el tipo de hijo
	// const childType = this.solveTypes(child)
	// if (childType !== 'any') {
	// tType = childType
	// break
	// }
	// }
	// }
	// // si el tipo del operador no fue definido y se puede definir por la metadata
	// if (metadata.return !== 'T' && metadata.return !== 'any' && operand.type === 'any') {
	// operand.type = metadata.return
	// }
	// // en el caso que se haya podido resolver T
	// if (tType !== 'any') {
	// // en el caso que el operando sea T asigna el tipo correspondiente al operando
	// if (metadata.return === 'T' && operand.type === 'any') {
	// operand.type = tType
	// }
	// // busca los parámetros que sea T y los hijos aun no fueron definidos para asignarle el tipo correspondiente
	// for (let i = 0; i < metadata.params.length; i++) {
	// const param = metadata.params[i]
	// const child = operand.children[i]
	// if (param.type === 'T' && child.type === 'any') {
	// child.type = tType
	// }
	// }
	// }
	// }
	// // recorre todos los hijos para resolver el tipo
	// for (let i = 0; i < operand.children.length; i++) {
	// this.solveTypes(operand.children[i])
	// }

	// return operand.type
	// }
}
