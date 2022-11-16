[Expressions](../README.md) / [model](../modules/model.md) / Operand

# Class: Operand

[model](../modules/model.md).Operand

## Hierarchy

- **`Operand`**

  ↳ [`Constant`](operand.Constant.md)

  ↳ [`Variable`](operand.Variable.md)

  ↳ [`EnvironmentVariable`](operand.EnvironmentVariable.md)

  ↳ [`Template`](operand.Template.md)

  ↳ [`Property`](operand.Property.md)

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

- [constructor](model.Operand.md#constructor)

### Properties

- [children](model.Operand.md#children)
- [id](model.Operand.md#id)
- [index](model.Operand.md#index)
- [level](model.Operand.md#level)
- [name](model.Operand.md#name)
- [type](model.Operand.md#type)

### Methods

- [eval](model.Operand.md#eval)

## Constructors

### constructor

• **new Operand**(`name`, `children?`, `type?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `children` | [`Operand`](model.Operand.md)[] | `[]` |
| `type?` | [`Type`](../modules/model.md#type) | `undefined` |

#### Defined in

[model/operands.ts:27](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L27)

## Properties

### children

• **children**: [`Operand`](model.Operand.md)[]

#### Defined in

[model/operands.ts:26](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L26)

___

### id

• `Optional` **id**: `string`

#### Defined in

[model/operands.ts:23](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L23)

___

### index

• `Optional` **index**: `number`

#### Defined in

[model/operands.ts:24](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L24)

___

### level

• `Optional` **level**: `number`

#### Defined in

[model/operands.ts:25](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L25)

___

### name

• **name**: `string`

#### Defined in

[model/operands.ts:21](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L21)

___

### type

• `Optional` **type**: [`Type`](../modules/model.md#type)

#### Defined in

[model/operands.ts:22](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L22)

## Methods

### eval

▸ `Abstract` **eval**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](model.Context.md) |

#### Returns

`any`

#### Defined in

[model/operands.ts:36](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/operands.ts#L36)
