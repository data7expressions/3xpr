
|Operator   |Description  |
|-----------|-------------|
|.					|element  		|
|[]					|element  		|

## Examples

Context:

```js
const context = {
		orders: [
			{
				number: "20001",
				customer: { firstName: "John", lastName: "Murphy" },
				orderTime: "2022-07-30T10:15:54",
				details: [
					{ article: "Pear", unitPrice: 1.78, qty: 2 },
					{ article: "Banana", unitPrice: 1.99, qty: 1 },
					{ article: "White grape", unitPrice: 2.03, qty: 1 }
				]
			},
			{
				number: "20002",
				customer: { firstName: "Paul", lastName: "Smith" },
				orderTime: "2022-07-30T12:12:43",
				details: [
					{ article: "Apple", unitPrice: 2.15, qty: 1 },
					{ article: "Banana", unitPrice: 1.99, qty: 2 },
					{ article: "Pear", unitPrice: 1.78, qty: 1 }
				]
			}
		]
	}
```

| Example         																				| Result 												|
|---------------------------------------------------------|-------------------------------|
|orders.number																						|["20001","20002"]							|
|orders.0.number																					|"20001"												|
|orders.1.customer.firstName															|"Paul"													|
|orders.customer.firstName																|["John","Paul"]								|
|orders.0.details.article																	|["Pear","Banana","White grape"]|
|orders.0.details.2.article																|"White grape"									|
|orders[0].number																					|"20001"												|
|orders[0]["number"]																			|"20001"												|
|orders[1].customer.firstName															|"Paul"													|
|orders.customer[0]["firstName"]													|"John"													|
|orders.customer[0]["first"+"Name"]												|"John"													|
|orders[1].customer["firstName"]													|"Paul"													|
|orders.1["customer"]["firstName"]												|"Paul"													|
|orders.customer.firstName																|["John","Paul"]								|
|orders[0].details.2.article															|"White grape"									|
|orders.customer[orders.customer.length()-1]["firstName"]	|"Paul"													|

**First order details:**

```ts
orders.0.details
```

*Result*:

```json
[	{"article":"Pear","unitPrice":1.78,"qty":2}
,	{"article":"Banana","unitPrice":1.99,"qty":1}
,	{"article":"White grape","unitPrice":2.03,"qty":1}
]
```

**List of articles without repeating:**

```ts
orders.details.article.distinct()
```

*Result*:

```json
["Pear","Banana","White grape","Apple"]
```

**Articles containing the letter e:**

```ts
orders.details.article.filter(p => p.includes("e"))
```

*Result*:

```json
["Pear","White grape","Apple","Pear"]
```

**Articles that contain the letter e without repeating:**

```ts
orders.details.article.filter(p => p.includes("e")).distinct()
```

*Result*:

```json
["Pear","White grape","Apple"]
```

**Articles that contain the letter e of the order number 20002:**

```ts
orders.filter(p=> p.number == "20002").details.article.filter(p => p.includes("e"))
```

*Result*:

```json
["Apple","Pear"]
```

**Order number and full name of the client:**

```ts
orders.map(p => {nro:p.number, customer: `${p.customer.firstName} ${p.customer.lastName}`})
```

*Result*:

```json
[{"nro":"20001","customer":"John Murphy"},{"nro":"20002","customer":"Paul Smith"}]
```

## Definition

### Operator .

**With array:**

- description: Access an element of a list through the index
- return: T
- params:
	- array: T[]
	- index: number

**With object:**

- description: Accessing the value of an object's property through the property name
- return: any
- params:
	- array: any
	- index: string

### Operator []

**With array:**

- description: Access an element of a list through the index
- return: T
- params:
	- array: T[]
	- index: number

**With object:**

- description: Accessing the value of an object's property through the property name
- return: any
- params:
	- array: any
	- index: string
