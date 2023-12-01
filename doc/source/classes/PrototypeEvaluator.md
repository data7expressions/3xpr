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

[src/lib/operand/domain/entities.ts:35](https://github.com/FlavioLionelRita/3xpr/blob/aba9c36/src/lib/operand/domain/entities.ts#L35)

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

[src/lib/operand/domain/entities.ts:36](https://github.com/FlavioLionelRita/3xpr/blob/aba9c36/src/lib/operand/domain/entities.ts#L36)

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

[src/lib/operand/domain/entities.ts:37](https://github.com/FlavioLionelRita/3xpr/blob/aba9c36/src/lib/operand/domain/entities.ts#L37)
