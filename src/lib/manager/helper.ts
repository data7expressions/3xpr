import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import https from 'https'
// import url from 'url'

export class Helper {
	public static async get (uri: any): Promise<any> {
		// https://www.geeksforgeeks.org/node-js-https-request-function/
		return new Promise<string>((resolve, reject) => {
			let data = ''
			// https://www.geeksforgeeks.org/node-js-url-method/
			// const _url = new url.URL(uri)
			// const options = {
			// hostname: _url.hostname,
			// port: _url.protocol === 'https' ? 443 : 80,
			// path: _url.pathname,
			// method: 'GET'
			// // https://levelup.gitconnected.com/how-to-resolve-certificate-errors-in-nodejs-app-involving-ssl-calls-781ce48daded
			// // https://levelup.gitconnected.com/how-to-resolve-certificate-errors-in-nodejs-app-involving-ssl-calls-781ce48daded
			// // NO FUNCIONO
			// // rejectUnauthorized: false
			// }
			const req = https.request(uri, res => {
				res.on('data', chunk => {
					data = data + chunk.toString()
				})
				res.on('end', () => {
					resolve(data)
				})
			})
			req.on('error', error => {
				reject(error)
			})
			req.end()
		})
	}

	public static getType (value: any): string {
		if (Array.isArray(value)) return 'array'
		if (typeof value === 'string') {
			// TODO determinar si es fecha.
			return 'string'
		}
		return typeof value
	}

	public static async exec (command: string, cwd: string = process.cwd()): Promise<any> {
		return new Promise<string>((resolve, reject) => {
			exec(command, { cwd: cwd }, (error: any, stdout: any, stderr: any) => {
				if (stdout) return resolve(stdout)
				if (stderr) return resolve(stderr)
				if (error) return reject(error)
				return resolve('')
			})
		})
	}

	public static replace (string:string, search:string, replace:string) {
		return string.split(search).join(replace)
	}

	public static clone (obj:any):any {
		return obj && typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj
	}

	public static extendObject (obj: any, base: any) {
		if (Array.isArray(base)) {
			for (const baseChild of base) {
				const objChild = obj.find((p: any) => p.name === baseChild.name)
				if (objChild === undefined) {
					obj.push(Helper.clone(baseChild))
				} else {
					Helper.extendObject(objChild, baseChild)
				}
			}
		} else if (typeof base === 'object') {
			for (const k in base) {
				if (obj[k] === undefined) {
					obj[k] = Helper.clone(base[k])
				} else if (typeof obj[k] === 'object') {
					Helper.extendObject(obj[k], base[k])
				}
			}
		}
		return obj
	}

	public static getNames (value:string):string[] {
		if (value === '.') {
			// in case "".[0].name" where var is "."
			return [value]
		} else if (value.startsWith('..')) {
			// in case ".name.filter"
			return ['.'].concat(value.substring(2).split('.'))
		} else if (value.startsWith('.')) {
			// in case ".name.filter"
			return ['.'].concat(value.substring(1).split('.'))
		} else {
			return value.split('.')
		}
	}

	public static getValue (names:string[], source:any) :any {
		let value = source
		for (const name of names) {
			if (Array.isArray(value)) {
				let result:any[] = []
				for (const item of value) {
					if (item[name] !== undefined) {
						if (Array.isArray(item[name])) {
							result = result.concat(item[name])
						} else {
							result.push(item[name])
						}
					}
				}
				value = result
			} else {
				if (value[name] === undefined) return null
				value = value[name]
			}
		}
		return value
	}

	public static isObject (obj:any):boolean {
		return obj && typeof obj === 'object' && obj.constructor === Object
	}

	public static isEmpty (value:any):boolean {
		return value === null || value === undefined || value.toString().trim().length === 0
	}

	public static nvl (value:any, _default:any):any {
		return !this.isEmpty(value) ? value : _default
	}

	public static async existsPath (sourcePath:string):Promise<boolean> {
		const fullPath = Helper.resolvePath(sourcePath)
		return new Promise<boolean>((resolve) => {
			fs.access(fullPath, (err) => {
				if (err) {
					resolve(false)
				} else {
					resolve(true)
				}
			})
		})
	}

