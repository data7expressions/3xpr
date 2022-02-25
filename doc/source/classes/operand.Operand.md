[Expressions](../README.md) / [operand](../modules/operand.md) / Operand

# Class: Operand

[operand](../modules/operand.md).Operand

## Hierarchy

- **`Operand`**

  ↳ [`Constant`](operand.Constant.md)

  ↳ [`Variable`](operand.Variable.md)

  ↳ [`Template`](operand.Template.md)

  ↳ [`KeyValue`](operand.KeyValue.md)

  ↳ [`List`](operand.List.md)

  ↳ [`Obj`](operand.Obj.md)

  ↳ [`Operator`](operand.Operator.md)

  ↳ [`FunctionRef`](operand.FunctionRef.md)

  ↳ [`Block`](operand.Block.md)

  ↳ [`If`](operand.If.md)

  ↳ [`ElseIf`](operand.ElseIf.md)

  ↳ [`Else`](operand.Else.md)

  ↳ [`While`](operand.While.md)

  ↳ [`For`](operand.For.md)

  ↳ [`ForIn`](operand.ForIn.md)

  ↳ [`Switch`](operand.Switch.md)

  ↳ [`Case`](operand.Case.md)

  ↳ [`Default`](operand.Default.md)

  ↳ [`Break`](operand.Break.md)

  ↳ [`Continue`](operand.Continue.md)

  ↳ [`Function`](operand.Function.md)

  ↳ [`Return`](operand.Return.md)

  ↳ [`Try`](operand.Try.md)

  ↳ [`Catch`](operand.Catch.md)

  ↳ [`Throw`](operand.Throw.md)

## Table of contents

### Constructors

- [constructor](operand.Operand.md#constructor)

### Properties

- [children](operand.Operand.md#children)
- [id](operand.Operand.md#id)
- [index](operand.Operand.md#index)
- [level](operand.Operand.md#level)
- [name](operand.Operand.md#name)
- [parent](operand.Operand.md#parent)
- [type](operand.Operand.md#type)

### Methods

- [clone](operand.Operand.md#clone)
- [eval](operand.Operand.md#eval)
- [set](operand.Operand.md#set)

## Constructors

### constructor

• **new Operand**(`name`, `children?`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](operand.Operand.md)[] | `[]` |
| `type` | `string` | `'any'` |

#### Defined in

[operand/operands.ts:14](https://github.com/FlavioLionelRita/js-expressions/blob/99eafc5/src/lib/operand/operands.ts#L14)

## Properties

### children

• **children**: [`Operand`](operand.Operand.md)[]

#### Defined in

[operand/operands.ts:13](https://github.com/FlavioLionelRita/js-expressions/blob/99eafc5/src/lib/operand/operands.ts#L13)

___

### id

• `Optional` **id**: `string`

#### Defined in

[operand/operands.ts:9](https://github.com/FlavioLionelRita/js-expressions/blob/99eafc5/src/lib/operand/operands.ts#L9)

___

### index

• `Optional` **index**: `number`

#### Defined in

[operand/operands.ts:11](https://github.com/FlavioLionelRita/js-expressions/blob/99eafc5/src/lib/operand/operands.ts#L11)

___

### level

• `Optional` **level**: `number`

#### Defined in

[operand/operands.ts:12](https://github.com/FlavioLionelRita/js-expressions/blob/99eafc5/src/lib/operand/operands.ts#L12)

___

### name

• **name**: `string`

#### Defined in

[operand/operands.ts:7](https://github.com/FlavioLionelRita/js-expressions/blob/99eafc5/src/lib/operand/operands.ts#L7)

___

### parent

• `Optional` **parent**: [`Operand`](operand.Operand.md)

#### Defined in

[operand/operands.ts:10](https://github.com/FlavioLionelRita/js-expressions/blob/99eafc5/src/lib/operand/operands.ts#L10)

___

### type

• **type**: `string`

#### Defined in

[operand/operands.ts:8](https://github.com/FlavioLionelRita/js-expressions/blob/99eafc5/src/lib/operand/operands.ts#L8)

## Methods

### clone

▸ **clone**(): `void`

#### Returns

`void`

#### Defined in

[operand/operands.ts:24](https://github.com/FlavioLionelRita/js-expressions/blob/99eafc5/src/lib/operand/operands.ts#L24)

___

### eval

▸ `Abstract` **eval**(): `any`

#### Returns

`any`

#### Defined in

[operand/operands.ts:40](https://github.com/FlavioLionelRita/js-expressions/blob/99eafc5/src/lib/operand/operands.ts#L40)

___

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[operand/operands.ts:39](https://github.com/FlavioLionelRita/js-expressions/blob/99eafc5/src/lib/operand/operands.ts#L39)
