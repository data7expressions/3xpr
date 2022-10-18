// import { Const, Var, Template, Operator, CallFunc, Arrow, List, Obj, Property } from './operands'
import { Operand, IModelManager, Type, PropertyType, ObjectType, Parameter, ArrayType, ITypeManager, OperatorMetadata, OperandType } from '../contract'
import { typeHelper } from './helper'

export class TypeManager implements ITypeManager {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: IModelManager) {}

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
		if (operand.type === OperandType.Var) {
			parameters.push({ name: operand.name, type: typeHelper.toString(operand.returnType) })
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
		return operand.returnType || 'any'
	}

	private solveType (operand: Operand):void {
		if (operand.type === OperandType.Const || operand.type === OperandType.Var || operand.type === OperandType.Template) {
			return
		}
		if (operand.type === OperandType.List) {
			this.solveArray(operand)
		} else if (operand.type === OperandType.Obj) {
			this.solveObject(operand)
		} else if (operand.type === OperandType.Arrow) {
			this.solveArrow(operand)
		} else if (operand.type === OperandType.Operator || operand.type === OperandType.ChildFunc || operand.type === OperandType.CallFunc) {
			this.solveOperator(operand)
		} else if (operand.type === OperandType.Property) {
			this.solveProperty(operand)
		} else {
			throw new Error(`${operand.type} ${operand.name}  not supported`)
		}
	}

	private solveTemplate (operand: Operand):void {
		if (operand.type === OperandType.Const || operand.type === OperandType.Var || operand.type === OperandType.Template) {
			return
		}
		if (operand.type === OperandType.List) {
			this.solveTemplateArray(operand)
		} else if (operand.type === OperandType.Obj) {
			this.solveTemplateObject(operand)
		} else if (operand.type === OperandType.Operator || operand.type === OperandType.Arrow || operand.type === OperandType.ChildFunc || operand.type === OperandType.CallFunc) {
			const metadata = this.metadata(operand)
			if (this.hadTemplate(metadata) && this.undefinedTypes(operand)) {
				this.solveTemplateOperator(operand, metadata)
			}
			for (const child of operand.children) {
				this.solveTemplate(child)
			}
		} else if (operand.type === OperandType.Property) {
			this.solveTemplateProperty(operand)
		} else {
			throw new Error(`${operand.type} ${operand.name} not supported`)
		}
	}

	private setUndefinedAsAny (operand: Operand): void {
		if (operand.returnType === undefined) {
			operand.returnType = 'any'
		}
		for (const child of operand.children) {
			this.setUndefinedAsAny(child)
		}
	}

	private solveObject (obj: Operand): void {
		const properties: PropertyType[] = []
		for (const child of obj.children) {
			this.solveType(child.children[0])
			properties.push({ name: child.name, type: child.children[0].returnType })
		}
		obj.returnType = { properties: properties }
	}

	private solveProperty (property: Operand): void {
		this.solveType(property.children[0])
		if (property.children[0].returnType === undefined) {
			property.children[0].returnType = { items: { properties: [{ name: property.name }] } }
		} else if (typeHelper.isArrayType(property.children[0].returnType)) {
			const arrayType = property.children[0].returnType as ArrayType
			if (typeHelper.isObjectType(arrayType.items)) {
				const objectType = arrayType.items as ObjectType
				const propertyType = objectType.properties.find(p => p.name === property.name)
				if (propertyType) {
					property.returnType = propertyType.type
				}
			}
		}
	}

	private solveArray (array: Operand): void {
		this.solveType(array.children[0])
		// si se resolvió el tipo del elemento, el tipo del array sera [<<TYPE>>]
		if (array.children[0].returnType !== undefined) {
			array.returnType = { items: array.children[0].returnType }
		}
	}

	private solveArrow (arrow: Operand): void {
		const metadata = this.model.getFunction(arrow.name)
		const array = arrow.children[0]
		const variable = arrow.children.length > 1 ? arrow.children[1] : undefined
		const predicate = arrow.children.length > 2 ? arrow.children[2] : undefined
		this.solveArray(array)
		const elementType = this.getElementType(array)
		if (elementType && array.returnType && variable) {
			variable.returnType = elementType
			if (predicate) {
				this.setVariableType(variable.name, elementType, predicate)
			}
		}
		if (!this.isIndeterminateType(metadata.return)) {
			// TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
			arrow.returnType = metadata.return as Type
		}
		if (array.returnType === undefined && !this.isIndeterminateType(metadata.params[0].type)) {
			// TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
			array.returnType = metadata.params[0].type as Type
		}
		if (predicate && !this.isIndeterminateType(metadata.params[1].type)) {
			// TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
			predicate.returnType = metadata.params[1].type as Type
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
				operator.returnType = returnType
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
				operand.returnType = paramType
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
		if (typeHelper.isPrimitive(type)) {
			return type as Type
		}
		// si de acuerdo a la metadata el tipo es un array de primitivo, asigna el tipo, example: string[]
		if (type.endsWith('[]')) {
			const elementType = type.substring(0, type.length - 2)
			if (typeHelper.isPrimitive(elementType)) {
				return { items: elementType as Type }
			}
		}
		return undefined
	}

	private solveTemplateArray (array: Operand): void {
		const beforeType = array.children[0].returnType
		this.solveTemplate(array.children[0])
		if (array.children[0].returnType && array.children[0].returnType !== beforeType) {
			array.returnType = { items: array.children[0].returnType }
		}
	}

	private solveTemplateProperty (property: Operand): void {
		const beforeType = property.children[0].returnType
		this.solveTemplate(property.children[0])
		if (property.children[0].returnType !== undefined && property.children[0].returnType !== beforeType && typeHelper.isArrayType(property.children[0].returnType)) {
			const arrayType = property.children[0].returnType as ArrayType
			if (typeHelper.isObjectType(arrayType.items)) {
				const objectType = arrayType.items as ObjectType
				const propertyType = objectType.properties.find(p => p.name === property.name)
				if (propertyType) {
					property.returnType = propertyType.type
				}
			}
		}
	}

	private solveTemplateObject (obj: Operand): void {
		let changed = false
		for (const child of obj.children) {
			const value = child.children[0]
			const beforeType = value.returnType
			this.solveTemplate(value)
			if (value.returnType !== beforeType) {
				changed = true
			}
		}
		if (changed) {
			const properties: PropertyType[] = []
			for (const child of obj.children) {
				properties.push({ name: child.name, type: child.children[0].returnType })
			}
			obj.returnType = { properties: properties }
		}
	}

	private solveTemplateOperator (operator: Operand, metadata:OperatorMetadata): void {
		let templateType:Type|undefined
		// intenta resolver T por return
		if (operator.returnType) {
			if (metadata.return === 'T') {
				templateType = operator.returnType
			} else if (metadata.return === 'T[]' && typeHelper.isArrayType(operator.returnType)) {
				templateType = (operator.returnType as ArrayType).items
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
				if (child.returnType) {
					if (paramMetadata.type === 'T') {
						templateType = child.returnType
						break
					} else if (paramMetadata.type === 'T[]' && typeHelper.isArrayType(child.returnType)) {
						templateType = (child.returnType as ArrayType).items
						break
					}
				}
			}
		}
		// si pudo resolver el T, resuelve donde se utiliza
		if (templateType !== undefined) {
			if (operator.returnType === undefined) {
				if (metadata.return === 'T') {
					operator.returnType = templateType
				} else if (metadata.return === 'T[]') {
					operator.returnType = { items: templateType }
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
				if (child.returnType === undefined) {
					if (paramMetadata.type === 'T') {
						child.returnType = templateType
					} else if (paramMetadata.type === 'T[]') {
						child.returnType = { items: templateType }
					}
				}
			}
		}
	}

	private getElementType (array: Operand): Type | undefined {
		return array.returnType ? (array.returnType as ArrayType).items : undefined
	}

	private setVariableType (name: string, type: Type, operand: Operand) {
		if (operand.type === OperandType.Var && operand.name === name) {
			operand.returnType = type
		}
		for (const child of operand.children) {
			// es por si se da el caso  xxx.filter( p=> p.filter( p => p + 1 ) )
			if (!(child.type === OperandType.Arrow && child.children[1].name === name)) {
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
		return operator.returnType === undefined || operator.children.find(p => p.returnType === undefined) !== undefined
	}

	/**
	 * get metadata of operand
	 * @param operator
	 * @returns
	 */
	private metadata (operator: Operand): OperatorMetadata {
		return operator.type === OperandType.Operator
			? this.model.getOperator(operator.name, operator.children.length)
			: this.model.getFunction(operator.name)
	}
}
