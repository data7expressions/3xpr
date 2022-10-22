import { h3lp } from 'h3lp'
import { Operand, IModelManager, OperandType, Type } from '../contract'
import { operandHelper } from './helper'

export class Parser {
	private model: IModelManager
	private buffer: string[]
	private length: number
	private index: number
	private doubleOperators: string[]
	private tripleOperators: string[]
	private assignmentOperators: string[]

	constructor (model: IModelManager, expression: string) {
		this.model = model
		const normalized = operandHelper.normalize(expression)
		this.buffer = Array.from(normalized)
		this.length = this.buffer.length
		this.index = 0
		this.tripleOperators = []
		this.doubleOperators = []
		this.assignmentOperators = []
		for (const entry of this.model.operators) {
			const name = entry[0]
			const metadata = entry[1]
			if (name.length === 2) {
				this.doubleOperators.push(name)
			} else if (name.length === 3) {
				this.tripleOperators.push(name)
			}
			if (metadata.priority === 1) {
				this.assignmentOperators.push(name)
			}
		}
	}

	get end () {
		return this.index >= this.length
	}

	get current (): any {
		return this.buffer[this.index]
	}

	private offset (value = 0) {
		return this.buffer[this.index + value]
	}

	private nextIs (key: string): boolean {
		const array = key.split('')
		for (let i = 0; i < array.length; i++) {
			if (this.buffer[this.index + i] !== array[i]) { return false }
		}
		return true
	}

	private getValue (increment = true): string {
		const buff = []
		if (increment) {
			while (!this.end && h3lp.validator.isAlphanumeric(this.current)) {
				buff.push(this.current)
				this.index += 1
			}
		} else {
			let index = this.index
			while (!this.end && h3lp.validator.isAlphanumeric(this.buffer[index])) {
				buff.push(this.buffer[index])
				index += 1
			}
		}
		return buff.join('')
	}

	private getString (char: string): string {
		const buff = []
		while (!this.end) {
			if (this.current === char) {
				if (!((this.index + 1 < this.length && this.offset(1) === char) || (this.offset(-1) === char))) { break }
			}
			buff.push(this.current)
			this.index += 1
		}
		this.index += 1
		return buff.join('')
	}

	private getTemplate (): string {
		const buff = []
		while (!this.end) {
			if (this.current === '`') {
				break
			}
			buff.push(this.current)
			this.index += 1
		}
		this.index += 1
		return buff.join('')
	}

	public parse () {
		const nodes: Operand[] = []
		while (!this.end) {
			const node = this.getExpression(undefined, undefined, ';')
			if (!node) break
			nodes.push(node)
		}
		const result = nodes.length === 1 ? nodes[0] : new Operand('block', OperandType.Block, nodes)
		return result
	}

	private getExpression (operand1?: Operand, operator?: string, _break = ''): Operand {
		let expression
		let operand2
		let isBreak = false
		while (!this.end) {
			if (!operand1 && !operator) {
				operand1 = this.getOperand()
				operator = this.getOperator() as string
				if (!operator || _break.includes(operator)) {
					expression = operand1
					isBreak = true
					break
				}
			}
			operand2 = this.getOperand()
			const nextOperator = this.getOperator() as string
			if (!nextOperator || _break.includes(nextOperator)) {
				expression = new Operand(operator, OperandType.Operator, [operand1 as Operand, operand2])
				isBreak = true
				break
			} else if (this.model.priority(operator as string) >= this.model.priority(nextOperator)) {
				operand1 = new Operand(operator, OperandType.Operator, [operand1 as Operand, operand2])
				operator = nextOperator
			} else {
				operand2 = this.getExpression(operand2, nextOperator, _break)
				expression = new Operand(operator, OperandType.Operator, [operand1 as Operand, operand2])
				isBreak = true
				break
			}
		}
		if (!isBreak) {
			expression = new Operand(operator, OperandType.Operator, [operand1 as Operand, operand2 as Operand])
		}
		return expression as Operand
	}

