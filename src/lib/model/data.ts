import { Helper } from './../manager'
export class Data {
	public data: any
	public parent: any
	constructor (data:any, parent?:Data) {
		this.data = data
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
		const names = Helper.getNames(name)
		const value = this.getData(names[0])
		return Helper.getValue(names, value)
	}

	set (name:string, value:any):void {
		const names = name.split('.')
		const level = names.length - 1
		let list = this.getData(names[0])
		for (let i = 0; i < names.length; i++) {
			const name = names[i]
			// if is an array and name is a positive integer
			if (Array.isArray(list) && Helper.isPositiveInteger(name)) {
				const index = Number(name)
				// If the index exceeds the length of the array, nothing assigns it.
				if (index >= list.length) {
					return
				}
				if (i === level) {
					list[index] = value
				} else {
					list = list[index]
				}
			} else {
				if (i === level) {
					list[name] = value
				} else {
					list = list[name]
				}
			}
		}
	}

	init (name:string, value:any):void {
		this.data[name] = value
	}
}
