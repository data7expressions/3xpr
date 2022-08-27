[Expressions](../README.md) / [operand](../modules/operand.md) / Block

# Class: Block

[operand](../modules/operand.md).Block

## Hierarchy

- [`Operand`](operand.Operand.md)

  ↳ **`Block`**

## Table of contents

### Constructors

- [constructor](operand.Block.md#constructor)

### Properties

- [children](operand.Block.md#children)
- [id](operand.Block.md#id)
- [index](operand.Block.md#index)
- [level](operand.Block.md#level)
- [name](operand.Block.md#name)
- [parent](operand.Block.md#parent)
- [type](operand.Block.md#type)

### Methods

- [clone](operand.Block.md#clone)
- [eval](operand.Block.md#eval)
- [set](operand.Block.md#set)

## Constructors

### constructor

• **new Block**(`name`, `children?`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](operand.Operand.md)[] | `[]` |
| `type` | `string` | `'any'` |

#### Inherited from

[Operand](operand.Operand.md).[constructor](operand.Operand.md#constructor)

#### Defined in

[operand/operands.ts:14](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operands.ts#L14)

## Properties

### children

• **children**: [`Operand`](operand.Operand.md)[]

#### Inherited from

[Operand](operand.Operand.md).[children](operand.Operand.md#children)

#### Defined in

[operand/operands.ts:13](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operands.ts#L13)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[Operand](operand.Operand.md).[id](operand.Operand.md#id)

#### Defined in

[operand/operands.ts:9](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operands.ts#L9)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[Operand](operand.Operand.md).[index](operand.Operand.md#index)

#### Defined in

[operand/operands.ts:11](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operands.ts#L11)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[Operand](operand.Operand.md).[level](operand.Operand.md#level)

#### Defined in

[operand/operands.ts:12](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operands.ts#L12)

___

### name

• **name**: `string`

#### Inherited from

[Operand](operand.Operand.md).[name](operand.Operand.md#name)

#### Defined in

[operand/operands.ts:7](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operands.ts#L7)

___

### parent

• `Optional` **parent**: [`Operand`](operand.Operand.md)

#### Inherited from

[Operand](operand.Operand.md).[parent](operand.Operand.md#parent)

#### Defined in

[operand/operands.ts:10](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operands.ts#L10)

___

### type

• **type**: `string`

#### Inherited from

[Operand](operand.Operand.md).[type](operand.Operand.md#type)

#### Defined in

[operand/operands.ts:8](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operands.ts#L8)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

[Operand](operand.Operand.md).[clone](operand.Operand.md#clone)

#### Defined in

[operand/operands.ts:24](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operands.ts#L24)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Overrides

[Operand](operand.Operand.md).[eval](operand.Operand.md#eval)

#### Defined in

[operand/operands.ts:194](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operands.ts#L194)

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

[operand/operands.ts:39](https://github.com/FlavioLionelRita/js-expressions/blob/3a4f5e6/src/lib/operand/operands.ts#L39)