	private getOperand (): Operand {
		let isNegative = false
		let isNot = false
		let isBitNot = false
		let operand = null
		let char = this.current
		if (char === '-') {
			isNegative = true
			this.index += 1
			char = this.current
		} else if (char === '~') {
			isBitNot = true
			this.index += 1
			char = this.current
		} else if (char === '!') {
			isNot = true
			this.index += 1
			char = this.current
		}
		if (h3lp.validator.isAlphanumeric(char)) {
			let value: any = this.getValue()
			if (value === 'function' && this.current === '(') {
				this.index += 1
				operand = this.getFunctionBlock()
			} else if (value === 'if' && this.current === '(') {
				this.index += 1
				operand = this.getIfBlock()
			} else if (value === 'for' && this.current === '(') {
				this.index += 1
				operand = this.getForBlock()
			} else if (value === 'while' && this.current === '(') {
				this.index += 1
				operand = this.getWhileBlock()
			} else if (value === 'switch' && this.current === '(') {
				this.index += 1
				operand = this.getSwitchBlock()
			} else if (!this.end && this.current === '(') {
				this.index += 1
				if (value.includes('.')) {
					const names = h3lp.obj.names(value)
					const functionName = names.pop() as string
					const variableName = names.join('.')
					const variable = new Operand(variableName, OperandType.Var)
					operand = this.getChildFunc(functionName, variable)
				} else {
					const args = this.getArgs(')')
					operand = new Operand(value, OperandType.CallFunc, args)
				}
			} else if (value === 'try' && this.current === '{') {
				operand = this.getTryCatchBlock()
			} else if (value === 'throw') {
				operand = this.getThrow()
			} else if (value === 'return') {
				operand = this.getReturn()
			} else if (value === 'break') {
				operand = new Operand('break', OperandType.Break)
			} else if (value === 'continue') {
				operand = new Operand('continue', OperandType.Continue)
			} else if (!this.end && this.current === '[') {
				this.index += 1
				operand = this.getIndexOperand(value)
			} else if (h3lp.validator.isIntegerFormat(value)) {
				if (isNegative) {
					value = parseInt(value) * -1
					isNegative = false
				} else if (isBitNot) {
					value = ~parseInt(value)
					isBitNot = false
				} else {
					value = parseInt(value)
				}
				operand = new Operand(value, OperandType.Const, [], Type.integer)
			} else if (h3lp.validator.isDecimalFormat(value)) {
				if (isNegative) {
					value = parseFloat(value) * -1
					isNegative = false
				} else if (isBitNot) {
					value = ~parseFloat(value)
					isBitNot = false
				} else {
					value = parseFloat(value)
				}
				operand = new Operand(value, OperandType.Const, [], Type.decimal)
			} else if (this.model.isConstant(value)) {
				const constantValue = this.model.getConstantValue(value)
				operand = new Operand(constantValue, OperandType.Const, [], Type.get(constantValue))
			} else if (this.model.isEnum(value)) {
				operand = this.getEnum(value)
			} else {
				operand = new Operand(value, OperandType.Var)
			}
		} else if (char === '\'' || char === '"') {
			this.index += 1
			const result = this.getString(char)
			operand = new Operand(result, OperandType.Const, [], Type.string)
		} else if (char === '`') {
			this.index += 1
			const result = this.getTemplate()
			operand = new Operand(result, OperandType.Template, [], Type.string)
		} else if (char === '(') {
			this.index += 1
			operand = this.getExpression(undefined, undefined, ')')
		} else if (char === '{') {
			this.index += 1
			operand = this.getObject()
		} else if (char === '[') {
			this.index += 1
			const elements = this.getArgs(']')
			operand = new Operand('array', OperandType.List, elements)
		} else if (char === '$') {
			let variableName: string
			if (this.offset(1) === '{') {
				this.index += 2
				variableName = this.getValue()
				if (!this.end && this.nextIs('}')) {
					this.index += 1
				} else {
					throw new Error(`Not found character "}" in Environment variable ${variableName}`)
				}
			} else {
				this.index += 1
				variableName = this.getValue()
			}
			operand = new Operand(variableName, OperandType.Env)
		}
		operand = this.solveChain(operand as Operand)
		if (isNegative) operand = new Operand('-', OperandType.Operator, [operand])
		if (isNot) operand = new Operand('!', OperandType.Operator, [operand])
		if (isBitNot) operand = new Operand('~', OperandType.Operator, [operand])
		return operand
	}

	private solveChain (operand: Operand): Operand {
		if (this.end) {
			return operand
		}
		if (this.current === '.') {
			this.index += 1
			const name = this.getValue()
			if (this.current === '(') {
				this.index += 1
				if (name.includes('.')) {
					// .xxx.xxx(p=> p.xxx)
					const names = h3lp.obj.names(name)
					const propertyName = names.slice(0, -1).join('.')
					const functionName = names.slice(-1)[0]
					const property = new Operand(propertyName, OperandType.Property, [operand])
					return this.solveChain(this.getChildFunc(functionName, property))
				} else {
					// .xxx(p=> p.xxx)
					return this.solveChain(this.getChildFunc(name, operand))
				}
			} else if (this.current === '[') {
				this.index += 1
				if (name.includes('.')) {
					// .xxx.xxx[x]
					const property = new Operand(name, OperandType.Property, [operand])
					const idx = this.getExpression(undefined, undefined, ']')
					return new Operand('[]', OperandType.Operator, [property, idx])
				} else {
					// .xxx[x]
					const property = new Operand(name, OperandType.Property, [operand])
					const idx = this.getExpression(undefined, undefined, ']')
					return new Operand('[]', OperandType.Operator, [property, idx])
				}
			} else {
				// .xxx
				return new Operand(name, OperandType.Property, [operand])
			}
		} else if (this.current === '[') {
			// xxx[x][x] or xxx[x].xxx[x]
			this.index += 1
			const idx = this.getExpression(undefined, undefined, ']')
			return new Operand('[]', OperandType.Operator, [operand, idx])
		} else {
			return operand
		}
	}

