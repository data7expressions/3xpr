import { Node } from './node'
import { Helper, IModelManager } from './..'

export class Parser {
	private model: IModelManager
	private buffer: string[]
	private length: number
	private index: number
	private doubleOperators: string[]
	private tripleOperators: string[]
	private assignmentOperators: string[]

	constructor (model: IModelManager, buffer: string[]) {
		this.model = model
		this.buffer = []
		this.buffer = buffer
		this.length = this.buffer.length
		this.index = 0
		this.tripleOperators = []
		this.doubleOperators = []
		this.assignmentOperators = []
		this.setOperators()
	}

	private setOperators () {
		for (const p in this.model.operators) {
			const metadata = this.model.operators[p]
			if (metadata.operator.length === 2) {
				this.doubleOperators.push(metadata.operator)
			} else if (metadata.operator.length === 3) {
				this.tripleOperators.push(metadata.operator)
			}
			// if (metadata.category === 'assignment') {
			if (metadata.priority === 1) {
				this.assignmentOperators.push(metadata.operator)
			}
		}
	}

	get previous () {
		return this.buffer[this.index - 1]
	}

	get current (): any {
		return this.buffer[this.index]
	}

	get next () {
		return this.buffer[this.index + 1]
	}

	get end () {
		return this.index >= this.length
	}

	private nextIs (key: string): boolean {
		const array = key.split('')
		for (let i = 0; i < array.length; i++) {
			if (this.buffer[this.index + i] !== array[i]) { return false }
		}
		return true
	}

	public parse () {
		const nodes: Node[] = []
		while (!this.end) {
			const node = this.getExpression(undefined, undefined, ';')
			if (!node) break
			nodes.push(node)
		}
		if (nodes.length === 1) { return nodes[0] }
		return new Node('block', 'block', nodes)
	}

	private char (index: number) {
		return this.buffer[index]
	}

	private offset (value = 0) {
		return this.buffer[this.index + value]
	}

