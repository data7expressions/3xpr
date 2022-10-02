[Expressions](../README.md) / [model](../modules/model.md) / IExpressionConfig

# Interface: IExpressionConfig

[model](../modules/model.md).IExpressionConfig

## Implemented by

- [`ExpressionConfig`](../classes/parser.ExpressionConfig.md)

## Table of contents

### Accessors

- [enums](model.IExpressionConfig.md#enums)
- [formats](model.IExpressionConfig.md#formats)
- [functions](model.IExpressionConfig.md#functions)
- [libraries](model.IExpressionConfig.md#libraries)
- [operators](model.IExpressionConfig.md#operators)

### Methods

- [addLibrary](model.IExpressionConfig.md#addlibrary)
- [getEnum](model.IExpressionConfig.md#getenum)
- [getEnumValue](model.IExpressionConfig.md#getenumvalue)
- [getFormat](model.IExpressionConfig.md#getformat)
- [getFunction](model.IExpressionConfig.md#getfunction)
- [getOperator](model.IExpressionConfig.md#getoperator)
- [isEnum](model.IExpressionConfig.md#isenum)
- [load](model.IExpressionConfig.md#load)

## Accessors

### enums

• `get` **enums**(): `any`

#### Returns

`any`

#### Defined in

[model/operands.ts:84](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L84)

___

### formats

• `get` **formats**(): `any`

#### Returns

`any`

#### Defined in

[model/operands.ts:85](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L85)

___

### functions

• `get` **functions**(): [`OperatorMetadata`](model.OperatorMetadata.md)[]

#### Returns

[`OperatorMetadata`](model.OperatorMetadata.md)[]

#### Defined in

[model/operands.ts:86](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L86)

___

### libraries

• `get` **libraries**(): [`Library`](../classes/operand.Library.md)[]

#### Returns

[`Library`](../classes/operand.Library.md)[]

#### Defined in

[model/operands.ts:82](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L82)

___

### operators

• `get` **operators**(): [`OperatorMetadata`](model.OperatorMetadata.md)[]

#### Returns

[`OperatorMetadata`](model.OperatorMetadata.md)[]

#### Defined in

[model/operands.ts:83](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L83)

## Methods

### addLibrary

▸ **addLibrary**(`library`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `library` | [`Library`](../classes/operand.Library.md) |

#### Returns

`void`

#### Defined in

[model/operands.ts:87](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L87)

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

[model/operands.ts:91](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L91)

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

[model/operands.ts:90](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L90)

___

### getFormat

▸ **getFormat**(`name`): `undefined` \| [`Format`](model.Format.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Format`](model.Format.md)

#### Defined in

[model/operands.ts:92](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L92)

___

### getFunction

▸ **getFunction**(`name`): [`OperatorMetadata`](model.OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`OperatorMetadata`](model.OperatorMetadata.md)

#### Defined in

[model/operands.ts:94](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L94)

___

### getOperator

▸ **getOperator**(`operator`, `operands?`): [`OperatorMetadata`](model.OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | `string` |
| `operands?` | `number` |

#### Returns

[`OperatorMetadata`](model.OperatorMetadata.md)

#### Defined in

[model/operands.ts:93](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L93)

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

[model/operands.ts:89](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L89)

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

[model/operands.ts:88](https://github.com/FlavioLionelRita/js-expressions/blob/a373ee9/src/lib/model/operands.ts#L88)
