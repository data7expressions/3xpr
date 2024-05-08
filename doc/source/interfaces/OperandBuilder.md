[Expressions](../README.md) / OperandBuilder

# Interface: OperandBuilder

## Implemented by

- [`OperandBuilderCacheDecorator`](../classes/OperandBuilderCacheDecorator.md)
- [`OperandBuilderImpl`](../classes/OperandBuilderImpl.md)

## Table of contents

### Properties

- [evaluatorFactory](OperandBuilder.md#evaluatorfactory)

### Methods

- [build](OperandBuilder.md#build)

## Properties

### evaluatorFactory

• **evaluatorFactory**: [`EvaluatorFactory`](EvaluatorFactory.md)

#### Defined in

[src/lib/operand/domain/services.ts:12](https://github.com/data7expressions/3xpr/blob/0681e5e0ab11411af82827485c7d10cdec6b6fd6/src/lib/operand/domain/services.ts#L12)

## Methods

### build

▸ **build**(`expression`): [`Operand`](../classes/Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Operand`](../classes/Operand.md)

#### Defined in

[src/lib/operand/domain/services.ts:13](https://github.com/data7expressions/3xpr/blob/0681e5e0ab11411af82827485c7d10cdec6b6fd6/src/lib/operand/domain/services.ts#L13)
