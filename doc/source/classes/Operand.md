[Expressions](../README.md) / Operand

# Class: Operand

## Table of contents

### Constructors

- [constructor](Operand.md#constructor)

### Properties

- [children](Operand.md#children)
- [evaluator](Operand.md#evaluator)
- [id](Operand.md#id)
- [name](Operand.md#name)
- [number](Operand.md#number)
- [pos](Operand.md#pos)
- [returnType](Operand.md#returntype)
- [type](Operand.md#type)

### Methods

- [eval](Operand.md#eval)

## Constructors

### constructor

• **new Operand**(`pos`, `name`, `type`, `children?`, `returnType?`): [`Operand`](Operand.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `pos` | [`Position`](Position.md) | `undefined` |
| `name` | `any` | `undefined` |
| `type` | [`OperandType`](../enums/OperandType.md) | `undefined` |
| `children` | [`Operand`](Operand.md)[] | `[]` |
| `returnType?` | `Type` | `undefined` |

#### Returns

[`Operand`](Operand.md)

#### Defined in

[src/lib/shared/domain/operand.ts:47](https://github.com/FlavioLionelRita/3xpr/blob/370020b/src/lib/shared/domain/operand.ts#L47)

## Properties

### children

• **children**: [`Operand`](Operand.md)[] = `[]`

#### Defined in

[src/lib/shared/domain/operand.ts:47](https://github.com/FlavioLionelRita/3xpr/blob/370020b/src/lib/shared/domain/operand.ts#L47)

___

### evaluator

• `Optional` **evaluator**: [`IEvaluator`](../interfaces/IEvaluator.md)

#### Defined in

[src/lib/shared/domain/operand.ts:43](https://github.com/FlavioLionelRita/3xpr/blob/370020b/src/lib/shared/domain/operand.ts#L43)

___

### id

• `Optional` **id**: `string`

#### Defined in

[src/lib/shared/domain/operand.ts:45](https://github.com/FlavioLionelRita/3xpr/blob/370020b/src/lib/shared/domain/operand.ts#L45)

___

### name

• **name**: `any`

#### Defined in

[src/lib/shared/domain/operand.ts:47](https://github.com/FlavioLionelRita/3xpr/blob/370020b/src/lib/shared/domain/operand.ts#L47)

___

### number

• `Optional` **number**: `number`

#### Defined in

[src/lib/shared/domain/operand.ts:44](https://github.com/FlavioLionelRita/3xpr/blob/370020b/src/lib/shared/domain/operand.ts#L44)

___

### pos

• `Readonly` **pos**: [`Position`](Position.md)

#### Defined in

[src/lib/shared/domain/operand.ts:47](https://github.com/FlavioLionelRita/3xpr/blob/370020b/src/lib/shared/domain/operand.ts#L47)

___

### returnType

• `Optional` **returnType**: `Type`

#### Defined in

[src/lib/shared/domain/operand.ts:47](https://github.com/FlavioLionelRita/3xpr/blob/370020b/src/lib/shared/domain/operand.ts#L47)

___

### type

• `Readonly` **type**: [`OperandType`](../enums/OperandType.md)

#### Defined in

[src/lib/shared/domain/operand.ts:47](https://github.com/FlavioLionelRita/3xpr/blob/370020b/src/lib/shared/domain/operand.ts#L47)

## Methods

### eval

▸ **eval**(`context`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`Context`](Context.md) |

#### Returns

`any`

#### Defined in

[src/lib/shared/domain/operand.ts:48](https://github.com/FlavioLionelRita/3xpr/blob/370020b/src/lib/shared/domain/operand.ts#L48)
