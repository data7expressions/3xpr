/* eslint-disable @typescript-eslint/ban-types */
import { OperatorMetadata, OperatorAdditionalInfo, FunctionAdditionalInfo, PrototypeEvaluator } from '../../operand/domain'
import { Sing, Format, Parameter } from '../../shared/domain'
import { Library, ModelService } from '../domain'
export class ModelServiceImpl implements ModelService {
	private _enums: any
	private _constants: any
	private _formats: any
	private _operators: any
	private _functions: any
	public _operatorAlias:any
	public _functionAlias:any
	constructor () {
		this._enums = {}
		this._constants = {}
		this._formats = {}
		this._operators = {}
		this._functions = {}
		this._operatorAlias = {}
		this._functionAlias = {}
	}

	public get operatorAlias ():[string, any][] {
		return Object.entries(this._operatorAlias)
	}

	public get functionAlias ():[string, any][] {
		return Object.entries(this._functionAlias)
	}

	public get constants ():[string, any][] {
		return Object.entries(this._constants)
	}

	public get formats ():[string, Format][] {
		return Object.entries(this._formats)
	}

	public get enums ():[string, [string, any][]][] {
		return Object.entries(this._enums)
	}

	public get operators ():[string, OperatorMetadata][] {
		const operators:[string, OperatorMetadata][] = []
		for (const entry of Object.entries(this._operators)) {
			for (const q of Object.values(entry[1] as any)) {
				operators.push([entry[0], q as OperatorMetadata])
			}
		}
		for (const entry of Object.entries(this._operatorAlias)) {
			const key = entry[1] as string
			for (const q of Object.values(this._operators[key] as any)) {
				operators.push([entry[0], q as OperatorMetadata])
			}
		}
		return operators
	}

	public get functions ():[string, OperatorMetadata][] {
		let list:[string, OperatorMetadata][] = []
		list = Object.entries(this._functions)
		for (const entry of Object.entries(this._functionAlias)) {
			const key = entry[1] as string
			list.push([entry[0], this._functions[key]])
		}
		return list
	}

	public addEnum (name:string, values:[string, any][] | any):void {
		if (Array.isArray(values)) {
			if (values.length > 0) {
				this._enums[name] = values
			}
		} else if (typeof values === 'object') {
			const _values:[string, any][] = []
			for (const entry of Object.entries(values)) {
				_values.push([entry[0], entry[1]])
			}
			this._enums[name] = _values
		} else {
			throw new Error(`enum ${name} invalid values`)
		}
	}

	public addFormat (key:string, pattern:string):void {
		this._formats[key] = { name: key, pattern, regExp: new RegExp(pattern) } as Format
	}

	public addConstant (key:string, value:any):void {
		this._constants[key] = value
	}

	public addOperatorAlias (alias:string, reference:string):void {
		this._operatorAlias[alias] = reference
	}

	public addFunctionAlias (alias:string, reference:string):void {
		this._functionAlias[alias] = reference
	}

	public addLibrary (library:Library):void {
		library.load(this)
	}

	public addOperator (sing:string, source:any, additionalInfo: OperatorAdditionalInfo): void {
		const singInfo = this.getSing(sing)
		const metadata:OperatorMetadata = {
			priority: additionalInfo.priority,
			deterministic: false,
			operands: singInfo.params.length,
			doc: additionalInfo.doc ? additionalInfo.doc : { description: additionalInfo.description || sing },
			params: singInfo.params,
			returnType: singInfo.returnType,
			async: additionalInfo.async || false
		}
		if (source instanceof PrototypeEvaluator) {
			metadata.custom = source as PrototypeEvaluator
		} else if (typeof source === 'function') {
			metadata.function = source
		} else {
			throw new Error(`operator ${singInfo.name} source not supported`)
		}
		if (additionalInfo && additionalInfo.doc) {
			metadata.doc = additionalInfo.doc
		}
		if (this._operators[singInfo.name] === undefined) {
			this._operators[singInfo.name] = {}
		}
		this._operators[singInfo.name][metadata.operands] = metadata
	}

	public addFunction (sing:string, source:any, additionalInfo:FunctionAdditionalInfo):void {
		const singInfo = this.getSing(sing)
		const metadata:OperatorMetadata = {
			deterministic: additionalInfo && additionalInfo.deterministic ? additionalInfo.deterministic : true,
			operands: singInfo.params.length,
			params: singInfo.params,
			returnType: singInfo.returnType,
			doc: additionalInfo.doc ? additionalInfo.doc : { description: additionalInfo.description || sing },
			async: additionalInfo && additionalInfo.async ? additionalInfo.async : false
		}
		if (source instanceof PrototypeEvaluator) {
			metadata.custom = source as PrototypeEvaluator
		} else if (typeof source === 'function') {
			metadata.function = source
		} else {
			throw new Error(`function ${singInfo.name} source not supported`)
		}
		if (additionalInfo && additionalInfo.doc) {
			metadata.doc = additionalInfo.doc
		}
		this._functions[singInfo.name] = metadata
	}