	public static async createIfNotExists (sourcePath:string):Promise<void> {
		const fullPath = Helper.resolvePath(sourcePath)
		if (await Helper.existsPath(fullPath)) { return }
		return new Promise<void>((resolve, reject) => {
			fs.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve())
		})
	}

	public static resolvePath (source:string):string {
		const _source = source.trim()
		if (_source.startsWith('.')) {
			return path.join(process.cwd(), source)
		}
		if (_source.startsWith('~')) {
			return _source.replace('~', process.env.HOME as string)
		}
		return source
	}

	public static async readFile (filePath: string): Promise<string|null> {
		const fullPath = Helper.resolvePath(filePath)
		if (!await Helper.existsPath(fullPath)) {
			return null
		}
		return new Promise<string>((resolve, reject) => {
			fs.readFile(fullPath, (err, data) => err ? reject(err) : resolve(data.toString('utf8')))
		})
	}

	public static async removeFile (fullPath:string):Promise<void> {
		if (!await Helper.existsPath(fullPath)) { return }
		return new Promise<void>((resolve, reject) => {
			fs.unlink(fullPath, err => err ? reject(err) : resolve())
		})
	}

	public static async copyFile (src: string, dest:string): Promise<void> {
		if (!await Helper.existsPath(src)) {
			throw new Error(`not exists ${src}`)
		}
		return new Promise<void>((resolve, reject) => {
			fs.copyFile(src, dest, err => err ? reject(err) : resolve())
		})
	}

	public static async writeFile (filePath: string, content: string): Promise<void> {
		const dir = path.dirname(filePath)
		if (!await Helper.existsPath(dir)) {
			await Helper.mkdir(dir)
		}
		return new Promise<void>((resolve, reject) => {
			fs.writeFile(filePath, content, { encoding: 'utf8' }, err => err ? reject(err) : resolve())
		})
	}

	public static async mkdir (fullPath:string):Promise<void> {
		return new Promise<void>((resolve, reject) => {
			fs.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve())
		})
	}

	public static async lstat (fullPath:string):Promise<fs.Stats> {
		return new Promise<fs.Stats>((resolve, reject) => {
			fs.lstat(fullPath, (err, stats) => err
				? reject(err)
				: resolve(stats))
		})
	}

	public static getEnvironmentVariable (text:string):string|undefined {
		const startIndex = text.indexOf('${')
		if (startIndex < 0) {
			return undefined
		}
		const endIndex = text.indexOf('}', startIndex + 2)
		if (endIndex < 0) {
			throw new Error(`Environment variable not found end character "?" in ${text}`)
		}
		return text.substring(startIndex + 2, endIndex)
	}

	public static solveEnvironmentVariables (source:any): void {
		if (typeof source !== 'object') {
			return
		}
		for (const name in source) {
			const child = source[name]
			if (typeof child === 'string' && child.indexOf('${') >= 0) {
				source[name] = Helper.replaceEnvironmentVariable(child)
			} else if (typeof child === 'object') {
				Helper.solveEnvironmentVariables(child)
			}
		}
	}

	private static replaceEnvironmentVariable (text:any): any {
		// there can be more than one environment variable in text
		while (text.indexOf('${') >= 0) {
			const environmentVariable = Helper.getEnvironmentVariable(text)
			if (!environmentVariable) {
				continue
			}
			const environmentVariableValue = process.env[environmentVariable]
			if (environmentVariableValue === undefined || environmentVariableValue === null) {
				text = Helper.replace(text, '${' + environmentVariable + '}', '')
			} else {
				const objValue = Helper.tryParse(environmentVariableValue)
				const value = objValue ? JSON.stringify(objValue) : environmentVariableValue
				text = Helper.replace(text, '${' + environmentVariable + '}', value)
			}
		}
		return text
	}

	public static tryParse (value:string):any|null {
		try {
			return JSON.parse(value)
		} catch {
			return null
		}
	}
}
