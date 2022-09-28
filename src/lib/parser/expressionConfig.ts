import expConfig from './config.json'
import { OperatorMetadata, OperatorType, IExpressionConfig, Format } from '../model'
import { Library } from './../operand'

export class ExpressionConfig implements IExpressionConfig {
	public libraries:Library[]
	public operators: OperatorMetadata[]
	public enums: any
	public formats: any
	public functions: OperatorMetadata[]
	constructor () {
		this.libraries = []
		this.operators = []
		this.enums = {}
		this.formats = {}
		this.functions = []
		this.load(expConfig)
	}

	public addLibrary (library:Library):void {
		const index = this.libraries.findIndex(p => p.name === library.name)
		if (index === undefined) {
			this.libraries.push(library)
		} else {
			this.libraries[index] = library
		}
		for (const p in library.operators) {
			const metadata = library.operators[p]
			this.addOperator(metadata)
		}
		for (const p in library.functions) {
			const metadata = library.functions[p]
			this.addFunction(metadata)
		}
		for (const name in library.enums) {
			this.addEnum(name, library.enums[name])
		}
		for (const name in library.formats) {
			this.addEnum(name, library.formats[name])
		}
	}

	public load (data: any): void {
		if (data.enums) {
			for (const name in data.enums) {
				this.addEnum(name, data.enums[name])
			}
		}
		if (data.formats) {
			for (const name in data.formats) {
				this.addFormat(name, data.formats[name])
			}
		}
		if (data.operators) {
			for (const type in data.operators) {
				for (const name in data.operators[type]) {
					const operatorData = data.operators[type][name]
					const metadata: OperatorMetadata = {
						operator: name,
						deterministic: true,
						name: operatorData.name,
						category: operatorData.category,
						type: OperatorType.operator,
						operands: operatorData.params.length,
						priority: operatorData.priority ? operatorData.priority : -1,
						description: operatorData.description,
						params: operatorData.params,
						return: operatorData.return
					}
					this.addOperator(metadata)
				}
			}
		}
		if (data.functions) {
			for (const name in data.functions) {
				const functionData = data.functions[name]
				const metadata: OperatorMetadata = {
					operator: name,
					name: name,
					category: functionData.category,
					deterministic: functionData.deterministic ? functionData.deterministic : true,
					type: functionData.type ? functionData.type : OperatorType.function,
					operands: functionData.params ? functionData.params.length : 0,
					description: functionData.description,
					params: functionData.params,
					return: functionData.return
				}
				this.addFunction(metadata)
			}
		}
	}

	private addEnum (key:string, source:any):void {
		this.enums[key] = source
	}

	private addFormat (key:string, pattern:string):void {
		this.formats[key] = { name: key, pattern: pattern, regExp: new RegExp(pattern) } as Format
	}

	private addOperator (metadata: OperatorMetadata): void {
		const index = this.operators.findIndex(p => p.operator === metadata.operator && p.operands === metadata.operands)
		if (index === -1) {
			this.operators.push(metadata)
		} else {
			if (metadata.function) {
				this.operators[index].function = metadata.function
			}
			if (metadata.custom) {
				this.operators[index].custom = metadata.custom
			}
		}
	}

	private addFunction (metadata: OperatorMetadata): void {
		const index = this.functions.findIndex(p => p.name === metadata.name && p.type === metadata.type)
		if (index === -1) {
			this.functions.push(metadata)
		} else {
			if (metadata.function) {
				this.functions[index].function = metadata.function
			}
			if (metadata.custom) {
				this.functions[index].custom = metadata.custom
			}
		}
	}

	public isEnum (name:string):boolean {
		const names = name.split('.')
		return !!this.enums[names[0]]
	}

	public getEnumValue (name:string, option:string):any {
		return this.enums[name][option]
	}

	public getEnum (name:string):any {
		return this.enums[name]
	}

	public getFormat (name:string): Format | undefined {
		return this.formats[name]
	}

	public getOperator (operator:string, operands?:number): OperatorMetadata {
		const list = operands !== undefined ? this.operators.filter(p => p.operator === operator && p.operands === operands) : this.operators.filter(p => p.operator === operator)
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
		const metadata = this.functions.find(p => p.name === name)
		if (metadata === undefined) {
			throw new Error(`function: ${name} not found `)
		}
		return metadata
	}
}
