[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / ExpressionsImpl

# Class: ExpressionsImpl

## Implements

- [`Expressions`](../interfaces/Expressions.md)

## Constructors

### new ExpressionsImpl()

> **new ExpressionsImpl**(`model`, `expressionConvert`, `operandFacade`, `executor`, `listener`): [`ExpressionsImpl`](ExpressionsImpl.md)

#### Parameters

• **model**: [`ModelService`](../interfaces/ModelService.md)

• **expressionConvert**: [`ExpressionConvert`](../interfaces/ExpressionConvert.md)

• **operandFacade**: [`OperandFacade`](../interfaces/OperandFacade.md)

• **executor**: [`Executor`](../interfaces/Executor.md)

• **listener**: [`ExpressionListener`](../interfaces/ExpressionListener.md)

#### Returns

[`ExpressionsImpl`](ExpressionsImpl.md)

#### Source

[src/lib/expression/application/expressions.ts:8](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L8)

## Accessors

### constBuilder

> `get` **constBuilder**(): [`ConstBuilder`](../interfaces/ConstBuilder.md)

#### Returns

[`ConstBuilder`](../interfaces/ConstBuilder.md)

#### Source

[src/lib/expression/application/expressions.ts:118](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L118)

***

### constants

> `get` **constants**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Source

[src/lib/expression/application/expressions.ts:34](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L34)

***

### enums

> `get` **enums**(): [`string`, [`string`, `any`][]][]

#### Returns

[`string`, [`string`, `any`][]][]

#### Source

[src/lib/expression/application/expressions.ts:26](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L26)

***

### formats

> `get` **formats**(): [`string`, [`Format`](../interfaces/Format.md)][]

#### Returns

[`string`, [`Format`](../interfaces/Format.md)][]

#### Source

[src/lib/expression/application/expressions.ts:30](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L30)

***

### functionAlias

> `get` **functionAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Source

[src/lib/expression/application/expressions.ts:18](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L18)

***

### functions

> `get` **functions**(): [`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Source

[src/lib/expression/application/expressions.ts:38](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L38)

***

### operatorAlias

> `get` **operatorAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Source

[src/lib/expression/application/expressions.ts:14](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L14)

***

### operators

> `get` **operators**(): [`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Source

[src/lib/expression/application/expressions.ts:22](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L22)

## Methods

### addConstant()

> **addConstant**(`key`, `value`): `void`

#### Parameters

• **key**: `string`

• **value**: `any`

#### Returns

`void`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`addConstant`](../interfaces/Expressions.md#addconstant)

#### Source

[src/lib/expression/application/expressions.ts:58](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L58)

***

### addConvert()

> **addConvert**(`key`, `converter`): [`ExpressionConvert`](../interfaces/ExpressionConvert.md)

#### Parameters

• **key**: `string`

• **converter**: [`ExpressionConverter`](../interfaces/ExpressionConverter.md)

#### Returns

[`ExpressionConvert`](../interfaces/ExpressionConvert.md)

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`addConvert`](../interfaces/Expressions.md#addconvert)

#### Source

[src/lib/expression/application/expressions.ts:173](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L173)

***

### addEnum()

> **addEnum**(`key`, `values`): `void`

#### Parameters

• **key**: `string`

• **values**: `any`

#### Returns

`void`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`addEnum`](../interfaces/Expressions.md#addenum)

#### Source

[src/lib/expression/application/expressions.ts:50](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L50)

***

### addFormat()

> **addFormat**(`key`, `pattern`): `void`

#### Parameters

• **key**: `string`

• **pattern**: `string`

#### Returns

`void`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`addFormat`](../interfaces/Expressions.md#addformat)

#### Source

[src/lib/expression/application/expressions.ts:54](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L54)

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

[`Expressions`](../interfaces/Expressions.md).[`addFunction`](../interfaces/Expressions.md#addfunction)

#### Source

[src/lib/expression/application/expressions.ts:46](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L46)

***

### addFunctionAlias()

> **addFunctionAlias**(`alias`, `reference`): `void`

#### Parameters

• **alias**: `string`

• **reference**: `string`

#### Returns

`void`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`addFunctionAlias`](../interfaces/Expressions.md#addfunctionalias)

#### Source

[src/lib/expression/application/expressions.ts:66](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L66)

***

### addLibrary()

> **addLibrary**(`library`): `void`

#### Parameters

• **library**: [`Library`](../interfaces/Library.md)

#### Returns

`void`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`addLibrary`](../interfaces/Expressions.md#addlibrary)

#### Source

[src/lib/expression/application/expressions.ts:70](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L70)

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

[`Expressions`](../interfaces/Expressions.md).[`addOperator`](../interfaces/Expressions.md#addoperator)

#### Source

[src/lib/expression/application/expressions.ts:42](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L42)

***

### addOperatorAlias()

> **addOperatorAlias**(`alias`, `reference`): `void`

#### Parameters

• **alias**: `string`

• **reference**: `string`

#### Returns

`void`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`addOperatorAlias`](../interfaces/Expressions.md#addoperatoralias)

#### Source

[src/lib/expression/application/expressions.ts:62](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L62)

***

### build()

> **build**(`expression`, `key`?): [`Operand`](Operand.md)

#### Parameters

• **expression**: `string`

• **key?**: `string`

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`build`](../interfaces/Expressions.md#build)

#### Source

[src/lib/expression/application/expressions.ts:144](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L144)

***

### clone()

> **clone**(`source`, `key`?): [`Operand`](Operand.md)

#### Parameters

• **source**: [`Operand`](Operand.md)

• **key?**: `string`

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`clone`](../interfaces/Expressions.md#clone)

#### Source

[src/lib/expression/application/expressions.ts:148](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L148)

***

### convert()

> **convert**(`source`, `from`): [`string`, `any`]

#### Parameters

• **source**: `any`

• **from**: `string`

#### Returns

[`string`, `any`]

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`convert`](../interfaces/Expressions.md#convert)

#### Source

[src/lib/expression/application/expressions.ts:182](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L182)

***

### eval()

> **eval**(`expression`, `data`?): `any`

Evaluate and solve expression

#### Parameters

• **expression**: `string`

string expression

• **data?**: `any`

Data with variables

#### Returns

`any`

Result of the evaluate expression

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`eval`](../interfaces/Expressions.md#eval)

#### Source

[src/lib/expression/application/expressions.ts:158](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L158)

***

### evalAsync()

> **evalAsync**(`expression`, `data`): `Promise`\<`any`\>

#### Parameters

• **expression**: `string`

• **data**: `any`= `{}`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`evalAsync`](../interfaces/Expressions.md#evalasync)

#### Source

[src/lib/expression/application/expressions.ts:163](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L163)

***

### execute()

> **execute**(`task`, `data`): `Promise`\<`any`\>

#### Parameters

• **task**: `string`

• **data**: `any`= `{}`

#### Returns

`Promise`\<`any`\>

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`execute`](../interfaces/Expressions.md#execute)

#### Source

[src/lib/expression/application/expressions.ts:168](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L168)

***

### getBuilder()

> **getBuilder**(`key`): [`OperandBuilder`](../interfaces/OperandBuilder.md)

#### Parameters

• **key**: `string`

#### Returns

[`OperandBuilder`](../interfaces/OperandBuilder.md)

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`getBuilder`](../interfaces/Expressions.md#getbuilder)

#### Source

[src/lib/expression/application/expressions.ts:122](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L122)

***

### getConstantValue()

> **getConstantValue**(`name`): `any`

#### Parameters

• **name**: `string`

#### Returns

`any`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`getConstantValue`](../interfaces/Expressions.md#getconstantvalue)

#### Source

[src/lib/expression/application/expressions.ts:74](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L74)

***

### getConvert()

> **getConvert**(`key`): [`ExpressionConverter`](../interfaces/ExpressionConverter.md)

#### Parameters

• **key**: `string`

#### Returns

[`ExpressionConverter`](../interfaces/ExpressionConverter.md)

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`getConvert`](../interfaces/Expressions.md#getconvert)

#### Source

[src/lib/expression/application/expressions.ts:178](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L178)

***

### getEnum()

> **getEnum**(`name`): `any`

#### Parameters

• **name**: `string`

#### Returns

`any`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`getEnum`](../interfaces/Expressions.md#getenum)

#### Source

[src/lib/expression/application/expressions.ts:82](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L82)

***

### getEnumValue()

> **getEnumValue**(`name`, `option`): `any`

#### Parameters

• **name**: `string`

• **option**: `string`

#### Returns

`any`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`getEnumValue`](../interfaces/Expressions.md#getenumvalue)

#### Source

[src/lib/expression/application/expressions.ts:78](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L78)

***

### getFormat()

> **getFormat**(`name`): `undefined` \| [`Format`](../interfaces/Format.md)

#### Parameters

• **name**: `string`

#### Returns

`undefined` \| [`Format`](../interfaces/Format.md)

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`getFormat`](../interfaces/Expressions.md#getformat)

#### Source

[src/lib/expression/application/expressions.ts:86](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L86)

***

### getFunction()

> **getFunction**(`name`): [`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Parameters

• **name**: `string`

#### Returns

[`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`getFunction`](../interfaces/Expressions.md#getfunction)

#### Source

[src/lib/expression/application/expressions.ts:94](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L94)

***

### getOperator()

> **getOperator**(`operator`, `operands`?): [`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Parameters

• **operator**: `string`

• **operands?**: `number`

#### Returns

[`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`getOperator`](../interfaces/Expressions.md#getoperator)

#### Source

[src/lib/expression/application/expressions.ts:90](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L90)

***

### isConstant()

> **isConstant**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`isConstant`](../interfaces/Expressions.md#isconstant)

#### Source

[src/lib/expression/application/expressions.ts:106](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L106)

***

### isEnum()

> **isEnum**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`isEnum`](../interfaces/Expressions.md#isenum)

#### Source

[src/lib/expression/application/expressions.ts:102](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L102)

***

### isFunction()

> **isFunction**(`name`): `boolean`

#### Parameters

• **name**: `string`

#### Returns

`boolean`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`isFunction`](../interfaces/Expressions.md#isfunction)

#### Source

[src/lib/expression/application/expressions.ts:114](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L114)

***

### isOperator()

> **isOperator**(`name`, `operands`?): `boolean`

#### Parameters

• **name**: `string`

• **operands?**: `number`

#### Returns

`boolean`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`isOperator`](../interfaces/Expressions.md#isoperator)

#### Source

[src/lib/expression/application/expressions.ts:110](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L110)

***

### parameters()

> **parameters**(`expression`): [`Parameter`](../interfaces/Parameter.md)[]

Get parameters of expression

#### Parameters

• **expression**: `string`

expression

#### Returns

[`Parameter`](../interfaces/Parameter.md)[]

Parameters of expression

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`parameters`](../interfaces/Expressions.md#parameters)

#### Source

[src/lib/expression/application/expressions.ts:131](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L131)

***

### priority()

> **priority**(`name`, `cardinality`?): `number`

#### Parameters

• **name**: `string`

• **cardinality?**: `number`

#### Returns

`number`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`priority`](../interfaces/Expressions.md#priority)

#### Source

[src/lib/expression/application/expressions.ts:98](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L98)

***

### subscribe()

> **subscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](ActionObserver.md)

#### Returns

`void`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`subscribe`](../interfaces/Expressions.md#subscribe)

#### Source

[src/lib/expression/application/expressions.ts:187](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L187)

***

### type()

> **type**(`expression`): `string`

Get type of expression

#### Parameters

• **expression**: `string`

expression

#### Returns

`string`

Type of expression

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`type`](../interfaces/Expressions.md#type)

#### Source

[src/lib/expression/application/expressions.ts:140](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L140)

***

### unsubscribe()

> **unsubscribe**(`observer`): `void`

#### Parameters

• **observer**: [`ActionObserver`](ActionObserver.md)

#### Returns

`void`

#### Implementation of

[`Expressions`](../interfaces/Expressions.md).[`unsubscribe`](../interfaces/Expressions.md#unsubscribe)

#### Source

[src/lib/expression/application/expressions.ts:191](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/expression/application/expressions.ts#L191)