	private getExpression (operand1?: Node, operator?: string, _break = ''): Node {
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
				expression = new Node(operator, 'operator', [operand1 as Node, operand2])
				isBreak = true
				break
			} else if (this.model.priority(operator as string) >= this.model.priority(nextOperator)) {
				operand1 = new Node(operator, 'operator', [operand1 as Node, operand2])
				operator = nextOperator
			} else {
				operand2 = this.getExpression(operand2, nextOperator, _break)
				expression = new Node(operator, 'operator', [operand1 as Node, operand2])
				isBreak = true
				break
			}
		}
		if (!isBreak) expression = new Node(operator, 'operator', [operand1 as Node, operand2 as Node])
		return expression as Node
	}

	private getOperand (): Node {
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
		if (Helper.validator.isAlphanumeric(char)) {
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
					const names = Helper.obj.names(value)
					const functionName = names.pop() as string
					const variableName = names.join('.')
					const variable = new Node(variableName, 'var')
					operand = this.getChildFunction(functionName, variable)
				} else {
					const args = this.getArgs(')')
					operand = new Node(value, 'funcRef', args)
				}
			} else if (value === 'try' && this.current === '{') {
				operand = this.getTryCatchBlock()
			} else if (value === 'throw') {
				operand = this.getThrow()
			} else if (value === 'return') {
				operand = this.getReturn()
			} else if (value === 'break') {
				operand = new Node('break', 'break')
			} else if (value === 'continue') {
				operand = new Node('continue', 'continue')
			} else if (!this.end && this.current === '[') {
				this.index += 1
				operand = this.getIndexOperand(value)
			} else if (Helper.validator.isIntegerFormat(value)) {
				if (isNegative) {
					value = parseInt(value) * -1
					isNegative = false
				} else if (isBitNot) {
					value = ~parseInt(value)
					isBitNot = false
				} else {
					value = parseInt(value)
				}
				operand = new Node(value, 'const')
			} else if (Helper.validator.isDecimalFormat(value)) {
				if (isNegative) {
					value = parseFloat(value) * -1
					isNegative = false
				} else if (isBitNot) {
					value = ~parseFloat(value)
					isBitNot = false
				} else {
					value = parseFloat(value)
				}
				operand = new Node(value, 'const')
			// } else if (value === 'true') {
			// operand = new Node(true, 'const')
			// } else if (value === 'false') {
			// operand = new Node(false, 'const')
			// } else if (value === 'null') {
			// operand = new Node(null, 'const')
			} else if (this.model.isConstant(value)) {
				const constantValue = this.model.getConstantValue(value)
				operand = new Node(constantValue, 'const')
			} else if (this.model.isEnum(value)) {
				operand = this.getEnum(value)
			} else {
				operand = new Node(value, 'var')
			}
		} else if (char === '\'' || char === '"') {
			this.index += 1
			const result = this.getString(char)
			operand = new Node(result, 'const')
		} else if (char === '`') {
			this.index += 1
			const result = this.getTemplate()
			operand = new Node(result, 'template')
		} else if (char === '(') {
			this.index += 1
			operand = this.getExpression(undefined, undefined, ')')
		} else if (char === '{') {
			this.index += 1
			operand = this.getObject()
		} else if (char === '[') {
			this.index += 1
			const elements = this.getArgs(']')
			operand = new Node('array', 'array', elements)
		} else if (char === '$') {
			let variableName: string
			if (this.next === '{') {
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
			operand = new Node(variableName, 'env')
		}
		operand = this.solveChain(operand as Node)
		if (isNegative) operand = new Node('-', 'operator', [operand])
		if (isNot) operand = new Node('!', 'operator', [operand])
		if (isBitNot) operand = new Node('~', 'operator', [operand])
		return operand
	}

	private solveChain (operand: Node): Node {
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
					const names = Helper.obj.names(name)
					const propertyName = names.slice(0, -1).join('.')
					const functionName = names.slice(-1)[0]
					const property = new Node(propertyName, 'property', [operand])
					return this.solveChain(this.getChildFunction(functionName, property))
				} else {
					// .xxx(p=> p.xxx)
					return this.solveChain(this.getChildFunction(name, operand))
				}
			} else if (this.current === '[') {
				this.index += 1
				if (name.includes('.')) {
					// .xxx.xxx[x]
					const property = new Node(name, 'property', [operand])
					const idx = this.getExpression(undefined, undefined, ']')
					return new Node('[]', 'operator', [property, idx])
				} else {
					// .xxx[x]
					const property = new Node(name, 'property', [operand])
					const idx = this.getExpression(undefined, undefined, ']')
					return new Node('[]', 'operator', [property, idx])
				}
			} else {
				// .xxx
				return new Node(name, 'property', [operand])
			}
		} else if (this.current === '[') {
			// xxx[x][x] or xxx[x].xxx[x]
			this.index += 1
			const idx = this.getExpression(undefined, undefined, ']')
			return new Node('[]', 'operator', [operand, idx])
		} else {
			return operand
		}
	}

	private getValue (increment = true): string {
		const buff = []
		if (increment) {
			while (!this.end && Helper.validator.isAlphanumeric(this.current)) {
				buff.push(this.current)
				this.index += 1
			}
		} else {
			let index = this.index
			while (!this.end && Helper.validator.isAlphanumeric(this.buffer[index])) {
				buff.push(this.buffer[index])
				index += 1
			}
		}
		return buff.join('')
	}

	private getOperator (): any {
		if (this.end) return null
		let op = null
		if (this.index + 2 < this.length) {
			const triple = this.current + this.next + this.buffer[this.index + 2]
			if (this.tripleOperators.includes(triple)) op = triple
		}
		if (op == null && this.index + 1 < this.length) {
			const double = this.current + this.next
			if (this.doubleOperators.includes(double)) op = double
		}
		if (op == null) op = this.current
		this.index += op.length
		return op
	}

	private getString (char: string): string {
		const buff = []
		while (!this.end) {
			if (this.current === char) {
				if (!((this.index + 1 < this.length && this.next === char) || (this.previous === char))) { break }
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

	private getArgs (end = ')'): Node[] {
		const args = []
		while (true) {
			const arg = this.getExpression(undefined, undefined, ',' + end)
			if (arg != null) args.push(arg)
			if (this.previous === end) break
		}
		return args
	}

	private getObject (): Node {
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
			const attribute = new Node(name, 'keyVal', [value])
			attributes.push(attribute)
			if (this.previous === '}') break
		}
		return new Node('obj', 'obj', attributes)
	}

	private getBlock (): Node {
		const lines = []
		while (true) {
			const line = this.getExpression(undefined, undefined, ';}')
			if (line != null) lines.push(line)
			if (this.previous === '}') break
		}
		return new Node('block', 'block', lines)
	}

	private getControlBlock (): Node {
		if (this.current === '{') {
			this.index += 1
			return this.getBlock()
		} else {
			return this.getExpression(undefined, undefined, ';')
		}
	}

	private getReturn (): Node {
		const value = this.getExpression(undefined, undefined, ';')
		return new Node('return', 'return', [value])
	}

	private getTryCatchBlock (): Node {
		const children: Node[] = []
		const tryBlock = this.getControlBlock()
		children.push(tryBlock)
		if (this.nextIs('catch')) {
			const catchChildren: Node[] = []
			this.index += 'catch'.length
			if (this.current === '(') {
				this.index += 1
				const variable = this.getExpression(undefined, undefined, ')')
				catchChildren.push(variable)
			}
			const catchBlock = this.getControlBlock()
			catchChildren.push(catchBlock)
			const catchNode = new Node('catch', 'catch', catchChildren)
			children.push(catchNode)
		}
		if (this.current === ';') this.index += 1
		return new Node('try', 'try', children)
	}

	private getThrow (): Node {
		const exception = this.getExpression(undefined, undefined, ';')
		return new Node('throw', 'throw', [exception])
	}

	private getIfBlock (): Node {
		const children: Node[] = []
		const condition = this.getExpression(undefined, undefined, ')')
		children.push(condition)
		const block = this.getControlBlock()
		children.push(block)

		while (this.nextIs('else if(')) {
			this.index += 'else if('.length
			const condition = this.getExpression(undefined, undefined, ')')
			const elseIfBlock = this.getControlBlock()
			const elseIfNode = new Node('elseIf', 'elseIf', [condition, elseIfBlock])
			children.push(elseIfNode)
		}

		if (this.nextIs('else')) {
			this.index += 'else'.length
			const elseBlock = this.getControlBlock()
			children.push(elseBlock)
		}
		return new Node('if', 'if', children)
	}

	private getSwitchBlock (): Node {
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
			const lines: Node[] = []
			while (true) {
				const line = this.getExpression(undefined, undefined, ';}')
				if (line !== undefined) lines.push(line)
				if (this.nextIs('case')) {
					next = 'case'
					break
				} else if (this.nextIs('default:')) {
					next = 'default:'
					break
				} else if (this.current === '}' || this.previous === '}') {
					next = 'end'
					break
				}
			}
			const block = new Node('block', 'block', lines)
			const caseNode = new Node(compare, 'case', [block])
			children.push(caseNode)
		}

		if (next === 'default:') {
			this.index += 'default:'.length
			const lines: Node[] = []
			while (true) {
				const line = this.getExpression(undefined, undefined, ';}')
				if (line !== undefined) lines.push(line)
				if (this.current === '}' || this.previous === '}') break
			}
			const block = new Node('block', 'block', lines)
			const defaultNode = new Node('default', 'default', [block])
			children.push(defaultNode)
		}
		if (this.current === '}') this.index += 1
		return new Node('switch', 'switch', children)
		// const options = new Node('options', 'options', children)
		// return new Node('switch', 'switch', [value, options])
	}

	private getWhileBlock (): Node {
		const condition = this.getExpression(undefined, undefined, ')')
		const block = this.getControlBlock()
		return new Node('while', 'while', [condition, block])
	}

	private getForBlock (): Node {
		const first = this.getExpression(undefined, undefined, '; ')
		if (this.previous === ';') {
			const condition = this.getExpression(undefined, undefined, ';')
			const increment = this.getExpression(undefined, undefined, ')')
			const block = this.getControlBlock()
			return new Node('for', 'for', [first, condition, increment, block])
		} else if (this.nextIs('in')) {
			this.index += 2
			// si hay espacios luego del in debe eliminarlos
			while (this.current === ' ') {
				this.index += 1
			}
			const list = this.getExpression(undefined, undefined, ')')
			const block = this.getControlBlock()
			return new Node('forIn', 'forIn', [first, list, block])
		}
		throw new Error('expression for error')
	}

	private getFunctionBlock (): Node {
		const name = this.getValue()
		if (this.current === '(') this.index += 1
		const args = this.getArgs()
		const block = this.getBlock()
		const argsNode = new Node('args', 'args', args)
		return new Node(name, 'function', [argsNode, block])
	}

	private getChildFunction (name: string, parent: Node): Node {
		let isArrow = false
		const variableName = this.getValue(false)
		if (variableName !== '') {
			// example: p => {name:p.name}
			// example: p -> {name:p.name}
			const i = this.index + variableName.length
			if ((this.char(i) === '=' || this.char(i) === '-') && this.char(i + 1) === '>') {
				isArrow = true
				this.index += (variableName.length + 2) // [VARIABLE+NAME] + [=>]
			}
		} else if (this.current + this.next === '()') {
			// example: ()=> {name:name}
			// example: ()-> {name:name}
			if ((this.offset(2) === '=' || this.offset(2) === '-') && this.offset(3) === '>') {
				isArrow = true
				this.index += 4 // [()=>]
			}
		} else if (this.current + this.next === '=>' || this.current + this.next === '->') {
			// example: => {name:name}
			// example: -> {name:name}
			isArrow = true
			this.index += 2 // [=>]
		}
		if (isArrow) {
			const variable = new Node(variableName, 'var')
			const body = this.getExpression(undefined, undefined, ')')
			return new Node(name, 'arrow', [parent, variable, body])
		} else {
			const args = this.getArgs(')')
			args.splice(0, 0, parent)
			return new Node(name, 'childFunc', args)
		}
		// if( this.mgr.arrowFunction.includes(name)){
		//      let variableName= this.getValue()
		//      if(variableName=='' && this.current==')'){
		//          this.index+=1
		//          return new Node(name,'arrow',[parent])
		//      }
		//      else{
		//          if(this.current=='=' && this.next == '>')this.index+=2
		//          else throw 'map without body'
		//          let variable= new Node(variableName,'var')
		//          let body= this.getExpression(null,null,')')
		//          return new Node(name,'arrow',[parent,variable,body])
		//      }
		//  }else{
		//      let args=  this.getArgs(')')
		//      args.splice(0,0,parent)
		//      return  new Node(name,'childFunc',args)
		//  }
	}

	private getIndexOperand (name: string): Node {
		const idx = this.getExpression(undefined, undefined, ']')
		const operand = new Node(name, 'var')
		return new Node('[]', 'operator', [operand, idx])
	}

	private getEnum (value: string): Node {
		if (value.includes('.') && this.model.isEnum(value)) {
			const names = value.split('.')
			const enumName = names[0]
			const enumOption = names[1]
			const enumValue = this.model.getEnumValue(enumName, enumOption)
			return new Node(enumValue, 'const')
		} else {
			const values = this.model.getEnum(value)
			const attributes = []
			for (const name in values) {
				const _value = values[name]
				const attribute = new Node(name, 'keyVal', [new Node(_value, 'const')])
				attributes.push(attribute)
			}
			return new Node('obj', 'obj', attributes)
		}
	}
}
