[Expressions](../README.md) / [operand](../modules/operand.md) / OperandSerializer

# Class: OperandSerializer

[operand](../modules/operand.md).OperandSerializer

## Implements

- [`ISerializer`](../interfaces/model.ISerializer.md)<[`Operand`](model.Operand.md)\>

## Table of contents

### Constructors

- [constructor](operand.OperandSerializer.md#constructor)

### Methods

- [clone](operand.OperandSerializer.md#clone)
- [deserialize](operand.OperandSerializer.md#deserialize)
- [serialize](operand.OperandSerializer.md#serialize)

## Constructors

### constructor

• **new OperandSerializer**(`expressionConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expressionConfig` | [`ExpressionConfig`](parser.ExpressionConfig.md) |

#### Defined in

[operand/serializer.ts:13](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/operand/serializer.ts#L13)

## Methods

### clone

▸ **clone**(`value`): [`Operand`](model.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Operand`](model.Operand.md) |

#### Returns

[`Operand`](model.Operand.md)

#### Implementation of

[ISerializer](../interfaces/model.ISerializer.md).[clone](../interfaces/model.ISerializer.md#clone)

#### Defined in

[operand/serializer.ts:17](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/operand/serializer.ts#L17)

___

### deserialize

▸ **deserialize**(`value`): [`Operand`](model.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

[`Operand`](model.Operand.md)

#### Implementation of

[ISerializer](../interfaces/model.ISerializer.md).[deserialize](../interfaces/model.ISerializer.md#deserialize)

#### Defined in

[operand/serializer.ts:39](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/operand/serializer.ts#L39)

___

### serialize

▸ **serialize**(`operand`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](model.Operand.md) |

#### Returns

`string`

#### Implementation of

[ISerializer](../interfaces/model.ISerializer.md).[serialize](../interfaces/model.ISerializer.md#serialize)

#### Defined in

[operand/serializer.ts:21](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/operand/serializer.ts#L21)
