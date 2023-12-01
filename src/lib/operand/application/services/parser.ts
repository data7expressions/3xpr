import { h3lp } from 'h3lp'
import { Operand, OperandType, Position } from '../../../shared/domain'
import { ModelService } from '../../../model/domain'
import { Type } from 'typ3s'
export class Parser {
	private buffer: string[]
	private length: number
	private index: number
	private singleOperators: string[]
	private doubleOperators: string[]
	private tripleOperators: string[]
	private assignmentOperators: string[]

	constructor (private readonly model: ModelService, private readonly expression: [string, number, number][]) {
		// this.model = model
		// this.positions = this.normalize(expression)
		this.buffer = this.expression.map(p => p[0])
		this.length = this.buffer.length
		this.index = 0
		this.singleOperators = []
		this.doubleOperators = []
		this.tripleOperators = []
		this.assignmentOperators = []
		for (const entry of this.model.operators) {
			const name = entry[0]
			const metadata = entry[1]
			if (name.length === 1) {
				this.singleOperators.push(name)
			} else if (name.length === 2) {
				this.doubleOperators.push(name)
				if (metadata.priority === 1) {
					this.assignmentOperators.push(name)
				}
			} else if (name.length === 3) {
				this.tripleOperators.push(name)
			}
		}
	}

	public parse () : Operand {
		const operands: Operand[] = []
		while (!this.end) {
			const operand = this.getExpression(undefined, undefined, ';')
			if (!operand) break
			operands.push(operand)
		}
		return operands.length === 1 ? operands[0] : new Operand(new Position(0, 0), 'block', OperandType.Block, operands)
	}

