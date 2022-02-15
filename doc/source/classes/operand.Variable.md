[Expressions](../README.md) / [operand](../modules/operand.md) / Variable

# Class: Variable

[operand](../modules/operand.md).Variable

## Hierarchy

- [`Operand`](operand.Operand.md)

  ↳ **`Variable`**

## Table of contents

### Constructors

- [constructor](operand.Variable.md#constructor)

### Properties

- [children](operand.Variable.md#children)
- [data](operand.Variable.md#data)
- [id](operand.Variable.md#id)
- [index](operand.Variable.md#index)
- [level](operand.Variable.md#level)
- [name](operand.Variable.md#name)
- [number](operand.Variable.md#number)
- [parent](operand.Variable.md#parent)
- [type](operand.Variable.md#type)

### Methods

- [clone](operand.Variable.md#clone)
- [eval](operand.Variable.md#eval)
- [set](operand.Variable.md#set)

## Constructors

### constructor

• **new Variable**(`name`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `type` | `string` | `'any'` |

#### Overrides

[Operand](operand.Operand.md).[constructor](operand.Operand.md#constructor)

#### Defined in

[operand/operands.ts:63](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L63)

## Properties

### children

• **children**: [`Operand`](operand.Operand.md)[]

#### Inherited from

[Operand](operand.Operand.md).[children](operand.Operand.md#children)

#### Defined in

[operand/operands.ts:13](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L13)

___

### data

• `Optional` **data**: [`Data`](model.Data.md)

#### Defined in

[operand/operands.ts:61](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L61)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[Operand](operand.Operand.md).[id](operand.Operand.md#id)

#### Defined in

[operand/operands.ts:9](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L9)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[Operand](operand.Operand.md).[index](operand.Operand.md#index)

#### Defined in

[operand/operands.ts:11](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L11)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[Operand](operand.Operand.md).[level](operand.Operand.md#level)

#### Defined in

[operand/operands.ts:12](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L12)

___

### name

• **name**: `string`

#### Inherited from

[Operand](operand.Operand.md).[name](operand.Operand.md#name)

#### Defined in

[operand/operands.ts:7](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L7)

___

### number

• `Optional` **number**: `number`

#### Defined in

[operand/operands.ts:62](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L62)

___

### parent

• `Optional` **parent**: [`Operand`](operand.Operand.md)

#### Inherited from

[Operand](operand.Operand.md).[parent](operand.Operand.md#parent)

#### Defined in

[operand/operands.ts:10](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L10)

___

### type

• **type**: `string`

#### Inherited from

[Operand](operand.Operand.md).[type](operand.Operand.md#type)

#### Defined in

[operand/operands.ts:8](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L8)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

[Operand](operand.Operand.md).[clone](operand.Operand.md#clone)

#### Defined in

[operand/operands.ts:24](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L24)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

[Operand](operand.Operand.md).[eval](operand.Operand.md#eval)

#### Defined in

[operand/operands.ts:73](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L73)

___

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Overrides

[Operand](operand.Operand.md).[set](operand.Operand.md#set)

#### Defined in

[operand/operands.ts:69](https://github.com/FlavioLionelRita/js-expressions/blob/94090c2/src/lib/operand/operands.ts#L69)
