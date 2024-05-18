You can extend the library by adding enums, constants, formats, operators, and functions.
To do this, use the following functions:

- **AddConstant**: Adds a constant to the library.
- **AddEnum**: Adds an enumeration to the library.
- **AddFormat**: Adds a format to the library.
- **AddOperator**: Adds an operator to the library.
- **AddFunction**: Adds a function to the library.

## Examples

### Enums

This example extends the library with two enumerations, ColorConversion and Color.

```typescript
import { expressions as exp } from '3xpr'

exp.addEnum('ColorConversion', 
{ BGR2GRAY: 6, 
	BGR2HSV: 40, 
	BGR2RGB: 4, 
	GRAY2BGR: 8, 
	HSV2BGR: 54, 
	HSV2RGB: 55, 
	RGB2GRAY: 7, 
	RGB2HSV: 41 
})
exp.addEnum('Color', { RED: 1, GREEN: 2, BLUE: 3 })
console.log(exp.eval('ColorConversion.GRAY2BGR'))
console.log(exp.eval('Color.GREEN')))
```

- [Definition](https://github.com/data7expressions/3xpr/blob/main/doc/source/interfaces/Expressions.md#addenum)

### Functions

This is a real example of how the library is extended with custom functions.
These functions are used in the [λORM](https://www.npmjs.com/package/lambdaorm) library.

```typescript
import { IOrm } from '../application'
import { expressions as exp } from '3xpr'

export class OrmLibrary {
	// eslint-disable-next-line no-useless-constructor
constructor (private readonly orm:IOrm) {}
load () {
exp.addFunction('orm.execute(query:string,data:any,options:any):any', async (query:string, data:any, options:any) => {
		if (query !== undefined && query !== null && query.trim() !== '') {
			return await this.orm.execute(query, data, options)
		}
		return null
	}, { async: true, description: 'Execute query' })
exp.addFunction('orm.plan(query:string,options:any):any', (query:string, options:any) => {
		if (query !== undefined && query !== null && query.trim() !== '') {
			return this.orm.plan(query, options)
		}
		return null
	}, { description: 'Plan of query' })
exp.addFunction('orm.metadata(query:string):any', (query:string) => {
		if (query !== undefined && query !== null && query.trim() !== '') {
			return this.orm.metadata(query)
		}
		return null
	}, { description: 'Get metadata from query' })
exp.addFunction('orm.model(query:string):any', (query:string) => {
		if (query !== undefined && query !== null && query.trim() !== '') {
			return this.orm.model(query)
		}
		return null
	}, { description: 'Get model from query' })
exp.addFunction('orm.parameters(query:string):any', (query:string) => {
		if (query !== undefined && query !== null && query.trim() !== '') {
			return this.orm.parameters(query)
		}
		return null
	}, { description: 'Get parameters from query' })
exp.addFunction('orm.constraints(query:string):any', (query:string) => {
		if (query !== undefined && query !== null && query.trim() !== '') {
			return this.orm.constraints(query)
		}
		return null
	}, { description: 'Get constraints from query' })
}
}
```

- [Definition](https://github.com/data7expressions/3xpr/blob/main/doc/source/interfaces/Expressions.md#addfunction)

### Asynchronous functions

Asynchronous functions can be defined by adding the async property to the function definition.
These functions are used in the [λORM Service](https://github.com/lambda-orm/lambdaorm-svc).

```typescript
import { Queue } from '../../application/ports'
import { IOrm } from 'lambdaorm'
import { expressions as exp } from '3xpr'

export class QueueLibrary {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly orm:IOrm, private readonly queue:Queue) {}

	public async load (): Promise<void> {
		exp.addFunction('queue.send(topic:string,messages:any[]):void', async (topic:string, messages:any[]) => {
			return this.queue.send(topic, messages)
			}, 
			{ async: true, description: 'Send messages to a queue' }
		)
	}
}
```

In the case that asynchronous functions are included in the library and are in the expression to be evaluated, they must be evaluated with the evalAsync function.

```typescript
await exp.evalAsync(expression)
```
