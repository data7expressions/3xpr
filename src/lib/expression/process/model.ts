export interface Signal {
	name:string
	dateTime: Date
}

export interface WaitSignal extends Signal {
	secs: number
}
