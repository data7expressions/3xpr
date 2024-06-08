[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / OperandFacadeImpl

# Class: OperandFacadeImpl

## Implements

- [`OperandFacade`](../interfaces/OperandFacade.md)

## Constructors

### new OperandFacadeImpl()

> **new OperandFacadeImpl**(`constBuilder`, `parameterService`, `operandBuild`, `operandClone`): [`OperandFacadeImpl`](OperandFacadeImpl.md)

#### Parameters

• **constBuilder**: [`ConstBuilder`](../interfaces/ConstBuilder.md)

• **parameterService**: [`ParameterService`](../interfaces/ParameterService.md)

• **operandBuild**: [`OperandBuild`](OperandBuild.md)

• **operandClone**: [`OperandClone`](OperandClone.md)

#### Returns

[`OperandFacadeImpl`](OperandFacadeImpl.md)

#### Source

[src/lib/operand/application/facade.ts:9](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/facade.ts#L9)

## Properties

### constBuilder

> `readonly` **constBuilder**: [`ConstBuilder`](../interfaces/ConstBuilder.md)

#### Implementation of

[`OperandFacade`](../interfaces/OperandFacade.md).[`constBuilder`](../interfaces/OperandFacade.md#constbuilder)

#### Source

[src/lib/operand/application/facade.ts:9](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/facade.ts#L9)

## Methods

### build()

> **build**(`expression`, `key`): [`Operand`](Operand.md)

#### Parameters

• **expression**: `string`

• **key**: `string`= `'expression'`

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[`OperandFacade`](../interfaces/OperandFacade.md).[`build`](../interfaces/OperandFacade.md#build)

#### Source

[src/lib/operand/application/facade.ts:38](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/facade.ts#L38)

***

### clone()

> **clone**(`source`, `key`): [`Operand`](Operand.md)

#### Parameters

• **source**: [`Operand`](Operand.md)

• **key**: `string`= `'expression'`

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[`OperandFacade`](../interfaces/OperandFacade.md).[`clone`](../interfaces/OperandFacade.md#clone)

#### Source

[src/lib/operand/application/facade.ts:42](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/facade.ts#L42)

***

### getBuilder()

> **getBuilder**(`key`): [`OperandBuilder`](../interfaces/OperandBuilder.md)

#### Parameters

• **key**: `string`

#### Returns

[`OperandBuilder`](../interfaces/OperandBuilder.md)

#### Implementation of

[`OperandFacade`](../interfaces/OperandFacade.md).[`getBuilder`](../interfaces/OperandFacade.md#getbuilder)

#### Source

[src/lib/operand/application/facade.ts:14](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/facade.ts#L14)

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

[`OperandFacade`](../interfaces/OperandFacade.md).[`parameters`](../interfaces/OperandFacade.md#parameters)

#### Source

[src/lib/operand/application/facade.ts:23](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/facade.ts#L23)

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

[`OperandFacade`](../interfaces/OperandFacade.md).[`type`](../interfaces/OperandFacade.md#type)

#### Source

[src/lib/operand/application/facade.ts:33](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/facade.ts#L33)
