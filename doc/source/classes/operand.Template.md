[Expressions](../README.md) / [operand](../modules/operand.md) / Template

# Class: Template

[operand](../modules/operand.md).Template

## Hierarchy

- [`Operand`](model.Operand.md)

  ↳ **`Template`**

## Table of contents

### Constructors

- [constructor](operand.Template.md#constructor)

### Properties

- [children](operand.Template.md#children)
- [id](operand.Template.md#id)
- [index](operand.Template.md#index)
- [level](operand.Template.md#level)
- [name](operand.Template.md#name)
- [type](operand.Template.md#type)

### Methods

- [eval](operand.Template.md#eval)

## Constructors

### constructor

• **new Template**(`name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Overrides

[Operand](model.Operand.md).[constructor](model.Operand.md#constructor)

#### Defined in

[operand/operands.ts:46](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/operands.ts#L46)

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

[operand/operands.ts:50](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/operands.ts#L50)
