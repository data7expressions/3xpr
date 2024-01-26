[Expressions](../README.md) / OperandSerializer

# Interface: OperandSerializer

## Implemented by

- [`OperandSerializerImpl`](../classes/OperandSerializerImpl.md)

## Table of contents

### Methods

- [clone](OperandSerializer.md#clone)
- [deserialize](OperandSerializer.md#deserialize)
- [serialize](OperandSerializer.md#serialize)

## Methods

### clone

▸ **clone**(`sentence`): [`Operand`](../classes/Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Operand`](../classes/Operand.md) |

#### Returns

[`Operand`](../classes/Operand.md)

#### Defined in

[src/lib/operand/domain/services.ts:29](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/operand/domain/services.ts#L29)

___

### deserialize

▸ **deserialize**(`value`): [`Operand`](../classes/Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`Operand`](../classes/Operand.md)

#### Defined in

[src/lib/operand/domain/services.ts:31](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/operand/domain/services.ts#L31)

___

### serialize

▸ **serialize**(`sentence`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Operand`](../classes/Operand.md) |

#### Returns

`string`

#### Defined in

[src/lib/operand/domain/services.ts:30](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/operand/domain/services.ts#L30)
