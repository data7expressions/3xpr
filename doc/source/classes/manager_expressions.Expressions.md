[Expressions](../README.md) / [manager/expressions](../modules/manager_expressions.md) / Expressions

# Class: Expressions

[manager/expressions](../modules/manager_expressions.md).Expressions

## Table of contents

### Constructors

- [constructor](manager_expressions.Expressions.md#constructor)

### Accessors

- [enums](manager_expressions.Expressions.md#enums)
- [formats](manager_expressions.Expressions.md#formats)
- [functions](manager_expressions.Expressions.md#functions)
- [libraries](manager_expressions.Expressions.md#libraries)
- [operators](manager_expressions.Expressions.md#operators)
- [parser](manager_expressions.Expressions.md#parser)
- [instance](manager_expressions.Expressions.md#instance)

### Methods

- [addLibrary](manager_expressions.Expressions.md#addlibrary)
- [clone](manager_expressions.Expressions.md#clone)
- [eval](manager_expressions.Expressions.md#eval)
- [getEnum](manager_expressions.Expressions.md#getenum)
- [getEnumValue](manager_expressions.Expressions.md#getenumvalue)
- [getFormat](manager_expressions.Expressions.md#getformat)
- [getFunction](manager_expressions.Expressions.md#getfunction)
- [getOperator](manager_expressions.Expressions.md#getoperator)
- [getType](manager_expressions.Expressions.md#gettype)
- [isEnum](manager_expressions.Expressions.md#isenum)
- [load](manager_expressions.Expressions.md#load)
- [parameters](manager_expressions.Expressions.md#parameters)
- [parse](manager_expressions.Expressions.md#parse)
- [subscribe](manager_expressions.Expressions.md#subscribe)
- [unsubscribe](manager_expressions.Expressions.md#unsubscribe)

## Constructors

### constructor

• **new Expressions**(`cache`, `config`, `parserManager`, `serializer`, `operandBuilder`, `typeManager`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cache` | [`Cache`](../interfaces/model.Cache.md) |
| `config` | [`IExpressionConfig`](../interfaces/model.IExpressionConfig.md) |
| `parserManager` | [`IParserManager`](../interfaces/model.IParserManager.md) |
| `serializer` | [`ISerializer`](../interfaces/model.ISerializer.md)<[`Operand`](model.Operand.md)\> |
| `operandBuilder` | [`IOperandBuilder`](../interfaces/model.IOperandBuilder.md) |
| `typeManager` | [`IOperandTypeManager`](../interfaces/model.IOperandTypeManager.md) |

#### Defined in

[manager/expressions.ts:29](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L29)

## Accessors

### enums

• `get` **enums**(): `any`

#### Returns

`any`

#### Defined in

[manager/expressions.ts:58](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L58)

___

### formats

• `get` **formats**(): `any`

#### Returns

`any`

#### Defined in

[manager/expressions.ts:62](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L62)

___

### functions

• `get` **functions**(): [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Returns

[`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Defined in

[manager/expressions.ts:66](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L66)

___

### libraries

• `get` **libraries**(): [`Library`](operand.Library.md)[]

#### Returns

[`Library`](operand.Library.md)[]

#### Defined in

[manager/expressions.ts:50](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L50)

___

### operators

• `get` **operators**(): [`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Returns

[`OperatorMetadata`](../interfaces/model.OperatorMetadata.md)[]

#### Defined in

[manager/expressions.ts:54](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L54)

___

### parser

• `get` **parser**(): [`IParserManager`](../interfaces/model.IParserManager.md)

#### Returns

[`IParserManager`](../interfaces/model.IParserManager.md)

#### Defined in

[manager/expressions.ts:46](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L46)

___

### instance

• `Static` `get` **instance**(): [`Expressions`](manager_expressions.Expressions.md)

#### Returns

[`Expressions`](manager_expressions.Expressions.md)

#### Defined in

[manager/expressions.ts:39](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L39)

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

[manager/expressions.ts:70](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L70)

___

### clone

▸ **clone**(`operand`): [`Operand`](model.Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operand` | [`Operand`](model.Operand.md) |

#### Returns

[`Operand`](model.Operand.md)

#### Defined in

[manager/expressions.ts:102](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L102)

___

### eval

▸ **eval**(`expression`, `data?`): `any`

Evaluate and solve expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | string expression |
| `data?` | `any` | Data with variables |

#### Returns

`any`

Result of the evaluate expression

#### Defined in

[manager/expressions.ts:176](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L176)

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

[manager/expressions.ts:86](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L86)

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

[manager/expressions.ts:82](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L82)

___

### getFormat

▸ **getFormat**(`name`): `undefined` \| [`Format`](../interfaces/model.Format.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Format`](../interfaces/model.Format.md)

#### Defined in

[manager/expressions.ts:90](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L90)

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

[manager/expressions.ts:98](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L98)

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

[manager/expressions.ts:94](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L94)

___

### getType

▸ **getType**(`expression`): `string`

Get type of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

`string`

Type of expression

#### Defined in

[manager/expressions.ts:159](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L159)

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

[manager/expressions.ts:78](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L78)

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

[manager/expressions.ts:74](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L74)

___

### parameters

▸ **parameters**(`expression`): [`Parameter`](../interfaces/model.Parameter.md)[]

Get parameters of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

[`Parameter`](../interfaces/model.Parameter.md)[]

Parameters of expression

#### Defined in

[manager/expressions.ts:149](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L149)

___

### parse

▸ **parse**(`expression`): [`Operand`](model.Operand.md)

Parser expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

[`Operand`](model.Operand.md)

Operand

#### Defined in

[manager/expressions.ts:111](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L111)

___

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](model.ActionObserver.md) |

#### Returns

`void`

#### Defined in

[manager/expressions.ts:191](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L191)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](model.ActionObserver.md) |

#### Returns

`void`

#### Defined in

[manager/expressions.ts:195](https://github.com/FlavioLionelRita/3xpr/blob/a373ee9/src/lib/manager/expressions.ts#L195)
