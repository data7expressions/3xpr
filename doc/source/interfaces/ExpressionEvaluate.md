[Expressions](../README.md) / ExpressionEvaluate

# Interface: ExpressionEvaluate

## Hierarchy

- **`ExpressionEvaluate`**

  ↳ [`Expressions`](Expressions.md)

## Implemented by

- [`ExpressionEvaluateImpl`](../classes/ExpressionEvaluateImpl.md)
- [`ExpressionEvaluateObserveDecorator`](../classes/ExpressionEvaluateObserveDecorator.md)

## Table of contents

### Methods

- [eval](ExpressionEvaluate.md#eval)
- [evalAsync](ExpressionEvaluate.md#evalasync)

## Methods

### eval

▸ **eval**(`expression`, `data?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |

#### Returns

`any`

#### Defined in

[src/lib/expression/domain/expressions.ts:6](https://github.com/FlavioLionelRita/3xpr/blob/aba9c36/src/lib/expression/domain/expressions.ts#L6)

___

### evalAsync

▸ **evalAsync**(`expression`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/expression/domain/expressions.ts:7](https://github.com/FlavioLionelRita/3xpr/blob/aba9c36/src/lib/expression/domain/expressions.ts#L7)
