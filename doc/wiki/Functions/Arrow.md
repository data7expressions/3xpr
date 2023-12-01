|Function    				|Description                                   																		|
|-------------------|---------------------------------------------------------------------------------|
|foreach each				|Calls a function for each element in an array.																		|
|filter where				|Creates a new array filled with elements that pass a test provided by a function	|
|map select					|Creates a new array from calling a function for every array element.							|
|sort order					|Sorts the elements of an array.																									|
|reverse						|Reverses the order of the elements in an array.																	|
|remove delete			|Eliminate the elements of the array that meet the filter condition								|

## Examples

Context:

```js
const context = {
		cities: [
			{ name: 'Buenos Aires', province: 'BA', population: 2890151, coordinates: { lat: 34.36, long: 58.26 } },
			{ name: 'Córdoba', province: 'CB', population: 1317298, coordinates: { lat: 31.42, long: 64.18 } },
			{ name: 'Rosario', province: 'SF', population: 948312, coordinates: { lat: 32.58, long: 60.36 } },
			{ name: 'Mar del Plata', province: 'BA', population: 593337, coordinates: { lat: 38, long: 57.33 } }
		],
		salta: { name: 'Salta', province: 'SA', population: 520683, coordinates: { lat: 24.33, long: 64.30 } },
		posadas: { name: 'Posadas', province: 'MI', population: 275028, coordinates: { lat: 27.22, long: 55.53 } },
		musicians: ['Charly Garcia', 'Fito Paez', 'Luiz Alberto Spinetta'],
		pair: [2, 4, 6],
		ods: [1, 3, 5]
	}
```

| Example                                   															| Result 																																|
|-------------------------------------------------------------------------|-----------------------------------------------------------------------|
|cities.where(p-> p.province <> "BA").len()																|2																																			|
|cities.where(p-> p.province != "BA").length()														|2																																			|
|cities.each(p=> p.population=round(p.population/1000000,2)).population		|[2.9,1.3,0.95,0.6]																											|
|pair.foreach(p=>b=b+p)																										|[2,4,6]																																|
|pair.filter(p=> p<5).foreach(p => b=b+p)																	|[2,4]																																	|
|cities.sort(p=> p.name).name																							|['Buenos Aires','Córdoba','Mar del Plata','Rosario']										|
|cities.reverse(p=> p.name).name																					|['Rosario','Mar del Plata','Córdoba','Buenos Aires']										|
|ods.filter(p=> p>1 && p<5).reverse()																			|[3]																																		|
|ods.filter(p=> p>1 && p<5).map(p=> p*2).reverse()												|[6]																																		|
|concat(ods,pair)																													|[1,3,5,2,4,6]																													|
|concatenate(pair,ods).sort()																							|[1,2,3,4,5,6]																													|
|cities.order(p=> p.name).name																						|['Buenos Aires','Córdoba','Mar del Plata','Rosario']										|
|cities.name																															|['Buenos Aires','Córdoba','Rosario','Mar del Plata']										|
|in("San Luis",cities.name)																								|false																																	|
|cities.select(p=> p.coordinates).select(p=> p.lat)												|[34.36,31.42,32.58,38]																									|
|cities.map(p=> p.coordinates).lat																				|[34.36,31.42,32.58,38]																									|
|cities.map(p=>[p.coordinates.lat,p.coordinates.long])										|[[34.36,58.26],[31.42,64.18],[32.58,60.36],[38,57.33]]									|
|cities.distinct(p=> p.province)																					|['BA','CB','SF']																												|
|cities.coordinates.lat																										|[34.36,31.42,32.58,38]																									|
|cities.x																																	|[]																																			|
|cities.x.x																																|[]																																			|
|cities.delete(p-> p.province === "BA").name															|['Córdoba','Rosario']																									|
|cities.remove(p-> p.province === "BA").name															|['Córdoba','Rosario']																									|

## Definition

### foreach

- description: Calls a function for each element in an array.
- deterministic: true
- return: void
- params:
	- list: any[]
	- method: function

### each

- description: Calls a function for each element in an array.
- deterministic: true
- return: void
- params:
	- list: any[]
	- method: function

### filter

- description: Creates a new array filled with elements that pass a test provided by a function
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- method: function

### where

- description: Creates a new array filled with elements that pass a test provided by a function
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- method: function

### map

- description: Creates a new array from calling a function for every array element.
- deterministic: true
- return: any[]
- params:
	- list: any[]
	- method: function

### select

- description: Creates a new array from calling a function for every array element.
- deterministic: true
- return: any[]
- params:
	- list: any[]
	- method: function

### sort

- description: Sorts the elements of an array.
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- method: function

### order

- description: Sorts the elements of an array.
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- method: function

### reverse

- description: Reverses the order of the elements in an array.
- deterministic: true
- return: T[]
- params:
	- list: T[]
	- method: function

### remove

- description: Eliminate the elements of the array that meet the filter condition
- deterministic: true
- return: number
- params:
	- list: any[]
	- method: function

### delete

- description: Eliminate the elements of the array that meet the filter condition
- deterministic: true
- return: number
- params:
	- list: any[]
	- method: function
