[Expressions](../README.md) / [operand](../modules/operand.md) / Library

# Class: Library

[operand](../modules/operand.md).Library

## Table of contents

### Constructors

- [constructor](operand.Library.md#constructor)

### Properties

- [enums](operand.Library.md#enums)
- [formats](operand.Library.md#formats)
- [functions](operand.Library.md#functions)
- [name](operand.Library.md#name)
- [operators](operand.Library.md#operators)

### Methods

- [addEnum](operand.Library.md#addenum)
- [addFormat](operand.Library.md#addformat)
- [addFunction](operand.Library.md#addfunction)
- [addOperator](operand.Library.md#addoperator)

## Constructors

### constructor

• **new Library**(`name`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Defined in

[operand/library.ts:16](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/library.ts#L16)

## Properties

### enums

• **enums**: `any`

#### Defined in

[operand/library.ts:11](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/library.ts#L11)

___

### formats

• **formats**: `any`

#### Defined in

[operand/library.ts:12](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/library.ts#L12)

___

### functions

• **functions**: [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Defined in

[operand/library.ts:14](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/library.ts#L14)

___

### name

• **name**: `string`

#### Defined in

[operand/library.ts:10](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/library.ts#L10)

___

### operators

• **operators**: [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Defined in

[operand/library.ts:13](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/library.ts#L13)

## Methods

### addEnum

▸ **addEnum**(`name`, `source`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `source` | `any` |

#### Returns

`void`

#### Defined in

[operand/library.ts:24](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/library.ts#L24)

___

### addFormat

▸ **addFormat**(`name`, `pattern`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `pattern` | `any` |

#### Returns

`void`

#### Defined in

[operand/library.ts:28](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/library.ts#L28)

___

### addFunction

▸ **addFunction**(`name`, `source`, `type?`, `custom?`, `deterministic?`): `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `source` | `any` | `undefined` |
| `type` | [`OperatorType`](../enums/model.OperatorType.md) | `OperatorType.function` |
| `custom` | `any` | `null` |
| `deterministic` | `boolean` | `true` |

#### Returns

`any`

#### Defined in

[operand/library.ts:32](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/library.ts#L32)

___

### addOperator

▸ **addOperator**(`name`, `source`, `custom?`): `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `source` | `any` | `undefined` |
| `custom` | `any` | `null` |

#### Returns

`any`

#### Defined in

[operand/library.ts:49](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/operand/library.ts#L49)
