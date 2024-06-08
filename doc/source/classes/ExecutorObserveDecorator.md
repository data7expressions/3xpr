[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / ExecutorObserveDecorator

# Class: ExecutorObserveDecorator

## Implements

- [`Executor`](../interfaces/Executor.md)
- [`ExpressionListener`](../interfaces/ExpressionListener.md)

## Constructors

### new ExecutorObserveDecorator()

> **new ExecutorObserveDecorator**(`executor`): [`ExecutorObserveDecorator`](ExecutorObserveDecorator.md)

#### Parameters

• **executor**: [`Executor`](../interfaces/Executor.md)

#### Returns

[`ExecutorObserveDecorator`](ExecutorObserveDecorator.md)

#### Source

[src/lib/expression/application/useCases/executorObserveDecorator.ts:8](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/useCases/executorObserveDecorator.ts#L8)

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

[src/lib/expression/application/useCases/executorObserveDecorator.ts:10](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/useCases/executorObserveDecorator.ts#L10)

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

[src/lib/expression/application/useCases/executorObserveDecorator.ts:22](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/useCases/executorObserveDecorator.ts#L22)

***

### execute()

> **execute**(`task`, `context`): `Promise`\<`any`\>

#### Parameters

• **task**: `string`

• **context**: [`Context`](Context.md)

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`Executor`](../interfaces/Executor.md).[`execute`](../interfaces/Executor.md#execute)

#### Source

[src/lib/expression/application/useCases/executorObserveDecorator.ts:34](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/useCases/executorObserveDecorator.ts#L34)

***

### subscribe()

> **subscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](ActionObserver.md)

#### Returns

`void`

#### Implementation of

[`ExpressionListener`](../interfaces/ExpressionListener.md).[`subscribe`](../interfaces/ExpressionListener.md#subscribe)

#### Source

[src/lib/expression/application/useCases/executorObserveDecorator.ts:47](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/useCases/executorObserveDecorator.ts#L47)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](ActionObserver.md)

#### Returns

`void`

#### Implementation of

[`ExpressionListener`](../interfaces/ExpressionListener.md).[`unsubscribe`](../interfaces/ExpressionListener.md#unsubscribe)

#### Source

[src/lib/expression/application/useCases/executorObserveDecorator.ts:51](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/useCases/executorObserveDecorator.ts#L51)
