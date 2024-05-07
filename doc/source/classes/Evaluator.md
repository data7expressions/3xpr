[Expressions](../README.md) / Evaluator

# Class: Evaluator

## Implements

- [`IEvaluator`](../interfaces/IEvaluator.md)

## Table of contents

### Constructors

- [constructor](Evaluator.md#constructor)

### Methods

- [eval](Evaluator.md#eval)
- [evalAsync](Evaluator.md#evalasync)
- [isAsync](Evaluator.md#isasync)

## Constructors

### constructor

• **new Evaluator**(`operand`): [`Evaluator`](Evaluator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](Operand.md) |

#### Returns

[`Evaluator`](Evaluator.md)

#### Defined in

[src/lib/operand/domain/entities.ts:28](https://github.com/data7expressions/3xpr/blob/bc0cfccce8742d24fc7e8aa4c9e318845fb27c3b/src/lib/operand/domain/entities.ts#L28)

## Methods

### eval

▸ **eval**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](Context.md) |

#### Returns

`any`

#### Implementation of

[IEvaluator](../interfaces/IEvaluator.md).[eval](../interfaces/IEvaluator.md#eval)

#### Defined in

[src/lib/operand/domain/entities.ts:29](https://github.com/data7expressions/3xpr/blob/bc0cfccce8742d24fc7e8aa4c9e318845fb27c3b/src/lib/operand/domain/entities.ts#L29)

___

### evalAsync

▸ **evalAsync**(`context`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](Context.md) |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[IEvaluator](../interfaces/IEvaluator.md).[evalAsync](../interfaces/IEvaluator.md#evalasync)

#### Defined in

[src/lib/operand/domain/entities.ts:30](https://github.com/data7expressions/3xpr/blob/bc0cfccce8742d24fc7e8aa4c9e318845fb27c3b/src/lib/operand/domain/entities.ts#L30)

___

### isAsync

▸ **isAsync**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/operand/domain/entities.ts:39](https://github.com/data7expressions/3xpr/blob/bc0cfccce8742d24fc7e8aa4c9e318845fb27c3b/src/lib/operand/domain/entities.ts#L39)
