[Expressions](../README.md) / [operand](../modules/operand.md) / KeyValue

# Class: KeyValue

[operand](../modules/operand.md).KeyValue

## Hierarchy

- [`Operand`](model.Operand.md)

  ↳ **`KeyValue`**

## Table of contents

### Constructors

- [constructor](operand.KeyValue.md#constructor)

### Properties

- [children](operand.KeyValue.md#children)
- [id](operand.KeyValue.md#id)
- [index](operand.KeyValue.md#index)
- [level](operand.KeyValue.md#level)
- [name](operand.KeyValue.md#name)
- [property](operand.KeyValue.md#property)
- [type](operand.KeyValue.md#type)

### Methods

- [eval](operand.KeyValue.md#eval)

## Constructors

### constructor

• **new KeyValue**(`name`, `children?`, `property`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](model.Operand.md)[] | `[]` |
| `property` | `string` | `undefined` |
| `type?` | [`Type`](../modules/model.md#type) | `undefined` |

#### Overrides

[Operand](model.Operand.md).[constructor](model.Operand.md#constructor)

#### Defined in

[operand/operands.ts:76](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/operands.ts#L76)

## Properties

### children

• **children**: [`Operand`](model.Operand.md)[]

#### Inherited from

[Operand](model.Operand.md).[children](model.Operand.md#children)

#### Defined in

[model/operands.ts:26](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L26)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[Operand](model.Operand.md).[id](model.Operand.md#id)

#### Defined in

[model/operands.ts:23](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L23)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[Operand](model.Operand.md).[index](model.Operand.md#index)

#### Defined in

[model/operands.ts:24](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L24)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[Operand](model.Operand.md).[level](model.Operand.md#level)

#### Defined in

[model/operands.ts:25](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L25)

___

### name

• **name**: `string`

#### Inherited from

[Operand](model.Operand.md).[name](model.Operand.md#name)

#### Defined in

[model/operands.ts:21](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L21)

___

### property

• `Optional` **property**: `string`

#### Defined in

[operand/operands.ts:75](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/operands.ts#L75)

___

### type

• `Optional` **type**: [`Type`](../modules/model.md#type)

#### Inherited from

[Operand](model.Operand.md).[type](model.Operand.md#type)

#### Defined in

[model/operands.ts:22](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L22)

## Methods

### eval

▸ **eval**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](model.Context.md) |

#### Returns

`any`

#### Overrides

[Operand](model.Operand.md).[eval](model.Operand.md#eval)

#### Defined in

[operand/operands.ts:81](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/operands.ts#L81)
