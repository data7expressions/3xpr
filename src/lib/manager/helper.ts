import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'

export class Helper {
	public static getType (value: any):string {
		if (Array.isArray(value)) return 'array'
		if (typeof value === 'string') {
			// TODO determinar si es fecha.
			return 'string'
		}
		return typeof value
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

	public static tryParse (value:string):any|null {
		try {
			return JSON.parse(value)
		} catch {
			return null
		}
	}

	public static async exec (command: string, cwd:string = process.cwd()):Promise<any> {
		return new Promise<string>((resolve, reject) => {
			exec(command, { cwd: cwd }, (error: any, stdout: any, stderr: any) => {
				if (stdout) return resolve(stdout)
				if (stderr) return resolve(stderr)
				if (error) return reject(error)
				return resolve('')
			})
		})
	}

	public static async existsPath (fullPath:string):Promise<boolean> {
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

	public static async createIfNotExists (fullPath:string):Promise<void> {
		if (await Helper.existsPath(fullPath)) { return }
		return new Promise<void>((resolve, reject) => {
			fs.mkdir(fullPath, { recursive: true }, err => err ? reject(err) : resolve())
		})
	}

	public static async readFile (filePath: string): Promise<string|null> {
		if (!await Helper.existsPath(filePath)) { return null }
		return new Promise<string>((resolve, reject) => {
			fs.readFile(filePath, (err, data) => err ? reject(err) : resolve(data.toString('utf8')))
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
			fs.lstat(fullPath, (err, stats) => err ? reject(err) : resolve(stats))
		})
	}
}
