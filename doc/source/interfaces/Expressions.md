[Expressions](../README.md) / Expressions

# Interface: Expressions

## Hierarchy

- [`ModelService`](ModelService.md)

- [`Executor`](Executor.md)

- [`OperandFacade`](OperandFacade.md)

- [`ExpressionConvert`](ExpressionConvert.md)

- [`ExpressionListener`](ExpressionListener.md)

  ↳ **`Expressions`**

## Implemented by

- [`ExpressionsImpl`](../classes/ExpressionsImpl.md)

## Table of contents

### Properties

- [constBuilder](Expressions.md#constbuilder)

### Accessors

- [constants](Expressions.md#constants)
- [enums](Expressions.md#enums)
- [formats](Expressions.md#formats)
- [functionAlias](Expressions.md#functionalias)
- [functions](Expressions.md#functions)
- [operatorAlias](Expressions.md#operatoralias)
- [operators](Expressions.md#operators)

### Methods

- [addConstant](Expressions.md#addconstant)
- [addConvert](Expressions.md#addconvert)
- [addEnum](Expressions.md#addenum)
- [addFormat](Expressions.md#addformat)
- [addFunction](Expressions.md#addfunction)
- [addFunctionAlias](Expressions.md#addfunctionalias)
- [addLibrary](Expressions.md#addlibrary)
- [addOperator](Expressions.md#addoperator)
- [addOperatorAlias](Expressions.md#addoperatoralias)
- [build](Expressions.md#build)
- [clone](Expressions.md#clone)
- [convert](Expressions.md#convert)
- [eval](Expressions.md#eval)
- [evalAsync](Expressions.md#evalasync)
- [execute](Expressions.md#execute)
- [getBuilder](Expressions.md#getbuilder)
- [getConstantValue](Expressions.md#getconstantvalue)
- [getConvert](Expressions.md#getconvert)
- [getEnum](Expressions.md#getenum)
- [getEnumValue](Expressions.md#getenumvalue)
- [getFormat](Expressions.md#getformat)
- [getFunction](Expressions.md#getfunction)
- [getOperator](Expressions.md#getoperator)
- [isConstant](Expressions.md#isconstant)
- [isEnum](Expressions.md#isenum)
- [isFunction](Expressions.md#isfunction)
- [isOperator](Expressions.md#isoperator)
- [parameters](Expressions.md#parameters)
- [priority](Expressions.md#priority)
- [subscribe](Expressions.md#subscribe)
- [type](Expressions.md#type)
- [unsubscribe](Expressions.md#unsubscribe)

## Properties

### constBuilder

• **constBuilder**: [`ConstBuilder`](ConstBuilder.md)

#### Inherited from

[OperandFacade](OperandFacade.md).[constBuilder](OperandFacade.md#constbuilder)

#### Defined in

[src/lib/operand/domain/services.ts:39](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/operand/domain/services.ts#L39)

## Accessors

### constants

• `get` **constants**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Inherited from

ModelService.constants

#### Defined in

[src/lib/model/domain/services.ts:9](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L9)

___

### enums

• `get` **enums**(): [`string`, [`string`, `any`][]][]

#### Returns

[`string`, [`string`, `any`][]][]

#### Inherited from

ModelService.enums

#### Defined in

[src/lib/model/domain/services.ts:7](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L7)

___

### formats

• `get` **formats**(): [`string`, [`Format`](Format.md)][]

#### Returns

[`string`, [`Format`](Format.md)][]

#### Inherited from

ModelService.formats

#### Defined in

[src/lib/model/domain/services.ts:8](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L8)

___

### functionAlias

• `get` **functionAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Inherited from

ModelService.functionAlias

#### Defined in

[src/lib/model/domain/services.ts:6](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L6)

___

### functions

• `get` **functions**(): [`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Inherited from

ModelService.functions

#### Defined in

[src/lib/model/domain/services.ts:11](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L11)

___

### operatorAlias

• `get` **operatorAlias**(): [`string`, `any`][]

#### Returns

[`string`, `any`][]

#### Inherited from

ModelService.operatorAlias

#### Defined in

[src/lib/model/domain/services.ts:5](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L5)

___

### operators

• `get` **operators**(): [`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Returns

[`string`, [`OperatorMetadata`](OperatorMetadata.md)][]

#### Inherited from

ModelService.operators

#### Defined in

[src/lib/model/domain/services.ts:10](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L10)

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

#### Inherited from

[ModelService](ModelService.md).[addConstant](ModelService.md#addconstant)

#### Defined in

[src/lib/model/domain/services.ts:14](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L14)

___

### addConvert

▸ **addConvert**(`key`, `converter`): [`ExpressionConvert`](ExpressionConvert.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `converter` | [`ExpressionConverter`](ExpressionConverter.md) |

#### Returns

[`ExpressionConvert`](ExpressionConvert.md)

#### Inherited from

[ExpressionConvert](ExpressionConvert.md).[addConvert](ExpressionConvert.md#addconvert)

#### Defined in

[src/lib/expression/domain/expressions.ts:20](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/expression/domain/expressions.ts#L20)

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

#### Inherited from

[ModelService](ModelService.md).[addEnum](ModelService.md#addenum)

#### Defined in

[src/lib/model/domain/services.ts:13](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L13)

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

#### Inherited from

[ModelService](ModelService.md).[addFormat](ModelService.md#addformat)

#### Defined in

[src/lib/model/domain/services.ts:15](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L15)

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

#### Inherited from

[ModelService](ModelService.md).[addFunction](ModelService.md#addfunction)

#### Defined in

[src/lib/model/domain/services.ts:17](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L17)

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

#### Inherited from

[ModelService](ModelService.md).[addFunctionAlias](ModelService.md#addfunctionalias)

#### Defined in

[src/lib/model/domain/services.ts:19](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L19)

___

### addLibrary

▸ **addLibrary**(`library`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `library` | [`Library`](Library.md) |

#### Returns

`void`

#### Inherited from

[ModelService](ModelService.md).[addLibrary](ModelService.md#addlibrary)

#### Defined in

[src/lib/model/domain/services.ts:21](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L21)

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

#### Inherited from

[ModelService](ModelService.md).[addOperator](ModelService.md#addoperator)

#### Defined in

[src/lib/model/domain/services.ts:16](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L16)

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

#### Inherited from

[ModelService](ModelService.md).[addOperatorAlias](ModelService.md#addoperatoralias)

#### Defined in

[src/lib/model/domain/services.ts:18](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L18)

___

### build

▸ **build**(`expression`, `key?`): [`Operand`](../classes/Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `key?` | `string` |

#### Returns

[`Operand`](../classes/Operand.md)

#### Inherited from

[OperandFacade](OperandFacade.md).[build](OperandFacade.md#build)

#### Defined in

[src/lib/operand/domain/services.ts:43](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/operand/domain/services.ts#L43)

___

### clone

▸ **clone**(`source`, `key?`): [`Operand`](../classes/Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`Operand`](../classes/Operand.md) |
| `key?` | `string` |

#### Returns

[`Operand`](../classes/Operand.md)

#### Inherited from

[OperandFacade](OperandFacade.md).[clone](OperandFacade.md#clone)

#### Defined in

[src/lib/operand/domain/services.ts:35](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/operand/domain/services.ts#L35)

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

#### Inherited from

[ExpressionConvert](ExpressionConvert.md).[convert](ExpressionConvert.md#convert)

#### Defined in

[src/lib/expression/domain/expressions.ts:22](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/expression/domain/expressions.ts#L22)

___

### eval

▸ **eval**(`expression`, `data?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |

#### Returns

`any`

#### Inherited from

[Executor](Executor.md).[eval](Executor.md#eval)

#### Defined in

[src/lib/expression/domain/expressions.ts:6](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/expression/domain/expressions.ts#L6)

___

### evalAsync

▸ **evalAsync**(`expression`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |
| `data?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Executor](Executor.md).[evalAsync](Executor.md#evalasync)

#### Defined in

[src/lib/expression/domain/expressions.ts:7](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/expression/domain/expressions.ts#L7)

___

### execute

▸ **execute**(`task`, `data?`): `Promise`\<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `task` | `string` |
| `data?` | `any` |

#### Returns

`Promise`\<`any`\>

#### Inherited from

[Executor](Executor.md).[execute](Executor.md#execute)

#### Defined in

[src/lib/expression/domain/expressions.ts:8](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/expression/domain/expressions.ts#L8)

___

### getBuilder

▸ **getBuilder**(`key`): [`OperandBuilder`](OperandBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`OperandBuilder`](OperandBuilder.md)

#### Inherited from

[OperandFacade](OperandFacade.md).[getBuilder](OperandFacade.md#getbuilder)

#### Defined in

[src/lib/operand/domain/services.ts:40](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/operand/domain/services.ts#L40)

___

### getConstantValue

▸ **getConstantValue**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Inherited from

[ModelService](ModelService.md).[getConstantValue](ModelService.md#getconstantvalue)

#### Defined in

[src/lib/model/domain/services.ts:22](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L22)

___

### getConvert

▸ **getConvert**(`key`): [`ExpressionConverter`](ExpressionConverter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`ExpressionConverter`](ExpressionConverter.md)

#### Inherited from

[ExpressionConvert](ExpressionConvert.md).[getConvert](ExpressionConvert.md#getconvert)

#### Defined in

[src/lib/expression/domain/expressions.ts:21](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/expression/domain/expressions.ts#L21)

___

### getEnum

▸ **getEnum**(`name`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`any`

#### Inherited from

[ModelService](ModelService.md).[getEnum](ModelService.md#getenum)

#### Defined in

[src/lib/model/domain/services.ts:24](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L24)

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

#### Inherited from

[ModelService](ModelService.md).[getEnumValue](ModelService.md#getenumvalue)

#### Defined in

[src/lib/model/domain/services.ts:23](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L23)

___

### getFormat

▸ **getFormat**(`name`): `undefined` \| [`Format`](Format.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Format`](Format.md)

#### Inherited from

[ModelService](ModelService.md).[getFormat](ModelService.md#getformat)

#### Defined in

[src/lib/model/domain/services.ts:25](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L25)

___

### getFunction

▸ **getFunction**(`name`): [`OperatorMetadata`](OperatorMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`OperatorMetadata`](OperatorMetadata.md)

#### Inherited from

[ModelService](ModelService.md).[getFunction](ModelService.md#getfunction)

#### Defined in

[src/lib/model/domain/services.ts:27](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L27)

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

#### Inherited from

[ModelService](ModelService.md).[getOperator](ModelService.md#getoperator)

#### Defined in

[src/lib/model/domain/services.ts:26](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L26)

___

### isConstant

▸ **isConstant**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Inherited from

[ModelService](ModelService.md).[isConstant](ModelService.md#isconstant)

#### Defined in

[src/lib/model/domain/services.ts:30](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L30)

___

### isEnum

▸ **isEnum**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Inherited from

[ModelService](ModelService.md).[isEnum](ModelService.md#isenum)

#### Defined in

[src/lib/model/domain/services.ts:29](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L29)

___

### isFunction

▸ **isFunction**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Inherited from

[ModelService](ModelService.md).[isFunction](ModelService.md#isfunction)

#### Defined in

[src/lib/model/domain/services.ts:32](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L32)

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

#### Inherited from

[ModelService](ModelService.md).[isOperator](ModelService.md#isoperator)

#### Defined in

[src/lib/model/domain/services.ts:31](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L31)

___

### parameters

▸ **parameters**(`expression`): [`Parameter`](Parameter.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Parameter`](Parameter.md)[]

#### Inherited from

[OperandFacade](OperandFacade.md).[parameters](OperandFacade.md#parameters)

#### Defined in

[src/lib/operand/domain/services.ts:41](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/operand/domain/services.ts#L41)

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

#### Inherited from

[ModelService](ModelService.md).[priority](ModelService.md#priority)

#### Defined in

[src/lib/model/domain/services.ts:28](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/model/domain/services.ts#L28)

___

### subscribe

▸ **subscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](../classes/ActionObserver.md) |

#### Returns

`void`

#### Inherited from

[ExpressionListener](ExpressionListener.md).[subscribe](ExpressionListener.md#subscribe)

#### Defined in

[src/lib/expression/domain/expressions.ts:12](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/expression/domain/expressions.ts#L12)

___

### type

▸ **type**(`expression`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

`string`

#### Inherited from

[OperandFacade](OperandFacade.md).[type](OperandFacade.md#type)

#### Defined in

[src/lib/operand/domain/services.ts:42](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/operand/domain/services.ts#L42)

___

### unsubscribe

▸ **unsubscribe**(`observer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observer` | [`ActionObserver`](../classes/ActionObserver.md) |

#### Returns

`void`

#### Inherited from

[ExpressionListener](ExpressionListener.md).[unsubscribe](ExpressionListener.md#unsubscribe)

#### Defined in

[src/lib/expression/domain/expressions.ts:13](https://github.com/data7expressions/3xpr/blob/2bf95c0/src/lib/expression/domain/expressions.ts#L13)
