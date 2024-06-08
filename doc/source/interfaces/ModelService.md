[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / ModelService

# Interface: ModelService

## Extended by

- [`Expressions`](Expressions.md)

## Accessors

### constants

> `get` **constants**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Source

[src/lib/model/domain/services.ts:9](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L9)

***

### enums

> `get` **enums**(): [`string`, [`string`, `any`][]][]

#### Returns

[`string`, [`string`, `any`][]][]

#### Source

[src/lib/model/domain/services.ts:7](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L7)

***

### formats

> `get` **formats**(): [`string`, [`Format`](Format.md)][]

#### Returns

[`string`, [`Format`](Format.md)][]

#### Source

[src/lib/model/domain/services.ts:8](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L8)

***

### functionAlias

> `get` **functionAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Source

[src/lib/model/domain/services.ts:6](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L6)

***

### functions

> `get` **functions**(): [`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Source

[src/lib/model/domain/services.ts:11](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L11)

***

### operatorAlias

> `get` **operatorAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Source

[src/lib/model/domain/services.ts:5](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L5)

***

### operators

> `get` **operators**(): [`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Source

[src/lib/model/domain/services.ts:10](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L10)

## Methods

### addConstant()

> **addConstant**(`key`, `value`): `void`

#### Parameters

• **key**: `string`

• **value**: `any`

#### Returns

`void`

#### Source

[src/lib/model/domain/services.ts:14](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L14)

***

### addEnum()

> **addEnum**(`name`, `values`): `void`

#### Parameters

• **name**: `string`

• **values**: `any`

#### Returns

`void`

#### Source

[src/lib/model/domain/services.ts:13](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L13)

***

### addFormat()

> **addFormat**(`key`, `pattern`): `void`

#### Parameters

• **key**: `string`

• **pattern**: `string`

#### Returns

`void`

#### Source

[src/lib/model/domain/services.ts:15](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L15)

***

### addFunction()

> **addFunction**(`sing`, `source`, `additionalInfo`): `void`

#### Parameters

• **sing**: `string`

• **source**: `any`

• **additionalInfo**: [`FunctionAdditionalInfo`](FunctionAdditionalInfo.md)

#### Returns

`void`

#### Source

[src/lib/model/domain/services.ts:17](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L17)

***

### addFunctionAlias()

> **addFunctionAlias**(`alias`, `reference`): `void`

#### Parameters

• **alias**: `string`

• **reference**: `string`

#### Returns

`void`

#### Source

[src/lib/model/domain/services.ts:19](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L19)

***

### addLibrary()

> **addLibrary**(`library`): `void`

#### Parameters

• **library**: [`Library`](Library.md)

#### Returns

`void`

#### Source

[src/lib/model/domain/services.ts:21](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L21)

***

### addOperator()

> **addOperator**(`sing`, `source`, `additionalInfo`): `void`

#### Parameters

• **sing**: `string`

• **source**: `any`

• **additionalInfo**: [`OperatorAdditionalInfo`](OperatorAdditionalInfo.md)

#### Returns

`void`

#### Source

[src/lib/model/domain/services.ts:16](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L16)

***

### addOperatorAlias()

> **addOperatorAlias**(`alias`, `reference`): `void`

#### Parameters

• **alias**: `string`

• **reference**: `string`

#### Returns

`void`

#### Source

[src/lib/model/domain/services.ts:18](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L18)

***

### getConstantValue()

> **getConstantValue**(`name`): `any`

#### Parameters

• **name**: `string`

#### Returns

`any`

#### Source

[src/lib/model/domain/services.ts:22](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L22)

***

### getEnum()

> **getEnum**(`name`): `any`

#### Parameters

• **name**: `string`

#### Returns

`any`

#### Source

[src/lib/model/domain/services.ts:24](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L24)

***

### getEnumValue()

> **getEnumValue**(`name`, `option`): `any`

#### Parameters

• **name**: `string`

• **option**: `string`

#### Returns

`any`

#### Source

[src/lib/model/domain/services.ts:23](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L23)

***

### getFormat()

> **getFormat**(`name`): `undefined` \| [`Format`](Format.md)

#### Parameters

• **name**: `string`

#### Returns

`undefined` \| [`Format`](Format.md)

#### Source

[src/lib/model/domain/services.ts:25](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L25)

***

### getFunction()

> **getFunction**(`name`): [`OperatorMetadata`](OperatorMetadata.md)

#### Parameters

• **name**: `string`

#### Returns

[`OperatorMetadata`](OperatorMetadata.md)

#### Source

[src/lib/model/domain/services.ts:27](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L27)

***

### getOperator()

> **getOperator**(`operator`, `operands`?): [`OperatorMetadata`](OperatorMetadata.md)

#### Parameters

• **operator**: `string`

• **operands?**: `number`

#### Returns

[`OperatorMetadata`](OperatorMetadata.md)

#### Source

[src/lib/model/domain/services.ts:26](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L26)

***

### isConstant()

> **isConstant**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Source

[src/lib/model/domain/services.ts:30](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L30)

***

### isEnum()

> **isEnum**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Source

[src/lib/model/domain/services.ts:29](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L29)

***

### isFunction()

> **isFunction**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Source

[src/lib/model/domain/services.ts:32](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L32)

***

### isOperator()

> **isOperator**(`name`, `operands`?): `boolean`

#### Parameters

• **name**: `string`

• **operands?**: `number`

#### Returns

`boolean`

#### Source

[src/lib/model/domain/services.ts:31](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L31)

***

### priority()

> **priority**(`name`, `cardinality`?): `number`

#### Parameters

• **name**: `string`

• **cardinality?**: `number`

#### Returns

`number`

#### Source

[src/lib/model/domain/services.ts:28](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L28)
