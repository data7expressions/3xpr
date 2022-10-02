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
- [id](operand.ChildFunction.md#id)
- [index](operand.ChildFunction.md#index)
- [level](operand.ChildFunction.md#level)
- [name](operand.ChildFunction.md#name)
- [type](operand.ChildFunction.md#type)

### Methods

- [eval](operand.ChildFunction.md#eval)

## Constructors

### constructor

• **new ChildFunction**(`name`, `children?`, `metadata`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](model.Operand.md)[] | `[]` |
| `metadata` | [`ExpressionConfig`](parser.ExpressionConfig.md) | `undefined` |

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[constructor](operand.FunctionRef.md#constructor)

#### Defined in

[operand/operands.ts:138](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/operand/operands.ts#L138)

## Properties

### children

• **children**: [`Operand`](model.Operand.md)[]

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[children](operand.FunctionRef.md#children)

#### Defined in

[model/operands.ts:26](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L26)

___

### id

• `Optional` **id**: `string`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[id](operand.FunctionRef.md#id)

#### Defined in

[model/operands.ts:23](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L23)

___

### index

• `Optional` **index**: `number`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[index](operand.FunctionRef.md#index)

#### Defined in

[model/operands.ts:24](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L24)

___

### level

• `Optional` **level**: `number`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[level](operand.FunctionRef.md#level)

#### Defined in

[model/operands.ts:25](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L25)

___

### name

• **name**: `string`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[name](operand.FunctionRef.md#name)

#### Defined in

[model/operands.ts:21](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L21)

___

### type

• `Optional` **type**: [`Type`](../modules/model.md#type)

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[type](operand.FunctionRef.md#type)

#### Defined in

[model/operands.ts:22](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L22)

## Methods

### eval

▸ **eval**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](model.Context.md) |

#### Returns

`any`

#### Inherited from

[FunctionRef](operand.FunctionRef.md).[eval](operand.FunctionRef.md#eval)

#### Defined in

[operand/operands.ts:143](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/operand/operands.ts#L143)