	public getEnumValue (name:string, option:string):any {
		if (this._enums[name] === undefined) {
			throw new Error(`enum: ${name} not found `)
		}
		const values = this._enums[name] as [string, any][]
		const value = values.find(p => p[0] === option)
		if (value === undefined) {
			throw new Error(`option ${option} in enum: ${name} not found `)
		}
		return value[1]
	}

	public getEnum (name:string):[string, any][] {
		return this._enums[name]
	}

	public getConstantValue (name:string): any | undefined {
		return this._constants[name]
	}

	public getFormat (name:string): Format | undefined {
		return this._formats[name]
	}

	public getOperator (name:string, operands?:number): OperatorMetadata {
		let operators = this._operators[name]
		if (operators === undefined) {
			const key = this._operatorAlias[name]
			if (key) {
				operators = this._operators[key]
			} else {
				throw new Error(`operator: ${name} not found `)
			}
		}
		if (operands !== undefined) {
			const operator = operators[operands]
			if (operator === undefined) {
				throw new Error(`operator ${name} with ${operands} operands not found `)
			}
			return operator
		} else if (Object.keys(operators).length === 1) {
			return Object.values(operators)[0] as OperatorMetadata
		} else if (operators[2] !== undefined) {
			return operators[2]
		}
		throw new Error(`it is necessary to determine the number of operands for the operator ${name}`)
	}

	public getFunction (name: string): OperatorMetadata {
		let metadata = this._functions[name]
		if (metadata === undefined) {
			const key = this._functionAlias[name]
			if (key) {
				metadata = this._functions[key]
			} else {
				throw new Error(`function: ${name} not found `)
			}
		}
		return metadata
	}

	public isEnum (name:string):boolean {
		const names = name.split('.')
		return this._enums[names[0]] !== undefined
	}

	public isConstant (name:string):boolean {
		return this._constants[name] !== undefined
	}

	public isOperator (name:string, operands?:number):boolean {
		let operators = this._operators[name]
		if (operators === undefined) {
			const key = this._operatorAlias[name]
			if (key) {
				operators = this._operators[key]
			} else {
				return false
			}
		}
		if (operands !== undefined) {
			return operators && operators[operands] !== undefined
		}
		return true
	}

	public isFunction (name:string):boolean {
		return this._functions[name] !== undefined || this._functionAlias[name] !== undefined
	}

	public priority (name: string, cardinality?:number): number {
		const metadata = this.getOperator(name, cardinality)
		return metadata && metadata.priority ? metadata.priority : -1
	}

	private getSing (sing:string): Sing {
		const buffer = Array.from(sing)
		const length = buffer.length
		let index = 0
		let functionName = ''
		let prefix = ''
		let _return = ''
		let chars:string[] = []

		// Clear begin spaces
		while (buffer[index] === ' ') {
			index++
		}
		for (;buffer[index] !== '('; index++) {
			if (buffer[index] === ' ' && buffer[index + 1] !== ' ' && buffer[index + 1] !== '(') {
				prefix = chars.join('')
				chars = []
			} else if (buffer[index] !== ' ') {
				chars.push(buffer[index])
			}
		}
		functionName = chars.join('')

		chars = []
		const params:Parameter[] = []
		let name = ''
		let type = ''
		let _default = ''
		let hadDefault = false
		let multiple = false

		for (index++; index < length; index++) {
			if (buffer[index] === ',' || buffer[index] === ')') {
				if (hadDefault) {
					_default = chars.join('')
					if (type === '') {
						type = this.getTypeFromValue(_default)
					}
				} else {
					type = chars.join('')
				}
				if (name.startsWith('...')) {
					multiple = true
					name = name.replace('...', '')
				}
				// Add Param
				params.push({ name, type: type !== '' ? type : 'any', default: _default !== '' ? _default : undefined, multiple })
				if (buffer[index] === ')') {
					break
				}
				chars = []
				name = ''
				type = ''
				_default = ''
				hadDefault = false
				multiple = false
			} else if (buffer[index] === ':') {
				name = chars.join('')
				chars = []
			} else if (buffer[index] === '=') {
				hadDefault = true
				if (name === '') {
					name = chars.join('')
				} else {
					type = chars.join('')
				}
				chars = []
			} else if (buffer[index] !== ' ') {
				chars.push(buffer[index])
			}
		}

		chars = []
		let hadReturn = false
		for (index++; index < length; index++) {
			if (buffer[index] === ':') {
				hadReturn = true
				continue
			} else if (buffer[index] !== ' ') {
				chars.push(buffer[index])
			}
		}
		if (hadReturn) {
			_return = chars.join('')
		}

		return {
			name: functionName,
			returnType: _return !== '' ? _return : 'void',
			params,
			isAsync: prefix === 'async'
		}
	}

	private getTypeFromValue (type:string) :string {
		// TODO:
		return type
	}
}
