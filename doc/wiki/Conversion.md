|Function    	|Description                                   																					|
|-------------|---------------------------------------------------------------------------------------|
|toString			|convert to string																																			|
|toNumber			|convert to number																																			|
|dateToString	|Convert date to string with ISO 8601 format																						|
|keys					|Convert all keys of an object to an array																							|
|values				|Extract the values of an object into an array																					|
|entries			|Extract the keys and values of an object into an array																	|
|fromEntries	|Convert a generated array with entries into an object																	|
|stringify		|Convert a JavaScript object or value to a JSON text string															|
|parse				|Parses a text string as JSON, optionally transforming the value produced by the parse	|

# Example

Context:

```ts
const context = 
{	customer: { firstName: 'Juan', lastName: 'Lopez', birthday: '1975-03-20T23:45:11' }
,	data: '{"b":1}'
}
```

| Example         												| Result 																																				|
|-----------------------------------------|-------------------------------------------------------------------------------|
|toString(month(customer.birthday))				|'3'																																						|
|toNumber("3.141516")											|3.141516																																				|
|dateToString(datetime(customer.birthday))|'1975-03-20T22:45:11.000Z'																											|
|keys(customer)														|['firstName','lastName','birthday']																						|
|values(customer)													|['Juan','Lopez','1975-03-20T23:45:11']																					|
|entries(customer)												|[["firstName","Juan"],["lastName","Lopez"],["birthday","1975-03-20T23:45:11"]]	|
|fromEntries(entries(customer))						|{"firstName":"Juan","lastName":"Lopez","birthday":"1975-03-20T23:45:11"}				|
|stringify(customer)											|'{"firstName":"Juan","lastName":"Lopez","birthday":"1975-03-20T23:45:11"}'			|
|parse(data).b														|1																																							|

## Definition

### toString

- description: convert to string
- deterministic: true
- return: string
- params:
	- value: any

### toNumber

- description: convert to number
- deterministic: true
- return: number
- params:
	- value: string

### dateToString

- description: Convert date to string with ISO 8601 format
- deterministic: true
- return: string
- params:
	- value: Date

### keys

- description: Convert all keys of an object to an array
- deterministic: true
- return: any[]
- params:
	- obj: any

### values

- description: Extract the values of an object into an array
- deterministic: true
- return: any[]
- params:
	- obj: any

### entries

- description: Extract the keys and values of an object into an array
- deterministic: true
- return: any[]
- params:
	- obj: any

### fromEntries

- description: Convert a generated array with entries into an object
- deterministic: true
- return: any
- params:
	- array: any[]

### stringify

- description: Convert a JavaScript object or value to a JSON text string.
- deterministic: true
- return: string
- params:
	- value: any

### parse

- description: Parses a text string as JSON, optionally transforming the value produced by the parse.
- deterministic: true
- return: any
- params:
	- value: string
