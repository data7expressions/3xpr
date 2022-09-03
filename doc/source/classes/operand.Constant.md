[Expressions](../README.md) / [operand](../modules/operand.md) / Constant

# Class: Constant

[operand](../modules/operand.md).Constant

## Hierarchy

- [`Operand`](operand.Operand.md)

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

- [clone](operand.Constant.md#clone)
- [eval](operand.Constant.md#eval)
- [set](operand.Constant.md#set)

## Constructors

### constructor

• **new Constant**(`name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Overrides

[Operand](operand.Operand.md).[constructor](operand.Operand.md#constructor)

#### Defined in

[operand/operands.ts:48](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L48)

## Properties

### children

• **children**: [`Operand`](operand.Operand.md)[]

#### Inherited from

[Operand](operand.Operand.md).[children](operand.Operand.md#children)

#### Defined in

[operand/operands.ts:13](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L13)

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

[operand/operands.ts:52](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/operand/operands.ts#L52)

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
