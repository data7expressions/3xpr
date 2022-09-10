
|Function    				|Description                                   																		|
|-------------------|---------------------------------------------------------------------------------|
|push								|Adds new items to the end of an array																						|
|insert							|Adds new items to the end of an array																						|
|pop								|Removes (pops) the last element of an array and return element										|
|concat concatenate	|Used to join two or more arrays																									|
|length len					|Calculating the number of items in a array.																			|
|slice							|Returns a copy of a portion of the array into a new array from start to end.			|
|page								|Returns a portion of the records.																								|

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

| Example                         | Result 																																|
|---------------------------------|-----------------------------------------------------------------------|
|cities.length()									|4																																			|
|concat(ods,pair)									|[1,3,5,2,4,6]																													|
|concatenate(pair,ods).sort()			|[1,2,3,4,5,6]																													|
|cities.name											|['Buenos Aires','Córdoba','Rosario','Mar del Plata']										|
|in("San Luis",cities.name)				|false																																	|
|cities.coordinates.lat						|[34.36,31.42,32.58,38]																									|
|cities.x													|[]																																			|
|cities.x.x												|[]																																			|
|cities.push(salta).name					|['Buenos Aires','Córdoba','Rosario','Mar del Plata','Salta']						|
|cities.insert(posadas).name			|['Buenos Aires','Córdoba','Rosario','Mar del Plata','Salta','Posadas']	|
|cities.pop().name								|'Posadas'																															|
|musicians[0]											|'Charly Garcia'																												|
|musicians[3]											|undefined																															|
|musicians[musicians.length()-1]	|'Luiz Alberto Spinetta'																								|
|concatenate(pair,ods).slice(2,3)	|[6]																																		|
|concatenate(pair,ods).page(2,3)	|[1,3,5]																																|

## Definition

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

### slice

- description: Returns a copy of a portion of the array into a new array from start to end.
- deterministic: true
- return: any[]
- params:
	- list: any[]
	- from: number
	- to: number

### page

- description: Returns a portion of the records.
- deterministic: true
- return: number
- params:
	- page: number
	- records: number
