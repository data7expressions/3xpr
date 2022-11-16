[Expressions](../README.md) / [operand](../modules/operand.md) / Constant

# Class: Constant

[operand](../modules/operand.md).Constant

## Hierarchy

- [`Operand`](model.Operand.md)

  ↳ **`Constant`**

## Table of contents

### Constructors

- [constructor](operand.Constant.md#constructor)

### Properties

- [children](operand.Constant.md#children)
- [id](operand.Constant.md#id)
- [index](operand.Constant.md#index)
- [level](operand.Constant.md#level)
- [name](operand.Constant.md#name)
- [type](operand.Constant.md#type)

### Methods

- [eval](operand.Constant.md#eval)

## Constructors

### constructor

• **new Constant**(`name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Overrides

[Operand](model.Operand.md).[constructor](model.Operand.md#constructor)

#### Defined in

[operand/operands.ts:6](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/operands.ts#L6)

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

### type

• `Optional` **type**: [`Type`](../modules/model.md#type)

#### Inherited from

[Operand](model.Operand.md).[type](model.Operand.md#type)

#### Defined in

[model/operands.ts:22](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L22)

## Methods

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

[Operand](model.Operand.md).[eval](model.Operand.md#eval)

#### Defined in

[operand/operands.ts:10](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/operands.ts#L10)
