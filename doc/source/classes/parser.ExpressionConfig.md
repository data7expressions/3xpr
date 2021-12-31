[Expressions](../README.md) / [parser](../modules/parser.md) / ExpressionConfig

# Class: ExpressionConfig

[parser](../modules/parser.md).ExpressionConfig

## Table of contents

### Constructors

- [constructor](parser.ExpressionConfig.md#constructor)

### Properties

- [operators](parser.ExpressionConfig.md#operators)

### Methods

- [addLibrary](parser.ExpressionConfig.md#addlibrary)
- [getEnum](parser.ExpressionConfig.md#getenum)
- [getEnumValue](parser.ExpressionConfig.md#getenumvalue)
- [getFunction](parser.ExpressionConfig.md#getfunction)
- [getOperator](parser.ExpressionConfig.md#getoperator)
- [isEnum](parser.ExpressionConfig.md#isenum)

## Constructors

### constructor

• **new ExpressionConfig**()

#### Defined in

[parser/expressionConfig.ts:10](https://github.com/FlavioLionelRita/js-expressions/blob/3419c08/src/lib/parser/expressionConfig.ts#L10)

## Properties

### operators

• **operators**: [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Defined in

[parser/expressionConfig.ts:7](https://github.com/FlavioLionelRita/js-expressions/blob/3419c08/src/lib/parser/expressionConfig.ts#L7)

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

[parser/expressionConfig.ts:18](https://github.com/FlavioLionelRita/js-expressions/blob/3419c08/src/lib/parser/expressionConfig.ts#L18)

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

[parser/expressionConfig.ts:109](https://github.com/FlavioLionelRita/js-expressions/blob/3419c08/src/lib/parser/expressionConfig.ts#L109)

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

[parser/expressionConfig.ts:105](https://github.com/FlavioLionelRita/js-expressions/blob/3419c08/src/lib/parser/expressionConfig.ts#L105)

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

[parser/expressionConfig.ts:121](https://github.com/FlavioLionelRita/js-expressions/blob/3419c08/src/lib/parser/expressionConfig.ts#L121)

___

### getOperator

▸ **getOperator**(`operator`, `operands`): [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | `string` |
| `operands` | `number` |

#### Returns

[`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)

#### Defined in

[parser/expressionConfig.ts:113](https://github.com/FlavioLionelRita/js-expressions/blob/3419c08/src/lib/parser/expressionConfig.ts#L113)

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

[parser/expressionConfig.ts:100](https://github.com/FlavioLionelRita/js-expressions/blob/3419c08/src/lib/parser/expressionConfig.ts#L100)
