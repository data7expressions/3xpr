[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / OperandSerializerImpl

# Class: OperandSerializerImpl

## Implements

- [`OperandSerializer`](../interfaces/OperandSerializer.md)

## Constructors

### new OperandSerializerImpl()

> **new OperandSerializerImpl**(): [`OperandSerializerImpl`](OperandSerializerImpl.md)

#### Returns

[`OperandSerializerImpl`](OperandSerializerImpl.md)

## Methods

### clone()

> **clone**(`sentence`): [`Operand`](Operand.md)

#### Parameters

• **sentence**: [`Operand`](Operand.md)

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[`OperandSerializer`](../interfaces/OperandSerializer.md).[`clone`](../interfaces/OperandSerializer.md#clone)

#### Source

[src/lib/operand/application/services/serializer.ts:6](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/serializer.ts#L6)

***

### deserialize()

> **deserialize**(`value`): [`Operand`](Operand.md)

#### Parameters

• **value**: `string`

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[`OperandSerializer`](../interfaces/OperandSerializer.md).[`deserialize`](../interfaces/OperandSerializer.md#deserialize)

#### Source

[src/lib/operand/application/services/serializer.ts:16](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/serializer.ts#L16)

***

### serialize()

> **serialize**(`sentence`): `string`

#### Parameters

• **sentence**: [`Operand`](Operand.md)

#### Returns

`string`

#### Implementation of

[`OperandSerializer`](../interfaces/OperandSerializer.md).[`serialize`](../interfaces/OperandSerializer.md#serialize)

#### Source

[src/lib/operand/application/services/serializer.ts:12](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/serializer.ts#L12)
