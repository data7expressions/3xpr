# js-expressions

Js-expression is an extensible expression evaluator and parser. Besides the operators, functions, variables, objects and arrays that are supported; it is possible to extend it with your own functions, operators, etc

## Features

	- Arithmetic, assignment, comparison, Logical and bitwise operators
	- Variables
	- Constants
	- Functions
	- Objects
	- Arrays with arrow functions
	- Environment variables
	- Enums
	- Control flows

- Simplify math operations where operands are constant
- It allows to extend the model by adding or overwriting operators, functions and enums
- Supports multiline expressions using the semicolon character to separate them
- The evaluation receives the context where the variables will be read, written, and created. This context must be a dictionary or a class derived from a dictionary
- When parsing a string that contains expression, an expression object is returned, which can be reused to evolve the expression with different contexts, in this way the performance is notably improved.
- You can create a new expression object using expression objects and combining them with operators

## Use

expressions is the main class of the library that contains the methods to parse, evaluate, get info of expression, etc . In order to use the library you need to create an instance of this class:

```typescript
import { expressions } from 'js-expressions'

const result = expressions.eval('1+1')
```

Context:

```typescript
import { expressions } from 'js-expressions'

const context = { "a": [1, 2, 3], "b": 0 }
expressions.eval('c=a.pop()', context)
```

Lambda:

```typescript
import { expressions } from 'js-expressions'

const context = {"a":[1,2,3,4,5],"b":0}
expressions.eval('a.filter(p=> p<5).foreach(p => b=b+p)',context)
```

Control flow:

```typescript
import { expressions } from 'js-expressions'

const context = {"a":[1,2,3,4,5],"b":0}
const expression = `
list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
total = 0;
for (i = 0; i < list.length(); i += 1) {
	total += list[i];
}
`
expressions.eval(expression,context)
```

Enum:

```typescript
import { expressions,Library } from 'js-expressions'

class TestEnumLib extends Library {
	constructor () {
		super('testEnum')
		this.initEnums()
	}	
	private initEnums (): any {
		this.addEnum('ColorConversion', { BGR2GRAY: 6, BGR2HSV: 40, BGR2RGB: 4, GRAY2BGR: 8, HSV2BGR: 54, HSV2RGB: 55, RGB2GRAY: 7, RGB2HSV: 41 })
		this.addEnum('Color', { RED: 1, GREEN: 2, BLUE: 3 })
	}
}
expressions.config.addLibrary(new TestEnumLib())

console.log(expressions.eval('ColorConversion.GRAY2BGR'))
console.log(expressions.eval('Color.GREEN')))
```

## Documentation

- [Wiki](https://github.com/FlavioLionelRita/js-expressions/wiki)
- [Source Code](https://github.com/FlavioLionelRita/js-expressions/blob/main/doc/source/README.md)
