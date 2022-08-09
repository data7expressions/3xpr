|Function    	|Description                                   																		|
|-------------|---------------------------------------------------------------------------------|
|foreach/each	|Calls a function for each element in an array.																		|
|filter/where	|Creates a new array filled with elements that pass a test provided by a function	|
|first				|Returns the first value of the array that meets a condition											|
|last					|Returns the last value of the array that meets a condition												|
|map/select		|Creates a new array from calling a function for every array element.							|
|sort/order		|Sorts the elements of an array.																									|
|reverse			|Reverses the order of the elements in an array.																	|
|remove/delete|Eliminate the elements of the array that meet the filter condition								|
|push					|Adds new items to the end of an array																						|
|insert				|Adds new items to the end of an array																						|
|pop					|Removes (pops) the last element of an array and return element										|
|length/len		|Calculating the number of items in a array.																			|

|Operator   |Description  |
|-----------|-------------|
|[]					|element  		|

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
		numbers: [1, 2, 3]
	}
```

| Example                                   															| Result 																																|
|-------------------------------------------------------------------------|-----------------------------------------------------------------------|
|cities.filter(p=> p.province === "BA").map(p=> p.name).first()						|'Buenos Aires'																													|
|cities.where(p-> p.province == "BA").select( p-> p.name).first()					|'Buenos Aires'																													|
|cities.where(p-> p.province == "BA").select( p-> p.name).last()					|'Mar del Plata'																												|
|cities.first(p-> p.province === "BA").name																|'Buenos Aires'																													|
|cities.first(p-> p.province === "BA").coordinates.lat										|34.36																																	|
|cities.first(p-> p.province === "BA").coordinates.x											|null																																		|
|cities.first(p-> p.province === "BA").x.x																|null																																		|
|numbers.filter(p=> p>1 && p<5).map(p=> p*2)															|[4,6]																																	|
|numbers.first(p => p%2==0)																								|2																																			|
|numbers.last(p=> p%2==0)																									|2																																			|
|cities.length()																													|4																																			|
|cities.where(p-> p.province <> "BA").len()																|2																																			|
|cities.where(p-> p.province != "BA").length()														|2																																			|
|cities.each(p=> p.population=round(p.population/1000000,2)).population		|[2.9,1.3,0.95,0.6]																											|
|numbers.foreach(p=>b=b+p)																								|[1,2,3]																																|
|numbers.filter(p=> p<5).foreach(p => b=b+p)															|[1,2,3]																																|
|cities.sort(p=> p.name).name																							|['Buenos Aires','Córdoba','Mar del Plata','Rosario']										|
|cities.reverse(p=> p.name).name																					|['Rosario','Mar del Plata','Córdoba','Buenos Aires']										|
|numbers.filter(p=> p>1 && p<5).reverse()																	|[3,2]																																	|
|numbers.filter(p=> p>1 && p<5).map(p=> p*2).reverse()										|[6,4]																																	|
|cities.order(p=> p.name).name																						|['Buenos Aires','Córdoba','Mar del Plata','Rosario']										|
|cities.name																															|['Buenos Aires','Córdoba','Rosario','Mar del Plata']										|
|cities.select(p=> p.coordinates).select(p=> p.lat)												|[34.36,31.42,32.58,38]																									|
|cities.map(p=> p.coordinates).lat																				|[34.36,31.42,32.58,38]																									|
|cities.coordinates.lat																										|[34.36,31.42,32.58,38]																									|
|cities.x																																	|[]																																			|
|cities.x.x																																|[]																																			|
|cities.delete(p-> p.province === "BA").name															|['Córdoba','Rosario']																									|
|cities.remove(p-> p.province === "BA").name															|['Córdoba','Rosario']																									|
|cities.push(salta).name																									|['Buenos Aires','Córdoba','Rosario','Mar del Plata','Salta']						|
|cities.insert(posadas).name																							|['Buenos Aires','Córdoba','Rosario','Mar del Plata','Salta','Posadas']	|
|cities.pop().name																												|'Posadas'																															|
|musicians[0]																															|'Charly Garcia'																												|
|musicians[3]																															|undefined																															|

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

### as

- description: undefined
- deterministic: true
- return: T
- params:
	- value: T
	- name: string

### distinct

- description: undefined
- deterministic: true
- return: T
- params:
	- value: T

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

### push

- description: Adds new items to the end of an array
- deterministic: true
- return: number
- params:
	- list: T[]
	- value: T

### insert

- description: Adds new items to the end of an array
- deterministic: true
- return: number
- params:
	- list: T[]
	- value: T

### pop

- description: Removes (pops) the last element of an array and return element
- deterministic: true
- return: T
- params:
	- list: T[]

### length

- description: Calculating the number of items in a array.
- deterministic: true
- return: number
- params:
	- list: T[]

### len

- description: Calculating the number of items in a array.
- deterministic: true
- return: number
- params:
	- list: T[]

### Operator []

- description: element
- return: T
- params:
	- array: T[]
	- index: number
