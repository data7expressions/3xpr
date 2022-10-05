
export interface ISerializer<T> {
	serialize (value: T): any
	deserialize (value: any): T
	clone (value: T): T
}

export interface IBuilder<T> {
	build (): T
}
