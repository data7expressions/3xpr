import { Context, ActionObserver } from '../../../shared/domain'
import { Executor, ExpressionListener } from '../../domain'

export class ExecutorObserveDecorator implements Executor, ExpressionListener {
	private observers:ActionObserver[] = []

	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly executor:Executor) {}

	public eval (expression: string, context:Context): any {
		try {
			this.beforeExecutionNotify(expression, context)
			const result = this.executor.eval(expression, context)
			this.afterExecutionNotify(expression, context, result)
			return result
		} catch (error) {
			this.errorExecutionNotify(expression, context, error)
			throw error
		}
	}

	public async evalAsync (expression: string, context:Context): Promise<any> {
		try {
			this.beforeExecutionNotify(expression, context)
			const result = await this.executor.evalAsync(expression, context)
			this.afterExecutionNotify(expression, context, result)
			return result
		} catch (error) {
			this.errorExecutionNotify(expression, context, error)
			throw error
		}
	}

	public async execute (task: string, context:Context): Promise<any> {
		try {
			this.beforeExecutionNotify(task, context)
			const result = await this.executor.execute(task, context)
			this.afterExecutionNotify(task, context, result)
			return result
		} catch (error) {
			this.errorExecutionNotify(task, context, error)
			throw error
		}
	}

	// Listeners and subscribers
	public subscribe (observer:ActionObserver):void {
		this.observers.push(observer)
	}

	public unsubscribe (observer:ActionObserver): void {
		const index = this.observers.indexOf(observer)
		if (index === -1) {
			throw new Error('Subject: Nonexistent observer.')
		}
		this.observers.splice(index, 1)
	}

	private beforeExecutionNotify (expression:string, context: Context) {
		const args = { expression, context }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.before(args)
			} else {
				if (this.eval(observer.condition, context)) {
					observer.before(args)
				}
			}
		})
	}

	private afterExecutionNotify (expression:string, context: Context, result:any) {
		const args = { expression, context, result }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.after(args)
			} else {
				if (this.eval(observer.condition, context)) {
					observer.after(args)
				}
			}
		})
	}

	private errorExecutionNotify (expression:string, context: Context, error:any) {
		const args = { expression, context, error }
		this.observers.forEach((observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.error(args)
			} else {
				if (this.eval(observer.condition, context)) {
					observer.error(args)
				}
			}
		})
	}
}
