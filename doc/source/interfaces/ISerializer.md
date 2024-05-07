[Expressions](../README.md) / ISerializer

# Interface: ISerializer\<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

- [clone](ISerializer.md#clone)
- [deserialize](ISerializer.md#deserialize)
- [serialize](ISerializer.md#serialize)

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

[src/lib/shared/domain/base.ts:4](https://github.com/data7expressions/3xpr/blob/bc0cfccce8742d24fc7e8aa4c9e318845fb27c3b/src/lib/shared/domain/base.ts#L4)

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

[src/lib/shared/domain/base.ts:3](https://github.com/data7expressions/3xpr/blob/bc0cfccce8742d24fc7e8aa4c9e318845fb27c3b/src/lib/shared/domain/base.ts#L3)

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

[src/lib/shared/domain/base.ts:2](https://github.com/data7expressions/3xpr/blob/bc0cfccce8742d24fc7e8aa4c9e318845fb27c3b/src/lib/shared/domain/base.ts#L2)
