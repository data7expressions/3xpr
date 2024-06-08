[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / Expressions

# Interface: Expressions

## Extends

- [`ModelService`](ModelService.md).[`Executor`](Executor.md).[`OperandFacade`](OperandFacade.md).[`ExpressionConvert`](ExpressionConvert.md).[`ExpressionListener`](ExpressionListener.md)

## Properties

### constBuilder

> **constBuilder**: [`ConstBuilder`](ConstBuilder.md)

#### Inherited from

[`OperandFacade`](OperandFacade.md).[`constBuilder`](OperandFacade.md#constbuilder)

#### Source

[src/lib/operand/domain/services.ts:39](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L39)

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

#### Inherited from

[`ModelService`](ModelService.md).[`addConstant`](ModelService.md#addconstant)

#### Source

[src/lib/model/domain/services.ts:14](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L14)

***

### addConvert()

> **addConvert**(`key`, `converter`): [`ExpressionConvert`](ExpressionConvert.md)

#### Parameters

• **key**: `string`

• **converter**: [`ExpressionConverter`](ExpressionConverter.md)

#### Returns

[`ExpressionConvert`](ExpressionConvert.md)

#### Inherited from

[`ExpressionConvert`](ExpressionConvert.md).[`addConvert`](ExpressionConvert.md#addconvert)

#### Source

[src/lib/expression/domain/expressions.ts:20](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/domain/expressions.ts#L20)

***

### addEnum()

> **addEnum**(`name`, `values`): `void`

#### Parameters

• **name**: `string`

• **values**: `any`

#### Returns

`void`

#### Inherited from

[`ModelService`](ModelService.md).[`addEnum`](ModelService.md#addenum)

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

#### Inherited from

[`ModelService`](ModelService.md).[`addFormat`](ModelService.md#addformat)

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

#### Inherited from

[`ModelService`](ModelService.md).[`addFunction`](ModelService.md#addfunction)

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

#### Inherited from

[`ModelService`](ModelService.md).[`addFunctionAlias`](ModelService.md#addfunctionalias)

#### Source

[src/lib/model/domain/services.ts:19](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L19)

***

### addLibrary()

> **addLibrary**(`library`): `void`

#### Parameters

• **library**: [`Library`](Library.md)

#### Returns

`void`

#### Inherited from

[`ModelService`](ModelService.md).[`addLibrary`](ModelService.md#addlibrary)

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

#### Inherited from

[`ModelService`](ModelService.md).[`addOperator`](ModelService.md#addoperator)

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

#### Inherited from

[`ModelService`](ModelService.md).[`addOperatorAlias`](ModelService.md#addoperatoralias)

#### Source

[src/lib/model/domain/services.ts:18](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L18)

***

### build()

> **build**(`expression`, `key`?): [`Operand`](../classes/Operand.md)

#### Parameters

• **expression**: `string`

• **key?**: `string`

#### Returns

[`Operand`](../classes/Operand.md)

#### Inherited from

[`OperandFacade`](OperandFacade.md).[`build`](OperandFacade.md#build)

#### Source

[src/lib/operand/domain/services.ts:43](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L43)

***

### clone()

> **clone**(`source`, `key`?): [`Operand`](../classes/Operand.md)

#### Parameters

• **source**: [`Operand`](../classes/Operand.md)

• **key?**: `string`

#### Returns

[`Operand`](../classes/Operand.md)

#### Inherited from

[`OperandFacade`](OperandFacade.md).[`clone`](OperandFacade.md#clone)

#### Source

[src/lib/operand/domain/services.ts:35](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L35)

***

### convert()

> **convert**(`source`, `from`): [`string`, `any`]

#### Parameters

• **source**: `any`

• **from**: `string`

#### Returns

[`string`, `any`]

#### Inherited from

[`ExpressionConvert`](ExpressionConvert.md).[`convert`](ExpressionConvert.md#convert)

#### Source

[src/lib/expression/domain/expressions.ts:22](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/domain/expressions.ts#L22)

***

### eval()

> **eval**(`expression`, `data`?): `any`

#### Parameters

• **expression**: `string`

• **data?**: `any`

#### Returns

`any`

#### Inherited from

[`Executor`](Executor.md).[`eval`](Executor.md#eval)

#### Source

[src/lib/expression/domain/expressions.ts:6](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/domain/expressions.ts#L6)

***

### evalAsync()

> **evalAsync**(`expression`, `data`?): `Promise`\<`any`\>

#### Parameters

• **expression**: `string`

• **data?**: `any`

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`Executor`](Executor.md).[`evalAsync`](Executor.md#evalasync)

#### Source

[src/lib/expression/domain/expressions.ts:7](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/domain/expressions.ts#L7)

***

### execute()

> **execute**(`task`, `data`?): `Promise`\<`any`\>

#### Parameters

• **task**: `string`

• **data?**: `any`

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`Executor`](Executor.md).[`execute`](Executor.md#execute)

#### Source

[src/lib/expression/domain/expressions.ts:8](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/domain/expressions.ts#L8)

***

### getBuilder()

> **getBuilder**(`key`): [`OperandBuilder`](OperandBuilder.md)

#### Parameters

• **key**: `string`

#### Returns

[`OperandBuilder`](OperandBuilder.md)

#### Inherited from

[`OperandFacade`](OperandFacade.md).[`getBuilder`](OperandFacade.md#getbuilder)

#### Source

[src/lib/operand/domain/services.ts:40](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L40)

***

### getConstantValue()

> **getConstantValue**(`name`): `any`

#### Parameters

• **name**: `string`

#### Returns

`any`

#### Inherited from

[`ModelService`](ModelService.md).[`getConstantValue`](ModelService.md#getconstantvalue)

#### Source

[src/lib/model/domain/services.ts:22](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L22)

***

### getConvert()

> **getConvert**(`key`): [`ExpressionConverter`](ExpressionConverter.md)

#### Parameters

• **key**: `string`

#### Returns

[`ExpressionConverter`](ExpressionConverter.md)

#### Inherited from

[`ExpressionConvert`](ExpressionConvert.md).[`getConvert`](ExpressionConvert.md#getconvert)

#### Source

[src/lib/expression/domain/expressions.ts:21](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/domain/expressions.ts#L21)

***

### getEnum()

> **getEnum**(`name`): `any`

#### Parameters

• **name**: `string`

#### Returns

`any`

#### Inherited from

[`ModelService`](ModelService.md).[`getEnum`](ModelService.md#getenum)

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

#### Inherited from

[`ModelService`](ModelService.md).[`getEnumValue`](ModelService.md#getenumvalue)

#### Source

[src/lib/model/domain/services.ts:23](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L23)

***

### getFormat()

> **getFormat**(`name`): `undefined` \| [`Format`](Format.md)

#### Parameters

• **name**: `string`

#### Returns

`undefined` \| [`Format`](Format.md)

#### Inherited from

[`ModelService`](ModelService.md).[`getFormat`](ModelService.md#getformat)

#### Source

[src/lib/model/domain/services.ts:25](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L25)

***

### getFunction()

> **getFunction**(`name`): [`OperatorMetadata`](OperatorMetadata.md)

#### Parameters

• **name**: `string`

#### Returns

[`OperatorMetadata`](OperatorMetadata.md)

#### Inherited from

[`ModelService`](ModelService.md).[`getFunction`](ModelService.md#getfunction)

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

#### Inherited from

[`ModelService`](ModelService.md).[`getOperator`](ModelService.md#getoperator)

#### Source

[src/lib/model/domain/services.ts:26](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L26)

***

### isConstant()

> **isConstant**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Inherited from

[`ModelService`](ModelService.md).[`isConstant`](ModelService.md#isconstant)

#### Source

[src/lib/model/domain/services.ts:30](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L30)

***

### isEnum()

> **isEnum**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Inherited from

[`ModelService`](ModelService.md).[`isEnum`](ModelService.md#isenum)

#### Source

[src/lib/model/domain/services.ts:29](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L29)

***

### isFunction()

> **isFunction**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Inherited from

[`ModelService`](ModelService.md).[`isFunction`](ModelService.md#isfunction)

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

#### Inherited from

[`ModelService`](ModelService.md).[`isOperator`](ModelService.md#isoperator)

#### Source

[src/lib/model/domain/services.ts:31](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L31)

***

### parameters()

> **parameters**(`expression`): [`Parameter`](Parameter.md)[]

#### Parameters

• **expression**: `string`

#### Returns

[`Parameter`](Parameter.md)[]

#### Inherited from

[`OperandFacade`](OperandFacade.md).[`parameters`](OperandFacade.md#parameters)

#### Source

[src/lib/operand/domain/services.ts:41](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L41)

***

### priority()

> **priority**(`name`, `cardinality`?): `number`

#### Parameters

• **name**: `string`

• **cardinality?**: `number`

#### Returns

`number`

#### Inherited from

[`ModelService`](ModelService.md).[`priority`](ModelService.md#priority)

#### Source

[src/lib/model/domain/services.ts:28](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/model/domain/services.ts#L28)

***

### subscribe()

> **subscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

#### Inherited from

[`ExpressionListener`](ExpressionListener.md).[`subscribe`](ExpressionListener.md#subscribe)

#### Source

[src/lib/expression/domain/expressions.ts:12](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/domain/expressions.ts#L12)

***

### type()

> **type**(`expression`): `string`

#### Parameters

• **expression**: `string`

#### Returns

`string`

#### Inherited from

[`OperandFacade`](OperandFacade.md).[`type`](OperandFacade.md#type)

#### Source

[src/lib/operand/domain/services.ts:42](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/domain/services.ts#L42)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](../classes/ActionObserver.md)

#### Returns

`void`

#### Inherited from

[`ExpressionListener`](ExpressionListener.md).[`unsubscribe`](ExpressionListener.md#unsubscribe)

#### Source

[src/lib/expression/domain/expressions.ts:13](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/domain/expressions.ts#L13)
