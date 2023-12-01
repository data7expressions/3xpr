|Operator |Description                                   	|
|---------|-----------------------------------------------|
|-				|negative /subtraction													|
|+				|addition																				|
|*				|multiplication																	|
|/				|division																				|
|**				|exponentiation																	|
|//				|floorDivision																	|
|%				|mod																						|

## Examples

Context:

```js
const context = { a: '1', b: 2, c: { a: 4, b: 5 } }
```

| Example           | Result 							|
|-------------------|---------------------|
|3+2-1							|4										|
|3*4-1							|11										|
|1-2-5							|-6										|
|(2+3)*2						|10										|
|2*(3+2)						|10										|
|1+2*3*4						|25										|
|(1+(2**3)*4				|33										|
|1+2**(3*4)					|4097									|
|(a*b)+(2*a+2*b)		|8										|
|2**b+a							|'41'									|
|c.b								|5										|

## Definition

### Operator -

Negative:

- description: negative
- return: number
- params:
	- value: number

Subtraction:

- description: subtraction
- return: number
- params:
	- a: number
	- b: number

### Operator +

- description: addition
- return: number
- params:
	- a: number
	- b: number

### Operator *

- description: multiplication
- return: number
- params:
	- a: number
	- b: number

### Operator /

- description: division
- return: number
- params:
	- a: number
	- b: number

### Operator **

- description: exponentiation
- return: number
- params:
	- a: number
	- b: number

### Operator //

- description: floorDivision
- return: number
- params:
	- a: number
	- b: number

### Operator %

- description: mod
- return: number
- params:
	- a: number
	- b: number
