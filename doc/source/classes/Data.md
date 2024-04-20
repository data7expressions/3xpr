[Expressions](../README.md) / Data

# Class: Data

## Table of contents

### Constructors

- [constructor](Data.md#constructor)

### Properties

- [data](Data.md#data)
- [parent](Data.md#parent)

### Methods

- [contains](Data.md#contains)
- [get](Data.md#get)
- [getData](Data.md#getdata)
- [init](Data.md#init)
- [newData](Data.md#newdata)
- [set](Data.md#set)

## Constructors

### constructor

• **new Data**(`data?`, `parent?`): [`Data`](Data.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `parent?` | [`Data`](Data.md) |

#### Returns

[`Data`](Data.md)

#### Defined in

[src/lib/shared/domain/context.ts:6](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/shared/domain/context.ts#L6)

## Properties

### data

• **data**: `any` = `{}`

#### Defined in

[src/lib/shared/domain/context.ts:6](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/shared/domain/context.ts#L6)

___

### parent

• `Optional` **parent**: [`Data`](Data.md)

#### Defined in

[src/lib/shared/domain/context.ts:6](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/shared/domain/context.ts#L6)

## Methods

### contains

▸ **contains**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/lib/shared/domain/context.ts:18](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/shared/domain/context.ts#L18)

___

### get

▸ **get**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[src/lib/shared/domain/context.ts:28](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/shared/domain/context.ts#L28)

___

### getData

▸ **getData**(`variable`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `variable` | `string` |

#### Returns

`any`

#### Defined in

[src/lib/shared/domain/context.ts:12](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/shared/domain/context.ts#L12)

___

### init

▸ **init**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/shared/domain/context.ts:40](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/shared/domain/context.ts#L40)

___

### newData

▸ **newData**(): [`Data`](Data.md)

#### Returns

[`Data`](Data.md)

#### Defined in

[src/lib/shared/domain/context.ts:8](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/shared/domain/context.ts#L8)

___

### set

▸ **set**(`name`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`boolean`

#### Defined in

[src/lib/shared/domain/context.ts:34](https://github.com/data7expressions/3xpr/blob/8079ebf4d334625389cc55450995826c919de4a9/src/lib/shared/domain/context.ts#L34)
