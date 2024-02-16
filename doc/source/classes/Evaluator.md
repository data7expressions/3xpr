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

[src/lib/operand/domain/entities.ts:26](https://github.com/data7expressions/3xpr/blob/a027e32/src/lib/operand/domain/entities.ts#L26)

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

[src/lib/operand/domain/entities.ts:27](https://github.com/data7expressions/3xpr/blob/a027e32/src/lib/operand/domain/entities.ts#L27)

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

[src/lib/operand/domain/entities.ts:28](https://github.com/data7expressions/3xpr/blob/a027e32/src/lib/operand/domain/entities.ts#L28)

___

### isAsync

▸ **isAsync**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/operand/domain/entities.ts:37](https://github.com/data7expressions/3xpr/blob/a027e32/src/lib/operand/domain/entities.ts#L37)
