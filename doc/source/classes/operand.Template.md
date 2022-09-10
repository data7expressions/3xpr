[Expressions](../README.md) / [operand](../modules/operand.md) / Template

# Class: Template

[operand](../modules/operand.md).Template

## Hierarchy

- [`Operand`](operand.Operand.md)

  ↳ **`Template`**

## Implements

- [`IOperandData`](../interfaces/operand.IOperandData.md)

## Table of contents

### Constructors

- [constructor](operand.Template.md#constructor)

### Properties

- [children](operand.Template.md#children)
- [data](operand.Template.md#data)
- [id](operand.Template.md#id)
- [index](operand.Template.md#index)
- [level](operand.Template.md#level)
- [name](operand.Template.md#name)
- [type](operand.Template.md#type)

### Methods

- [clone](operand.Template.md#clone)
- [eval](operand.Template.md#eval)
- [set](operand.Template.md#set)

## Constructors

### constructor

• **new Template**(`name`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `type` | `string` | `'any'` |

#### Overrides

[Operand](operand.Operand.md).[constructor](operand.Operand.md#constructor)

#### Defined in

[operand/operands.ts:90](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L90)

## Properties

### children

• **children**: [`Operand`](operand.Operand.md)[]

#### Inherited from

[Operand](operand.Operand.md).[children](operand.Operand.md#children)

#### Defined in

[operand/operands.ts:13](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L13)

___

### data

• `Optional` **data**: [`Data`](model.Data.md)

#### Implementation of

[IOperandData](../interfaces/operand.IOperandData.md).[data](../interfaces/operand.IOperandData.md#data)

#### Defined in

[operand/operands.ts:89](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L89)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[Operand](operand.Operand.md).[id](operand.Operand.md#id)

#### Defined in

[operand/operands.ts:9](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L9)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[Operand](operand.Operand.md).[index](operand.Operand.md#index)

#### Defined in

[operand/operands.ts:11](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L11)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[Operand](operand.Operand.md).[level](operand.Operand.md#level)

#### Defined in

[operand/operands.ts:12](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L12)

___

### name

• **name**: `string`

#### Inherited from

[Operand](operand.Operand.md).[name](operand.Operand.md#name)

#### Defined in

[operand/operands.ts:7](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L7)

___

### type

• **type**: `string`

#### Inherited from

[Operand](operand.Operand.md).[type](operand.Operand.md#type)

#### Defined in

[operand/operands.ts:8](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L8)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

[Operand](operand.Operand.md).[clone](operand.Operand.md#clone)

#### Defined in

[operand/operands.ts:24](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L24)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

[Operand](operand.Operand.md).[eval](operand.Operand.md#eval)

#### Defined in

[operand/operands.ts:94](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L94)

___

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Inherited from

[Operand](operand.Operand.md).[set](operand.Operand.md#set)

#### Defined in

[operand/operands.ts:39](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L39)
