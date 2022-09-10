[Expressions](../README.md) / [parser](../modules/parser.md) / ExpressionConfig

# Class: ExpressionConfig

[parser](../modules/parser.md).ExpressionConfig

## Table of contents

### Constructors

- [constructor](parser.ExpressionConfig.md#constructor)

### Properties

- [enums](parser.ExpressionConfig.md#enums)
- [functions](parser.ExpressionConfig.md#functions)
- [libraries](parser.ExpressionConfig.md#libraries)
- [operators](parser.ExpressionConfig.md#operators)

### Methods

- [addLibrary](parser.ExpressionConfig.md#addlibrary)
- [getEnum](parser.ExpressionConfig.md#getenum)
- [getEnumValue](parser.ExpressionConfig.md#getenumvalue)
- [getFunction](parser.ExpressionConfig.md#getfunction)
- [getOperator](parser.ExpressionConfig.md#getoperator)
- [isEnum](parser.ExpressionConfig.md#isenum)
- [load](parser.ExpressionConfig.md#load)

## Constructors

### constructor

• **new ExpressionConfig**()

#### Defined in

[parser/expressionConfig.ts:10](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L10)

## Properties

### enums

• **enums**: `any`

#### Defined in

[parser/expressionConfig.ts:8](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L8)

___

### functions

• **functions**: [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Defined in

[parser/expressionConfig.ts:9](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L9)

___

### libraries

• **libraries**: [`Library`](operand.Library.md)[]

#### Defined in

[parser/expressionConfig.ts:6](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L6)

___

### operators

• **operators**: [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Defined in

[parser/expressionConfig.ts:7](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L7)

## Methods

### addLibrary

▸ **addLibrary**(`library`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `library` | [`Library`](operand.Library.md) |

#### Returns

`void`

#### Defined in

[parser/expressionConfig.ts:18](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L18)

___

### getEnum

▸ **getEnum**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[parser/expressionConfig.ts:124](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L124)

___

### getEnumValue

▸ **getEnumValue**(`name`, `option`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `option` | `string` |

#### Returns

`any`

#### Defined in

[parser/expressionConfig.ts:120](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L120)

___

### getFunction

▸ **getFunction**(`name`): [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)

#### Defined in

[parser/expressionConfig.ts:144](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L144)

___

### getOperator

▸ **getOperator**(`operator`, `operands?`): [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | `string` |
| `operands?` | `number` |

#### Returns

[`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)

#### Defined in

[parser/expressionConfig.ts:128](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L128)

___

### isEnum

▸ **isEnum**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[parser/expressionConfig.ts:115](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L115)

___

### load

▸ **load**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

#### Defined in

[parser/expressionConfig.ts:38](https://github.com/FlavioLionelRita/js-expressions/blob/5f366b7/src/lib/parser/expressionConfig.ts#L38)
