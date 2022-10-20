export interface Signal {
	name:string
	datetime: Date
}

export interface WaitSignal extends Signal {
	secs: number
}
