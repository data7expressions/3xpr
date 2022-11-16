[Expressions](../README.md) / [model](../modules/model.md) / Data

# Class: Data

[model](../modules/model.md).Data

## Table of contents

### Constructors

- [constructor](model.Data.md#constructor)

### Properties

- [data](model.Data.md#data)
- [parent](model.Data.md#parent)

### Methods

- [contains](model.Data.md#contains)
- [get](model.Data.md#get)
- [getData](model.Data.md#getdata)
- [init](model.Data.md#init)
- [newData](model.Data.md#newdata)
- [set](model.Data.md#set)

## Constructors

### constructor

• **new Data**(`data?`, `parent?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data?` | `any` |
| `parent?` | [`Data`](model.Data.md) |

#### Defined in

[model/context.ts:5](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/context.ts#L5)

## Properties

### data

• **data**: `any`

#### Defined in

[model/context.ts:3](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/context.ts#L3)

___

### parent

• **parent**: `any`

#### Defined in

[model/context.ts:4](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/context.ts#L4)

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

[model/context.ts:20](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/context.ts#L20)

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

[model/context.ts:30](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/context.ts#L30)

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

[model/context.ts:14](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/context.ts#L14)

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

[model/context.ts:64](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/context.ts#L64)

___

### newData

▸ **newData**(): [`Data`](model.Data.md)

#### Returns

[`Data`](model.Data.md)

#### Defined in

[model/context.ts:10](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/context.ts#L10)

___

### set

▸ **set**(`name`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[model/context.ts:36](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/context.ts#L36)