	private getOperator (): any {
		if (this.end) return null
		let op = null
		if (this.index + 2 < this.length) {
			const triple = this.current + this.offset(1) + this.offset(2)
			if (this.tripleOperators.includes(triple)) op = triple
		}
		if (op == null && this.index + 1 < this.length) {
			const double = this.current + this.offset(1)
			if (this.doubleOperators.includes(double)) op = double
		}
		if (op == null) op = this.current
		this.index += op.length
		return op
	}

	private getArgs (end = ')'):Operand[] {
		const args = []
		while (true) {
			const arg = this.getExpression(undefined, undefined, ',' + end)
			if (arg != null) args.push(arg)
			if (this.offset(-1) === end) break
		}
		return args
	}

	private getObject (): Operand {
		const attributes = []
		while (true) {
			let name = null
			if (this.current === '"' || this.current === '\'') {
				const char = this.current
				this.index += 1
				name = this.getString(char)
			} else {
				name = this.getValue()
			}
			if (this.current === ':') this.index += 1
			else throw new Error('attribute ' + name + ' without value')

			const value = this.getExpression(undefined, undefined, ',}')
			const attribute = new Operand(name, OperandType.KeyVal, [value])
			attributes.push(attribute)
			if (this.offset(-1) === '}') break
		}
		return new Operand('obj', OperandType.Obj, attributes)
	}

	private getBlock (): Operand {
		const lines = []
		while (true) {
			const line = this.getExpression(undefined, undefined, ';}')
			if (line != null) lines.push(line)
			if (this.offset(-1) === '}') break
		}
		return new Operand('block', OperandType.Block, lines)
	}

	private getControlBlock (): Operand {
		if (this.current === '{') {
			this.index += 1
			return this.getBlock()
		} else {
			return this.getExpression(undefined, undefined, ';')
		}
	}

	private getReturn (): Operand {
		const value = this.getExpression(undefined, undefined, ';')
		return new Operand('return', OperandType.Return, [value])
	}

	private getTryCatchBlock (): Operand {
		const children: Operand[] = []
		const tryBlock = this.getControlBlock()
		children.push(tryBlock)
		if (this.nextIs('catch')) {
			const catchChildren: Operand[] = []
			this.index += 'catch'.length
			if (this.current === '(') {
				this.index += 1
				const variable = this.getExpression(undefined, undefined, ')')
				catchChildren.push(variable)
			}
			const catchBlock = this.getControlBlock()
			catchChildren.push(catchBlock)
			const catchNode = new Operand('catch', OperandType.Catch, catchChildren)
			children.push(catchNode)
		}
		if (this.current === ';') this.index += 1
		return new Operand('try', OperandType.Try, children)
	}

	private getThrow (): Operand {
		const exception = this.getExpression(undefined, undefined, ';')
		return new Operand('throw', OperandType.Throw, [exception])
	}

	private getIfBlock (): Operand {
		const children: Operand[] = []
		const condition = this.getExpression(undefined, undefined, ')')
		children.push(condition)
		const block = this.getControlBlock()
		children.push(block)

		while (this.nextIs('elseif(')) {
			this.index += 'elseif('.length
			const condition = this.getExpression(undefined, undefined, ')')
			const elseIfBlock = this.getControlBlock()
			const elseIfNode = new Operand('elseif', OperandType.ElseIf, [condition, elseIfBlock])
			children.push(elseIfNode)
		}

		if (this.nextIs('else')) {
			this.index += 'else'.length
			const elseBlock = this.getControlBlock()
			children.push(elseBlock)
		}
		return new Operand('if', OperandType.If, children)
	}

