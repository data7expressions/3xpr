[Expressions](../README.md) / OperandBuilderImpl

# Class: OperandBuilderImpl

## Implements

- [`OperandBuilder`](../interfaces/OperandBuilder.md)

## Table of contents

### Constructors

- [constructor](OperandBuilderImpl.md#constructor)

### Properties

- [evaluatorFactory](OperandBuilderImpl.md#evaluatorfactory)

### Methods

- [build](OperandBuilderImpl.md#build)

## Constructors

### constructor

• **new OperandBuilderImpl**(`evaluatorFactory`, `model`, `constBuilder`): [`OperandBuilderImpl`](OperandBuilderImpl.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluatorFactory` | [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md) |
| `model` | [`ModelService`](../interfaces/ModelService.md) |
| `constBuilder` | [`ConstBuilder`](../interfaces/ConstBuilder.md) |

#### Returns

[`OperandBuilderImpl`](OperandBuilderImpl.md)

#### Defined in

[src/lib/operand/application/services/builder.ts:16](https://github.com/data7expressions/3xpr/blob/49b6c877a765fd974fe31289a320b70575692631/src/lib/operand/application/services/builder.ts#L16)

## Properties

### evaluatorFactory

• `Readonly` **evaluatorFactory**: [`EvaluatorFactory`](../interfaces/EvaluatorFactory.md)

#### Implementation of

[OperandBuilder](../interfaces/OperandBuilder.md).[evaluatorFactory](../interfaces/OperandBuilder.md#evaluatorfactory)

#### Defined in

[src/lib/operand/application/services/builder.ts:16](https://github.com/data7expressions/3xpr/blob/49b6c877a765fd974fe31289a320b70575692631/src/lib/operand/application/services/builder.ts#L16)

## Methods

### build

▸ **build**(`expression`): [`Operand`](Operand.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `expression` | `string` |

#### Returns

[`Operand`](Operand.md)

#### Implementation of

[OperandBuilder](../interfaces/OperandBuilder.md).[build](../interfaces/OperandBuilder.md#build)

#### Defined in

[src/lib/operand/application/services/builder.ts:28](https://github.com/data7expressions/3xpr/blob/49b6c877a765fd974fe31289a320b70575692631/src/lib/operand/application/services/builder.ts#L28)
