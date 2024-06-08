[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / ModelServiceImpl

# Class: ModelServiceImpl

## Implements

- [`ModelService`](../interfaces/ModelService.md)

## Constructors

### new ModelServiceImpl()

> **new ModelServiceImpl**(): [`ModelServiceImpl`](ModelServiceImpl.md)

#### Returns

[`ModelServiceImpl`](ModelServiceImpl.md)

#### Source

[src/lib/model/application/modelService.ts:13](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L13)

## Properties

### \_functionAlias

> **\_functionAlias**: `any`

#### Source

[src/lib/model/application/modelService.ts:12](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L12)

***

### \_operatorAlias

> **\_operatorAlias**: `any`

#### Source

[src/lib/model/application/modelService.ts:11](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L11)

## Accessors

### constants

> `get` **constants**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Source

[src/lib/model/application/modelService.ts:31](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L31)

***

### enums

> `get` **enums**(): [`string`, [`string`, `any`][]][]

#### Returns

[`string`, [`string`, `any`][]][]

#### Source

[src/lib/model/application/modelService.ts:39](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L39)

***

### formats

> `get` **formats**(): [`string`, [`Format`](../interfaces/Format.md)][]

#### Returns

[`string`, [`Format`](../interfaces/Format.md)][]

#### Source

[src/lib/model/application/modelService.ts:35](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L35)

***

### functionAlias

> `get` **functionAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Source

[src/lib/model/application/modelService.ts:27](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L27)

***

### functions

> `get` **functions**(): [`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Source

[src/lib/model/application/modelService.ts:59](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L59)

***

### operatorAlias

> `get` **operatorAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Source

[src/lib/model/application/modelService.ts:23](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L23)

***

### operators

> `get` **operators**(): [`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Source

[src/lib/model/application/modelService.ts:43](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L43)

## Methods

### addConstant()

> **addConstant**(`key`, `value`): `void`

#### Parameters

• **key**: `string`

• **value**: `any`

#### Returns

`void`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`addConstant`](../interfaces/ModelService.md#addconstant)

#### Source

[src/lib/model/application/modelService.ts:89](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L89)

***

### addEnum()

> **addEnum**(`name`, `values`): `void`

#### Parameters

• **name**: `string`

• **values**: `any`

#### Returns

`void`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`addEnum`](../interfaces/ModelService.md#addenum)

#### Source

[src/lib/model/application/modelService.ts:69](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L69)

***

### addFormat()

> **addFormat**(`key`, `pattern`): `void`

#### Parameters

• **key**: `string`

• **pattern**: `string`

#### Returns

`void`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`addFormat`](../interfaces/ModelService.md#addformat)

#### Source

[src/lib/model/application/modelService.ts:85](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L85)

***

### addFunction()

> **addFunction**(`sing`, `source`, `additionalInfo`): `void`

#### Parameters

• **sing**: `string`

• **source**: `any`

• **additionalInfo**: [`FunctionAdditionalInfo`](../interfaces/FunctionAdditionalInfo.md)

#### Returns

`void`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`addFunction`](../interfaces/ModelService.md#addfunction)

#### Source

[src/lib/model/application/modelService.ts:132](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L132)

***

### addFunctionAlias()

> **addFunctionAlias**(`alias`, `reference`): `void`

#### Parameters

• **alias**: `string`

• **reference**: `string`

#### Returns

`void`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`addFunctionAlias`](../interfaces/ModelService.md#addfunctionalias)

#### Source

[src/lib/model/application/modelService.ts:97](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L97)

***

### addLibrary()

> **addLibrary**(`library`): `void`

#### Parameters

• **library**: [`Library`](../interfaces/Library.md)

#### Returns

`void`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`addLibrary`](../interfaces/ModelService.md#addlibrary)

#### Source

[src/lib/model/application/modelService.ts:101](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L101)

***

### addOperator()

> **addOperator**(`sing`, `source`, `additionalInfo`): `void`

#### Parameters

• **sing**: `string`

• **source**: `any`

• **additionalInfo**: [`OperatorAdditionalInfo`](../interfaces/OperatorAdditionalInfo.md)

#### Returns

`void`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`addOperator`](../interfaces/ModelService.md#addoperator)

#### Source

[src/lib/model/application/modelService.ts:105](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L105)

***

### addOperatorAlias()

> **addOperatorAlias**(`alias`, `reference`): `void`

#### Parameters

• **alias**: `string`

• **reference**: `string`

#### Returns

`void`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`addOperatorAlias`](../interfaces/ModelService.md#addoperatoralias)

#### Source

[src/lib/model/application/modelService.ts:93](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L93)

***

### getConstantValue()

> **getConstantValue**(`name`): `any`

#### Parameters

• **name**: `string`

#### Returns

`any`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`getConstantValue`](../interfaces/ModelService.md#getconstantvalue)

#### Source

[src/lib/model/application/modelService.ts:171](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L171)

***

### getEnum()

> **getEnum**(`name`): [`string`, `any`][]

#### Parameters

• **name**: `string`

#### Returns

[`string`, `any`][]

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`getEnum`](../interfaces/ModelService.md#getenum)

#### Source

[src/lib/model/application/modelService.ts:167](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L167)

***

### getEnumValue()

> **getEnumValue**(`name`, `option`): `any`

#### Parameters

• **name**: `string`

• **option**: `string`

#### Returns

`any`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`getEnumValue`](../interfaces/ModelService.md#getenumvalue)

#### Source

[src/lib/model/application/modelService.ts:155](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L155)

***

### getFormat()

> **getFormat**(`name`): `undefined` \| [`Format`](../interfaces/Format.md)

#### Parameters

• **name**: `string`

#### Returns

`undefined` \| [`Format`](../interfaces/Format.md)

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`getFormat`](../interfaces/ModelService.md#getformat)

#### Source

[src/lib/model/application/modelService.ts:175](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L175)

***

### getFunction()

> **getFunction**(`name`): [`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Parameters

• **name**: `string`

#### Returns

[`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`getFunction`](../interfaces/ModelService.md#getfunction)

#### Source

[src/lib/model/application/modelService.ts:203](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L203)

***

### getOperator()

> **getOperator**(`name`, `operands`?): [`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Parameters

• **name**: `string`

• **operands?**: `number`

#### Returns

[`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`getOperator`](../interfaces/ModelService.md#getoperator)

#### Source

[src/lib/model/application/modelService.ts:179](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L179)

***

### isConstant()

> **isConstant**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`isConstant`](../interfaces/ModelService.md#isconstant)

#### Source

[src/lib/model/application/modelService.ts:221](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L221)

***

### isEnum()

> **isEnum**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`isEnum`](../interfaces/ModelService.md#isenum)

#### Source

[src/lib/model/application/modelService.ts:216](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L216)

***

### isFunction()

> **isFunction**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`isFunction`](../interfaces/ModelService.md#isfunction)

#### Source

[src/lib/model/application/modelService.ts:241](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L241)

***

### isOperator()

> **isOperator**(`name`, `operands`?): `boolean`

#### Parameters

• **name**: `string`

• **operands?**: `number`

#### Returns

`boolean`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`isOperator`](../interfaces/ModelService.md#isoperator)

#### Source

[src/lib/model/application/modelService.ts:225](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L225)

***

### priority()

> **priority**(`name`, `cardinality`?): `number`

#### Parameters

• **name**: `string`

• **cardinality?**: `number`

#### Returns

`number`

#### Implementation of

[`ModelService`](../interfaces/ModelService.md).[`priority`](../interfaces/ModelService.md#priority)

#### Source

[src/lib/model/application/modelService.ts:245](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/application/modelService.ts#L245)
