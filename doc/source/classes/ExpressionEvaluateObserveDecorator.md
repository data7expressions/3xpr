[Expressions](../README.md) / ExpressionEvaluateObserveDecorator

# Class: ExpressionEvaluateObserveDecorator

## Implements

- [`ExpressionEvaluate`](../interfaces/ExpressionEvaluate.md)
- [`ExpressionListener`](../interfaces/ExpressionListener.md)

## Table of contents

### Constructors

- [constructor](ExpressionEvaluateObserveDecorator.md#constructor)

### Methods

- [eval](ExpressionEvaluateObserveDecorator.md#eval)
- [evalAsync](ExpressionEvaluateObserveDecorator.md#evalasync)
- [subscribe](ExpressionEvaluateObserveDecorator.md#subscribe)
- [unsubscribe](ExpressionEvaluateObserveDecorator.md#unsubscribe)

## Constructors

### constructor

• **new ExpressionEvaluateObserveDecorator**(`evaluator`): [`ExpressionEvaluateObserveDecorator`](ExpressionEvaluateObserveDecorator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluator` | [`ExpressionEvaluate`](../interfaces/ExpressionEvaluate.md) |

#### Returns

[`ExpressionEvaluateObserveDecorator`](ExpressionEvaluateObserveDecorator.md)

#### Defined in

[src/lib/expression/application/useCases/evaluateObserveDecorator.ts:8](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/expression/application/useCases/evaluateObserveDecorator.ts#L8)

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

[ExpressionEvaluate](../interfaces/ExpressionEvaluate.md).[eval](../interfaces/ExpressionEvaluate.md#eval)

#### Defined in

[src/lib/expression/application/useCases/evaluateObserveDecorator.ts:10](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/expression/application/useCases/evaluateObserveDecorator.ts#L10)

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

[ExpressionEvaluate](../interfaces/ExpressionEvaluate.md).[evalAsync](../interfaces/ExpressionEvaluate.md#evalasync)

#### Defined in

[src/lib/expression/application/useCases/evaluateObserveDecorator.ts:22](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/expression/application/useCases/evaluateObserveDecorator.ts#L22)

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

[src/lib/expression/application/useCases/evaluateObserveDecorator.ts:35](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/expression/application/useCases/evaluateObserveDecorator.ts#L35)

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

[src/lib/expression/application/useCases/evaluateObserveDecorator.ts:39](https://github.com/FlavioLionelRita/3xpr/blob/6ae12c6/src/lib/expression/application/useCases/evaluateObserveDecorator.ts#L39)