	private getSwitchBlock (): Operand {
		const children = []
		const value = this.getExpression(undefined, undefined, ')')
		children.push(value)
		if (this.current === '{') this.index += 1
		let next = this.nextIs('case') ? 'case' : this.nextIs('default:') ? 'default:' : ''
		while (next === 'case') {
			this.index += 'case'.length
			let compare: string
			if (this.current === '\'' || this.current === '"') {
				const char = this.current
				this.index += 1
				compare = this.getString(char)
			} else {
				compare = this.getValue()
			}
			if (this.current === ':') this.index += 1
			const lines: Operand[] = []
			while (true) {
				const line = this.getExpression(undefined, undefined, ';}')
				if (line !== undefined) lines.push(line)
				if (this.nextIs('case')) {
					next = 'case'
					break
				} else if (this.nextIs('default:')) {
					next = 'default:'
					break
				} else if (this.current === '}' || this.offset(-1) === '}') {
					next = 'end'
					break
				}
			}
			const block = new Operand('block', OperandType.Block, lines)
			const caseNode = new Operand(compare, OperandType.Case, [block])
			children.push(caseNode)
		}

		if (next === 'default:') {
			this.index += 'default:'.length
			const lines: Operand[] = []
			while (true) {
				const line = this.getExpression(undefined, undefined, ';}')
				if (line !== undefined) lines.push(line)
				if (this.current === '}' || this.offset(-1) === '}') break
			}
			const block = new Operand('block', OperandType.Block, lines)
			const defaultNode = new Operand('default', OperandType.Default, [block])
			children.push(defaultNode)
		}
		if (this.current === '}') this.index += 1
		return new Operand('switch', OperandType.Switch, children)
	}

	private getWhileBlock (): Operand {
		const condition = this.getExpression(undefined, undefined, ')')
		const block = this.getControlBlock()
		return new Operand('while', OperandType.While, [condition, block])
	}

	private getForBlock (): Operand {
		const first = this.getExpression(undefined, undefined, '; ')
		if (this.offset(-1) === ';') {
			const condition = this.getExpression(undefined, undefined, ';')
			const increment = this.getExpression(undefined, undefined, ')')
			const block = this.getControlBlock()
			return new Operand('for', OperandType.For, [first, condition, increment, block])
		} else if (this.nextIs('in')) {
			this.index += 2
			// si hay espacios luego del in debe eliminarlos
			while (this.current === ' ') {
				this.index += 1
			}
			const list = this.getExpression(undefined, undefined, ')')
			const block = this.getControlBlock()
			return new Operand('forIn', OperandType.ForIn, [first, list, block])
		}
		throw new Error('expression for error')
	}

	private getFunctionBlock (): Operand {
		const name = this.getValue()
		if (this.current === '(') this.index += 1
		const args = this.getArgs()
		const block = this.getBlock()
		const argsNode = new Operand('args', OperandType.Args, args)
		return new Operand(name, OperandType.Func, [argsNode, block])
	}

	private getChildFunc (name: string, parent: Operand): Operand {
		let isArrow = false
		const variableName = this.getValue(false)
		if (variableName !== '') {
			// example: p => {name:p.name}
			// example: p -> {name:p.name}
			const i = variableName.length
			if ((this.offset(i) === '=' || this.offset(i) === '-') && this.offset(i + 1) === '>') {
				isArrow = true
				this.index += (variableName.length + 2) // [VARIABLE+NAME] + [=>]
			}
		} else if (this.current + this.offset(1) === '()') {
			// example: ()=> {name:name}
			// example: ()-> {name:name}
			if ((this.offset(2) === '=' || this.offset(2) === '-') && this.offset(3) === '>') {
				isArrow = true
				this.index += 4 // [()=>]
			}
		} else if (this.current + this.offset(1) === '=>' || this.current + this.offset(1) === '->') {
			// example: => {name:name}
			// example: -> {name:name}
			isArrow = true
			this.index += 2 // [=>]
		}
		if (isArrow) {
			const variable = new Operand(variableName, OperandType.Var)
			const body = this.getExpression(undefined, undefined, ')')
			return new Operand(name, OperandType.Arrow, [parent, variable, body])
		} else {
			const args = this.getArgs(')')
			args.splice(0, 0, parent)
			return new Operand(name, OperandType.ChildFunc, args)
		}
	}

	private getIndexOperand (name: string): Operand {
		const idx = this.getExpression(undefined, undefined, ']')
		const operand = new Operand(name, OperandType.Var)
		return new Operand('[]', OperandType.Operator, [operand, idx])
	}

	private getEnum (value: string): Operand {
		if (value.includes('.') && this.model.isEnum(value)) {
			const names = value.split('.')
			const enumName = names[0]
			const enumOption = names[1]
			const enumValue = this.model.getEnumValue(enumName, enumOption)
			return new Operand(enumValue, OperandType.Const, [], Type.get(value))
		} else {
			const values = this.model.getEnum(value)
			const attributes = []
			for (const name in values) {
				const _value = values[name]
				const attribute = new Operand(name, OperandType.KeyVal, [new Operand(_value, OperandType.Const, [], Type.get(_value))])
				attributes.push(attribute)
			}
			return new Operand('obj', OperandType.Obj, attributes)
		}
	}
}
