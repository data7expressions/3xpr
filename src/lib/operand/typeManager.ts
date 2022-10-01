
import { ExpressionConfig } from '../parser/index'
import { Constant, Variable, Template, Operator, FunctionRef, ArrowFunction, List, Obj } from './operands'
import { Type, PropertyType, Parameter, ArrayType, Operand, IOperandTypeManager, OperatorMetadata } from '../model'
import { Helper } from '../manager'

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

	public parameters (operand: Operand): Parameter[] {
		const parameters: Parameter[] = []
		if (operand instanceof Variable) {
			parameters.push({ name: operand.name, type: Helper.type.serialize(operand.type) })
		}
		for (const child of operand.children) {
			const childParameters = this.parameters(child)
			const newParameters = childParameters.filter((p:Parameter) => !parameters.map((p:Parameter) => p.name).includes(p.name))
			if (newParameters.length > 0) {
				parameters.push(...newParameters)
			}
		}
		return parameters
	}

	public solve (operand: Operand): Type {
		this.solveType(operand)
		this.solveTemplate(operand)
		this.setUndefinedAsAny(operand)
		return operand.type || 'any'
	}

	private solveType (operand: Operand):void {
		if (operand instanceof Constant || operand instanceof Variable || operand instanceof Template) {
			return
		}
		if (operand instanceof List) {
			this.solveArray(operand)
		} else if (operand instanceof Obj) {
			this.solveObject(operand)
		} else if (operand instanceof ArrowFunction) {
			this.solveArrow(operand)
		} else if (operand instanceof Operator || operand instanceof FunctionRef) {
			this.solveOperator(operand)
		} else {
			throw new Error(`${operand.name} not supported`)
		}
	}

	private solveTemplate (operand: Operand):void {
		if (operand instanceof Constant || operand instanceof Variable || operand instanceof Template) {
			return
		}
		if (operand instanceof List) {
			this.solveTemplateArray(operand)
		} else if (operand instanceof Obj) {
			this.solveTemplateObject(operand)
		} else if (operand instanceof Operator || operand instanceof FunctionRef) {
			const metadata = this.metadata(operand)
			if (this.hadTemplate(metadata) && this.undefinedTypes(operand)) {
				this.solveTemplateOperator(operand, metadata)
			}
			for (const child of operand.children) {
				this.solveTemplate(child)
			}
		} else {
			throw new Error(`${operand.name} not supported`)
		}
	}

	private setUndefinedAsAny (operand: Operand): void {
		if (operand.type === undefined) {
			operand.type = 'any'
		}
		for (const child of operand.children) {
			this.setUndefinedAsAny(child)
		}
	}

	private solveObject (obj: Operand): void {
		const properties: PropertyType[] = []
		for (const child of obj.children) {
			this.solveType(child)
			properties.push({ name: child.name, type: child.type })
		}
		obj.type = { properties: properties }
	}

	private solveArray (array: Operand): void {
		this.solveType(array.children[0])
		// si se resolvió el tipo del elemento, el tipo del array sera [<<TYPE>>]
		if (array.children[0].type !== undefined) {
			array.type = { items: array.children[0].type }
		}
	}

	private solveArrow (arrow: Operand): void {
		const metadata = this.expressionConfig.getFunction(arrow.name)
		const array = arrow.children[0]
		const variable = arrow.children.length > 1 ? arrow.children[1] : undefined
		const predicate = arrow.children.length > 2 ? arrow.children[2] : undefined
		this.solveArray(array)
		const elementType = this.getElementType(array)
		if (elementType && array.type && variable) {
			variable.type = elementType
			if (predicate) {
				this.setVariableType(variable.name, elementType, predicate)
			}
		}
		if (!this.isIndeterminateType(metadata.return)) {
			// TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
			arrow.type = metadata.return as Type
		}
		if (array.type === undefined && !this.isIndeterminateType(metadata.params[0].type)) {
			// TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
			array.type = metadata.params[0].type as Type
		}
		if (predicate && !this.isIndeterminateType(metadata.params[1].type)) {
			// TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
			predicate.type = metadata.params[1].type as Type
		}
		if (predicate) {
			this.solveType(predicate)
		}
		if (this.hadTemplate(metadata)) {
			this.solveTemplateOperator(arrow, metadata)
		}
	}

	private solveOperator (operator: Operand): void {
		const metadata = this.metadata(operator)
		// intenta resolver el return type por metadata
		if (!this.isIndeterminateType(metadata.return)) {
			const returnType = this.trySolveFromMetadata(metadata.return)
			if (returnType) {
				operator.type = returnType
			}
		}
		// tries to resolve the types of the operands
		for (let i = 0; i < metadata.params.length; i++) {
			const paramInfo = metadata.params[i]
			const operand = operator.children[i]
			if (operand === undefined) {
				break
			}
			if (this.isIndeterminateType(paramInfo.type)) {
				continue
			}
			// intenta resolver el tipo del operand por metadata
			const paramType = this.trySolveFromMetadata(paramInfo.type)
			if (paramType) {
				operand.type = paramType
			}
		}
		for (const child of operator.children) {
			this.solveType(child)
		}
		if (this.hadTemplate(metadata)) {
			this.solveTemplateOperator(operator, metadata)
		}
	}

	private trySolveFromMetadata (type?:string) : Type | undefined {
		// si de acuerdo a la metadata el tipo es primitivo, asigna el tipo
		if (type === undefined) {
			return undefined
		}
		if (Helper.type.isPrimitive(type)) {
			return type as Type
		}
		// si de acuerdo a la metadata el tipo es un array de primitivo, asigna el tipo, example: string[]
		if (type.endsWith('[]')) {
			const elementType = type.substring(0, type.length - 2)
			if (Helper.type.isPrimitive(elementType)) {
				return { items: elementType as Type }
			}
		}
		return undefined
	}

	private solveTemplateArray (array: Operand): void {
		const beforeType = array.children[0].type
		this.solveTemplate(array.children[0])
		if (array.children[0].type && array.children[0].type !== beforeType) {
			array.type = { items: array.children[0].type }
		}
	}

	private solveTemplateObject (obj: Operand): void {
		let changed = false
		for (const child of obj.children) {
			const beforeType = child.type
			this.solveTemplate(child)
			if (child.type !== beforeType) {
				changed = true
			}
		}
		if (changed) {
			const properties: PropertyType[] = []
			for (const child of obj.children) {
				properties.push({ name: child.name, type: child.type })
			}
			obj.type = { properties: properties }
		}
	}

	private solveTemplateOperator (operator: Operand, metadata:OperatorMetadata): void {
		let templateType:Type|undefined
		// intenta resolver T por return
		if (operator.type) {
			if (metadata.return === 'T') {
				templateType = operator.type
			} else if (metadata.return === 'T[]' && Helper.type.isArrayType(operator.type)) {
				templateType = (operator.type as ArrayType).items
			}
		}
		// intenta resolver T por alguno de los parámetros
		if (templateType === undefined) {
			for (let i = 0; i < metadata.params.length; i++) {
				const paramMetadata = metadata.params[i]
				if (paramMetadata.type !== 'T' && paramMetadata.type !== 'T[]') {
					continue
				}
				const child = operator.children[i]
				if (child === undefined) {
					break
				}
				if (child.type) {
					if (paramMetadata.type === 'T') {
						templateType = child.type
						break
					} else if (paramMetadata.type === 'T[]' && Helper.type.isArrayType(child.type)) {
						templateType = (child.type as ArrayType).items
						break
					}
				}
			}
		}
		// si pudo resolver el T, resuelve donde se utiliza
		if (templateType !== undefined) {
			if (operator.type === undefined) {
				if (metadata.return === 'T') {
					operator.type = templateType
				} else if (metadata.return === 'T[]') {
					operator.type = { items: templateType }
				}
			}
			for (let i = 0; i < metadata.params.length; i++) {
				const paramMetadata = metadata.params[i]
				if (paramMetadata.type !== 'T' && paramMetadata.type !== 'T[]') {
					continue
				}
				const child = operator.children[i]
				if (child === undefined) {
					break
				}
				if (child.type === undefined) {
					if (paramMetadata.type === 'T') {
						child.type = templateType
					} else if (paramMetadata.type === 'T[]') {
						child.type = { items: templateType }
					}
				}
			}
		}
	}

	private getElementType (array: List): Type | undefined {
		return array.type ? (array.type as ArrayType).items : undefined
	}

	private setVariableType (name: string, type: Type, operand: Operand) {
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

	private isIndeterminateType (type?:string): boolean {
		if (type === undefined) {
			return true
		}
		return ['T', 'T[]', 'any', 'any[]'].includes(type)
	}

	private hadTemplate (metadata: OperatorMetadata): boolean {
		return metadata.return === 'T' || metadata.return === 'T[]' || metadata.params.find(p => p.type === 'T' || p.type === 'T[]') !== undefined
	}

	private undefinedTypes (operator: Operand): boolean {
		return operator.type === undefined || operator.children.find(p => p.type === undefined) !== undefined
	}

	/**
	 * get metadata of operand
	 * @param operator
	 * @returns
	 */
	private metadata (operator: Operand): OperatorMetadata {
		return operator instanceof Operator
			? this.expressionConfig.getOperator(operator.name, operator.children.length)
			: this.expressionConfig.getFunction(operator.name)
	}
}
