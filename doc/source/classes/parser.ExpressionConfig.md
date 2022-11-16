[Expressions](../README.md) / [parser](../modules/parser.md) / ExpressionConfig

# Class: ExpressionConfig

[parser](../modules/parser.md).ExpressionConfig

## Implements

- [`IExpressionConfig`](../interfaces/model.IExpressionConfig.md)

## Table of contents

### Constructors

- [constructor](parser.ExpressionConfig.md#constructor)

### Properties

- [enums](parser.ExpressionConfig.md#enums)
- [formats](parser.ExpressionConfig.md#formats)
- [functions](parser.ExpressionConfig.md#functions)
- [libraries](parser.ExpressionConfig.md#libraries)
- [operators](parser.ExpressionConfig.md#operators)

### Methods

- [addLibrary](parser.ExpressionConfig.md#addlibrary)
- [getEnum](parser.ExpressionConfig.md#getenum)
- [getEnumValue](parser.ExpressionConfig.md#getenumvalue)
- [getFormat](parser.ExpressionConfig.md#getformat)
- [getFunction](parser.ExpressionConfig.md#getfunction)
- [getOperator](parser.ExpressionConfig.md#getoperator)
- [isEnum](parser.ExpressionConfig.md#isenum)
- [load](parser.ExpressionConfig.md#load)

## Constructors

### constructor

• **new ExpressionConfig**()

#### Defined in

[parser/expressionConfig.ts:11](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L11)

## Properties

### enums

• **enums**: `any`

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[enums](../interfaces/model.IExpressionConfig.md#enums)

#### Defined in

[parser/expressionConfig.ts:8](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L8)

___

### formats

• **formats**: `any`

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[formats](../interfaces/model.IExpressionConfig.md#formats)

#### Defined in

[parser/expressionConfig.ts:9](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L9)

___

### functions

• **functions**: [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[functions](../interfaces/model.IExpressionConfig.md#functions)

#### Defined in

[parser/expressionConfig.ts:10](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L10)

___

### libraries

• **libraries**: [`Library`](operand.Library.md)[]

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[libraries](../interfaces/model.IExpressionConfig.md#libraries)

#### Defined in

[parser/expressionConfig.ts:6](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L6)

___

### operators

• **operators**: [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[operators](../interfaces/model.IExpressionConfig.md#operators)

#### Defined in

[parser/expressionConfig.ts:7](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L7)

## Methods

### addLibrary

▸ **addLibrary**(`library`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `library` | [`Library`](operand.Library.md) |

#### Returns

`void`

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[addLibrary](../interfaces/model.IExpressionConfig.md#addlibrary)

#### Defined in

[parser/expressionConfig.ts:20](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L20)

___

### getEnum

▸ **getEnum**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[getEnum](../interfaces/model.IExpressionConfig.md#getenum)

#### Defined in

[parser/expressionConfig.ts:138](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L138)

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

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[getEnumValue](../interfaces/model.IExpressionConfig.md#getenumvalue)

#### Defined in

[parser/expressionConfig.ts:134](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L134)

___

### getFormat

▸ **getFormat**(`name`): `undefined` \| [`Format`](../interfaces/model.Format.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Format`](../interfaces/model.Format.md)

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[getFormat](../interfaces/model.IExpressionConfig.md#getformat)

#### Defined in

[parser/expressionConfig.ts:142](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L142)

___

### getFunction

▸ **getFunction**(`name`): [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[getFunction](../interfaces/model.IExpressionConfig.md#getfunction)

#### Defined in

[parser/expressionConfig.ts:162](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L162)

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

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[getOperator](../interfaces/model.IExpressionConfig.md#getoperator)

#### Defined in

[parser/expressionConfig.ts:146](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L146)

___

### isEnum

▸ **isEnum**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[isEnum](../interfaces/model.IExpressionConfig.md#isenum)

#### Defined in

[parser/expressionConfig.ts:129](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L129)

___

### load

▸ **load**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`void`

#### Implementation of

[IExpressionConfig](../interfaces/model.IExpressionConfig.md).[load](../interfaces/model.IExpressionConfig.md#load)

#### Defined in

[parser/expressionConfig.ts:43](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/expressionConfig.ts#L43)
