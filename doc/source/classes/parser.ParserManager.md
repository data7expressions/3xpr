[Expressions](../README.md) / [parser](../modules/parser.md) / ParserManager

# Class: ParserManager

[parser](../modules/parser.md).ParserManager

## Implements

- [`IParserManager`](../interfaces/model.IParserManager.md)

## Table of contents

### Constructors

- [constructor](parser.ParserManager.md#constructor)

### Properties

- [assignmentOperators](parser.ParserManager.md#assignmentoperators)
- [doubleOperators](parser.ParserManager.md#doubleoperators)
- [tripleOperators](parser.ParserManager.md#tripleoperators)

### Methods

- [clearChildEmpty](parser.ParserManager.md#clearchildempty)
- [getEnum](parser.ParserManager.md#getenum)
- [getEnumValue](parser.ParserManager.md#getenumvalue)
- [isEnum](parser.ParserManager.md#isenum)
- [minify](parser.ParserManager.md#minify)
- [parse](parser.ParserManager.md#parse)
- [priority](parser.ParserManager.md#priority)
- [refresh](parser.ParserManager.md#refresh)
- [toExpression](parser.ParserManager.md#toexpression)

## Constructors

### constructor

• **new ParserManager**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ExpressionConfig`](parser.ExpressionConfig.md) |

#### Defined in

[parser/parserManager.ts:12](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L12)

## Properties

### assignmentOperators

• **assignmentOperators**: `string`[]

#### Defined in

[parser/parserManager.ts:10](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L10)

___

### doubleOperators

• **doubleOperators**: `string`[]

#### Defined in

[parser/parserManager.ts:8](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L8)

___

### tripleOperators

• **tripleOperators**: `string`[]

#### Defined in

[parser/parserManager.ts:9](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L9)

## Methods

### clearChildEmpty

▸ **clearChildEmpty**(`node`): [`Node`](parser.Node.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](parser.Node.md) |

#### Returns

[`Node`](parser.Node.md)

#### Defined in

[parser/parserManager.ts:141](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L141)

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

[IParserManager](../interfaces/model.IParserManager.md).[getEnum](../interfaces/model.IParserManager.md#getenum)

#### Defined in

[parser/parserManager.ts:47](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L47)

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

#### Implementation of

[IParserManager](../interfaces/model.IParserManager.md).[getEnumValue](../interfaces/model.IParserManager.md#getenumvalue)

#### Defined in

[parser/parserManager.ts:43](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L43)

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

[IParserManager](../interfaces/model.IParserManager.md).[isEnum](../interfaces/model.IParserManager.md#isenum)

#### Defined in

[parser/parserManager.ts:39](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L39)

___

### minify

▸ **minify**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Implementation of

[IParserManager](../interfaces/model.IParserManager.md).[minify](../interfaces/model.IParserManager.md#minify)

#### Defined in

[parser/parserManager.ts:160](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L160)

___

### parse

▸ **parse**(`expression`): [`Node`](parser.Node.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Node`](parser.Node.md)

#### Implementation of

[IParserManager](../interfaces/model.IParserManager.md).[parse](../interfaces/model.IParserManager.md#parse)

#### Defined in

[parser/parserManager.ts:51](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L51)

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

#### Implementation of

[IParserManager](../interfaces/model.IParserManager.md).[priority](../interfaces/model.IParserManager.md#priority)

#### Defined in

[parser/parserManager.ts:34](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L34)

___

### refresh

▸ **refresh**(): `void`

#### Returns

`void`

#### Implementation of

[IParserManager](../interfaces/model.IParserManager.md).[refresh](../interfaces/model.IParserManager.md#refresh)

#### Defined in

[parser/parserManager.ts:20](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L20)

___

### toExpression

▸ **toExpression**(`node`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](parser.Node.md) |

#### Returns

`string`

#### Implementation of

[IParserManager](../interfaces/model.IParserManager.md).[toExpression](../interfaces/model.IParserManager.md#toexpression)

#### Defined in

[parser/parserManager.ts:65](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/parser/parserManager.ts#L65)
