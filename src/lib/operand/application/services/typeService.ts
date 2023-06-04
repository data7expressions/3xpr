// import { Const, Var, Template, Operator, CallFunc, Arrow, List, Obj, Property } from './operands'
import { TypeService, OperatorMetadata } from '../../domain'
import { Operand, OperandType } from '../../../shared/domain'
import { ModelService } from '../../../model/domain'
import { Type, PropertyType, ObjType, ListType } from 'typ3s'

export class TypeServiceImpl implements TypeService {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService) {}

	// Example
	// {
	// users:[{name:string,age:integer}],
	// tuple: [integer,string]
	// entries:[string,any]
	// }
	// Primitives: integer, decimal, string, boolean, dateTime, date, time
	// array: [<<type>>]
	// object {key:<<type>>}
	// predicate:  c + b < a
	// indeterminate: any

	public getType (operand: Operand): Type {
		this.solve(operand)
		return operand.returnType || Type.any
	}

	public solve (operand: Operand): void {
		this.solveType(operand)
		this.solveTemplate(operand)
		this.setUndefinedAsAny(operand)
	}

	protected solveType (operand: Operand):void {
		if (operand.type === OperandType.Const ||
			operand.type === OperandType.Var ||
			operand.type === OperandType.Template ||
			operand.type === OperandType.Env ||
			operand.type === OperandType.Default ||
			operand.type === OperandType.Return ||
			operand.type === OperandType.Break) {
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
		} else if (operand.type === OperandType.Block) {
			this.solveBlock(operand)
		} else if (operand.type === OperandType.If ||
			operand.type === OperandType.ElseIf ||
			operand.type === OperandType.Else ||
			operand.type === OperandType.For ||
			operand.type === OperandType.ForIn ||
			operand.type === OperandType.While ||
			operand.type === OperandType.Switch ||
			operand.type === OperandType.Case) {
			this.solveAny(operand)
		} else {
			throw new Error(`Type: ${operand.type} name: ${operand.name} not supported`)
		}
	}

	protected solveTemplate (operand: Operand):void {
		if (operand.type === OperandType.Const ||
			operand.type === OperandType.Var ||
			operand.type === OperandType.Template ||
			operand.type === OperandType.Env ||
			operand.type === OperandType.Block ||
			operand.type === OperandType.If ||
			operand.type === OperandType.ElseIf ||
			operand.type === OperandType.Else ||
			operand.type === OperandType.For ||
			operand.type === OperandType.ForIn ||
			operand.type === OperandType.While ||
			operand.type === OperandType.Switch ||
			operand.type === OperandType.Case) {
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
			throw new Error(`Type: ${operand.type} name: ${operand.name} on template not supported`)
		}
	}

	protected setUndefinedAsAny (operand: Operand): void {
		if (operand.returnType === undefined) {
			operand.returnType = Type.any
		}
		for (const child of operand.children) {
			this.setUndefinedAsAny(child)
		}
	}

	protected solveObject (obj: Operand): void {
		const properties: PropertyType[] = []
		for (const keyVal of obj.children) {
			this.solveType(keyVal.children[0])
			keyVal.returnType = keyVal.children[0].returnType
			properties.push({ name: keyVal.name, type: keyVal.children[0].returnType })
		}
		obj.returnType = Type.Obj(properties)
	}

	protected solveProperty (property: Operand): void {
		this.solveType(property.children[0])
		if (property.children[0].returnType === undefined) {
			property.children[0].returnType = Type.List(Type.Obj([{ name: property.name }]))
		} else if (Type.isList(property.children[0].returnType)) {
			const listType = property.children[0].returnType.list as ListType
			if (listType.items && Type.isObj(listType.items)) {
				const objectType = listType.items.obj as ObjType
				const propertyType = objectType.properties.find(p => p.name === property.name)
				if (propertyType && propertyType.type) {
					property.returnType = propertyType.type
				}
			}
		}
	}

	protected solveArray (array: Operand): void {
		if (array.children === undefined || array.children.length === 0) {
			return
		}
		this.solveType(array.children[0])
		// si se resolvió el tipo del elemento, el tipo del array sera [<<TYPE>>]
		if (array.children[0].returnType !== undefined) {
			array.returnType = Type.List(array.children[0].returnType)
		}
	}

	protected solveBlock (block: Operand): void {
		if (block.children === undefined || block.children.length === 0) {
			return
		}
		for (const line of block.children) {
			this.solveType(line)
		}
	}

	protected solveAny (_for: Operand): void {
		if (_for.children === undefined || _for.children.length === 0) {
			return
		}
		for (const part of _for.children) {
			this.solveType(part)
		}
	}

	protected solveArrow (arrow: Operand): void {
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
		if (!this.isIndeterminateType(metadata.returnType)) {
			// TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
			arrow.returnType = Type.to(metadata.returnType)
		}
		if (array.returnType === undefined && metadata.params[0].type && !this.isIndeterminateType(metadata.params[0].type)) {
			// TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
			array.returnType = Type.to(metadata.params[0].type)
		}
		if (predicate && metadata.params[1].type && !this.isIndeterminateType(metadata.params[1].type)) {
			// TODO: hay que hacer que se pueda convertir de metadata type a Type y viceversa
			predicate.returnType = Type.to(metadata.params[1].type)
		}
		if (predicate) {
			this.solveType(predicate)
		}
		if (this.hadTemplate(metadata)) {
			this.solveTemplateOperator(arrow, metadata)
		}
	}

	protected solveOperator (operator: Operand): void {
		const metadata = this.metadata(operator)
		// intenta resolver el return type por metadata
		if (!this.isIndeterminateType(metadata.returnType)) {
			const returnType = this.trySolveFromMetadata(metadata.returnType)
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

	protected trySolveFromMetadata (type?:string) : Type | undefined {
		// si de acuerdo a la metadata el tipo es primitivo, asigna el tipo
		if (type === undefined) {
			return undefined
		}
		if (Type.isPrimitive(type)) {
			return Type.to(type)
		}
		// si de acuerdo a la metadata el tipo es un array de primitivo, asigna el tipo, example: string[]
		if (type.endsWith('[]')) {
			const elementType = type.substring(0, type.length - 2)
			if (Type.isPrimitive(elementType)) {
				return Type.List(Type.get(elementType))
			}
		}
		return undefined
	}

	protected solveTemplateArray (array: Operand): void {
		const beforeType = array.children[0].returnType
		this.solveTemplate(array.children[0])
		if (array.children[0].returnType && array.children[0].returnType !== beforeType) {
			array.returnType = Type.List(array.children[0].returnType)
		}
	}

	protected solveTemplateProperty (property: Operand): void {
		const beforeType = property.children[0].returnType
		this.solveTemplate(property.children[0])
		if (property.children[0].returnType !== undefined && property.children[0].returnType !== beforeType && Type.isList(property.children[0].returnType)) {
			const arrayType = property.children[0].returnType.list as ListType
			if (Type.isObj(arrayType.items)) {
				const objectType = arrayType.items.obj as ObjType
				const propertyType = objectType.properties.find(p => p.name === property.name)
				if (propertyType && propertyType.type) {
					property.returnType = propertyType.type
				}
			}
		}
	}

	protected solveTemplateObject (obj: Operand): void {
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
			obj.returnType = Type.Obj(properties)
		}
	}

	protected solveTemplateOperator (operator: Operand, metadata:OperatorMetadata): void {
		let templateType:Type|undefined
		// intenta resolver T por return
		if (operator.returnType) {
			if (metadata.returnType === 'T') {
				templateType = operator.returnType
			} else if (metadata.returnType === 'T[]' && Type.isList(operator.returnType)) {
				templateType = (operator.returnType.list as ListType).items
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
					} else if (paramMetadata.type === 'T[]' && Type.isList(child.returnType)) {
						templateType = (child.returnType.list as ListType).items
						break
					}
				}
			}
		}
		// si pudo resolver el T, resuelve donde se utiliza
		if (templateType !== undefined) {
			if (operator.returnType === undefined) {
				if (metadata.returnType === 'T') {
					operator.returnType = templateType
				} else if (metadata.returnType === 'T[]') {
					operator.returnType = Type.List(templateType)
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
						child.returnType = Type.List(templateType)
					}
				}
			}
		}
	}

	protected getElementType (array: Operand): Type | undefined {
		return array.returnType ? (array.returnType.list as ListType).items : undefined
	}

	protected setVariableType (name: string, type: Type, operand: Operand) {
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

	protected isIndeterminateType (type?:string): boolean {
		if (type === undefined) {
			return true
		}
		return ['T', 'T[]', 'any', 'any[]'].includes(type)
	}

	protected hadTemplate (metadata: OperatorMetadata): boolean {
		return metadata.returnType === 'T' || metadata.returnType === 'T[]' || metadata.params.find(p => p.type === 'T' || p.type === 'T[]') !== undefined
	}

	protected undefinedTypes (operator: Operand): boolean {
		return operator.returnType === undefined || operator.children.find(p => p.returnType === undefined) !== undefined
	}

	/**
	 * get metadata of operand
	 * @param operator
	 * @returns
	 */
	protected metadata (operator: Operand): OperatorMetadata {
		return operator.type === OperandType.Operator
			? this.model.getOperator(operator.name, operator.children.length)
			: this.model.getFunction(operator.name)
	}
}
