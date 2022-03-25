[Expressions](../README.md) / [operand](../modules/operand.md) / Library

# Class: Library

[operand](../modules/operand.md).Library

## Table of contents

### Constructors

- [constructor](operand.Library.md#constructor)

### Properties

- [enums](operand.Library.md#enums)
- [functions](operand.Library.md#functions)
- [name](operand.Library.md#name)
- [operators](operand.Library.md#operators)

### Methods

- [addEnum](operand.Library.md#addenum)
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

[operand/library.ts:15](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/library.ts#L15)

## Properties

### enums

• **enums**: `any`

#### Defined in

[operand/library.ts:11](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/library.ts#L11)

___

### functions

• **functions**: [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Defined in

[operand/library.ts:13](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/library.ts#L13)

___

### name

• **name**: `string`

#### Defined in

[operand/library.ts:10](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/library.ts#L10)

___

### operators

• **operators**: [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Defined in

[operand/library.ts:12](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/library.ts#L12)

## Methods

### addEnum

▸ **addEnum**(`key`, `source`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `source` | `any` |

#### Returns

`void`

#### Defined in

[operand/library.ts:22](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/library.ts#L22)

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

[operand/library.ts:26](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/library.ts#L26)

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

[operand/library.ts:54](https://github.com/FlavioLionelRita/js-expressions/blob/3161ac6/src/lib/operand/library.ts#L54)
