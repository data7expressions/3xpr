|Function    					|Description                                   																|
|---------------------|-----------------------------------------------------------------------------|
|union								|Is the set A U B that contains all the elements of A and B.									|
|intersection					|Is the set A \ B that contains all the elements of A that do not belong to B.|
|difference						|Is the set containing all the elements of A that do not belong to B					|
|symmetricDifference	|Is the set containing the elements of A and B that are not common						|

# Examples

Context

```ts
const context = {
	ods: [1, 3, 5, 7, 9],
	prime: [2, 3, 5, 7],
	orders: [
		{
			number: '20003',
			details: [
				{ article: 'Pear', qty: 2 },
				{ article: 'Banana', qty: 2 },
				{ article: 'White grape', qty: 1 },
				{ article: 'Apple', qty: 1 }
			]
		},
		{
			number: '20004',
			details: [
				{ article: 'Apple', qty: 1 },
				{ article: 'Banana', qty: 2 },
				{ article: 'Pear', qty: 1 }
			]
		}
	]
}
```

| Example          							| Result 							|
|-------------------------------|---------------------|
|ods.union(prime)								|[1,3,5,7,9,2]				|
|ods.intersection(prime)				|[3,5,7]							|
|ods.difference(prime)					|[1,9]								|
|ods.symmetricDifference(prime)	|[1,9,2]							|

**union:**

```ts
orders[0].details.union(orders[1].details)
```

*Result:*

```json
[{"article":"Pear","qty":2}
,{"article":"Banana","qty":2}
,{"article":"White grape","qty":1}
,{"article":"Apple","qty":1}
,{"article":"Pear","qty":1}
]
```

**intersection:**

```ts
orders[0].details.intersection(orders[1].details)
```

*Result:*

```json
[{"article":"Apple","qty":1}
,{"article":"Banana","qty":2}
]
```

**difference:**

```ts
orders[0].details.difference(orders[1].details)
```

*Result:*

```json
[{"article":"Pear","qty":2}
,{"article":"White grape","qty":1}
]
```

**symmetricDifference:**

```ts
orders[0].details.symmetricDifference(orders[1].details)
```

*Result:*

```json
[{"article":"Pear","qty":2}
,{"article":"White grape","qty":1}
,{"article":"Pear","qty":1}
]
```

## Definition

### union

- description: Is the set A U B that contains all the elements of A and B.
- deterministic: true
- return: T[]
- params:
	- a: T[]
	- b: T[]

### intersection

- description: Is the set A \ B that contains all the elements of A that do not belong to B.
- deterministic: true
- return: T[]
- params:
	- a: T[]
	- b: T[]

### difference

- description: Is the set containing the elements of A and B that are not common
- deterministic: true
- return: T[]
- params:
	- a: T[]
	- b: T[]

### symmetricDifference

- description: Is the set containing the elements of A and B that are not common
- deterministic: true
- return: T[]
- params:
	- a: T[]
	- b: T[]
