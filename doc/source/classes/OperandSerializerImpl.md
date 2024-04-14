[Expressions](../README.md) / OperandSerializerImpl

# Class: OperandSerializerImpl

## Implements

- [`OperandSerializer`](../interfaces/OperandSerializer.md)

## Table of contents

### Constructors

- [constructor](OperandSerializerImpl.md#constructor)

### Methods

- [clone](OperandSerializerImpl.md#clone)
- [deserialize](OperandSerializerImpl.md#deserialize)
- [serialize](OperandSerializerImpl.md#serialize)

## Constructors

### constructor

• **new OperandSerializerImpl**(): [`OperandSerializerImpl`](OperandSerializerImpl.md)

#### Returns

[`OperandSerializerImpl`](OperandSerializerImpl.md)

## Methods

### clone

▸ **clone**(`sentence`): [`Operand`](Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Operand`](Operand.md) |

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[OperandSerializer](../interfaces/OperandSerializer.md).[clone](../interfaces/OperandSerializer.md#clone)

#### Defined in

[src/lib/operand/application/services/serializer.ts:6](https://github.com/data7expressions/3xpr/blob/95c7d152921f5a8f5f272209d2eafc5adcde5f98/src/lib/operand/application/services/serializer.ts#L6)

___

### deserialize

▸ **deserialize**(`value`): [`Operand`](Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[OperandSerializer](../interfaces/OperandSerializer.md).[deserialize](../interfaces/OperandSerializer.md#deserialize)

#### Defined in

[src/lib/operand/application/services/serializer.ts:16](https://github.com/data7expressions/3xpr/blob/95c7d152921f5a8f5f272209d2eafc5adcde5f98/src/lib/operand/application/services/serializer.ts#L16)

___

### serialize

▸ **serialize**(`sentence`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sentence` | [`Operand`](Operand.md) |

#### Returns

`string`

#### Implementation of

[OperandSerializer](../interfaces/OperandSerializer.md).[serialize](../interfaces/OperandSerializer.md#serialize)

#### Defined in

[src/lib/operand/application/services/serializer.ts:12](https://github.com/data7expressions/3xpr/blob/95c7d152921f5a8f5f272209d2eafc5adcde5f98/src/lib/operand/application/services/serializer.ts#L12)
