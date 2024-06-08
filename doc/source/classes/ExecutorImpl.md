[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / ExecutorImpl

# Class: ExecutorImpl

## Implements

- [`Executor`](../interfaces/Executor.md)

## Constructors

### new ExecutorImpl()

> **new ExecutorImpl**(`operand`): [`ExecutorImpl`](ExecutorImpl.md)

#### Parameters

• **operand**: [`OperandFacade`](../interfaces/OperandFacade.md)

#### Returns

[`ExecutorImpl`](ExecutorImpl.md)

#### Source

[src/lib/expression/application/useCases/executor.ts:7](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/useCases/executor.ts#L7)

## Methods

### eval()

> **eval**(`expression`, `context`): `any`

#### Parameters

• **expression**: `string`

• **context**: [`Context`](Context.md)

#### Returns

`any`

#### Implementation of

[`Executor`](../interfaces/Executor.md).[`eval`](../interfaces/Executor.md#eval)

#### Source

[src/lib/expression/application/useCases/executor.ts:9](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/useCases/executor.ts#L9)

***

### evalAsync()

> **evalAsync**(`expression`, `context`): `Promise`\<`any`\>

#### Parameters

• **expression**: `string`

• **context**: [`Context`](Context.md)

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`Executor`](../interfaces/Executor.md).[`evalAsync`](../interfaces/Executor.md#evalasync)

#### Source

[src/lib/expression/application/useCases/executor.ts:14](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/useCases/executor.ts#L14)

***

### execute()

> **execute**(`expression`, `context`): `Promise`\<`any`\>

#### Parameters

• **expression**: `string`

• **context**: [`Context`](Context.md)

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`Executor`](../interfaces/Executor.md).[`execute`](../interfaces/Executor.md#execute)

#### Source

[src/lib/expression/application/useCases/executor.ts:19](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/useCases/executor.ts#L19)