	private getExpression (operand1?: Operand, operator?: string, _break = ''): Operand {
		let expression
		let operand2
		let isBreak = false
		const pos = this.pos()
		while (!this.end) {
			if (!operand1 && !operator) {
				operand1 = this.getOperand()
				operator = this.getOperator()
				if (!operator || _break.includes(this.current)) {
					if (_break.includes(this.current)) {
						this.index += 1
					}
					expression = operand1
					isBreak = true
					break
				}
			}
			operand2 = this.getOperand()
			const nextOperator = this.getOperator()
			if (operator && operand1) {
				if (!nextOperator || _break.includes(this.current)) {
					if (_break.includes(this.current)) {
						this.index += 1
					}
					expression = new Operand(this.pos(operator.length), operator, OperandType.Operator, [operand1, operand2])
					isBreak = true
					break
				} else if (this.model.priority(operator) >= this.model.priority(nextOperator)) {
					operand1 = new Operand(this.pos(operator.length), operator, OperandType.Operator, [operand1, operand2])
					operator = nextOperator
				} else {
					operand2 = this.getExpression(operand2, nextOperator, _break)
					expression = new Operand(this.pos(operator.length), operator, OperandType.Operator, [operand1, operand2])
					isBreak = true
					break
				}
			}
		}
		if (!isBreak && operand1 && operand2) {
			expression = new Operand(pos, operator, OperandType.Operator, [operand1, operand2])
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
		const pos = this.pos()
		if (h3lp.val.isAlphanumeric(char)) {
			let value: any = this.getValue()
			if (value === 'function' && this.current === '(') {
				this.index += 1
				operand = this.getFunctionBlock(pos)
			} else if (value === 'if' && this.current === '(') {
				this.index += 1
				operand = this.getIfBlock(pos)
			} else if (value === 'for' && this.current === '(') {
				this.index += 1
				operand = this.getForBlock(pos)
			} else if (value === 'while' && this.current === '(') {
				this.index += 1
				operand = this.getWhileBlock(pos)
			} else if (value === 'switch' && this.current === '(') {
				this.index += 1
				operand = this.getSwitchBlock(pos)
			} else if (!this.end && this.current === '(') {
				this.index += 1
				if (value.includes('.') && !this.model.isFunction(value)) {
					const names = h3lp.obj.names(value)
					const childName = names.pop() as string
					const parentName = names.join('.')
					const variable = new Operand(pos, parentName, OperandType.Var)
					operand = this.getChildFunc(childName, variable)
				} else {
					if (this.current === ')') {
						this.index++
						operand = new Operand(pos, value, OperandType.CallFunc, [])
					} else {
						const args = this.getArgs(')')
						operand = new Operand(pos, value, OperandType.CallFunc, args)
					}
				}
			} else if (value === 'try' && this.current === '{') {
				operand = this.getTryCatchBlock(pos)
			} else if (value === 'throw') {
				operand = this.getThrow(pos)
			} else if (value === 'return') {
				operand = this.getReturn(pos)
			} else if (value === 'break') {
				operand = new Operand(pos, 'break', OperandType.Break)
			} else if (value === 'continue') {
				operand = new Operand(pos, 'continue', OperandType.Continue)
			} else if (!this.end && this.current === '[') {
				this.index += 1
				operand = this.getIndexOperand(value, pos)
			} else if (h3lp.val.isIntegerFormat(value)) {
				if (isNegative) {
					value = parseInt(value) * -1
					isNegative = false
				} else if (isBitNot) {
					value = ~parseInt(value)
					isBitNot = false
				} else {
					value = parseInt(value)
				}
				operand = new Operand(pos, value, OperandType.Const, [], Type.integer)
			} else if (h3lp.val.isDecimalFormat(value)) {
				if (isNegative) {
					value = parseFloat(value) * -1
					isNegative = false
				} else if (isBitNot) {
					value = ~parseFloat(value)
					isBitNot = false
				} else {
					value = parseFloat(value)
				}
				operand = new Operand(pos, value, OperandType.Const, [], Type.decimal)
			} else if (this.model.isConstant(value)) {
				const constantValue = this.model.getConstantValue(value)
				operand = new Operand(pos, constantValue, OperandType.Const, [], Type.get(constantValue))
			} else if (this.model.isEnum(value)) {
				operand = this.getEnum(value, pos)
			} else {
				operand = new Operand(pos, value, OperandType.Var)
			}
		} else if (char === '\'' || char === '"') {
			this.index += 1
			const result = this.getString(char)
			operand = new Operand(pos, result, OperandType.Const, [], Type.string)
		} else if (char === '`') {
			this.index += 1
			const result = this.getTemplate()
			operand = new Operand(pos, result, OperandType.Template, [], Type.string)
		} else if (char === '(') {
			this.index += 1
			operand = this.getExpression(undefined, undefined, ')')
		} else if (char === '{') {
			this.index += 1
			operand = this.getObject(pos)
		} else if (char === '[') {
			this.index += 1
			const elements = this.getArgs(']')
			operand = new Operand(pos, 'array', OperandType.List, elements)
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
			operand = new Operand(pos, variableName, OperandType.Env)
		}
		if (operand === null) {
			throw new Error('Operand undefined')
		}
		operand = this.solveChain(operand, pos)
		if (isNegative) operand = new Operand(new Position(pos.ln, pos.col - 1), '-', OperandType.Operator, [operand])
		if (isNot) operand = new Operand(new Position(pos.ln, pos.col - 1), '!', OperandType.Operator, [operand])
		if (isBitNot) operand = new Operand(new Position(pos.ln, pos.col - 1), '~', OperandType.Operator, [operand])
		return operand
	}

	private solveChain (operand: Operand, pos:Position): Operand {
		if (this.end) {
			return operand
		}
		if (this.current === '.') {
			this.index += 1
			const name = this.getValue()
			if (this.current === '(') {
				this.index += 1
				if (name.includes('.') && !this.model.isFunction(name)) {
					// .xxx.xxx(p=> p.xxx)
					const names = h3lp.obj.names(name)
					const propertyName = names.slice(0, -1).join('.')
					const functionName = names.slice(-1)[0]
					const property = new Operand(pos, propertyName, OperandType.Property, [operand])
					return this.solveChain(this.getChildFunc(functionName, property), pos)
				} else {
					// .xxx(p=> p.xxx)
					return this.solveChain(this.getChildFunc(name, operand), pos)
				}
			} else if (this.current === '[') {
				this.index += 1
				if (name.includes('.')) {
					// .xxx.xxx[x]
					const property = new Operand(pos, name, OperandType.Property, [operand])
					const idx = this.getExpression(undefined, undefined, ']')
					return new Operand(pos, '[]', OperandType.Operator, [property, idx])
				} else {
					// .xxx[x]
					const property = new Operand(pos, name, OperandType.Property, [operand])
					const idx = this.getExpression(undefined, undefined, ']')
					return new Operand(pos, '[]', OperandType.Operator, [property, idx])
				}
			} else {
				// .xxx
				return new Operand(pos, name, OperandType.Property, [operand])
			}
		} else if (this.current === '[') {
			// xxx[x][x] or xxx[x].xxx[x]
			this.index += 1
			const idx = this.getExpression(undefined, undefined, ']')
			return new Operand(pos, '[]', OperandType.Operator, [operand, idx])
		} else {
			return operand
		}
	}

	private getOperator (): string|undefined {
		if (this.end) {
			return undefined
		}
		let op = null
		if (this.index + 2 < this.length) {
			const triple = this.current + this.offset(1) + this.offset(2)
			if (this.tripleOperators.includes(triple)) {
				op = triple
			}
		}
		if (op === null && this.index + 1 < this.length) {
			const double = this.current + this.offset(1)
			if (this.doubleOperators.includes(double)) {
				op = double
			}
		}
		if (op === null) {
			if (!this.model.isOperator(this.current)) {
				return undefined
			}
			op = this.current
		}
		this.index += op.length
		return op
	}

	private normalize (expression: string): [string, number, number][] {
		let isString = false
		let quotes = ''
		const buffer = expression.split('')
		const length = buffer.length
		const result:[string, number, number][] = []
		let line = 0
		let col = 0
		let i = 0
		while (i < length) {
			const p = buffer[i]
			if (isString && p === quotes) {
				isString = false
			} else if (!isString && (p === '\'' || p === '"' || p === '`')) {
				isString = true
				quotes = p
			}
			if (isString) {
				result.push([p, line, col])
			} else if (p === ' ') {
				// Only leave spaces when it's between alphanumeric characters.
				// for example in the case of "} if" there should not be a space
				if (i + 1 < length && i - 1 >= 0 && h3lp.val.isAlphanumeric(buffer[i - 1]) && h3lp.val.isAlphanumeric(buffer[i + 1])) {
					result.push([p, line, col])
				}
			// when there is a block that ends with "}" and then there is an enter , replace the enter with ";"
			// TODO: si estamos dentro de un objecto NO debería agregar ; luego de } sino rompe el obj
			// } else if (p === '\n' && result.length > 0 && result[result.length - 1] === '}') {
			// result.push(';')
			} else if (p === '\n') {
				line++
				col = 0
			} else if (p !== '\r' && p !== '\t') {
				result.push([p, line, col])
			}
			i++
			col++
		}
		if (result[result.length - 1][0] === ';') {
			result.splice(-1)
		}
		return result
	}

	private get end ():boolean {
		return this.index >= this.length
	}

	private get current (): any {
		return this.buffer[this.index]
	}

	private offset (offset = 0):any {
		return this.buffer[this.index + offset]
	}

	private pos (offset = 0): Position {
		const position = this.expression[this.index - offset]
		return new Position(position[1], position[2])
	}

	private nextIs (key: string): boolean {
		const array = key.split('')
		for (let i = 0; i < array.length; i++) {
			if (this.buffer[this.index + i] !== array[i]) {
				return false
			}
		}
		return true
	}

	private getValue (increment = true): string {
		const buff = []
		if (increment) {
			while (!this.end && h3lp.val.isAlphanumeric(this.current)) {
				buff.push(this.current)
				this.index += 1
			}
		} else {
			let index = this.index
			while (!this.end && h3lp.val.isAlphanumeric(this.buffer[index])) {
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

	private getArgs (end = ')'):Operand[] {
		const args = []
		while (true) {
			const arg = this.getExpression(undefined, undefined, ',' + end)
			if (arg != null) args.push(arg)
			if (this.offset(-1) === end) break
		}
		return args
	}

	private getObject (pos:Position): Operand {
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
			const keyValPos = this.pos()
			const value = this.getExpression(undefined, undefined, ',}')
			const attribute = new Operand(keyValPos, name, OperandType.KeyVal, [value])
			attributes.push(attribute)
			if (this.offset(-1) === '}') break
		}
		return new Operand(pos, 'obj', OperandType.Obj, attributes)
	}

	private getBlock (): Operand {
		const blockPos = this.pos()
		const lines = []
		while (true) {
			const line = this.getExpression(undefined, undefined, ';}')
			if (line != null) {
				lines.push(line)
			}
			if (this.offset(-1) === ';' && this.current === '}') {
				this.index += 1
				break
			}
			if (this.offset(-1) === '}') {
				break
			}
		}
		return new Operand(blockPos, 'block', OperandType.Block, lines)
	}

	private getControlBlock (): Operand {
		if (this.current === '{') {
			this.index += 1
			return this.getBlock()
		} else {
			return this.getExpression(undefined, undefined, ';')
		}
	}

	private getReturn (pos:Position): Operand {
		const value = this.getExpression(undefined, undefined, ';')
		return new Operand(pos, 'return', OperandType.Return, [value])
	}

	private getTryCatchBlock (pos:Position): Operand {
		const children: Operand[] = []
		const tryBlock = this.getControlBlock()
		children.push(tryBlock)
		if (this.nextIs('catch')) {
			const catchChildren: Operand[] = []
			const catchPos = this.pos('catch'.length)
			this.index += 'catch'.length
			if (this.current === '(') {
				this.index += 1
				const variable = this.getExpression(undefined, undefined, ')')
				catchChildren.push(variable)
			}
			const catchBlock = this.getControlBlock()
			catchChildren.push(catchBlock)
			const catchNode = new Operand(catchPos, 'catch', OperandType.Catch, catchChildren)
			children.push(catchNode)
		}
		if (this.current === ';') this.index += 1
		return new Operand(pos, 'try', OperandType.Try, children)
	}

	private getThrow (pos:Position): Operand {
		const exception = this.getExpression(undefined, undefined, ';')
		return new Operand(pos, 'throw', OperandType.Throw, [exception])
	}

	private getIfBlock (pos:Position): Operand {
		const children: Operand[] = []
		const condition = this.getExpression(undefined, undefined, ')')
		children.push(condition)
		const block = this.getControlBlock()
		children.push(block)

		while (this.nextIs('elseif(')) {
			const elseIfPos = this.pos()
			this.index += 'elseif('.length
			const condition = this.getExpression(undefined, undefined, ')')
			const elseIfBlock = this.getControlBlock()
			const elseIfNode = new Operand(elseIfPos, 'elseif', OperandType.ElseIf, [condition, elseIfBlock])
			children.push(elseIfNode)
		}

		if (this.nextIs('else')) {
			this.index += 'else'.length
			const elseBlock = this.getControlBlock()
			children.push(elseBlock)
		}
		return new Operand(pos, 'if', OperandType.If, children)
	}

	private getSwitchBlock (pos:Position): Operand {
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
			const caseNode = new Operand(this.pos(), compare, OperandType.Case)
			const block = new Operand(this.pos(), 'block', OperandType.Block)
			caseNode.children = [block]
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
			block.children = lines
			children.push(caseNode)
		}

		if (next === 'default:') {
			this.index += 'default:'.length
			const defaultNode = new Operand(this.pos(), 'default', OperandType.Default)
			const block = new Operand(this.pos(), 'block', OperandType.Block)
			defaultNode.children = [block]
			const lines: Operand[] = []
			while (true) {
				const line = this.getExpression(undefined, undefined, ';}')
				if (line !== undefined) lines.push(line)
				if (this.current === '}' || this.offset(-1) === '}') break
			}
			block.children = lines
			children.push(defaultNode)
		}
		if (this.current === '}') this.index += 1
		return new Operand(pos, 'switch', OperandType.Switch, children)
	}

	private getWhileBlock (pos:Position): Operand {
		const condition = this.getExpression(undefined, undefined, ')')
		const block = this.getControlBlock()
		return new Operand(pos, 'while', OperandType.While, [condition, block])
	}

	private getForBlock (pos:Position): Operand {
		const first = this.getExpression(undefined, undefined, '; ')
		if (this.offset(-1) === ';') {
			const condition = this.getExpression(undefined, undefined, ';')
			const increment = this.getExpression(undefined, undefined, ')')
			const block = this.getControlBlock()
			return new Operand(pos, 'for', OperandType.For, [first, condition, increment, block])
		} else if (this.nextIs('in')) {
			this.index += 2
			// si hay espacios luego del in debe eliminarlos
			while (this.current === ' ') {
				this.index += 1
			}
			const list = this.getExpression(undefined, undefined, ')')
			const block = this.getControlBlock()
			return new Operand(pos, 'forIn', OperandType.ForIn, [first, list, block])
		}
		throw new Error('expression for error')
	}

	private getFunctionBlock (pos:Position): Operand {
		const name = this.getValue()
		if (this.current === '(') this.index += 1
		const argsPos = this.pos()
		const args = this.getArgs()
		const block = this.getBlock()
		const argsOperand = new Operand(argsPos, 'args', OperandType.Args, args)
		return new Operand(pos, name, OperandType.Func, [argsOperand, block])
	}

	private getChildFunc (name: string, parent: Operand): Operand {
		let isArrow = false
		const pos = this.pos()
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
			const variable = new Operand(pos, variableName, OperandType.Var)
			const body = this.getExpression(undefined, undefined, ')')
			return new Operand(pos, name, OperandType.Arrow, [parent, variable, body])
		} else {
			if (this.current === ')') {
				this.index += 1
				// Example: xxx.xxx()
				return new Operand(pos, name, OperandType.ChildFunc, [parent])
			}
			// Example: xxx.xxx(x)
			const args = this.getArgs(')')
			args.splice(0, 0, parent)
			return new Operand(pos, name, OperandType.ChildFunc, args)
		}
	}

	private getIndexOperand (name: string, pos:Position): Operand {
		const idx = this.getExpression(undefined, undefined, ']')
		const operand = new Operand(pos, name, OperandType.Var)
		return new Operand(pos, '[]', OperandType.Operator, [operand, idx])
	}

	private getEnum (value: string, pos:Position): Operand {
		if (value.includes('.') && this.model.isEnum(value)) {
			const names = value.split('.')
			const enumName = names[0]
			const enumOption = names[1]
			const enumValue = this.model.getEnumValue(enumName, enumOption)
			return new Operand(pos, enumValue, OperandType.Const, [], Type.get(value))
		} else {
			const values = this.model.getEnum(value)
			const attributes = []
			for (const name in values) {
				const _value = values[name]
				const attribute = new Operand(pos, name, OperandType.KeyVal, [new Operand(pos, _value, OperandType.Const, [], Type.get(_value))])
				attributes.push(attribute)
			}
			return new Operand(pos, 'obj', OperandType.Obj, attributes)
		}
	}
}

export class ExpressionParse {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly model: ModelService) {}

	public parse (expression: [string, number, number][]): Operand {
		return new Parser(this.model, expression).parse()
	}
}
