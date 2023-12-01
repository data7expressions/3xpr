|Function    	|Description                    |
|-------------|-------------------------------|
|getType			|	Get type of expression				|
|parameters		|	Get parameters of expression	|

## Examples

### GetType

```js
import { expressions as exp } from '3xpr'
(async () => {
	const type = exp.getType('a + 1')
	console.log(type)
})()
```

| Example                                   					| Result 																					|
|-----------------------------------------------------|-------------------------------------------------|
|1 + a																								|'integer'																				|
|b + a																								|'any'																						|
|nvl(a ,1)																						|'integer'																				|
|nvl(a ,"text")																				|'string'																					|
|nvl(a , b * 5 )																			|'number'																					|
|a.strCount("o")																			|'number'																					|
|[1,2,3].map(p => nvl(a, p))													|'[integer]'																			|
|a = max([1,2,3])																			|'integer'																				|
|a = max([1,2,3]) > c																	|'boolean'																				|
|d=c.b*2																							|'number'																					|
|d=`value of a is: ${a}`															|'string'																					|
|!(a=="1" || b>2)																			|'boolean'																				|
|a = {firstName: "John", lastName: "Lennon", age: 40}	|'{firstName:string,lastName:string,age:integer}'	|
|ods.union(prime)																			|'any'																						|
|cities.push(salta).name															|'any'																						|
|a = cities.push(salta).name													|'any'																						|

### Parameters

```js
import { expressions as exp } from '3xpr'
(async () => {
	const parameters = exp.parameters('a + 1')
	console.log(JSON.stringify(parameters))
})()
```

| Example                                   		| Result 																																|
|-----------------------------------------------|-----------------------------------------------------------------------|
|1 + a																					|[{"name":"a","type":"integer"}]																				|
|b + a																					|[{"name":"b","type":"any"},{"name":"a","type":"any"}]									|
|nvl(a ,1)																			|[{"name":"a","type":"integer"}]																				|
|nvl(a ,"text")																	|[{"name":"a","type":"string"}]																					|
|nvl(a , b * 5 )																|[{"name":"a","type":"number"},{"name":"b","type":"number"}]						|
|a.strCount("o")																|[{"name":"a","type":"string"}]																					|
|[1,2,3].map(p => nvl(a, p))										|[{"name":"p","type":"integer"},{"name":"a","type":"integer"}]					|
|a = max([1,2,3])																|[{"name":"a","type":"integer"}]																				|
|a = max([1,2,3]) > c														|[{"name":"a","type":"boolean"},{"name":"c","type":"integer"}]					|
|d=c.b*2|																				[{"name":"d","type":"number"},{"name":"c.b","type":"number"}]						|
|d=`value of a is: ${a}`												|[{"name":"d","type":"string"}]																					|
|!(a=="1" || b>2)																|[{"name":"a","type":"string"},{"name":"b","type":"integer"}]						|
|a={firstName:"John",lastName:"Lennon",age:40}	|[{"name":"a","type":"{firstName:string,lastName:string,age:integer}"}]	|
|ods.union(prime)																|[{"name":"ods","type":"any"},{"name":"prime","type":"any"}]						|
|cities.push(salta).name												|[{"name":"cities","type":"[{name:any}]"},{"name":"salta","type":"{name:any}"}]|
|a = cities.push(salta).name										|[{"name":"a","type":"any"},{"name":"cities","type":"[{name:any}]"},{"name":"salta","type":"{name:any}"}]|
