[Expressions](../README.md) / ModelService

# Interface: ModelService

## Hierarchy

- **`ModelService`**

  ↳ [`Expressions`](Expressions.md)

## Implemented by

- [`ModelServiceImpl`](../classes/ModelServiceImpl.md)

## Table of contents

### Accessors

- [constants](ModelService.md#constants)
- [enums](ModelService.md#enums)
- [formats](ModelService.md#formats)
- [functionAlias](ModelService.md#functionalias)
- [functions](ModelService.md#functions)
- [operatorAlias](ModelService.md#operatoralias)
- [operators](ModelService.md#operators)

### Methods

- [addConstant](ModelService.md#addconstant)
- [addEnum](ModelService.md#addenum)
- [addFormat](ModelService.md#addformat)
- [addFunction](ModelService.md#addfunction)
- [addFunctionAlias](ModelService.md#addfunctionalias)
- [addLibrary](ModelService.md#addlibrary)
- [addOperator](ModelService.md#addoperator)
- [addOperatorAlias](ModelService.md#addoperatoralias)
- [getConstantValue](ModelService.md#getconstantvalue)
- [getEnum](ModelService.md#getenum)
- [getEnumValue](ModelService.md#getenumvalue)
- [getFormat](ModelService.md#getformat)
- [getFunction](ModelService.md#getfunction)
- [getOperator](ModelService.md#getoperator)
- [isConstant](ModelService.md#isconstant)
- [isEnum](ModelService.md#isenum)
- [isFunction](ModelService.md#isfunction)
- [isOperator](ModelService.md#isoperator)
- [priority](ModelService.md#priority)

## Accessors

### constants

• `get` **constants**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Defined in

[src/lib/model/domain/services.ts:9](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L9)

___

### enums

• `get` **enums**(): [`string`, [`string`, `any`][]][]

#### Returns

[`string`, [`string`, `any`][]][]

#### Defined in

[src/lib/model/domain/services.ts:7](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L7)

___

### formats

• `get` **formats**(): [`string`, [`Format`](Format.md)][]

#### Returns

[`string`, [`Format`](Format.md)][]

#### Defined in

[src/lib/model/domain/services.ts:8](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L8)

___

### functionAlias

• `get` **functionAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Defined in

[src/lib/model/domain/services.ts:6](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L6)

___

### functions

• `get` **functions**(): [`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Defined in

[src/lib/model/domain/services.ts:11](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L11)

___

### operatorAlias

• `get` **operatorAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Defined in

[src/lib/model/domain/services.ts:5](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L5)

___

### operators

• `get` **operators**(): [`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Defined in

[src/lib/model/domain/services.ts:10](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L10)

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

#### Defined in

[src/lib/model/domain/services.ts:14](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L14)

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

#### Defined in

[src/lib/model/domain/services.ts:13](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L13)

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

#### Defined in

[src/lib/model/domain/services.ts:15](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L15)

___

### addFunction

▸ **addFunction**(`sing`, `source`, `additionalInfo?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sing` | `string` |
| `source` | `any` |
| `additionalInfo?` | [`FunctionAdditionalInfo`](FunctionAdditionalInfo.md) |

#### Returns

`void`

#### Defined in

[src/lib/model/domain/services.ts:17](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L17)

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

#### Defined in

[src/lib/model/domain/services.ts:19](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L19)

___

### addLibrary

▸ **addLibrary**(`library`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `library` | [`Library`](Library.md) |

#### Returns

`void`

#### Defined in

[src/lib/model/domain/services.ts:21](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L21)

___

### addOperator

▸ **addOperator**(`sing`, `source`, `additionalInfo`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sing` | `string` |
| `source` | `any` |
| `additionalInfo` | [`OperatorAdditionalInfo`](OperatorAdditionalInfo.md) |

#### Returns

`void`

#### Defined in

[src/lib/model/domain/services.ts:16](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L16)

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

#### Defined in

[src/lib/model/domain/services.ts:18](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L18)

___

### getConstantValue

▸ **getConstantValue**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Defined in

[src/lib/model/domain/services.ts:22](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L22)

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

[src/lib/model/domain/services.ts:24](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L24)

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

[src/lib/model/domain/services.ts:23](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L23)

___

### getFormat

▸ **getFormat**(`name`): `undefined` \| [`Format`](Format.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Format`](Format.md)

#### Defined in

[src/lib/model/domain/services.ts:25](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L25)

___

### getFunction

▸ **getFunction**(`name`): [`OperatorMetadata`](OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`OperatorMetadata`](OperatorMetadata.md)

#### Defined in

[src/lib/model/domain/services.ts:27](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L27)

___

### getOperator

▸ **getOperator**(`operator`, `operands?`): [`OperatorMetadata`](OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | `string` |
| `operands?` | `number` |

#### Returns

[`OperatorMetadata`](OperatorMetadata.md)

#### Defined in

[src/lib/model/domain/services.ts:26](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L26)

___

### isConstant

▸ **isConstant**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/lib/model/domain/services.ts:30](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L30)

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

[src/lib/model/domain/services.ts:29](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L29)

___

### isFunction

▸ **isFunction**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/lib/model/domain/services.ts:32](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L32)

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

#### Defined in

[src/lib/model/domain/services.ts:31](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L31)

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

[src/lib/model/domain/services.ts:28](https://github.com/FlavioLionelRita/3xpr/blob/911c547/src/lib/model/domain/services.ts#L28)
