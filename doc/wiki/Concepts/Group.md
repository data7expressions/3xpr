|Function    	|Description                                   																		|
|-------------|---------------------------------------------------------------------------------|
|distinct			|Is used to retrieve unique values from a list																		|
|count				|Returns the number of rows in a set																							|
|max					|Returns the maximum of rows in a set																							|
|min					|Returns the minimum of rows in a set																							|
|sum					|Returns the sum of rows in a set																									|
|avg					|Returns the average of rows in a set																							|
|first				|Returns the first value of the array that meets a condition											|
|last					|Returns the last value of the array that meets a condition												|

## Examples

Context:

```js
const context = {
	orders: [
			{
				number: '20001',
				customer: { firstName: 'John', lastName: 'Murphy' },
				orderTime: '2022-07-30T10:15:54',
				details: [
					{ article: 'Pear', unitPrice: 1.78, qty: 2 },
					{ article: 'Banana', unitPrice: 1.99, qty: 1 },
					{ article: 'White grape', unitPrice: 2.03, qty: 1 }
				]
			},
			{
				number: '20002',
				customer: { firstName: 'Paul', lastName: 'Smith' },
				orderTime: '2022-07-30T12:12:43',
				details: [
					{ article: 'Apple', unitPrice: 2.15, qty: 1 },
					{ article: 'Banana', unitPrice: 1.99, qty: 2 },
					{ article: 'Pear', unitPrice: 1.78, qty: 1 }
				]
			}
		]
	}
```

| Example                                   															| Result 																										|
|-------------------------------------------------------------------------|-----------------------------------------------------------|
|orders.min(p=> p.number)																									|'20001'																										|
|orders.details.min(p=> p.article )																				|'Apple'																										|
|orders.details.max(p=> p.unitPrice * p.qty )															|3.98																												|
|orders.details.avg(p=> p.unitPrice * p.qty )															|2.5816666666666666																					|
|orders[1].details.sum(p=> p.unitPrice * p.qty )													|7.91																												|
|orders.details.count(p=> p.unitPrice * p.qty < 3 )												|4																													|
|orders.details.first(p=> p.unitPrice * p.qty < 3 ).article								|'Banana'																										|
|orders.details.last(p=> p.unitPrice * p.qty < 3 ).article								|'Pear'																											|
|orders.details.first(p=> p.unitPrice * p.qty < 3 )												|{"article":"Banana","unitPrice":1.99,"qty":1}							|
|orders.details.foreach(p=>p.subtotal=p.qty*p.unitPrice).subtotal					|[3.56,1.99,2.03,2.15,3.98,1.78]														|
|orders.details.foreach(p=>total=nvl(total,0)+p.qty*p.unitPrice);total		|15.49																											|
|orders.details.distinct(p=>p.article)																		|['Pear','Banana','White grape','Apple']										|
|{total:orders[0].details.sum(p=>p.qty * p.unitPrice)}										|{"total":7.58}																							|
|orders.map(p=>{nro:p.number,total:p.details.sum(q=>q.qty * q.unitPrice)})|[{"nro":"20001","total":7.58},{"nro":"20002","total":7.91}]|

**Total for order:**

```ts
orders.each(p=>p.total=p.details.sum(q=>q.qty*q.unitPrice)).map(p=>{nro:p.number,total:p.total})	
```

*Result*:

```json
[
	{"nro":"20001","total":7.58},
	{"nro":"20002","total":7.91}
]
```

**Distinct:**

```ts
orders.details.distinct(p=>{article:p.article,qty:p.qty})	
```

*Result*:

```json
[
	{"article":"Pear","qty":2},
	{"article":"Banana","qty":1},
	{"article":"White grape","qty":1},
	{"article":"Apple","qty":1},
	{"article":"Banana","qty":2},
	{"article":"Pear","qty":1}
]
```

**Total and count for article:**

```ts
orders.details.map(p=>{article:p.article,count:count(1),total:sum(p.qty * p.unitPrice)})
```

*Result*:

```json
[
	{"article":"Pear","count":2,"total":5.34},
	{"article":"Banana","count":2,"total":5.97},
	{"article":"White grape","count":1,"total":2.03},
	{"article":"Apple","count":1,"total":2.15}
]
```

## Definition

### distinct

- description: Is used to retrieve unique values from a list.
- deterministic: true
- return: any[]
- params:
	- list: any[]
	- method: function

### count

- description: Calculating the number of rows in a set.
- deterministic: true
- return: number
- params:
	- list: T[]
	- method: function

### max

- description: Calculating the maximum.
- deterministic: true
- return: T
- params:
	- list: T[]
	- method: function

### min

- description: Calculating the minimum.
- deterministic: true
- return: T
- params:
	- list: T[]
	- method: function

### sum

- description: Calculating the sum.
- deterministic: true
- return: number
- params:
	- list: T[]
	- method: function

### avg

- description: Calculates the average of the specified columns in a set of rows
- deterministic: true
- return: number
- params:
	- list: T[]
	- method: function

### first

- description: Returns the first value of the array that meets a condition
- deterministic: true
- return: T
- params:
	- list: T[]
	- method: function

### last

- description: Returns the last value of the array that meets a condition
- deterministic: true
- return: T
- params:
	- list: T[]
	- method: function
