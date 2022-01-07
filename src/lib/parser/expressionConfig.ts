import expConfig from './config.json'
import { OperatorMetadata, OperatorType } from '../model'
import { Library } from './../operand'

export class ExpressionConfig {
	public libraries:Library[]
	public operators: OperatorMetadata[]
	public enums: any
	public functions: OperatorMetadata[]
	constructor () {
		this.libraries = []
		this.operators = []
		this.enums = {}
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
	}

	public load (data:any):void {
		for (const name in data.enums) {
			this.addEnum(name, data.enums[name])
		}
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
		for (const name in data.functions) {
			const functionData = data.functions[name]
			const metadata: OperatorMetadata = {
				operator: name,
				name: name,
				category: functionData.category,
				deterministic: functionData.deterministic ? functionData.deterministic : true,
				type: functionData.function ? functionData.function : OperatorType.function,
				operands: functionData.params ? functionData.params.length : 0,
				description: functionData.description,
				params: functionData.params,
				return: functionData.return
			}
			this.addFunction(metadata)
		}
	}

	private addEnum (key:string, source:any):void {
		this.enums[key] = source
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

	public getOperator (operator:string, operands:number):OperatorMetadata {
		const metadata = this.operators.find(p => p.operator === operator && p.operands === operands)
		if (metadata === undefined) {
			throw new Error(`operator: ${operator} not found `)
		}
		return metadata
	}

	public getFunction (name: string): OperatorMetadata {
		const metadata = this.functions.find(p => p.name === name)
		if (metadata === undefined) {
			throw new Error(`function: ${name} not found `)
		}
		return metadata
	}
}
