[Expressions](../README.md) / ExecutorObserveDecorator

# Class: ExecutorObserveDecorator

## Implements

- [`Executor`](../interfaces/Executor.md)
- [`ExpressionListener`](../interfaces/ExpressionListener.md)

## Table of contents

### Constructors

- [constructor](ExecutorObserveDecorator.md#constructor)

### Methods

- [eval](ExecutorObserveDecorator.md#eval)
- [evalAsync](ExecutorObserveDecorator.md#evalasync)
- [execute](ExecutorObserveDecorator.md#execute)
- [subscribe](ExecutorObserveDecorator.md#subscribe)
- [unsubscribe](ExecutorObserveDecorator.md#unsubscribe)

## Constructors

### constructor

• **new ExecutorObserveDecorator**(`executor`): [`ExecutorObserveDecorator`](ExecutorObserveDecorator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `executor` | [`Executor`](../interfaces/Executor.md) |

#### Returns

[`ExecutorObserveDecorator`](ExecutorObserveDecorator.md)

#### Defined in

[src/lib/expression/application/useCases/executorObserveDecorator.ts:8](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/expression/application/useCases/executorObserveDecorator.ts#L8)

## Methods

### eval

▸ **eval**(`expression`, `context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `context` | [`Context`](Context.md) |

#### Returns

`any`

#### Implementation of

[Executor](../interfaces/Executor.md).[eval](../interfaces/Executor.md#eval)

#### Defined in

[src/lib/expression/application/useCases/executorObserveDecorator.ts:10](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/expression/application/useCases/executorObserveDecorator.ts#L10)

___

### evalAsync

▸ **evalAsync**(`expression`, `context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `context` | [`Context`](Context.md) |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[Executor](../interfaces/Executor.md).[evalAsync](../interfaces/Executor.md#evalasync)

#### Defined in

[src/lib/expression/application/useCases/executorObserveDecorator.ts:22](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/expression/application/useCases/executorObserveDecorator.ts#L22)

___

### execute

▸ **execute**(`task`, `context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | `string` |
| `context` | [`Context`](Context.md) |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[Executor](../interfaces/Executor.md).[execute](../interfaces/Executor.md#execute)

#### Defined in

[src/lib/expression/application/useCases/executorObserveDecorator.ts:34](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/expression/application/useCases/executorObserveDecorator.ts#L34)

___

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](ActionObserver.md) |

#### Returns

`void`

#### Implementation of

[ExpressionListener](../interfaces/ExpressionListener.md).[subscribe](../interfaces/ExpressionListener.md#subscribe)

#### Defined in

[src/lib/expression/application/useCases/executorObserveDecorator.ts:47](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/expression/application/useCases/executorObserveDecorator.ts#L47)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](ActionObserver.md) |

#### Returns

`void`

#### Implementation of

[ExpressionListener](../interfaces/ExpressionListener.md).[unsubscribe](../interfaces/ExpressionListener.md#unsubscribe)

#### Defined in

[src/lib/expression/application/useCases/executorObserveDecorator.ts:51](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/expression/application/useCases/executorObserveDecorator.ts#L51)
