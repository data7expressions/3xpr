[Expressions](../README.md) / [model](../modules/model.md) / ISerializer

# Interface: ISerializer<T\>

[model](../modules/model.md).ISerializer

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`OperandSerializer`](../classes/operand.OperandSerializer.md)

## Table of contents

### Methods

- [clone](model.ISerializer.md#clone)
- [deserialize](model.ISerializer.md#deserialize)
- [serialize](model.ISerializer.md#serialize)

## Methods

### clone

▸ **clone**(`value`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`T`

#### Defined in

[model/managers.ts:5](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/managers.ts#L5)

___

### deserialize

▸ **deserialize**(`value`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`T`

#### Defined in

[model/managers.ts:4](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/managers.ts#L4)

___

### serialize

▸ **serialize**(`value`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`any`

#### Defined in

[model/managers.ts:3](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/managers.ts#L3)
