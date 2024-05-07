[Expressions](../README.md) / IEvaluator

# Interface: IEvaluator

## Implemented by

- [`Evaluator`](../classes/Evaluator.md)
- [`PrototypeEvaluator`](../classes/PrototypeEvaluator.md)

## Table of contents

### Methods

- [eval](IEvaluator.md#eval)
- [evalAsync](IEvaluator.md#evalasync)

## Methods

### eval

▸ **eval**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](../classes/Context.md) |

#### Returns

`any`

#### Defined in

[src/lib/shared/domain/operand.ts:39](https://github.com/data7expressions/3xpr/blob/bc0cfccce8742d24fc7e8aa4c9e318845fb27c3b/src/lib/shared/domain/operand.ts#L39)

___

### evalAsync

▸ **evalAsync**(`context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](../classes/Context.md) |

#### Returns

`Promise`\<`any`\>

#### Defined in

[src/lib/shared/domain/operand.ts:40](https://github.com/data7expressions/3xpr/blob/bc0cfccce8742d24fc7e8aa4c9e318845fb27c3b/src/lib/shared/domain/operand.ts#L40)
