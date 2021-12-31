
expressions is the main class of the library that contains the methods to parse, evaluate, get info of expression, etc . In order to use the library you need to create an instance of this class:

```typescript
import { expressions } from 'js-expressions'

const result = expressions.eval('1+1')
```

Data:

```typescript
import { expressions } from 'js-expressions'

data= { "a": [1, 2, 3], "b": 0 }
expressions.eval('c=a.pop()', data)
console.log(data.c)
```

Lambda:

```typescript
import { expressions } from 'js-expressions'

data = {"a":[1,2,3,4,5],"b":0}
expressions.eval('a.filter(p=> p<5).foreach(p => b=b+p)',data)
console.log(data.b)
```

Control flow:

```typescript
import { expressions } from 'js-expressions'

data = {"a":[1,2,3,4,5],"b":0}
const expression = `
list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
total = 0;
for (i = 0; i < list.length(); i += 1) {
	total += list[i];
}
`
expressions.eval(expression,data)
console.log(data.total)
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
