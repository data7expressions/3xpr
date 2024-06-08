[**Expressions**](../README.md) • **Docs**

***

[Expressions](../README.md) / OperandBuilderImpl

# Class: OperandBuilderImpl

## Implements

- [`OperandBuilder`](../interfaces/OperandBuilder.md)

## Constructors

### new OperandBuilderImpl()

> **new OperandBuilderImpl**(`evaluatorFactory`, `model`, `constBuilder`): [`OperandBuilderImpl`](OperandBuilderImpl.md)

#### Parameters

• **evaluatorFactory**: [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

• **model**: [`ModelService`](../interfaces/ModelService.md)

• **constBuilder**: [`ConstBuilder`](../interfaces/ConstBuilder.md)

#### Returns

[`OperandBuilderImpl`](OperandBuilderImpl.md)

#### Source

[src/lib/operand/application/services/builder.ts:16](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/builder.ts#L16)

## Properties

### evaluatorFactory

> `readonly` **evaluatorFactory**: [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

#### Implementation of

[`OperandBuilder`](../interfaces/OperandBuilder.md).[`evaluatorFactory`](../interfaces/OperandBuilder.md#evaluatorfactory)

#### Source

[src/lib/operand/application/services/builder.ts:16](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/builder.ts#L16)

## Methods

### build()

> **build**(`expression`): [`Operand`](Operand.md)

#### Parameters

• **expression**: `string`

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[`OperandBuilder`](../interfaces/OperandBuilder.md).[`build`](../interfaces/OperandBuilder.md#build)

#### Source

[src/lib/operand/application/services/builder.ts:28](https://github.com/data7expressions/3xpr/blob/7acee0c2886cdd6f6b6d4a83a1fd843738c9d027/src/lib/operand/application/services/builder.ts#L28)
