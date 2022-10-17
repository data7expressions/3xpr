import { h3lp } from 'h3lp'
import crypto from 'crypto'

export class Data {
	public data: any
	public parent: any
	constructor (data?:any, parent?:Data) {
		this.data = data || {}
		this.parent = parent
	}

	newData ():Data {
		return new Data({}, this)
	}

	getData (variable:string):any {
		if (this.data[variable] !== undefined || this.parent == null) return this.data
		const _context = this.parent.getData(variable)
		return _context || this.data
	}

	contains (name:string):boolean {
		const names = name.split('.')
		let value = this.getData(names[0])
		for (const n in names) {
			if (value[n] === undefined) return false
			value = value[n]
		}
		return true
	}

	get (name:string):any {
		const names = h3lp.obj.names(name)
		const data = this.getData(names[0])
		return h3lp.obj.getValue(data, name)
	}

	set (name:string, value:any):void {
		const names = h3lp.obj.names(name)
		const data = this.getData(names[0])
		h3lp.obj.setValue(data, name, value)
	}

	init (name:string, value:any):void {
		this.data[name] = value
	}
}

export class Step {
	public name:string
	public id:string
	public values:any[]

	constructor (name:string, id:string) {
		this.name = name
		this.id = id
		this.values = []
	}
}

export class Token {
	public id:string
	public stack:any
	public isBreak:boolean
	public listeners:string[]
	public signals:string[]

	constructor () {
		this.id = crypto.randomUUID()
		this.stack = {}
		this.isBreak = false
		this.listeners = []
		this.signals = []
	}

	public addListener (value:string) {
		this.isBreak = true
		this.listeners.push(value)
	}

	public clearListeners () {
		this.isBreak = false
		this.listeners = []
	}

	public addSignal (value:string) {
		this.signals.push(value)
	}

	public clearSignals () {
		this.signals = []
	}
}

export class Context {
	public data:Data
	public token: Token
	public parent?: Context
	constructor (data?:Data, token?:Token, parent?:Context) {
		this.data = data || new Data({})
		this.token = token || new Token()
		this.parent = parent
	}

	public newContext ():Context {
		return new Context(this.data.newData(), this.token, this)
	}
}
