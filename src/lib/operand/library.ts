import { ParamMetadata, OperatorMetadata, OperatorType } from '../model'

export interface Metadata {
	desc?: string
	return:string
	params:ParamMetadata[]
}

export abstract class Library {
	public name:string
	public enums:any
	public operators:OperatorMetadata[]
	public functions: OperatorMetadata[]

	constructor (name:string) {
		this.name = name
		this.enums = {}
		this.operators = []
		this.functions = []
	}

	public addEnum (key:string, source:any) {
		this.enums[key] = source
	}

	public addFunction (name:string, source:any, custom:any = null, type:OperatorType = OperatorType.function, deterministic = true):any {
		const metadata = this.getMetadata(source)
		this.functions.push({
			name: name,
			operator: name,
			type: type,
			deterministic: deterministic,
			lib: this.name,
			operands: metadata.params.length,
			desc: metadata.desc,
			params: metadata.params,
			return: metadata.return,
			function: source,
			custom: custom
		})
	}

	// // eslint-disable-next-line @typescript-eslint/ban-types
	// private getData (method:Function) {
	// for (const argument of method.arguments) {
	// console.log(argument.getName())
	// console.log(argument.getType().getText())
	// console.log(argument.isOptional())
	// console.log(argument.getInitializer() != null)
	// }
	// return {}
	// }

	public addOperator (name:string, source:any, custom:any = null):any {
		const metadata = this.getMetadata(source)
		this.operators.push({
			operator: name,
			name: source.name,
			deterministic: true,
			type: OperatorType.operator,
			lib: this.name,
			operands: metadata.params.length,
			desc: metadata.desc,
			params: metadata.params,
			return: metadata.return,
			function: source,
			custom: custom
		})
	}

	private getMetadata (source:any):Metadata {
		const args = []
		const _args = this.getArgs(source)
		for (const k in _args) {
			const p = _args[k]
			const data = p.split('=')
			const arg = {
				name: data[0],
				type: 'any',
				default: data.length > 1 ? data[1] : null
			}
			args.push(arg)
		}
		return {
			return: 'any',
			params: args
		}
	}

	private getArgs (source:string) {
		const args = (f:any) => f.toString().replace(/[\r\n\s]+/g, ' ')
			.match(/(?:function\s*\w*)?\s*(?:\((.*?)\)|([^\s]+))/)
			.slice(1, 3)
			.join('')
			.split(/\s*,\s*/)
		return args(source)
	}
}
