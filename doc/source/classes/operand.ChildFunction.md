[Expressions](../README.md) / [operand](../modules/operand.md) / ChildFunction

# Class: ChildFunction

[operand](../modules/operand.md).ChildFunction

## Hierarchy

- [`FunctionRef`](operand.FunctionRef.md)

  ↳ **`ChildFunction`**

## Table of contents

### Constructors

- [constructor](operand.ChildFunction.md#constructor)

### Properties

- [children](operand.ChildFunction.md#children)
- [data](operand.ChildFunction.md#data)
- [id](operand.ChildFunction.md#id)
- [index](operand.ChildFunction.md#index)
- [level](operand.ChildFunction.md#level)
- [metadata](operand.ChildFunction.md#metadata)
- [name](operand.ChildFunction.md#name)
- [parent](operand.ChildFunction.md#parent)
- [type](operand.ChildFunction.md#type)

### Methods

- [clone](operand.ChildFunction.md#clone)
- [eval](operand.ChildFunction.md#eval)
- [set](operand.ChildFunction.md#set)

## Constructors

### constructor

• **new ChildFunction**(`name`, `children?`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](operand.Operand.md)[] | `[]` |
| `type` | `string` | `'any'` |

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[constructor](operand.FunctionRef.md#constructor)

#### Defined in

[operand/operands.ts:14](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L14)

## Properties

### children

• **children**: [`Operand`](operand.Operand.md)[]

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[children](operand.FunctionRef.md#children)

#### Defined in

[operand/operands.ts:13](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L13)

___

### data

• `Optional` **data**: [`Data`](model.Data.md)

#### Defined in

[operand/operands.ts:151](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L151)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[id](operand.FunctionRef.md#id)

#### Defined in

[operand/operands.ts:9](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L9)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[index](operand.FunctionRef.md#index)

#### Defined in

[operand/operands.ts:11](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L11)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[level](operand.FunctionRef.md#level)

#### Defined in

[operand/operands.ts:12](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L12)

___

### metadata

• `Optional` **metadata**: [`ExpressionConfig`](parser.ExpressionConfig.md)

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[metadata](operand.FunctionRef.md#metadata)

#### Defined in

[operand/operands.ts:131](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L131)

___

### name

• **name**: `string`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[name](operand.FunctionRef.md#name)

#### Defined in

[operand/operands.ts:7](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L7)

___

### parent

• `Optional` **parent**: [`Operand`](operand.Operand.md)

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[parent](operand.FunctionRef.md#parent)

#### Defined in

[operand/operands.ts:10](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L10)

___

### type

• **type**: `string`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[type](operand.FunctionRef.md#type)

#### Defined in

[operand/operands.ts:8](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L8)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[clone](operand.FunctionRef.md#clone)

#### Defined in

[operand/operands.ts:24](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L24)

___

### eval

▸ **eval**(): `any`

#### Returns

`any`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[eval](operand.FunctionRef.md#eval)

#### Defined in

[operand/operands.ts:132](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L132)

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

[FunctionRef](operand.FunctionRef.md).[set](operand.FunctionRef.md#set)

#### Defined in

[operand/operands.ts:39](https://github.com/FlavioLionelRita/js-expressions/blob/414f93e/src/lib/operand/operands.ts#L39)
