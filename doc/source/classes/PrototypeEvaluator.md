[Expressions](../README.md) / PrototypeEvaluator

# Class: PrototypeEvaluator

## Implements

- [`IEvaluator`](../interfaces/IEvaluator.md)

## Table of contents

### Constructors

- [constructor](PrototypeEvaluator.md#constructor)

### Methods

- [clone](PrototypeEvaluator.md#clone)
- [eval](PrototypeEvaluator.md#eval)
- [evalAsync](PrototypeEvaluator.md#evalasync)

## Constructors

### constructor

• **new PrototypeEvaluator**(`operand?`): [`PrototypeEvaluator`](PrototypeEvaluator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand?` | [`Operand`](Operand.md) |

#### Returns

[`PrototypeEvaluator`](PrototypeEvaluator.md)

#### Defined in

[src/lib/operand/domain/entities.ts:52](https://github.com/data7expressions/3xpr/blob/a027e32/src/lib/operand/domain/entities.ts#L52)

## Methods

### clone

▸ **clone**(`operand`): [`IEvaluator`](../interfaces/IEvaluator.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](Operand.md) |

#### Returns

[`IEvaluator`](../interfaces/IEvaluator.md)

#### Defined in

[src/lib/operand/domain/entities.ts:53](https://github.com/data7expressions/3xpr/blob/a027e32/src/lib/operand/domain/entities.ts#L53)

___

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

[src/lib/operand/domain/entities.ts:54](https://github.com/data7expressions/3xpr/blob/a027e32/src/lib/operand/domain/entities.ts#L54)

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

[src/lib/operand/domain/entities.ts:55](https://github.com/data7expressions/3xpr/blob/a027e32/src/lib/operand/domain/entities.ts#L55)
