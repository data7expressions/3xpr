[Expressions](../README.md) / ExpressionListener

# Interface: ExpressionListener

## Hierarchy

- **`ExpressionListener`**

  ↳ [`Expressions`](Expressions.md)

## Implemented by

- [`ExecutorObserveDecorator`](../classes/ExecutorObserveDecorator.md)

## Table of contents

### Methods

- [subscribe](ExpressionListener.md#subscribe)
- [unsubscribe](ExpressionListener.md#unsubscribe)

## Methods

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](../classes/ActionObserver.md) |

#### Returns

`void`

#### Defined in

[src/lib/expression/domain/expressions.ts:12](https://github.com/FlavioLionelRita/3xpr/blob/6694e5e/src/lib/expression/domain/expressions.ts#L12)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](../classes/ActionObserver.md) |

#### Returns

`void`

#### Defined in

[src/lib/expression/domain/expressions.ts:13](https://github.com/FlavioLionelRita/3xpr/blob/6694e5e/src/lib/expression/domain/expressions.ts#L13)
