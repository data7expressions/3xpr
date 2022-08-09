|Operator    		|Description        |
|---------------|-------------------|
|==  ===			 	|equal							|
|!=  !== <> 		|notEqual						|
|>							|greaterThan				|
|<							|lessThan						|
|>=							|greaterThanOrEqual	|
|<=							|lessThanOrEqual		|

## Examples

Context:

```js
const context = { a: '1', b: 2, c: { a: 4, b: 5 }, d: 'house', e: 'car' }
```

| Example         | Result 			|
|-----------------|-------------|
|3>2							|true					|
|a+b							|'12'					|
|-3>2*2						|false				|
|a*3==b+1					|true					|
|a*3===b+1				|true					|
|-4==-(2*2)				|true					|
|4!=2*2						|false				|
|4!==2*2					|false				|
|4<>2*2						|false				|
|c.a>b*2					|false				|
|c.a>=b*2					|true					|
|c.a<=b*2					|true					|
|c.a<b*2					|false				|
|d<e							|false				|
|d>e							|true					|
|d<>e							|true					|

## Definition

### Operator ==

- description: equal
- return: boolean
- params:
	- a: T
	- b: T

### Operator ===

- description: equal
- return: boolean
- params:
	- a: T
	- b: T

### Operator !=

- description: notEqual
- return: boolean
- params:
	- a: T
	- b: T

### Operator !==

- description: notEqual
- return: boolean
- params:
	- a: T
	- b: T

### Operator <>

- description: notEqual
- return: boolean
- params:
	- a: T
	- b: T

### Operator >

- description: greaterThan
- return: boolean
- params:
	- a: T
	- b: T

### Operator <

- description: lessThan
- return: boolean
- params:
	- a: T
	- b: T

### Operator >=

- description: greaterThanOrEqual
- return: boolean
- params:
	- a: T
	- b: T

### Operator <=

- description: lessThanOrEqual
- return: boolean
- params:
	- a: T
	- b: T
