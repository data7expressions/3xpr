/* eslint-disable @typescript-eslint/ban-types */
// import expConfig from './config.json'
import { Sing, OperatorMetadata, OperatorType, IModelManager, Format, Parameter, OperatorAdditionalInfo, FunctionAdditionalInfo } from '../model'

export class ModelManager implements IModelManager {
	public enums: any
	public constants: any
	public formats: any
	public aliases: any
	public operators: OperatorMetadata[]
	public functions: OperatorMetadata[]
	constructor () {
		this.operators = []
		this.enums = {}
		this.constants = {}
		this.formats = {}
		this.aliases = {}
		this.functions = []
	}

	public addEnum (key:string, source:any):void {
		this.enums[key] = source
	}

	public addFormat (key:string, pattern:string):void {
		this.formats[key] = { name: key, pattern: pattern, regExp: new RegExp(pattern) } as Format
	}

	public addConstant (key:string, value:any):void {
		this.constants[key] = value
	}

	public addAlias (alias:string, reference:string):void {
		this.aliases[alias] = reference
	}

	public isEnum (name:string):boolean {
		const names = name.split('.')
		return this.enums[names[0]] !== undefined
	}

	public isConstant (name:string):boolean {
		return this.constants[name] !== undefined
	}

	public getEnumValue (name:string, option:string):any {
		return this.enums[name][option]
	}

	public getEnum (name:string):any {
		return this.enums[name]
	}

	public getConstantValue (name:string): any | undefined {
		return this.constants[name]
	}

	public getFormat (name:string): Format | undefined {
		return this.formats[name]
	}

	public getOperator (operator:string, operands?:number): OperatorMetadata {
		const list = operands !== undefined ? this.operators.filter(p => p.name === operator && p.operands === operands) : this.operators.filter(p => p.name === operator)
		if (list.length === 0) {
			throw new Error(`operator: ${operator} not found `)
		} else if (list.length === 1) {
			return list[0]
		} else {
			const operatorBinary = list.find(p => p.operands === 2)
			if (operatorBinary === undefined) {
				throw new Error(`operator: ${operator} not found `)
			} else {
				return operatorBinary
			}
		}
	}

	public getFunction (name: string): OperatorMetadata {
		let metadata = this.functions.find(p => p.name === name)
		if (metadata === undefined) {
			if (this.aliases[name] !== undefined) {
				metadata = this.functions.find(p => p.name === this.aliases[name])
			}
			if (metadata === undefined) {
				throw new Error(`function: ${name} not found `)
			}
		}
		return metadata
	}

	public priority (name: string, cardinality?:number): number {
		const metadata = this.getOperator(name, cardinality)
		return metadata && metadata.priority ? metadata.priority : -1
	}

	public addOperator (sing:string, source:any, additionalInfo: OperatorAdditionalInfo): void {
		const singInfo = this.getSing(sing)
		let func, custom
		if (Object.getPrototypeOf(source).name === OperatorType.Operator) {
			custom = source
		} else if (typeof source === 'function') {
			func = source
		} else {
			throw new Error(`operator ${singInfo.name} source not supported`)
		}

		const metadata = {
			name: singInfo.name,
			type: OperatorType.Operator,
			priority: additionalInfo.priority,
			deterministic: false,
			operands: singInfo.params.length,
			// description: metadata.description,
			params: singInfo.params,
			return: singInfo.return,
			function: func,
			custom: custom
		}
		const index = this.operators.findIndex(p => p.name === metadata.name && p.operands === metadata.operands)
		if (index === -1) {
			this.operators.push(metadata)
		} else {
			this.operators[index] = metadata
		}
	}

	public addFunction (sing:string, source:any, additionalInfo?:FunctionAdditionalInfo):void {
		const singInfo = this.getSing(sing)
		let func, custom
		if ([OperatorType.Arrow, OperatorType.ChildFunc, OperatorType.CallFunc].includes(Object.getPrototypeOf(source).name)) {
			custom = source
		} else if (typeof source === 'function') {
			func = source
		} else {
			throw new Error(`function ${singInfo.name} source not supported`)
		}

		const metadata = {
			name: singInfo.name,
			type: OperatorType.Func,
			deterministic: additionalInfo && additionalInfo.deterministic ? additionalInfo.deterministic : true,
			operands: singInfo.params.length,
			// description: metadata.description,
			params: singInfo.params,
			return: singInfo.return,
			function: func,
			custom: custom
		}
		const index = this.functions.findIndex(p => p.name === metadata.name && p.type === metadata.type)
		if (index === -1) {
			this.functions.push(metadata)
		} else {
			this.functions[index] = metadata
		}
	}

	private getSing (sing:string): Sing {
		const buffer = Array.from(sing)
		const length = buffer.length
		let index = 0
		let functionName = ''
		let _return = ''
		let chars:string[] = []

		for (;buffer[index] !== '('; index++) {
			if (buffer[index] !== ' ') {
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
				params.push({ name: name, type: type !== '' ? type : 'any', default: _default !== '' ? _default : undefined, multiple: multiple })
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
			return: _return !== '' ? _return : 'void',
			params: params
		}
	}

	private getTypeFromValue (type:string) :string {
		return type
	}
}
