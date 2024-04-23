[Expressions](../README.md) / ModelServiceImpl

# Class: ModelServiceImpl

## Implements

- [`ModelService`](../interfaces/ModelService.md)

## Table of contents

### Constructors

- [constructor](ModelServiceImpl.md#constructor)

### Properties

- [\_functionAlias](ModelServiceImpl.md#_functionalias)
- [\_operatorAlias](ModelServiceImpl.md#_operatoralias)

### Accessors

- [constants](ModelServiceImpl.md#constants)
- [enums](ModelServiceImpl.md#enums)
- [formats](ModelServiceImpl.md#formats)
- [functionAlias](ModelServiceImpl.md#functionalias)
- [functions](ModelServiceImpl.md#functions)
- [operatorAlias](ModelServiceImpl.md#operatoralias)
- [operators](ModelServiceImpl.md#operators)

### Methods

- [addConstant](ModelServiceImpl.md#addconstant)
- [addEnum](ModelServiceImpl.md#addenum)
- [addFormat](ModelServiceImpl.md#addformat)
- [addFunction](ModelServiceImpl.md#addfunction)
- [addFunctionAlias](ModelServiceImpl.md#addfunctionalias)
- [addLibrary](ModelServiceImpl.md#addlibrary)
- [addOperator](ModelServiceImpl.md#addoperator)
- [addOperatorAlias](ModelServiceImpl.md#addoperatoralias)
- [getConstantValue](ModelServiceImpl.md#getconstantvalue)
- [getEnum](ModelServiceImpl.md#getenum)
- [getEnumValue](ModelServiceImpl.md#getenumvalue)
- [getFormat](ModelServiceImpl.md#getformat)
- [getFunction](ModelServiceImpl.md#getfunction)
- [getOperator](ModelServiceImpl.md#getoperator)
- [isConstant](ModelServiceImpl.md#isconstant)
- [isEnum](ModelServiceImpl.md#isenum)
- [isFunction](ModelServiceImpl.md#isfunction)
- [isOperator](ModelServiceImpl.md#isoperator)
- [priority](ModelServiceImpl.md#priority)

## Constructors

### constructor

• **new ModelServiceImpl**(): [`ModelServiceImpl`](ModelServiceImpl.md)

#### Returns

[`ModelServiceImpl`](ModelServiceImpl.md)

#### Defined in

[src/lib/model/application/modelService.ts:13](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L13)

## Properties

### \_functionAlias

• **\_functionAlias**: `any`

#### Defined in

[src/lib/model/application/modelService.ts:12](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L12)

___

### \_operatorAlias

• **\_operatorAlias**: `any`

#### Defined in

[src/lib/model/application/modelService.ts:11](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L11)

## Accessors

### constants

• `get` **constants**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Implementation of

ModelService.constants

#### Defined in

[src/lib/model/application/modelService.ts:31](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L31)

___

### enums

• `get` **enums**(): [`string`, [`string`, `any`][]][]

#### Returns

[`string`, [`string`, `any`][]][]

#### Implementation of

ModelService.enums

#### Defined in

[src/lib/model/application/modelService.ts:39](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L39)

___

### formats

• `get` **formats**(): [`string`, [`Format`](../interfaces/Format.md)][]

#### Returns

[`string`, [`Format`](../interfaces/Format.md)][]

#### Implementation of

ModelService.formats

#### Defined in

[src/lib/model/application/modelService.ts:35](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L35)

___

### functionAlias

• `get` **functionAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Implementation of

ModelService.functionAlias

#### Defined in

[src/lib/model/application/modelService.ts:27](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L27)

___

### functions

• `get` **functions**(): [`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Implementation of

ModelService.functions

#### Defined in

[src/lib/model/application/modelService.ts:59](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L59)

___

### operatorAlias

• `get` **operatorAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Implementation of

ModelService.operatorAlias

#### Defined in

[src/lib/model/application/modelService.ts:23](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L23)

___

### operators

• `get` **operators**(): [`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Implementation of

ModelService.operators

#### Defined in

[src/lib/model/application/modelService.ts:43](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L43)

## Methods

### addConstant

▸ **addConstant**(`key`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[addConstant](../interfaces/ModelService.md#addconstant)

#### Defined in

[src/lib/model/application/modelService.ts:89](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L89)

___

### addEnum

▸ **addEnum**(`name`, `values`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `values` | `any` |

#### Returns

`void`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[addEnum](../interfaces/ModelService.md#addenum)

#### Defined in

[src/lib/model/application/modelService.ts:69](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L69)

___

### addFormat

▸ **addFormat**(`key`, `pattern`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `pattern` | `string` |

#### Returns

`void`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[addFormat](../interfaces/ModelService.md#addformat)

#### Defined in

[src/lib/model/application/modelService.ts:85](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L85)

___

### addFunction

▸ **addFunction**(`sing`, `source`, `additionalInfo?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sing` | `string` |
| `source` | `any` |
| `additionalInfo?` | [`FunctionAdditionalInfo`](../interfaces/FunctionAdditionalInfo.md) |

#### Returns

`void`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[addFunction](../interfaces/ModelService.md#addfunction)

#### Defined in

[src/lib/model/application/modelService.ts:131](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L131)

___

### addFunctionAlias

▸ **addFunctionAlias**(`alias`, `reference`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `alias` | `string` |
| `reference` | `string` |

#### Returns

`void`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[addFunctionAlias](../interfaces/ModelService.md#addfunctionalias)

#### Defined in

[src/lib/model/application/modelService.ts:97](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L97)

___

### addLibrary

▸ **addLibrary**(`library`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `library` | [`Library`](../interfaces/Library.md) |

#### Returns

`void`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[addLibrary](../interfaces/ModelService.md#addlibrary)

#### Defined in

[src/lib/model/application/modelService.ts:101](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L101)

___

### addOperator

▸ **addOperator**(`sing`, `source`, `additionalInfo`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sing` | `string` |
| `source` | `any` |
| `additionalInfo` | [`OperatorAdditionalInfo`](../interfaces/OperatorAdditionalInfo.md) |

#### Returns

`void`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[addOperator](../interfaces/ModelService.md#addoperator)

#### Defined in

[src/lib/model/application/modelService.ts:105](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L105)

___

### addOperatorAlias

▸ **addOperatorAlias**(`alias`, `reference`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `alias` | `string` |
| `reference` | `string` |

#### Returns

`void`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[addOperatorAlias](../interfaces/ModelService.md#addoperatoralias)

#### Defined in

[src/lib/model/application/modelService.ts:93](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L93)

___

### getConstantValue

▸ **getConstantValue**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[getConstantValue](../interfaces/ModelService.md#getconstantvalue)

#### Defined in

[src/lib/model/application/modelService.ts:169](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L169)

___

### getEnum

▸ **getEnum**(`name`): [`string`, `any`][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`string`, `any`][]

#### Implementation of

[ModelService](../interfaces/ModelService.md).[getEnum](../interfaces/ModelService.md#getenum)

#### Defined in

[src/lib/model/application/modelService.ts:165](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L165)

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

[ModelService](../interfaces/ModelService.md).[getEnumValue](../interfaces/ModelService.md#getenumvalue)

#### Defined in

[src/lib/model/application/modelService.ts:153](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L153)

___

### getFormat

▸ **getFormat**(`name`): `undefined` \| [`Format`](../interfaces/Format.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Format`](../interfaces/Format.md)

#### Implementation of

[ModelService](../interfaces/ModelService.md).[getFormat](../interfaces/ModelService.md#getformat)

#### Defined in

[src/lib/model/application/modelService.ts:173](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L173)

___

### getFunction

▸ **getFunction**(`name`): [`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Implementation of

[ModelService](../interfaces/ModelService.md).[getFunction](../interfaces/ModelService.md#getfunction)

#### Defined in

[src/lib/model/application/modelService.ts:201](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L201)

___

### getOperator

▸ **getOperator**(`name`, `operands?`): [`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `operands?` | `number` |

#### Returns

[`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Implementation of

[ModelService](../interfaces/ModelService.md).[getOperator](../interfaces/ModelService.md#getoperator)

#### Defined in

[src/lib/model/application/modelService.ts:177](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L177)

___

### isConstant

▸ **isConstant**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[isConstant](../interfaces/ModelService.md#isconstant)

#### Defined in

[src/lib/model/application/modelService.ts:219](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L219)

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

[ModelService](../interfaces/ModelService.md).[isEnum](../interfaces/ModelService.md#isenum)

#### Defined in

[src/lib/model/application/modelService.ts:214](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L214)

___

### isFunction

▸ **isFunction**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[isFunction](../interfaces/ModelService.md#isfunction)

#### Defined in

[src/lib/model/application/modelService.ts:239](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L239)

___

### isOperator

▸ **isOperator**(`name`, `operands?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `operands?` | `number` |

#### Returns

`boolean`

#### Implementation of

[ModelService](../interfaces/ModelService.md).[isOperator](../interfaces/ModelService.md#isoperator)

#### Defined in

[src/lib/model/application/modelService.ts:223](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L223)

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

[ModelService](../interfaces/ModelService.md).[priority](../interfaces/ModelService.md#priority)

#### Defined in

[src/lib/model/application/modelService.ts:243](https://github.com/data7expressions/3xpr/blob/afd3b19f5d11ae44b57444edce640638f4fba296/src/lib/model/application/modelService.ts#L243)
