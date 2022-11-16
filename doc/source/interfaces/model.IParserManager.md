[Expressions](../README.md) / [model](../modules/model.md) / IParserManager

# Interface: IParserManager

[model](../modules/model.md).IParserManager

## Implemented by

- [`ParserManager`](../classes/parser.ParserManager.md)

## Table of contents

### Methods

- [getEnum](model.IParserManager.md#getenum)
- [getEnumValue](model.IParserManager.md#getenumvalue)
- [isEnum](model.IParserManager.md#isenum)
- [minify](model.IParserManager.md#minify)
- [parse](model.IParserManager.md#parse)
- [priority](model.IParserManager.md#priority)
- [refresh](model.IParserManager.md#refresh)
- [toExpression](model.IParserManager.md#toexpression)

## Methods

### getEnum

▸ **getEnum**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[model/parser.ts:9](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/parser.ts#L9)

___

### getEnumValue

▸ **getEnumValue**(`name`, `option`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `option` | `any` |

#### Returns

`any`

#### Defined in

[model/parser.ts:8](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/parser.ts#L8)

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

[model/parser.ts:7](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/parser.ts#L7)

___

### minify

▸ **minify**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Defined in

[model/parser.ts:12](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/parser.ts#L12)

___

### parse

▸ **parse**(`expression`): [`Node`](../classes/parser.Node.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Node`](../classes/parser.Node.md)

#### Defined in

[model/parser.ts:10](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/parser.ts#L10)

___

### priority

▸ **priority**(`name`, `cardinality?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `cardinality?` | `number` |

#### Returns

`number`

#### Defined in

[model/parser.ts:6](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/parser.ts#L6)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Defined in

[model/parser.ts:5](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/parser.ts#L5)

___

### toExpression

▸ **toExpression**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](../classes/parser.Node.md) |

#### Returns

`string`

#### Defined in

[model/parser.ts:11](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/model/parser.ts#L11)
