[Expressions](../README.md) / ExpressionsImpl

# Class: ExpressionsImpl

## Implements

- [`Expressions`](../interfaces/Expressions.md)

## Table of contents

### Constructors

- [constructor](ExpressionsImpl.md#constructor)

### Accessors

- [constBuilder](ExpressionsImpl.md#constbuilder)
- [constants](ExpressionsImpl.md#constants)
- [enums](ExpressionsImpl.md#enums)
- [formats](ExpressionsImpl.md#formats)
- [functionAlias](ExpressionsImpl.md#functionalias)
- [functions](ExpressionsImpl.md#functions)
- [operatorAlias](ExpressionsImpl.md#operatoralias)
- [operators](ExpressionsImpl.md#operators)

### Methods

- [addConstant](ExpressionsImpl.md#addconstant)
- [addConvert](ExpressionsImpl.md#addconvert)
- [addEnum](ExpressionsImpl.md#addenum)
- [addFormat](ExpressionsImpl.md#addformat)
- [addFunction](ExpressionsImpl.md#addfunction)
- [addFunctionAlias](ExpressionsImpl.md#addfunctionalias)
- [addLibrary](ExpressionsImpl.md#addlibrary)
- [addOperator](ExpressionsImpl.md#addoperator)
- [addOperatorAlias](ExpressionsImpl.md#addoperatoralias)
- [build](ExpressionsImpl.md#build)
- [clone](ExpressionsImpl.md#clone)
- [convert](ExpressionsImpl.md#convert)
- [eval](ExpressionsImpl.md#eval)
- [evalAsync](ExpressionsImpl.md#evalasync)
- [execute](ExpressionsImpl.md#execute)
- [getBuilder](ExpressionsImpl.md#getbuilder)
- [getConstantValue](ExpressionsImpl.md#getconstantvalue)
- [getConvert](ExpressionsImpl.md#getconvert)
- [getEnum](ExpressionsImpl.md#getenum)
- [getEnumValue](ExpressionsImpl.md#getenumvalue)
- [getFormat](ExpressionsImpl.md#getformat)
- [getFunction](ExpressionsImpl.md#getfunction)
- [getOperator](ExpressionsImpl.md#getoperator)
- [isConstant](ExpressionsImpl.md#isconstant)
- [isEnum](ExpressionsImpl.md#isenum)
- [isFunction](ExpressionsImpl.md#isfunction)
- [isOperator](ExpressionsImpl.md#isoperator)
- [parameters](ExpressionsImpl.md#parameters)
- [priority](ExpressionsImpl.md#priority)
- [subscribe](ExpressionsImpl.md#subscribe)
- [type](ExpressionsImpl.md#type)
- [unsubscribe](ExpressionsImpl.md#unsubscribe)

## Constructors

### constructor

• **new ExpressionsImpl**(`model`, `expressionConvert`, `operandFacade`, `executor`, `listener`): [`ExpressionsImpl`](ExpressionsImpl.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`ModelService`](../interfaces/ModelService.md) |
| `expressionConvert` | [`ExpressionConvert`](../interfaces/ExpressionConvert.md) |
| `operandFacade` | [`OperandFacade`](../interfaces/OperandFacade.md) |
| `executor` | [`Executor`](../interfaces/Executor.md) |
| `listener` | [`ExpressionListener`](../interfaces/ExpressionListener.md) |

#### Returns

[`ExpressionsImpl`](ExpressionsImpl.md)

#### Defined in

[src/lib/expression/application/expressions.ts:8](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L8)

## Accessors

### constBuilder

• `get` **constBuilder**(): [`ConstBuilder`](../interfaces/ConstBuilder.md)

#### Returns

[`ConstBuilder`](../interfaces/ConstBuilder.md)

#### Implementation of

[Expressions](../interfaces/Expressions.md).[constBuilder](../interfaces/Expressions.md#constbuilder)

#### Defined in

[src/lib/expression/application/expressions.ts:118](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L118)

___

### constants

• `get` **constants**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Implementation of

Expressions.constants

#### Defined in

[src/lib/expression/application/expressions.ts:34](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L34)

___

### enums

• `get` **enums**(): [`string`, [`string`, `any`][]][]

#### Returns

[`string`, [`string`, `any`][]][]

#### Implementation of

Expressions.enums

#### Defined in

[src/lib/expression/application/expressions.ts:26](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L26)

___

### formats

• `get` **formats**(): [`string`, [`Format`](../interfaces/Format.md)][]

#### Returns

[`string`, [`Format`](../interfaces/Format.md)][]

#### Implementation of

Expressions.formats

#### Defined in

[src/lib/expression/application/expressions.ts:30](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L30)

___

### functionAlias

• `get` **functionAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Implementation of

Expressions.functionAlias

#### Defined in

[src/lib/expression/application/expressions.ts:18](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L18)

___

### functions

• `get` **functions**(): [`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Implementation of

Expressions.functions

#### Defined in

[src/lib/expression/application/expressions.ts:38](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L38)

___

### operatorAlias

• `get` **operatorAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Implementation of

Expressions.operatorAlias

#### Defined in

[src/lib/expression/application/expressions.ts:14](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L14)

___

### operators

• `get` **operators**(): [`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](../interfaces/OperatorMetadata.md)][]

#### Implementation of

Expressions.operators

#### Defined in

[src/lib/expression/application/expressions.ts:22](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L22)

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

[Expressions](../interfaces/Expressions.md).[addConstant](../interfaces/Expressions.md#addconstant)

#### Defined in

[src/lib/expression/application/expressions.ts:58](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L58)

___

### addConvert

▸ **addConvert**(`key`, `converter`): [`ExpressionConvert`](../interfaces/ExpressionConvert.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `converter` | [`ExpressionConverter`](../interfaces/ExpressionConverter.md) |

#### Returns

[`ExpressionConvert`](../interfaces/ExpressionConvert.md)

#### Implementation of

[Expressions](../interfaces/Expressions.md).[addConvert](../interfaces/Expressions.md#addconvert)

#### Defined in

[src/lib/expression/application/expressions.ts:173](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L173)

___

### addEnum

▸ **addEnum**(`key`, `values`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `values` | `any` |

#### Returns

`void`

#### Implementation of

[Expressions](../interfaces/Expressions.md).[addEnum](../interfaces/Expressions.md#addenum)

#### Defined in

[src/lib/expression/application/expressions.ts:50](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L50)

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

[Expressions](../interfaces/Expressions.md).[addFormat](../interfaces/Expressions.md#addformat)

#### Defined in

[src/lib/expression/application/expressions.ts:54](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L54)

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

[Expressions](../interfaces/Expressions.md).[addFunction](../interfaces/Expressions.md#addfunction)

#### Defined in

[src/lib/expression/application/expressions.ts:46](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L46)

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

[Expressions](../interfaces/Expressions.md).[addFunctionAlias](../interfaces/Expressions.md#addfunctionalias)

#### Defined in

[src/lib/expression/application/expressions.ts:66](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L66)

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

[Expressions](../interfaces/Expressions.md).[addLibrary](../interfaces/Expressions.md#addlibrary)

#### Defined in

[src/lib/expression/application/expressions.ts:70](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L70)

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

[Expressions](../interfaces/Expressions.md).[addOperator](../interfaces/Expressions.md#addoperator)

#### Defined in

[src/lib/expression/application/expressions.ts:42](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L42)

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

[Expressions](../interfaces/Expressions.md).[addOperatorAlias](../interfaces/Expressions.md#addoperatoralias)

#### Defined in

[src/lib/expression/application/expressions.ts:62](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L62)

___

### build

▸ **build**(`expression`, `key?`): [`Operand`](Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `key?` | `string` |

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[Expressions](../interfaces/Expressions.md).[build](../interfaces/Expressions.md#build)

#### Defined in

[src/lib/expression/application/expressions.ts:144](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L144)

___

### clone

▸ **clone**(`source`, `key?`): [`Operand`](Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Operand`](Operand.md) |
| `key?` | `string` |

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[Expressions](../interfaces/Expressions.md).[clone](../interfaces/Expressions.md#clone)

#### Defined in

[src/lib/expression/application/expressions.ts:148](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L148)

___

### convert

▸ **convert**(`source`, `from`): [`string`, `any`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `any` |
| `from` | `string` |

#### Returns

[`string`, `any`]

#### Implementation of

[Expressions](../interfaces/Expressions.md).[convert](../interfaces/Expressions.md#convert)

#### Defined in

[src/lib/expression/application/expressions.ts:182](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L182)

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

#### Implementation of

[Expressions](../interfaces/Expressions.md).[eval](../interfaces/Expressions.md#eval)

#### Defined in

[src/lib/expression/application/expressions.ts:158](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L158)

___

### evalAsync

▸ **evalAsync**(`expression`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[Expressions](../interfaces/Expressions.md).[evalAsync](../interfaces/Expressions.md#evalasync)

#### Defined in

[src/lib/expression/application/expressions.ts:163](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L163)

___

### execute

▸ **execute**(`task`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | `string` |
| `data` | `any` |

#### Returns

`Promise`\<`any`\>

#### Implementation of

[Expressions](../interfaces/Expressions.md).[execute](../interfaces/Expressions.md#execute)

#### Defined in

[src/lib/expression/application/expressions.ts:168](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L168)

___

### getBuilder

▸ **getBuilder**(`key`): [`OperandBuilder`](../interfaces/OperandBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`OperandBuilder`](../interfaces/OperandBuilder.md)

#### Implementation of

[Expressions](../interfaces/Expressions.md).[getBuilder](../interfaces/Expressions.md#getbuilder)

#### Defined in

[src/lib/expression/application/expressions.ts:122](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L122)

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

[Expressions](../interfaces/Expressions.md).[getConstantValue](../interfaces/Expressions.md#getconstantvalue)

#### Defined in

[src/lib/expression/application/expressions.ts:74](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L74)

___

### getConvert

▸ **getConvert**(`key`): [`ExpressionConverter`](../interfaces/ExpressionConverter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`ExpressionConverter`](../interfaces/ExpressionConverter.md)

#### Implementation of

[Expressions](../interfaces/Expressions.md).[getConvert](../interfaces/Expressions.md#getconvert)

#### Defined in

[src/lib/expression/application/expressions.ts:178](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L178)

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

[Expressions](../interfaces/Expressions.md).[getEnum](../interfaces/Expressions.md#getenum)

#### Defined in

[src/lib/expression/application/expressions.ts:82](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L82)

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

[Expressions](../interfaces/Expressions.md).[getEnumValue](../interfaces/Expressions.md#getenumvalue)

#### Defined in

[src/lib/expression/application/expressions.ts:78](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L78)

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

[Expressions](../interfaces/Expressions.md).[getFormat](../interfaces/Expressions.md#getformat)

#### Defined in

[src/lib/expression/application/expressions.ts:86](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L86)

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

[Expressions](../interfaces/Expressions.md).[getFunction](../interfaces/Expressions.md#getfunction)

#### Defined in

[src/lib/expression/application/expressions.ts:94](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L94)

___

### getOperator

▸ **getOperator**(`operator`, `operands?`): [`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | `string` |
| `operands?` | `number` |

#### Returns

[`OperatorMetadata`](../interfaces/OperatorMetadata.md)

#### Implementation of

[Expressions](../interfaces/Expressions.md).[getOperator](../interfaces/Expressions.md#getoperator)

#### Defined in

[src/lib/expression/application/expressions.ts:90](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L90)

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

[Expressions](../interfaces/Expressions.md).[isConstant](../interfaces/Expressions.md#isconstant)

#### Defined in

[src/lib/expression/application/expressions.ts:106](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L106)

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

[Expressions](../interfaces/Expressions.md).[isEnum](../interfaces/Expressions.md#isenum)

#### Defined in

[src/lib/expression/application/expressions.ts:102](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L102)

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

[Expressions](../interfaces/Expressions.md).[isFunction](../interfaces/Expressions.md#isfunction)

#### Defined in

[src/lib/expression/application/expressions.ts:114](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L114)

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

[Expressions](../interfaces/Expressions.md).[isOperator](../interfaces/Expressions.md#isoperator)

#### Defined in

[src/lib/expression/application/expressions.ts:110](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L110)

___

### parameters

▸ **parameters**(`expression`): [`Parameter`](../interfaces/Parameter.md)[]

Get parameters of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

[`Parameter`](../interfaces/Parameter.md)[]

Parameters of expression

#### Implementation of

[Expressions](../interfaces/Expressions.md).[parameters](../interfaces/Expressions.md#parameters)

#### Defined in

[src/lib/expression/application/expressions.ts:131](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L131)

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

[Expressions](../interfaces/Expressions.md).[priority](../interfaces/Expressions.md#priority)

#### Defined in

[src/lib/expression/application/expressions.ts:98](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L98)

___

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](ActionObserver.md) |

#### Returns

`void`

#### Implementation of

[Expressions](../interfaces/Expressions.md).[subscribe](../interfaces/Expressions.md#subscribe)

#### Defined in

[src/lib/expression/application/expressions.ts:187](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L187)

___

### type

▸ **type**(`expression`): `string`

Get type of expression

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expression` | `string` | expression |

#### Returns

`string`

Type of expression

#### Implementation of

[Expressions](../interfaces/Expressions.md).[type](../interfaces/Expressions.md#type)

#### Defined in

[src/lib/expression/application/expressions.ts:140](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L140)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](ActionObserver.md) |

#### Returns

`void`

#### Implementation of

[Expressions](../interfaces/Expressions.md).[unsubscribe](../interfaces/Expressions.md#unsubscribe)

#### Defined in

[src/lib/expression/application/expressions.ts:191](https://github.com/FlavioLionelRita/3xpr/blob/d3ae653/src/lib/expression/application/expressions.ts#L191)
