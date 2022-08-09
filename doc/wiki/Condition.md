|Function 		|Description                                   																|
|-------------|-----------------------------------------------------------------------------|
|between			|Specifies how to retrieve values from an expression within a specific range	|
|in/includes	|Is used to reduce the use of multiple OR conditions													|

## Examples

Context:

```js
const context = { devices: ['phone', 'computer', 'robot'], pi: 3.141516 }
```

| Example                     | Result 	|
|-----------------------------|---------|
|includes("phone",devices)		|true			|
|includes("other",devices)		|false		|
|in("other",devices)					|false		|
|between(12,10,20)						|true			|
|between(2,10,20)							|false		|
|between(pi,1,5)							|true			|

## Definition

### between

- description: Specifies how to retrieve values from an expression within a specific range.
- deterministic: true
- return: boolean
- params:
	- value: T
	- from: T
	- to: T

### includes

- description: Is used to reduce the use of multiple OR conditions
- deterministic: true
- return: boolean
- params:
	- value: T
	- list: T[]

### in

- description: Is used to reduce the use of multiple OR conditions
- deterministic: true
- return: boolean
- params:
	- value: T
	- list: T[]
