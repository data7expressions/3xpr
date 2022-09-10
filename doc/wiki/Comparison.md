|Operator    		|Description        |
|---------------|-------------------|
|==  ===			 	|equal							|
|!=  !== <> 		|notEqual						|
|>							|greaterThan				|
|<							|lessThan						|
|>=							|greaterThanOrEqual	|
|<=							|lessThanOrEqual		|

|Function 		|Description                                   																|
|-------------|-----------------------------------------------------------------------------|
|between			|Specifies how to retrieve values from an expression within a specific range	|
|in/includes	|Is used to reduce the use of multiple OR conditions													|
|isNull				|Evaluate if it is null																												|
|isNotNull		|Evaluate if it is not null																										|

## Examples

Context:

```js
const context = {
		a: '1',
		b: 2,
		c: { a: 4, b: 5 },
		d: 'house',
		e: 'car',
		f: '',
		g: null,
		devices: ['phone', 'computer', 'robot'],
		pi: 3.141516,
		requerid: false,
		device: 'phone',
		date: '2022-08-22',
		time: '22:14:30',
		datetime: '1997-07-08T22:14:30.000Z'
	}
```

| Example         									| Result 			|
|-----------------------------------|-------------|
|3>2																|true					|
|a+b																|'12'					|
|-3>2*2															|false				|
|a*3==b+1														|true					|
|a*3===b+1													|true					|
|-4==-(2*2)													|true					|
|4!=2*2															|false				|
|4!==2*2														|false				|
|4<>2*2															|false				|
|c.a>b*2														|false				|
|c.a>=b*2														|true					|
|c.a<=b*2														|true					|
|c.a<b*2														|false				|
|d<e																|false				|
|d>e																|true					|
|d<>e																|true					|
|includes("phone",devices)					|false				|
|includes("other",devices)					|false				|
|in("other",devices)								|false				|
|"phone".in(devices)								|false				|
|device.in(devices)									|false				|
|d.in(["garage", "house","office"])	|false				|
|between(12,10,20)									|true					|
|between(2,10,20)										|false				|
|between(pi,1,5)										|true					|
|isNull(f)													|false				|
|isNull(g)													|true					|
|isNotNull(f)												|true					|
|isNotNull(g)												|false				|
|isBoolean(requerid)								|true					|
|isNumber(pi)												|true					|
|isDecimal(pi)											|true					|
|isInteger(pi)											|false				|
|isInteger(b)												|true					|
|isString(b)												|false				|
|isString(d)												|true					|
|isDate(date)												|true					|
|isDatetime(datetime)								|true					|
|isDatetime(time)										|false				|
|isTime(time)												|false				|
|isObject(c)												|true					|
|isObject(device)										|false				|
|isObject(devices)									|false				|
|isArray(c)													|false				|
|isArray(device)										|false				|
|isArray(devices)										|true					|
|isBooleanFormat(requerid)					|false				|
|isDateFormat(date)									|true					|
|isDatetimeFormat(datetime)					|true					|
|isDatetimeFormat(time)							|false				|
|isTimeFormat(time)									|false				|

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

### between

- description: Specifies how to retrieve values from an expression within a specific range.
- deterministic: true
- return: boolean
- params:
	- value: T
	- from: T
	- to: T

### includes

- description: Determines if an array includes a certain element
- deterministic: true
- return: boolean
- params:
	- list: T[]
	- value: T

### in

- description: Determines if an array includes a certain element
- deterministic: true
- return: boolean
- params:
	- list: T[]
	- value: T

### isNull

- description: Evaluate if it is null
- deterministic: true
- return: boolean
- params:
	- value: any

### isNotNull

- description: Evaluate if it is not null
- deterministic: true
- return: boolean
- params:
	- value: any
